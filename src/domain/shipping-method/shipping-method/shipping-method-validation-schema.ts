export const shippingMethodValidationSchema = {
  type: 'object',
  required: [
    'createdAt',
    'description',
    'id',
    'name',
    'price',
    'published',
    'storeId',
    'updatedAt'
  ],
  properties: {
    createdAt: {
      type: 'object',
      format: 'date-time'
    },

    description: {
      type: 'string'
    },

    id: {
      type: 'string',
      format: 'uuid'
    },

    name: {
      type: 'string'
    },

    price: {
      type: 'number',
      minimum: 0
    },

    published: {
      type: 'boolean'
    },

    storeId: {
      type: 'string',
      format: 'uuid'
    },

    updatedAt: {
      type: 'object',
      format: 'date-time'
    }
  }
};
