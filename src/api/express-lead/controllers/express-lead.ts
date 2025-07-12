/**
 * express-lead controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::express-lead.express-lead', ({ strapi }) => ({
  // Override the default create method
  async create(ctx) {
    const { data } = ctx.request.body;
    
    // Set default values
    if (!data.status) {
      data.status = 'new';
    }
    if (!data.leadSource) {
      data.leadSource = 'website';
    }

    const response = await super.create(ctx);
    return response;
  },

  // Custom method to get leads by status
  async findByStatus(ctx) {
    const { status } = ctx.params;
    
    const validStatuses = ['new', 'contacted', 'qualified', 'converted', 'lost'];
    if (!validStatuses.includes(status)) {
      return ctx.badRequest('Invalid status');
    }

    const leads = await strapi.entityService.findMany('api::express-lead.express-lead', {
      filters: { status },
      sort: { createdAt: 'desc' },
      populate: '*'
    });

    return { data: leads };
  },

  // Custom method to update lead status
  async updateStatus(ctx) {
    const { id } = ctx.params;
    const { status, notes } = ctx.request.body;

    if (!status) {
      return ctx.badRequest('Status is required');
    }

    const validStatuses = ['new', 'contacted', 'qualified', 'converted', 'lost'];
    if (!validStatuses.includes(status)) {
      return ctx.badRequest('Invalid status');
    }

    const updateData: any = { status };
    if (notes) {
      updateData.notes = notes;
    }

    const lead = await strapi.entityService.update('api::express-lead.express-lead', id, {
      data: updateData
    });

    return { data: lead };
  }
})); 