/**
 * express-service service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::express-service.express-service', ({ strapi }) => ({
  // Custom method to calculate final price with coupon
  async calculateFinalPrice(servicePrice: number, couponCode?: string) {
    let finalPrice = servicePrice;
    
    if (couponCode) {
      // Here you would typically validate the coupon and apply discount
      // For now, this is a placeholder implementation
      try {
        const coupon = await strapi.entityService.findMany('api::coupon.coupon', {
          filters: { 
            code: couponCode,
            isActive: true,
            validFrom: { $lte: new Date() },
            validUntil: { $gte: new Date() }
          }
        });

        if (coupon.length > 0) {
          const validCoupon = coupon[0];
          if (validCoupon.discountType === 'percentage') {
            const discount = (servicePrice * validCoupon.discountValue) / 100;
            finalPrice = servicePrice - Math.min(discount, validCoupon.maxDiscountAmount || discount);
          } else if (validCoupon.discountType === 'fixed') {
            finalPrice = Math.max(0, servicePrice - validCoupon.discountValue);
          }
        }
      } catch (error) {
        strapi.log.warn('Error applying coupon:', error);
      }
    }
    
    return finalPrice;
  },

  // Custom method to get service statistics
  async getServiceStats() {
    const total = await strapi.entityService.count('api::express-service.express-service');
    const pending = await strapi.entityService.count('api::express-service.express-service', {
      filters: { status: 'pending' }
    });
    const completed = await strapi.entityService.count('api::express-service.express-service', {
      filters: { status: 'completed' }
    });
    const cancelled = await strapi.entityService.count('api::express-service.express-service', {
      filters: { status: 'cancelled' }
    });

    return {
      total,
      pending,
      completed,
      cancelled
    };
  },

  // Custom method to send booking confirmation
  async sendBookingConfirmation(serviceId: number) {
    try {
      const service = await strapi.entityService.findOne('api::express-service.express-service', serviceId);
      
      if (!service) {
        throw new Error('Service not found');
      }

      // Here you would integrate with SMS/Email service
      // For now, just log the confirmation
      strapi.log.info(`Booking confirmation for service ${serviceId} to ${service.mobileNumber}`);
      
      return { success: true, message: 'Confirmation sent' };
    } catch (error) {
      strapi.log.error('Error sending booking confirmation:', error);
      return { success: false, error: error.message };
    }
  }
})); 