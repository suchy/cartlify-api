export const orderNoteValidationSchema = {
  type: 'object',
  properties: {
    content: {
      type: 'string'
    },

    createdAt: {
      type: 'string',
      format: 'date-time'
    },

    id: {
      type: 'string',
      format: 'uuid'
    },

    orderId: {
      type: 'string',
      format: 'uuid'
    },

    storeId: {
      type: 'string',
      format: 'uuid'
    },

    updatedAt: {
      type: 'string',
      format: 'date-time'
    }
  }
};
