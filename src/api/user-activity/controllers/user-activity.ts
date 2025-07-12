/**
 * user-activity controller
 */

import { factories } from '@strapi/strapi';

interface UserActivityData {
  user: number;
  timestamp: Date;  // Make timestamp required
  activityType: string;
  action: string;
  sessionId: string;
  [key: string]: any;
}

interface UserActivityQuery {
  filters?: {
    user?: number;
    [key: string]: any;
  };
  [key: string]: any;
}

export default factories.createCoreController('api::user-activity.user-activity', ({ strapi }) => ({
  // Override create to ensure user association
  async create(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) {
      return ctx.unauthorized('Authentication required');
    }

    // Add user to the activity data
    const { data } = ctx.request.body;
    const activityData = {
      ...data,
      user: userId,
      timestamp: data.timestamp || new Date(),
      ipAddress: ctx.request.ip,
      userAgent: ctx.request.header['user-agent']
    };

    // Create the activity record
    const activity = await strapi.entityService.create('api::user-activity.user-activity', {
      data: activityData
    });

    return { data: activity };
  },

  // Override find to only return user's own activities
  async find(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) {
      return ctx.unauthorized('Authentication required');
    }

    // Add user filter to the query
    const query: UserActivityQuery = ctx.query || {};
    ctx.query = {
      ...query,
      filters: {
        ...(query.filters || {}),
        user: userId
      }
    };

    return super.find(ctx);
  },

  // Override findOne to ensure user owns the activity
  async findOne(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) {
      return ctx.unauthorized('Authentication required');
    }

    const { id } = ctx.params;
    const activity = await strapi.entityService.findOne('api::user-activity.user-activity', id, {
      populate: ['user']
    }) as { user?: { id: number } } | null;

    // Check ownership
    if (!activity || activity.user?.id !== userId) {
      return ctx.forbidden('Access denied');
    }

    return { data: activity };
  }
})); 