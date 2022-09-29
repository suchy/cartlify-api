export const orderValidationSchema = {
  type: 'object',
  properties: {
    client: {
      type: 'object',
      properties: {
        address: {
          type: 'string'
        },
        city: {
          type: 'string'
        },
        country: {
          type: 'string'
        },
        name: {
          type: 'string'
        },
        postal: {
          type: 'string'
        },
        phone: {
          type: 'string'
        },
        email: {
          type: 'string',
          format: 'email'
        }
      }
    },

    comment: {
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

    paymentMethodVendor: {
      type: 'string',
      enum: ['payu']
    },

    products: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid'
          },

          name: {
            type: 'string'
          },

          description: {
            type: 'string'
          },

          price: {
            type: 'number',
            minimum: 0
          },

          quantity: {
            type: 'number',
            minimum: 1
          },

          value: {
            type: 'number',
            minimum: 0
          }
        }
      }
    },

    productsValue: {
      type: 'number',
      minimum: 0
    },

    shippingMethod: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          format: 'uuid'
        },
        name: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        price: {
          type: 'number',
          minimum: 0
        }
      }
    },

    status: {
      type: 'string',
      enum: ['PAYMENT_PENDING', 'NEW', 'IN_PROGRESS', 'SHIPPED']
    },

    storeId: {
      type: 'string',
      format: 'uuid'
    },

    totalValue: {
      type: 'number',
      minimum: 0
    },

    updatedAt: {
      type: 'string',
      format: 'date-time'
    }
  }
};
