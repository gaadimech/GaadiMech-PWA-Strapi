/**
 * cart service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::cart.cart', ({ strapi }) => ({
  async getUserCart(userId: number) {
    const carts = await strapi.entityService.findMany('api::cart.cart', {
      filters: {
        user: { id: userId },
        isActive: true,
      },
      populate: ['user', 'appliedCoupon', 'selectedCar', 'selectedAddress'],
      sort: { lastModifiedAt: 'desc' },
      limit: 1,
    });
    
    return carts.length > 0 ? carts[0] : null;
  },

  async createUserCart(userId: number, cartData: any) {
    // Deactivate existing carts for this user
    const existingCarts = await strapi.entityService.findMany('api::cart.cart', {
      filters: { user: { id: userId } },
    });
    
    for (const cart of existingCarts) {
      await strapi.entityService.update('api::cart.cart', cart.id, {
        data: { isActive: false },
      });
    }

    // Create new cart
    const cart = await strapi.entityService.create('api::cart.cart', {
      data: {
        ...cartData,
        user: userId,
        isActive: true,
        lastModifiedAt: new Date(),
      },
    });

    return cart;
  },

  async updateUserCart(cartId: number, userId: number, cartData: any) {
    // Verify cart belongs to user
    const cart: any = await strapi.entityService.findOne('api::cart.cart', cartId, {
      populate: ['user'],
    });

    if (!cart || (cart.user && cart.user.id !== userId)) {
      throw new Error('Cart not found or access denied');
    }

    const updatedCart = await strapi.entityService.update('api::cart.cart', cartId, {
      data: {
        ...cartData,
        lastModifiedAt: new Date(),
      },
    });

    return updatedCart;
  },

  async clearUserCart(userId: number) {
    const cart = await this.getUserCart(userId);
    
    if (cart) {
      await strapi.entityService.update('api::cart.cart', cart.id, {
        data: { 
          isActive: false,
          status: 'abandoned',
        },
      });
    }

    return { success: true };
  },
})); 