/**
 * User routes for profile management
 */

export default {
  routes: [
    {
      method: 'PUT',
      path: '/users/me',
      handler: 'user.updateMe',
      config: {
        policies: [],
        middlewares: [],
        auth: {
          scope: ['update']
        }
      }
    }
  ]
}; 