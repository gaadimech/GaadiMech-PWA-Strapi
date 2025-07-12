/**
 * User controller for profile management
 */

export default {
  /**
   * Update current user's profile
   * @param {Object} ctx - Koa Context
   */
  async updateMe(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) {
      return ctx.unauthorized('Authentication required');
    }

    try {
      // Only allow updating specific fields
      const allowedFields = [
        'firstName',
        'lastName',
        'email',
        'username',
        'dateOfBirth',
        'gender',
        'preferences'
      ];

      // Strapi v4 wraps request payloads under a "data" key.
      const incoming = ctx.request.body?.data || ctx.request.body || {};

      const data = Object.keys(incoming)
        .filter((key) => allowedFields.includes(key))
        .reduce((obj: Record<string, any>, key) => {
          obj[key] = incoming[key];
          return obj;
        }, {} as Record<string, any>);

      // Update user
      const user = await strapi.entityService.update('plugin::users-permissions.user', userId, {
        data
      });

      // Return updated user without sensitive fields
      const sanitizedUser = await strapi.entityService.findOne('plugin::users-permissions.user', userId, {
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

      return { data: sanitizedUser };
    } catch (error) {
      console.error('Error updating user profile:', error);
      return ctx.badRequest('Failed to update profile');
    }
  }
}; 