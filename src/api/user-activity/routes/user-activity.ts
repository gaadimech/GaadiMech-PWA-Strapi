/**
 * user-activity router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::user-activity.user-activity', {
  prefix: '',
  only: ['create', 'find', 'findOne'],  // Only expose necessary routes
  except: [],
  config: {
    find: {
      auth: { scope: ['find'] },  // Require authentication
      policies: [],
      middlewares: [],
    },
    findOne: {
      auth: { scope: ['find'] },  // Require authentication
      policies: [],
      middlewares: [],
    },
    create: {
      auth: { scope: ['create'] },  // Require authentication
      policies: [],
      middlewares: [],
    },
  },
}); 