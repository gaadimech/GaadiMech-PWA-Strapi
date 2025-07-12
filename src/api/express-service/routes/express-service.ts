/**
 * express-service router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::express-service.express-service', {
  config: {
    create: {
      middlewares: []
    },
    find: {
      middlewares: []
    },
    findOne: {
      middlewares: []
    },
    update: {
      middlewares: []
    },
    delete: {
      middlewares: []
    }
  }
});

// Custom routes
export const customRoutes = {
  routes: [
    {
      method: 'GET',
      path: '/express-services/mobile/:mobileNumber',
      handler: 'express-service.findByMobile',
      config: {
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'PUT',
      path: '/express-services/:id/status',
      handler: 'express-service.updateStatus',
      config: {
        policies: [],
        middlewares: []
      }
    }
  ]
}; 