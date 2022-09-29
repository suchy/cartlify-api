export const clientValidationSchema = {
  type: 'object',
  required: [
    'createdAt',
    'firstParty',
    'id',
    'multiStore',
    'name',
    'scopes',
    'storeId',
    'targetApi',
    'type',
    'updatedAt'
  ],
  properties: {
    createdAt: {
      type: 'object',
      format: 'date-time'
    },

    firstParty: {
      type: 'boolean'
    },

    id: {
      type: 'string',
      format: 'uuid'
    },

    multiStore: {
      type: 'boolean'
    },

    name: {
      type: 'string'
    },

    scopes: {},

    storeId: {
      type: 'string', // or undefined
      format: 'uuid'
    },

    targetApi: {
      type: 'string',
      enum: ['exposition', 'management']
    },

    type: {
      type: 'string',
      enum: ['spa', 'machine']
    },

    updatedAt: {
      type: 'object',
      format: 'date-time'
    }
  }
};
