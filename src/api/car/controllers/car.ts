/**
 * car controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::car.car', ({ strapi }) => ({
  // Override create to ensure user relationship
  async create(ctx) {
    const { data } = ctx.request.body;
    
    // Ensure only one primary car per user
    if (data.isPrimary && data.owner) {
      const existingCars = await strapi.entityService.findMany('api::car.car', {
        filters: { owner: data.owner, isPrimary: true }
      });
      
      for (const car of existingCars) {
        await strapi.entityService.update('api::car.car', car.id, {
          data: { isPrimary: false }
        });
      }
    }

    return super.create(ctx);
  },

  // Override update to handle primary car logic
  async update(ctx) {
    const { data } = ctx.request.body;
    const { id } = ctx.params;

    if (data.isPrimary) {
      const car: any = await strapi.entityService.findOne('api::car.car', id, {
        populate: ['owner']
      });

      if (car && car.owner) {
        const ownerId = car.owner.id || car.owner;
        const existingCars = await strapi.entityService.findMany('api::car.car', {
          filters: { owner: ownerId, isPrimary: true }
        });
        
        for (const existingCar of existingCars) {
          await strapi.entityService.update('api::car.car', existingCar.id, {
            data: { isPrimary: false }
          });
        }
      }
    }

    return super.update(ctx);
  }
})); 