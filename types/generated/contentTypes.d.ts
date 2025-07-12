import type { Schema, Struct } from '@strapi/strapi';

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    encryptedKey: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'read-only'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
      Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiAddressAddress extends Struct.CollectionTypeSchema {
  collectionName: 'addresses';
  info: {
    description: 'User addresses for service delivery';
    displayName: 'Address';
    pluralName: 'addresses';
    singularName: 'address';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    address: Schema.Attribute.Text & Schema.Attribute.Required;
    city: Schema.Attribute.String & Schema.Attribute.Required;
    contactPerson: Schema.Attribute.String;
    contactPhone: Schema.Attribute.String;
    country: Schema.Attribute.String & Schema.Attribute.DefaultTo<'India'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deliveryInstructions: Schema.Attribute.Text;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    isDefault: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    landmark: Schema.Attribute.String;
    latitude: Schema.Attribute.Float;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::address.address'
    > &
      Schema.Attribute.Private;
    longitude: Schema.Attribute.Float;
    pincode: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 10;
      }>;
    publishedAt: Schema.Attribute.DateTime;
    state: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['home', 'office', 'other']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'home'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiAnalyticsEventAnalyticsEvent
  extends Struct.CollectionTypeSchema {
  collectionName: 'analytics_events';
  info: {
    description: 'User behavior and interaction tracking for business intelligence';
    displayName: 'Analytics Event';
    pluralName: 'analytics-events';
    singularName: 'analytics-event';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    anonymousId: Schema.Attribute.String;
    browser: Schema.Attribute.JSON;
    campaign: Schema.Attribute.String;
    category: Schema.Attribute.String;
    channel: Schema.Attribute.Enumeration<
      [
        'organic',
        'paid_search',
        'social',
        'email',
        'direct',
        'referral',
        'affiliate',
      ]
    > &
      Schema.Attribute.DefaultTo<'direct'>;
    cohort: Schema.Attribute.String;
    context: Schema.Attribute.JSON;
    conversionValue: Schema.Attribute.Decimal;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    currency: Schema.Attribute.String & Schema.Attribute.DefaultTo<'INR'>;
    device: Schema.Attribute.JSON;
    deviceId: Schema.Attribute.String;
    duration: Schema.Attribute.Integer;
    errorCode: Schema.Attribute.String;
    errorMessage: Schema.Attribute.Text;
    eventName: Schema.Attribute.String & Schema.Attribute.Required;
    eventType: Schema.Attribute.Enumeration<
      [
        'page_view',
        'button_click',
        'form_submit',
        'cart_action',
        'search',
        'service_view',
        'booking_flow',
        'payment_flow',
        'user_action',
        'app_lifecycle',
        'error',
        'conversion',
      ]
    > &
      Schema.Attribute.Required;
    experimentId: Schema.Attribute.String;
    funnelStep: Schema.Attribute.String;
    ipAddress: Schema.Attribute.String;
    isConversion: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isProcessed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
    loadTime: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::analytics-event.analytics-event'
    > &
      Schema.Attribute.Private;
    location: Schema.Attribute.JSON;
    medium: Schema.Attribute.String;
    metadata: Schema.Attribute.JSON;
    os: Schema.Attribute.JSON;
    page: Schema.Attribute.JSON;
    platform: Schema.Attribute.Enumeration<
      ['web', 'android', 'ios', 'unknown']
    > &
      Schema.Attribute.DefaultTo<'web'>;
    processedAt: Schema.Attribute.DateTime;
    properties: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    quantity: Schema.Attribute.Integer;
    referrer: Schema.Attribute.String;
    revenue: Schema.Attribute.Decimal;
    screen: Schema.Attribute.JSON;
    sessionId: Schema.Attribute.String & Schema.Attribute.Required;
    source: Schema.Attribute.Enumeration<
      ['website', 'android_app', 'ios_app']
    > &
      Schema.Attribute.DefaultTo<'website'>;
    timestamp: Schema.Attribute.DateTime & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    userAgent: Schema.Attribute.Text;
    userId: Schema.Attribute.String;
    utmCampaign: Schema.Attribute.String;
    utmContent: Schema.Attribute.String;
    utmMedium: Schema.Attribute.String;
    utmSource: Schema.Attribute.String;
    utmTerm: Schema.Attribute.String;
    value: Schema.Attribute.Decimal;
    variationId: Schema.Attribute.String;
    version: Schema.Attribute.String;
  };
}

export interface ApiCarCar extends Struct.CollectionTypeSchema {
  collectionName: 'cars';
  info: {
    description: 'User vehicles';
    displayName: 'Car';
    pluralName: 'cars';
    singularName: 'car';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    color: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    engineCapacity: Schema.Attribute.String;
    fuelType: Schema.Attribute.Enumeration<
      ['petrol', 'diesel', 'cng', 'electric', 'hybrid']
    > &
      Schema.Attribute.Required;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    isPrimary: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::car.car'> &
      Schema.Attribute.Private;
    make: Schema.Attribute.String & Schema.Attribute.Required;
    model: Schema.Attribute.String & Schema.Attribute.Required;
    owner: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    publishedAt: Schema.Attribute.DateTime;
    registrationNumber: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    transmission: Schema.Attribute.Enumeration<['manual', 'automatic', 'cvt']>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    year: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 2030;
          min: 1950;
        },
        number
      >;
  };
}

export interface ApiCartCart extends Struct.CollectionTypeSchema {
  collectionName: 'carts';
  info: {
    description: 'Persistent user cart storage for seamless shopping experience';
    displayName: 'Cart';
    pluralName: 'carts';
    singularName: 'cart';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    abandonmentReason: Schema.Attribute.String;
    appliedCoupon: Schema.Attribute.Relation<'manyToOne', 'api::coupon.coupon'>;
    cartType: Schema.Attribute.Enumeration<
      ['regular_services', 'doorstep_services', 'mixed']
    > &
      Schema.Attribute.DefaultTo<'regular_services'>;
    convertedToOrder: Schema.Attribute.Relation<'oneToOne', 'api::order.order'>;
    couponCode: Schema.Attribute.String;
    couponDiscount: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deviceId: Schema.Attribute.String;
    discountAmount: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    expiresAt: Schema.Attribute.DateTime;
    ipAddress: Schema.Attribute.String;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    items: Schema.Attribute.JSON & Schema.Attribute.Required;
    lastModifiedAt: Schema.Attribute.DateTime;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::cart.cart'> &
      Schema.Attribute.Private;
    location: Schema.Attribute.JSON;
    metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    remindersSent: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    selectedAddress: Schema.Attribute.Relation<
      'manyToOne',
      'api::address.address'
    >;
    selectedCar: Schema.Attribute.Relation<'manyToOne', 'api::car.car'>;
    selectedDate: Schema.Attribute.Date;
    selectedTimeSlot: Schema.Attribute.String;
    sessionId: Schema.Attribute.String & Schema.Attribute.Required;
    source: Schema.Attribute.Enumeration<
      ['website', 'android_app', 'ios_app']
    > &
      Schema.Attribute.DefaultTo<'website'>;
    specialInstructions: Schema.Attribute.Text;
    status: Schema.Attribute.Enumeration<
      ['active', 'abandoned', 'converted', 'saved_for_later', 'expired']
    > &
      Schema.Attribute.DefaultTo<'active'>;
    subtotal: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    taxAmount: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    totalAmount: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    totalItems: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    totalQuantity: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    userAgent: Schema.Attribute.Text;
  };
}

export interface ApiCityCity extends Struct.CollectionTypeSchema {
  collectionName: 'cities';
  info: {
    description: 'City-specific data and SEO content';
    displayName: 'City';
    pluralName: 'cities';
    singularName: 'city';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    canonicalUrl: Schema.Attribute.String;
    country: Schema.Attribute.String & Schema.Attribute.DefaultTo<'India'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    faqs: Schema.Attribute.JSON;
    heroSubtitle: Schema.Attribute.Text;
    heroTitle: Schema.Attribute.String & Schema.Attribute.Required;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    isServiceAvailable: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    latitude: Schema.Attribute.Float;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::city.city'> &
      Schema.Attribute.Private;
    longitude: Schema.Attribute.Float;
    metaDescription: Schema.Attribute.Text;
    metaKeywords: Schema.Attribute.JSON;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    ogImage: Schema.Attribute.String;
    pincode: Schema.Attribute.String;
    priority: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    reviews: Schema.Attribute.JSON;
    serviceRadius: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<25>;
    services: Schema.Attribute.JSON;
    slug: Schema.Attribute.UID<'name'> & Schema.Attribute.Required;
    state: Schema.Attribute.String & Schema.Attribute.Required;
    stats: Schema.Attribute.JSON;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiContactContact extends Struct.CollectionTypeSchema {
  collectionName: 'contacts';
  info: {
    description: 'Contact form submissions';
    displayName: 'Contact';
    pluralName: 'contacts';
    singularName: 'contact';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      ['general', 'support', 'complaint', 'suggestion', 'partnership']
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::contact.contact'
    > &
      Schema.Attribute.Private;
    locationSource: Schema.Attribute.Enumeration<
      ['geolocation', 'ip', 'manual', 'unknown']
    >;
    message: Schema.Attribute.Text & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    phone: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 15;
        minLength: 10;
      }>;
    priority: Schema.Attribute.Enumeration<
      ['low', 'medium', 'high', 'urgent']
    > &
      Schema.Attribute.DefaultTo<'medium'>;
    publishedAt: Schema.Attribute.DateTime;
    responseNotes: Schema.Attribute.Text;
    status: Schema.Attribute.Enumeration<['new', 'read', 'replied', 'closed']> &
      Schema.Attribute.DefaultTo<'new'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    userCity: Schema.Attribute.String;
    userCountry: Schema.Attribute.String & Schema.Attribute.DefaultTo<'India'>;
    userLatitude: Schema.Attribute.Float;
    userLongitude: Schema.Attribute.Float;
    userState: Schema.Attribute.String;
  };
}

export interface ApiCouponCoupon extends Struct.CollectionTypeSchema {
  collectionName: 'coupons';
  info: {
    description: 'Discount coupons and promotional codes';
    displayName: 'Coupon';
    pluralName: 'coupons';
    singularName: 'coupon';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    applicableServices: Schema.Attribute.JSON;
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    createdFor: Schema.Attribute.String;
    currentUses: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    description: Schema.Attribute.Text;
    discountType: Schema.Attribute.Enumeration<
      ['percentage', 'fixed', 'free_shipping']
    > &
      Schema.Attribute.Required;
    discountValue: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    isPersonalized: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::coupon.coupon'
    > &
      Schema.Attribute.Private;
    maxDiscountAmount: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    maxUses: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    minPurchaseAmount: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    prefix: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    suffix: Schema.Attribute.String;
    termsAndConditions: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    validFrom: Schema.Attribute.DateTime & Schema.Attribute.Required;
    validUntil: Schema.Attribute.DateTime & Schema.Attribute.Required;
  };
}

export interface ApiDoorstepServiceDoorstepService
  extends Struct.CollectionTypeSchema {
  collectionName: 'doorstep_services';
  info: {
    description: "Services offered at customer's doorstep";
    displayName: 'Doorstep Service';
    pluralName: 'doorstep-services';
    singularName: 'doorstep-service';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    availability: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'8 AM - 8 PM'>;
    cancellationPolicy: Schema.Attribute.Text;
    category: Schema.Attribute.Relation<
      'manyToOne',
      'api::service-category.service-category'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    duration: Schema.Attribute.String & Schema.Attribute.Required;
    features: Schema.Attribute.JSON;
    image: Schema.Attribute.String;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    isEmergency: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::doorstep-service.doorstep-service'
    > &
      Schema.Attribute.Private;
    maxBookingsPerDay: Schema.Attribute.Integer &
      Schema.Attribute.DefaultTo<10>;
    minimumBookingTime: Schema.Attribute.Integer &
      Schema.Attribute.DefaultTo<60>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    originalPrice: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    prerequisites: Schema.Attribute.Text;
    price: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    rating: Schema.Attribute.Float &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    serviceCode: Schema.Attribute.String & Schema.Attribute.Unique;
    tags: Schema.Attribute.JSON;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiEnquiryEnquiry extends Struct.CollectionTypeSchema {
  collectionName: 'enquiries';
  info: {
    description: 'General service enquiries and requests';
    displayName: 'Enquiry';
    pluralName: 'enquiries';
    singularName: 'enquiry';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    assignedTo: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    carModel: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    followUpDate: Schema.Attribute.DateTime;
    followUpRequired: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::enquiry.enquiry'
    > &
      Schema.Attribute.Private;
    message: Schema.Attribute.Text & Schema.Attribute.Required;
    mobileNumber: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 15;
        minLength: 10;
      }>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    preferredDate: Schema.Attribute.Date & Schema.Attribute.Required;
    priority: Schema.Attribute.Enumeration<
      ['low', 'medium', 'high', 'urgent']
    > &
      Schema.Attribute.DefaultTo<'medium'>;
    publishedAt: Schema.Attribute.DateTime;
    responseNotes: Schema.Attribute.Text;
    serviceType: Schema.Attribute.Relation<
      'manyToOne',
      'api::service-type.service-type'
    >;
    status: Schema.Attribute.Enumeration<
      ['new', 'reviewed', 'contacted', 'resolved', 'closed']
    > &
      Schema.Attribute.DefaultTo<'new'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiExpressLeadExpressLead extends Struct.CollectionTypeSchema {
  collectionName: 'express_leads';
  info: {
    description: 'Express service leads and inquiries';
    displayName: 'Express Lead';
    pluralName: 'express-leads';
    singularName: 'express-lead';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    carBrand: Schema.Attribute.String;
    carModel: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    followUpDate: Schema.Attribute.DateTime;
    fuel_type: Schema.Attribute.Enumeration<
      ['petrol', 'diesel', 'cng', 'electric', 'hybrid']
    >;
    leadSource: Schema.Attribute.String & Schema.Attribute.DefaultTo<'website'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::express-lead.express-lead'
    > &
      Schema.Attribute.Private;
    locationSource: Schema.Attribute.Enumeration<
      ['geolocation', 'ip', 'manual', 'unknown']
    >;
    mobileNumber: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 15;
        minLength: 10;
      }>;
    name: Schema.Attribute.String;
    notes: Schema.Attribute.Text;
    preferredDate: Schema.Attribute.Date;
    publishedAt: Schema.Attribute.DateTime;
    serviceDate: Schema.Attribute.Date;
    servicePrice: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    serviceType: Schema.Attribute.String;
    status: Schema.Attribute.Enumeration<
      ['new', 'contacted', 'qualified', 'converted', 'lost']
    > &
      Schema.Attribute.DefaultTo<'new'>;
    timeSlot: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    userCity: Schema.Attribute.String;
    userCountry: Schema.Attribute.String & Schema.Attribute.DefaultTo<'India'>;
    userLatitude: Schema.Attribute.Float;
    userLongitude: Schema.Attribute.Float;
    userState: Schema.Attribute.String;
  };
}

export interface ApiExpressServiceExpressService
  extends Struct.CollectionTypeSchema {
  collectionName: 'express_services';
  info: {
    description: 'Express service bookings with vehicle and location details';
    displayName: 'Express Service';
    pluralName: 'express-services';
    singularName: 'express-service';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    carBrand: Schema.Attribute.String;
    carModel: Schema.Attribute.String;
    couponCode: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    finalPrice: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    fuel_type: Schema.Attribute.Enumeration<
      ['petrol', 'diesel', 'cng', 'electric', 'hybrid']
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::express-service.express-service'
    > &
      Schema.Attribute.Private;
    locationSource: Schema.Attribute.Enumeration<
      ['geolocation', 'ip', 'manual', 'unknown']
    >;
    mobileNumber: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 15;
        minLength: 10;
      }>;
    notes: Schema.Attribute.Text;
    publishedAt: Schema.Attribute.DateTime;
    serviceDate: Schema.Attribute.Date;
    servicePrice: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    serviceType: Schema.Attribute.String & Schema.Attribute.Required;
    status: Schema.Attribute.Enumeration<
      ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled']
    > &
      Schema.Attribute.DefaultTo<'pending'>;
    submissionTimestamp: Schema.Attribute.DateTime;
    timeSlot: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    userCity: Schema.Attribute.String;
    userCountry: Schema.Attribute.String & Schema.Attribute.DefaultTo<'India'>;
    userLatitude: Schema.Attribute.String;
    userLongitude: Schema.Attribute.String;
    userState: Schema.Attribute.String;
  };
}

export interface ApiNotificationNotification
  extends Struct.CollectionTypeSchema {
  collectionName: 'notifications';
  info: {
    description: 'User notifications and communication management';
    displayName: 'Notification';
    pluralName: 'notifications';
    singularName: 'notification';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    actionText: Schema.Attribute.String;
    actionUrl: Schema.Attribute.String;
    campaignId: Schema.Attribute.String;
    category: Schema.Attribute.Enumeration<
      [
        'order_update',
        'payment',
        'promotion',
        'reminder',
        'alert',
        'welcome',
        'feedback',
        'system',
        'marketing',
        'cart_abandonment',
      ]
    > &
      Schema.Attribute.Required;
    channel: Schema.Attribute.Enumeration<
      ['fcm', 'apns', 'sms_gateway', 'email_service', 'whatsapp_api']
    > &
      Schema.Attribute.DefaultTo<'fcm'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    data: Schema.Attribute.JSON;
    deliveredAt: Schema.Attribute.DateTime;
    deliveryAttempts: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    deviceTokens: Schema.Attribute.JSON;
    errorMessage: Schema.Attribute.Text;
    expiresAt: Schema.Attribute.DateTime;
    iconUrl: Schema.Attribute.String;
    imageUrl: Schema.Attribute.String;
    isPersonalized: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    isRead: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    language: Schema.Attribute.Enumeration<
      ['en', 'hi', 'mr', 'gu', 'ta', 'te', 'kn', 'ml']
    > &
      Schema.Attribute.DefaultTo<'en'>;
    lastAttemptAt: Schema.Attribute.DateTime;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::notification.notification'
    > &
      Schema.Attribute.Private;
    message: Schema.Attribute.Text & Schema.Attribute.Required;
    metadata: Schema.Attribute.JSON;
    priority: Schema.Attribute.Enumeration<
      ['low', 'medium', 'high', 'urgent']
    > &
      Schema.Attribute.DefaultTo<'medium'>;
    publishedAt: Schema.Attribute.DateTime;
    readAt: Schema.Attribute.DateTime;
    relatedEntity: Schema.Attribute.String;
    relatedEntityId: Schema.Attribute.String;
    scheduledFor: Schema.Attribute.DateTime;
    segmentId: Schema.Attribute.String;
    sentAt: Schema.Attribute.DateTime;
    source: Schema.Attribute.Enumeration<
      ['system', 'campaign', 'trigger', 'manual']
    > &
      Schema.Attribute.DefaultTo<'system'>;
    status: Schema.Attribute.Enumeration<
      ['pending', 'sent', 'delivered', 'read', 'failed', 'cancelled']
    > &
      Schema.Attribute.DefaultTo<'pending'>;
    template: Schema.Attribute.String;
    templateData: Schema.Attribute.JSON;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    trackingId: Schema.Attribute.String & Schema.Attribute.Unique;
    type: Schema.Attribute.Enumeration<
      ['push', 'sms', 'email', 'in_app', 'whatsapp']
    > &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiOrderOrder extends Struct.CollectionTypeSchema {
  collectionName: 'orders';
  info: {
    description: 'Customer orders and bookings';
    displayName: 'Order';
    pluralName: 'orders';
    singularName: 'order';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    actualEndTime: Schema.Attribute.DateTime;
    actualStartTime: Schema.Attribute.DateTime;
    addressDetails: Schema.Attribute.JSON;
    assignedTechnician: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    cancellationReason: Schema.Attribute.Text;
    car: Schema.Attribute.Relation<'manyToOne', 'api::car.car'>;
    carDetails: Schema.Attribute.JSON;
    couponCode: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customerEmail: Schema.Attribute.Email;
    customerName: Schema.Attribute.String & Schema.Attribute.Required;
    customerNotes: Schema.Attribute.Text;
    customerPhone: Schema.Attribute.String & Schema.Attribute.Required;
    discountAmount: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    estimatedDuration: Schema.Attribute.Integer;
    feedback: Schema.Attribute.Text;
    finalAmount: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::order.order'> &
      Schema.Attribute.Private;
    notes: Schema.Attribute.Text;
    orderNumber: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    orderType: Schema.Attribute.Enumeration<
      ['express', 'regular', 'doorstep', 'workshop']
    > &
      Schema.Attribute.DefaultTo<'regular'>;
    paymentId: Schema.Attribute.String;
    paymentMethod: Schema.Attribute.Enumeration<
      ['online', 'cash', 'card', 'upi']
    >;
    paymentStatus: Schema.Attribute.Enumeration<
      ['pending', 'paid', 'failed', 'refunded', 'partial']
    > &
      Schema.Attribute.DefaultTo<'pending'>;
    publishedAt: Schema.Attribute.DateTime;
    rating: Schema.Attribute.Float &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 0;
        },
        number
      >;
    refundAmount: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    serviceAddress: Schema.Attribute.Relation<
      'manyToOne',
      'api::address.address'
    >;
    serviceDate: Schema.Attribute.Date & Schema.Attribute.Required;
    services: Schema.Attribute.JSON & Schema.Attribute.Required;
    status: Schema.Attribute.Enumeration<
      ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled']
    > &
      Schema.Attribute.DefaultTo<'pending'>;
    timeSlot: Schema.Attribute.String & Schema.Attribute.Required;
    totalAmount: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiPaymentMethodPaymentMethod
  extends Struct.CollectionTypeSchema {
  collectionName: 'payment_methods';
  info: {
    description: 'User saved payment methods and preferences';
    displayName: 'Payment Method';
    pluralName: 'payment-methods';
    singularName: 'payment-method';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    addedAt: Schema.Attribute.DateTime;
    bankName: Schema.Attribute.String;
    billingAddress: Schema.Attribute.JSON;
    cardType: Schema.Attribute.Enumeration<
      ['visa', 'mastercard', 'amex', 'rupay', 'maestro']
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    displayName: Schema.Attribute.String & Schema.Attribute.Required;
    expiryMonth: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 12;
          min: 1;
        },
        number
      >;
    expiryYear: Schema.Attribute.Integer;
    failureCount: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    gateway: Schema.Attribute.String;
    gatewayCustomerId: Schema.Attribute.String;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    isDefault: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isVerified: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    lastFourDigits: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 4;
      }>;
    lastUsedAt: Schema.Attribute.DateTime;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::payment-method.payment-method'
    > &
      Schema.Attribute.Private;
    maskedNumber: Schema.Attribute.String;
    metadata: Schema.Attribute.JSON;
    nickName: Schema.Attribute.String;
    provider: Schema.Attribute.Enumeration<
      ['razorpay', 'payu', 'phonepe', 'gpay', 'paytm', 'amazon_pay', 'stripe']
    > &
      Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    tokenId: Schema.Attribute.String & Schema.Attribute.Private;
    type: Schema.Attribute.Enumeration<
      ['credit_card', 'debit_card', 'upi', 'net_banking', 'wallet', 'cod']
    > &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    upiId: Schema.Attribute.String;
    usageCount: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiReviewReview extends Struct.CollectionTypeSchema {
  collectionName: 'reviews';
  info: {
    description: 'Customer reviews and feedback';
    displayName: 'Review';
    pluralName: 'reviews';
    singularName: 'review';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    comment: Schema.Attribute.Text & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customerInitial: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 3;
      }>;
    customerName: Schema.Attribute.String & Schema.Attribute.Required;
    date: Schema.Attribute.Date & Schema.Attribute.Required;
    helpfulCount: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    images: Schema.Attribute.JSON;
    isApproved: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isPublic: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    isVerified: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::review.review'
    > &
      Schema.Attribute.Private;
    location: Schema.Attribute.String;
    order: Schema.Attribute.Relation<'oneToOne', 'api::order.order'>;
    publishedAt: Schema.Attribute.DateTime;
    rating: Schema.Attribute.Float &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      >;
    responseFromCompany: Schema.Attribute.Text;
    service: Schema.Attribute.String & Schema.Attribute.Required;
    serviceType: Schema.Attribute.Enumeration<
      [
        'express',
        'periodic',
        'denting',
        'ac',
        'battery',
        'windshield',
        'detailing',
        'tyre',
        'carspa',
        'doorstep',
      ]
    >;
    source: Schema.Attribute.Enumeration<
      ['website', 'app', 'google', 'facebook', 'manual']
    > &
      Schema.Attribute.DefaultTo<'website'>;
    tags: Schema.Attribute.JSON;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiServiceCategoryServiceCategory
  extends Struct.CollectionTypeSchema {
  collectionName: 'service_categories';
  info: {
    description: 'Categories for doorstep services';
    displayName: 'Service Category';
    pluralName: 'service-categories';
    singularName: 'service-category';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    availability: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'8 AM - 8 PM'>;
    categoryCode: Schema.Attribute.String & Schema.Attribute.Unique;
    color: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    displayOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    icon: Schema.Attribute.String;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    isEmergencyCategory: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::service-category.service-category'
    > &
      Schema.Attribute.Private;
    minimumResponseTime: Schema.Attribute.Integer &
      Schema.Attribute.DefaultTo<60>;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    serviceArea: Schema.Attribute.JSON;
    services: Schema.Attribute.Relation<
      'oneToMany',
      'api::doorstep-service.doorstep-service'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiServiceTypeServiceType extends Struct.CollectionTypeSchema {
  collectionName: 'service_types';
  info: {
    description: 'Different types of services offered';
    displayName: 'Service Type';
    pluralName: 'service-types';
    singularName: 'service-type';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    displayOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    icon: Schema.Attribute.String;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    isDefault: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::service-type.service-type'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiUserActivityUserActivity
  extends Struct.CollectionTypeSchema {
  collectionName: 'user_activities';
  info: {
    description: 'Comprehensive user journey and activity tracking for business intelligence';
    displayName: 'User Activity';
    pluralName: 'user-activities';
    singularName: 'user-activity';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    activityType: Schema.Attribute.Enumeration<
      [
        'page_visit',
        'service_browse',
        'cart_action',
        'search',
        'filter_apply',
        'price_check',
        'booking_attempt',
        'payment_attempt',
        'order_placed',
        'review_given',
        'profile_update',
        'app_open',
        'app_close',
        'feature_used',
        'error_encountered',
      ]
    > &
      Schema.Attribute.Required;
    bounceRate: Schema.Attribute.Float;
    businessValue: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    campaign: Schema.Attribute.String;
    cartItems: Schema.Attribute.Integer;
    cartValue: Schema.Attribute.Decimal;
    clickCount: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    cohort: Schema.Attribute.String;
    conversionType: Schema.Attribute.String;
    conversionValue: Schema.Attribute.Decimal;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customerLifecycleStage: Schema.Attribute.Enumeration<
      [
        'visitor',
        'lead',
        'customer',
        'repeat_customer',
        'loyal_customer',
        'churned',
      ]
    > &
      Schema.Attribute.DefaultTo<'visitor'>;
    device: Schema.Attribute.JSON;
    duration: Schema.Attribute.Integer;
    engagementScore: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    errorCode: Schema.Attribute.String;
    errorMessage: Schema.Attribute.Text;
    exitPoint: Schema.Attribute.String;
    experimentId: Schema.Attribute.String;
    filtersApplied: Schema.Attribute.JSON;
    funnelPosition: Schema.Attribute.String;
    ipAddress: Schema.Attribute.String;
    isConverted: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::user-activity.user-activity'
    > &
      Schema.Attribute.Private;
    location: Schema.Attribute.JSON;
    medium: Schema.Attribute.String;
    metadata: Schema.Attribute.JSON;
    nextPage: Schema.Attribute.String;
    page: Schema.Attribute.String;
    previousPage: Schema.Attribute.String;
    priority: Schema.Attribute.Enumeration<
      ['low', 'medium', 'high', 'critical']
    > &
      Schema.Attribute.DefaultTo<'low'>;
    publishedAt: Schema.Attribute.DateTime;
    referrer: Schema.Attribute.String;
    scrollDepth: Schema.Attribute.Float;
    searchQuery: Schema.Attribute.String;
    searchResults: Schema.Attribute.Integer;
    serviceId: Schema.Attribute.String;
    serviceType: Schema.Attribute.String;
    sessionId: Schema.Attribute.String & Schema.Attribute.Required;
    source: Schema.Attribute.Enumeration<
      ['website', 'android_app', 'ios_app']
    > &
      Schema.Attribute.DefaultTo<'website'>;
    timeOnPage: Schema.Attribute.Integer;
    timestamp: Schema.Attribute.DateTime & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    userAgent: Schema.Attribute.Text;
    variationId: Schema.Attribute.String;
  };
}

export interface ApiUserSessionUserSession extends Struct.CollectionTypeSchema {
  collectionName: 'user_sessions';
  info: {
    description: 'User authentication sessions and OTP management';
    displayName: 'User Session';
    pluralName: 'user-sessions';
    singularName: 'user-session';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    appVersion: Schema.Attribute.String;
    blockedUntil: Schema.Attribute.DateTime;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deviceFingerprint: Schema.Attribute.String;
    deviceId: Schema.Attribute.String;
    deviceInfo: Schema.Attribute.JSON;
    expiresAt: Schema.Attribute.DateTime;
    failedLoginAttempts: Schema.Attribute.Integer &
      Schema.Attribute.DefaultTo<0>;
    fcmToken: Schema.Attribute.String;
    ipAddress: Schema.Attribute.String;
    isBlocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isNewUser: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isOtpVerified: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    lastActivityAt: Schema.Attribute.DateTime;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::user-session.user-session'
    > &
      Schema.Attribute.Private;
    location: Schema.Attribute.JSON;
    loginAt: Schema.Attribute.DateTime;
    loginMethod: Schema.Attribute.Enumeration<
      ['mobile_otp', 'social_google', 'social_facebook', 'email_password']
    > &
      Schema.Attribute.DefaultTo<'mobile_otp'>;
    logoutAt: Schema.Attribute.DateTime;
    mobileNumber: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 15;
        minLength: 10;
      }>;
    otpAttempts: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    otpCode: Schema.Attribute.String & Schema.Attribute.Private;
    otpExpiresAt: Schema.Attribute.DateTime;
    otpVerifiedAt: Schema.Attribute.DateTime;
    platform: Schema.Attribute.Enumeration<
      ['web', 'android', 'ios', 'unknown']
    > &
      Schema.Attribute.DefaultTo<'web'>;
    publishedAt: Schema.Attribute.DateTime;
    refreshToken: Schema.Attribute.String & Schema.Attribute.Private;
    refreshTokenExpiresAt: Schema.Attribute.DateTime;
    riskScore: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    securityFlags: Schema.Attribute.JSON;
    sessionData: Schema.Attribute.JSON;
    sessionId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    sessionStatus: Schema.Attribute.Enumeration<
      ['pending_otp', 'active', 'expired', 'logged_out', 'blocked']
    > &
      Schema.Attribute.DefaultTo<'pending_otp'>;
    suspiciousActivity: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    userAgent: Schema.Attribute.Text;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Schema.Attribute.Required;
    timezone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    entryDocumentId: Schema.Attribute.String;
    isEntryValid: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    description: '';
    displayName: 'Workflow';
    name: 'Workflow';
    pluralName: 'workflows';
    singularName: 'workflow';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    stageRequiredToPublish: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::review-workflows.workflow-stage'
    >;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    description: '';
    displayName: 'Stages';
    name: 'Workflow Stage';
    pluralName: 'workflow-stages';
    singularName: 'workflow-stage';
  };
  options: {
    draftAndPublish: false;
    version: '1.1.0';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
  };
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ext: Schema.Attribute.String;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    height: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
      Schema.Attribute.Private;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.String;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    related: Schema.Attribute.Relation<'morphToMany'>;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.role'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_users';
  info: {
    description: 'Enhanced user profile for comprehensive data capture';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    accountType: Schema.Attribute.Enumeration<
      ['individual', 'business', 'fleet']
    > &
      Schema.Attribute.DefaultTo<'individual'>;
    addresses: Schema.Attribute.Relation<'oneToMany', 'api::address.address'>;
    averageOrderValue: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    cars: Schema.Attribute.Relation<'oneToMany', 'api::car.car'>;
    carts: Schema.Attribute.Relation<'oneToMany', 'api::cart.cart'>;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customerSegment: Schema.Attribute.Enumeration<
      ['new', 'regular', 'premium', 'vip', 'inactive']
    > &
      Schema.Attribute.DefaultTo<'new'>;
    dateOfBirth: Schema.Attribute.Date;
    deviceInfo: Schema.Attribute.JSON;
    email: Schema.Attribute.Email &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    emailConsent: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    firstName: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    gender: Schema.Attribute.Enumeration<
      ['male', 'female', 'other', 'prefer_not_to_say']
    >;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    isEmailVerified: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    isMobileVerified: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    lastActiveAt: Schema.Attribute.DateTime;
    lastLoginAt: Schema.Attribute.DateTime;
    lastName: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    > &
      Schema.Attribute.Private;
    loyaltyPoints: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    marketingConsent: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    mobileNumber: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 15;
        minLength: 10;
      }>;
    notifications: Schema.Attribute.Relation<
      'oneToMany',
      'api::notification.notification'
    >;
    orders: Schema.Attribute.Relation<'oneToMany', 'api::order.order'>;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    paymentMethods: Schema.Attribute.Relation<
      'oneToMany',
      'api::payment-method.payment-method'
    >;
    preferences: Schema.Attribute.JSON;
    preferredCurrency: Schema.Attribute.Enumeration<['INR', 'USD']> &
      Schema.Attribute.DefaultTo<'INR'>;
    preferredLanguage: Schema.Attribute.Enumeration<
      ['en', 'hi', 'mr', 'gu', 'ta', 'te', 'kn', 'ml']
    > &
      Schema.Attribute.DefaultTo<'en'>;
    profilePicture: Schema.Attribute.Media<'images'>;
    provider: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    pushNotificationConsent: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    referralCode: Schema.Attribute.String & Schema.Attribute.Unique;
    referredBy: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    registrationSource: Schema.Attribute.Enumeration<
      ['website', 'android_app', 'ios_app', 'referral', 'social']
    > &
      Schema.Attribute.DefaultTo<'website'>;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    reviews: Schema.Attribute.Relation<'oneToMany', 'api::review.review'>;
    riskScore: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    smsConsent: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    timeZone: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Asia/Kolkata'>;
    totalOrders: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    totalReferrals: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    totalSpent: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ContentTypeSchemas {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::address.address': ApiAddressAddress;
      'api::analytics-event.analytics-event': ApiAnalyticsEventAnalyticsEvent;
      'api::car.car': ApiCarCar;
      'api::cart.cart': ApiCartCart;
      'api::city.city': ApiCityCity;
      'api::contact.contact': ApiContactContact;
      'api::coupon.coupon': ApiCouponCoupon;
      'api::doorstep-service.doorstep-service': ApiDoorstepServiceDoorstepService;
      'api::enquiry.enquiry': ApiEnquiryEnquiry;
      'api::express-lead.express-lead': ApiExpressLeadExpressLead;
      'api::express-service.express-service': ApiExpressServiceExpressService;
      'api::notification.notification': ApiNotificationNotification;
      'api::order.order': ApiOrderOrder;
      'api::payment-method.payment-method': ApiPaymentMethodPaymentMethod;
      'api::review.review': ApiReviewReview;
      'api::service-category.service-category': ApiServiceCategoryServiceCategory;
      'api::service-type.service-type': ApiServiceTypeServiceType;
      'api::user-activity.user-activity': ApiUserActivityUserActivity;
      'api::user-session.user-session': ApiUserSessionUserSession;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
