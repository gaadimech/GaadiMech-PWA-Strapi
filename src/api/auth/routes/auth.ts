/**
 * Auth routes for mobile OTP authentication
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/auth/send-otp',
      handler: 'auth.sendOtp',
      config: {
        policies: [],
        middlewares: [],
        auth: false
      }
    },
    {
      method: 'POST',
      path: '/auth/verify-otp',
      handler: 'auth.verifyOtp',
      config: {
        policies: [],
        middlewares: [],
        auth: false
      }
    },
    {
      method: 'POST',
      path: '/auth/logout',
      handler: 'auth.logout',
      config: {
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'GET',
      path: '/auth/profile',
      handler: 'auth.getUserProfile',
      config: {
        policies: [],
        middlewares: []
      }
    }
  ]
}; 