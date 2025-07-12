/**
 * address service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::address.address', ({ strapi }) => ({
  async getUserAddresses(userId: number) {
    const addresses = await strapi.entityService.findMany('api::address.address', {
      filters: {
        user: { id: userId },
        isActive: true,
      },
      populate: ['user'],
      sort: { isDefault: 'desc', createdAt: 'desc' },
    });
    
    return addresses;
  },

  async createUserAddress(userId: number, addressData: any) {
    // If this is set as default, make sure no other addresses are default
    if (addressData.isDefault) {
      const existingAddresses = await strapi.entityService.findMany('api::address.address', {
        filters: { user: { id: userId } },
      });
      
      for (const address of existingAddresses) {
        await strapi.entityService.update('api::address.address', address.id, {
          data: { isDefault: false },
        });
      }
    }

    const address = await strapi.entityService.create('api::address.address', {
      data: {
        ...addressData,
        user: userId,
      },
    });

    return address;
  },

  async updateUserAddress(addressId: number, userId: number, addressData: any) {
    // First verify the address belongs to the user
    const address: any = await strapi.entityService.findOne('api::address.address', addressId, {
      populate: ['user'],
    });

    if (!address || (address.user && address.user.id !== userId)) {
      throw new Error('Address not found or access denied');
    }

    // If this is set as default, make sure no other addresses are default
    if (addressData.isDefault) {
      const existingAddresses = await strapi.entityService.findMany('api::address.address', {
        filters: { user: { id: userId } },
      });
      
      for (const existingAddress of existingAddresses) {
        await strapi.entityService.update('api::address.address', existingAddress.id, {
          data: { isDefault: false },
        });
      }
    }

    const updatedAddress = await strapi.entityService.update('api::address.address', addressId, {
      data: addressData,
    });

    return updatedAddress;
  },

  async deleteUserAddress(addressId: number, userId: number) {
    // First verify the address belongs to the user
    const address: any = await strapi.entityService.findOne('api::address.address', addressId, {
      populate: ['user'],
    });

    if (!address || (address.user && address.user.id !== userId)) {
      throw new Error('Address not found or access denied');
    }

    // Soft delete by setting isActive to false
    const deletedAddress = await strapi.entityService.update('api::address.address', addressId, {
      data: { isActive: false },
    });

    return deletedAddress;
  },
})); 