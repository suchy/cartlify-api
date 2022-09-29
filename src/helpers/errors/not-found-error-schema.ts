import { STATUS_NOT_FOUND } from '../../constants';

export const notFoundError = {
  type: 'object',
  required: ['name', 'message', 'statusCode', 'statusText', 'details'],
  properties: {
    name: {
      type: 'string',
      enum: ['NotFound'],
      default: 'NotFound'
    },

    message: {
      type: 'string',
      default: 'Path not found'
    },

    statusCode: {
      type: 'number',
      enum: [STATUS_NOT_FOUND],
      default: STATUS_NOT_FOUND
    },

    statusText: {
      type: 'string',
      enum: ['not-found'],
      default: 'not-found'
    },

    details: {
      type: 'object'
    }
  }
};
