/**
 * address controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::address.address', ({ strapi }) => ({
  // Override find to only return user's own addresses
  async find(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) {
      return ctx.unauthorized('Authentication required');
    }

    const addresses = await strapi.service('api::address.address').getUserAddresses(userId);
    return { data: addresses };
  },

  // Override create to associate with current user
  async create(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) {
      return ctx.unauthorized('Authentication required');
    }

    const { data } = ctx.request.body;
    const address = await strapi.service('api::address.address').createUserAddress(userId, data);
    
    return { data: address };
  },

  // Override update to ensure user owns the address
  async update(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) {
      return ctx.unauthorized('Authentication required');
    }

    const { id } = ctx.params;
    const { data } = ctx.request.body;

    try {
      const address = await strapi.service('api::address.address').updateUserAddress(parseInt(id), userId, data);
      return { data: address };
    } catch (error) {
      return ctx.forbidden('Access denied');
    }
  },

  // Override delete to ensure user owns the address
  async delete(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) {
      return ctx.unauthorized('Authentication required');
    }

    const { id } = ctx.params;

    try {
      const address = await strapi.service('api::address.address').deleteUserAddress(parseInt(id), userId);
      return { data: address };
    } catch (error) {
      return ctx.forbidden('Access denied');
    }
  },
})); 