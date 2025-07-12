/**
 * express-service controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::express-service.express-service', ({ strapi }) => ({
  // Override the default create method to add custom logic
  async create(ctx) {
    const { data } = ctx.request.body;
    
    // Add submission timestamp if not provided
    if (!data.submissionTimestamp) {
      data.submissionTimestamp = new Date().toISOString();
    }
    
    // Set default status
    if (!data.status) {
      data.status = 'pending';
    }

    const response = await super.create(ctx);
    
    // You can add additional logic here like sending notifications, emails, etc.
    
    return response;
  },

  // Custom method to get services by mobile number
  async findByMobile(ctx) {
    const { mobileNumber } = ctx.params;
    
    if (!mobileNumber) {
      return ctx.badRequest('Mobile number is required');
    }

    const services = await strapi.entityService.findMany('api::express-service.express-service', {
      filters: { mobileNumber },
      sort: { createdAt: 'desc' },
      populate: '*'
    });

    return { data: services };
  },

  // Custom method to update service status
  async updateStatus(ctx) {
    const { id } = ctx.params;
    const { status } = ctx.request.body;

    if (!status) {
      return ctx.badRequest('Status is required');
    }

    const validStatuses = ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return ctx.badRequest('Invalid status');
    }

    const service = await strapi.entityService.update('api::express-service.express-service', id, {
      data: { status }
    });

    return { data: service };
  }
})); 