import { productValidationSchema } from '../../../domain/product/product/product-validation-schema';
import { shippingMethodValidationSchema } from '../../../domain/shipping-method/shipping-method/shipping-method-validation-schema';
import { storeValidationSchema } from '../../../domain/store/store/store-validation-schema';
import { orderValidationSchema } from '../../../domain/order/order/order-schema';
import { orderNoteValidationSchema } from '../../../domain/order-note/order-note/order-note-validation-schema';
import { paymentMethodValidationSchema } from '../../../domain/payment-method/payment-method/payment-method-validation-schema';

import { expositionProductsSchema } from '../exposition/exposition-products/exposition-products-schema';
import { expositionShippingMethodsSchema } from '../exposition/exposition-shipping-methods/exposition-shipping-methods-schema';
import { expositionPaymentMethodsSchema } from '../exposition/exposition-payment-methods/exposition-payment-methods-schema';

import { managementOrdersSchema } from '../management/management-orders/management-orders-schema';
import { managementOrdersNotesSchema } from '../management/management-orders-notes/management-orders-notes-schema';
import { managementProductsSchema } from '../management/management-products/management-products-schema';
import { managementShippingMethodsSchema } from '../management/management-shipping-methods/management-shipping-methods-schema';
import { managementStoresSchema } from '../management/management-stores/management-stores-schema';
import { managementPaymentMethodsSchema } from '../management/management-payment-methods/management-payment-methods-schema';

import { notFoundError } from '../../../helpers/errors/not-found-error-schema';

import { securitySchemes } from './security';

const components = {
  schemas: {
    Order: orderValidationSchema,
    OrderNote: orderNoteValidationSchema,
    PaymentMethod: paymentMethodValidationSchema,
    Product: productValidationSchema,
    ShippingMethod: shippingMethodValidationSchema,
    Store: storeValidationSchema,
    NotFoundError: notFoundError
  },
  securitySchemes
};

const paths = {
  ...expositionProductsSchema,
  ...expositionShippingMethodsSchema,
  ...expositionPaymentMethodsSchema,

  ...managementOrdersSchema,
  ...managementOrdersNotesSchema,
  ...managementPaymentMethodsSchema,
  ...managementProductsSchema,
  ...managementShippingMethodsSchema,
  ...managementStoresSchema
};

export const schema = {
  openapi: '3.0.3',
  info: {
    title: 'Cartlify API',
    description: 'Lorem ipsum',
    termsOfService: 'https://cartlify.com',
    contact: {
      name: 'Cartlify Support',
      url: 'https://cartlify.com',
      email: 'support@cartlify.com'
    },
    license: {
      name: 'License name',
      url: 'https://cartlify.com'
    },
    version: '0.1.0'
  },

  tags: [
    {
      name: 'orders',
      description: 'Orders tag description'
    },
    {
      name: 'orders notes',
      description: 'Orders notes tag description'
    },
    {
      name: 'payment-methods',
      description: 'Payment methods tag description'
    },
    {
      name: 'products',
      description: 'Products tag description'
    },
    {
      name: 'shipping methods',
      description: 'Shipping methods tag description'
    },
    {
      name: 'stores',
      description: 'Stores tag description'
    }
  ],

  components,

  paths
};
