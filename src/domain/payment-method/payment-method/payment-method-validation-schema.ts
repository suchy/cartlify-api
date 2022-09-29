export const payuSettingsSchema = {
  type: 'object',
  properties: {
    clientId: { type: 'string' },
    clientSecret: { type: 'string' },
    posId: { type: 'string' },
    md5: { type: 'string' },
    continueUrl: { type: 'string', format: 'uri' }
  },
  required: ['clientId', 'clientSecret', 'posId', 'md5', 'continueUrl'],
  additionalProperties: false
};

export const paymentMethodValidationSchema = {
  type: 'object',
  required: [
    'createdAt',
    'id',
    'provider',
    'providerSettings',
    'published',
    'storeId',
    'updatedAt'
  ],
  properties: {
    createdAt: {
      type: 'object',
      format: 'date-time'
    },

    id: {
      type: 'string',
      format: 'uuid'
    },

    provider: {
      type: 'string',
      enum: ['payu']
    },

    providerSettings: {
      type: 'object',
      oneOf: [
        {
          properties: payuSettingsSchema.properties,
          required: payuSettingsSchema.required
        }
      ]
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
