/**
 * cart controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::cart.cart', ({ strapi }) => ({
  // Override find to only return user's own carts
  async find(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) {
      return ctx.unauthorized('Authentication required');
    }

    const cart = await strapi.service('api::cart.cart').getUserCart(userId);
    return { data: cart };
  },

  // Override create to associate with current user
  async create(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) {
      return ctx.unauthorized('Authentication required');
    }

    const { data } = ctx.request.body;
    const cart = await strapi.service('api::cart.cart').createUserCart(userId, data);
    
    return { data: cart };
  },

  // Override update to ensure user owns the cart
  async update(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) {
      return ctx.unauthorized('Authentication required');
    }

    const { id } = ctx.params;
    const { data } = ctx.request.body;

    try {
      const cart = await strapi.service('api::cart.cart').updateUserCart(parseInt(id), userId, data);
      return { data: cart };
    } catch (error) {
      return ctx.forbidden('Access denied');
    }
  },

  // Custom action to clear cart
  async clear(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) {
      return ctx.unauthorized('Authentication required');
    }

    const result = await strapi.service('api::cart.cart').clearUserCart(userId);
    return result;
  },
})); 