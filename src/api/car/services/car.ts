/**
 * car service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::car.car', ({ strapi }) => ({
  // Custom service methods can be added here
  
  async findUserCars(userId: number) {
    const cars = await strapi.entityService.findMany('api::car.car', {
      filters: {
        owner: { id: userId },
        isActive: true,
      },
      populate: ['owner'],
    });
    
    return cars;
  },

  async createUserCar(userId: number, carData: any) {
    // If this is set as primary, make sure no other cars are primary
    if (carData.isPrimary) {
      const existingCars = await strapi.entityService.findMany('api::car.car', {
        filters: { owner: { id: userId } },
      });
      
      for (const car of existingCars) {
        await strapi.entityService.update('api::car.car', car.id, {
          data: { isPrimary: false },
        });
      }
    }

    const car = await strapi.entityService.create('api::car.car', {
      data: {
        ...carData,
        owner: userId,
      },
    });

    return car;
  },

  async updateUserCar(carId: number, userId: number, carData: any) {
    // First verify the car belongs to the user
    const car: any = await strapi.entityService.findOne('api::car.car', carId, {
      populate: ['owner'],
    });

    if (!car || (car.owner && car.owner.id !== userId)) {
      throw new Error('Car not found or access denied');
    }

    // If this is set as primary, make sure no other cars are primary
    if (carData.isPrimary) {
      const existingCars = await strapi.entityService.findMany('api::car.car', {
        filters: { owner: { id: userId } },
      });
      
      for (const existingCar of existingCars) {
        await strapi.entityService.update('api::car.car', existingCar.id, {
          data: { isPrimary: false },
        });
      }
    }

    const updatedCar = await strapi.entityService.update('api::car.car', carId, {
      data: carData,
    });

    return updatedCar;
  },

  async deleteUserCar(carId: number, userId: number) {
    // First verify the car belongs to the user
    const car: any = await strapi.entityService.findOne('api::car.car', carId, {
      populate: ['owner'],
    });

    if (!car || (car.owner && car.owner.id !== userId)) {
      throw new Error('Car not found or access denied');
    }

    // Soft delete by setting isActive to false
    const deletedCar = await strapi.entityService.update('api::car.car', carId, {
      data: { isActive: false },
    });

    return deletedCar;
  },
})); 