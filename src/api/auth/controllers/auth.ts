/**
 * Custom Authentication Controller
 * Mobile OTP based authentication like Swiggy/Zomato
 */

import crypto from 'crypto';

type SessionPlatform = 'web' | 'android' | 'ios' | 'unknown';
type RegistrationSource = 'website' | 'android_app' | 'ios_app' | 'referral' | 'social';
type LoginMethod = 'mobile_otp' | 'social_google' | 'social_facebook' | 'email_password';

const detectPlatform = (userAgent: string | undefined): SessionPlatform => {
  if (!userAgent) return 'unknown';
  if (userAgent.includes('Android')) return 'android';
  if (userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'ios';
  return 'web';
};

const mapPlatformToRegistrationSource = (platform: SessionPlatform): RegistrationSource => {
  switch (platform) {
    case 'android': return 'android_app';
    case 'ios': return 'ios_app';
    default: return 'website';
  }
};

const generateReferralCode = () => {
  return 'GM' + Math.random().toString(36).substring(2, 8).toUpperCase();
};

const sendSMS = async (strapi, mobileNumber, message) => {
  // Integrate with your SMS provider (Twilio, MSG91, etc.)
  // For now, just log
  strapi.log.info(`SMS to ${mobileNumber}: ${message}`);
  return true;
};

const trackEvent = async (strapi, ctx, eventData) => {
  try {
    await strapi.entityService.create('api::analytics-event.analytics-event', {
      data: {
        ...eventData,
        userId: eventData.userId ? String(eventData.userId) : undefined,
        timestamp: new Date(),
        sessionId: eventData.sessionId || 'unknown',
        ipAddress: ctx.request.ip,
        userAgent: ctx.request.header['user-agent'],
        source: 'website'
      }
    });
  } catch (error) {
    strapi.log.error('Track event error:', error);
  }
};

const getUserProfile = async (strapi, userId) => {
  try {
    const user = await strapi.entityService.findOne('plugin::users-permissions.user', userId, {
      populate: {
        cars: true,
        addresses: true,
        orders: true,
        carts: true,
        paymentMethods: true
      }
    });

    return user;
  } catch (error) {
    strapi.log.error('Get user profile error:', error);
    // Return basic user data if populate fails
    const basicUser = await strapi.entityService.findOne('plugin::users-permissions.user', userId);
    return basicUser;
  }
};

export default {
  // Send OTP to mobile number
  async sendOtp(ctx) {
    try {
      const { mobileNumber, source = 'website', deviceInfo } = ctx.request.body;

      // Validate mobile number
      if (!mobileNumber || !mobileNumber.match(/^[6-9]\d{9}$/)) {
        return ctx.badRequest('Valid mobile number is required');
      }

      // Generate OTP
      const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
      const sessionId = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // Check if user exists
      let user = await strapi.entityService.findMany('plugin::users-permissions.user', {
        filters: { mobileNumber },
        limit: 1
      });

      const isNewUser = !user || user.length === 0;

      // Create or update user session
      const sessionData = {
        mobileNumber,
        sessionId,
        otpCode,
        otpAttempts: 0,
        otpExpiresAt: expiresAt,
        isOtpVerified: false,
        sessionStatus: 'pending_otp' as const,
        ipAddress: ctx.request.ip,
        userAgent: ctx.request.header['user-agent'],
        platform: detectPlatform(ctx.request.header['user-agent']),
        deviceInfo: deviceInfo || {},
        isNewUser,
        loginMethod: 'mobile_otp' as LoginMethod
      };

      const session = await strapi.entityService.create('api::user-session.user-session', {
        data: sessionData
      });

      // Send OTP via SMS
      await sendSMS(strapi, mobileNumber, `Your GaadiMech OTP is: ${otpCode}. Valid for 10 minutes.`);

      // Track analytics event
      await trackEvent(strapi, ctx, {
        eventName: 'otp_sent',
        eventType: 'user_action',
        properties: {
          mobileNumber,
          isNewUser,
          source
        }
      });

      return {
        success: true,
        sessionId,
        isNewUser,
        message: 'OTP sent successfully',
        expiresIn: 600 // 10 minutes
      };

    } catch (error) {
      strapi.log.error('Send OTP Error:', error);
      return ctx.internalServerError('Failed to send OTP');
    }
  },

  // Verify OTP and login/register user
  async verifyOtp(ctx) {
    try {
      const { sessionId, otpCode, deviceInfo, location } = ctx.request.body;

      if (!sessionId || !otpCode) {
        return ctx.badRequest('Session ID and OTP are required');
      }

      // Find session
      const sessions = await strapi.entityService.findMany('api::user-session.user-session', {
        filters: { sessionId },
        limit: 1
      });

      if (!sessions || sessions.length === 0) {
        return ctx.badRequest('Invalid session');
      }

      const session = sessions[0];

      // Check if OTP is expired
      if (new Date() > new Date(session.otpExpiresAt)) {
        return ctx.badRequest('OTP has expired');
      }

      // Check attempts
      if (session.otpAttempts >= 3) {
        await strapi.entityService.update('api::user-session.user-session', session.id, {
          data: { sessionStatus: 'blocked' }
        });
        return ctx.badRequest('Too many failed attempts. Please request a new OTP.');
      }

      // Verify OTP
      strapi.log.info(`OTP Verification Debug:`, {
        sessionOtpCode: session.otpCode,
        sessionOtpType: typeof session.otpCode,
        receivedOtpCode: otpCode,
        receivedOtpType: typeof otpCode,
        strictComparison: session.otpCode !== otpCode,
        stringComparison: String(session.otpCode) !== String(otpCode)
      });

      if (String(session.otpCode) !== String(otpCode)) {
        await strapi.entityService.update('api::user-session.user-session', session.id, {
          data: { otpAttempts: session.otpAttempts + 1 }
        });
        return ctx.badRequest('Invalid OTP');
      }

      // OTP verified successfully

      // Fetch the "authenticated" role once so it can be reused below
      const authRole = await strapi.db
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'authenticated' } });

      if (!authRole) {
        strapi.log.error('Authentication role not found');
        return ctx.internalServerError('Failed to verify OTP - Role configuration error');
      }

      const authenticatedRoleId = authRole.id;
      
      strapi.log.info('Role Assignment Debug:', {
        authenticatedRoleId,
        roleName: authRole.name,
        roleType: authRole.type
      });

      let user;

      if (session.isNewUser) {
        // Create new user
        const username = `user_${session.mobileNumber}`;
        const referralCode = generateReferralCode();

        strapi.log.info('Creating new user with role:', authenticatedRoleId);

        user = await strapi.entityService.create('plugin::users-permissions.user', {
          data: {
            username,
            mobileNumber: session.mobileNumber,
            firstName: `User ${session.mobileNumber.slice(-4)}`,
            confirmed: true,
            isMobileVerified: true,
            role: authenticatedRoleId, // Explicitly set role
            registrationSource: mapPlatformToRegistrationSource(session.platform),
            referralCode,
            lastLoginAt: new Date(),
            lastActiveAt: new Date(),
            deviceInfo: deviceInfo || {},
            preferences: {
              language: 'en',
              currency: 'INR',
              notifications: {
                push: true,
                sms: true,
                email: false
              }
            }
          }
        });

        // Track new user registration
        await trackEvent(strapi, ctx, {
          eventName: 'user_registered',
          eventType: 'conversion',
          userId: String(user.id),
          properties: {
            registrationSource: mapPlatformToRegistrationSource(session.platform),
            mobileNumber: session.mobileNumber
          }
        });

      } else {
        // Update existing user
        const existingUsers = await strapi.entityService.findMany('plugin::users-permissions.user', {
          filters: { mobileNumber: session.mobileNumber },
          limit: 1,
          populate: ['role'] // Make sure we get the current role
        });

        user = existingUsers[0];

        if (!user) {
          strapi.log.error('User not found:', session.mobileNumber);
          return ctx.internalServerError('Failed to verify OTP - User not found');
        }

        strapi.log.info('Updating existing user role:', {
          userId: user.id,
          currentRole: user.role?.type,
          newRole: 'authenticated',
          roleId: authenticatedRoleId
        });

        // Always update to authenticated role to ensure proper permissions
        user = await strapi.entityService.update('plugin::users-permissions.user', user.id, {
          data: {
            lastLoginAt: new Date(),
            lastActiveAt: new Date(),
            isMobileVerified: true,
            role: authenticatedRoleId // Explicitly set role
          }
        });
      }

      // Update session
      await strapi.entityService.update('api::user-session.user-session', session.id, {
        data: {
          user: user.id,
          isOtpVerified: true,
          sessionStatus: 'active',
          loginAt: new Date(),
          otpVerifiedAt: new Date(),
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
        }
      });

      // Generate JWT token
      const jwt = strapi.plugins['users-permissions'].services.jwt.issue({
        id: user.id,
        sessionId: session.sessionId
      });

      // Get user's complete profile data
      const userProfile = await getUserProfile(strapi, user.id);

      // Track login event
      await trackEvent(strapi, ctx, {
        eventName: 'user_logged_in',
        eventType: 'user_action',
        userId: String(user.id),
        properties: {
          loginMethod: 'mobile_otp',
          isNewUser: session.isNewUser,
          platform: session.platform
        }
      });

      return {
        success: true,
        jwt,
        user: userProfile,
        isNewUser: session.isNewUser,
        sessionId: session.sessionId
      };

    } catch (error) {
      strapi.log.error('Verify OTP Error:', error);
      return ctx.internalServerError('Failed to verify OTP');
    }
  },

  // Get current authenticated user
  async getCurrentUser(ctx) {
    try {
      if (!ctx.state.user) {
        return ctx.unauthorized('No user authenticated');
      }

      const userProfile = await getUserProfile(strapi, ctx.state.user.id);
      return { data: userProfile };
    } catch (error) {
      strapi.log.error('Get current user error:', error);
      return ctx.internalServerError('Failed to get user profile');
    }
  },

  // Logout user
  async logout(ctx) {
    try {
      const { sessionId } = ctx.request.body;
      
      if (sessionId) {
        const sessions = await strapi.entityService.findMany('api::user-session.user-session', {
          filters: { sessionId }
        });
        
        if (sessions && sessions.length > 0) {
          await strapi.entityService.update('api::user-session.user-session', sessions[0].id, {
            data: { 
              sessionStatus: 'logged_out',
              logoutAt: new Date()
            }
          });
        }
      }

      return { success: true, message: 'Logged out successfully' };
    } catch (error) {
      strapi.log.error('Logout Error:', error);
      return ctx.internalServerError('Failed to logout');
    }
  },

  async getUserProfile(ctx) {
    try {
      if (!ctx.state.user) {
        return ctx.unauthorized('No user authenticated');
      }

      const user = await strapi.entityService.findOne('plugin::users-permissions.user', ctx.state.user.id, {
        populate: {
          cars: {
            filters: { isActive: true },
            sort: { isPrimary: 'desc' }
          },
          addresses: {
            filters: { isActive: true },
            sort: { isDefault: 'desc' }
          },
          orders: {
            filters: { status: { $ne: 'cancelled' } },
            sort: { createdAt: 'desc' },
            limit: 10
          },
          carts: {
            filters: { status: 'active' },
            sort: { lastModifiedAt: 'desc' },
            limit: 1
          },
          paymentMethods: {
            filters: { isActive: true },
            sort: { isDefault: 'desc' }
          }
        }
      });

      return { data: user };
    } catch (error) {
      strapi.log.error('Get user profile error:', error);
      return ctx.internalServerError('Failed to get user profile');
    }
  }
}; 