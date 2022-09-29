export const storeValidationSchema = {
  type: 'object',
  required: ['createdAt', 'id', 'name', 'published', 'updatedAt'],
  properties: {
    createdAt: {
      type: 'object',
      format: 'date-time'
    },

    id: {
      type: 'string',
      format: 'uuid'
    },

    name: {
      type: 'string'
    },

    published: {
      type: 'boolean'
    },

    updatedAt: {
      type: 'object',
      format: 'date-time'
    }
  }
};
