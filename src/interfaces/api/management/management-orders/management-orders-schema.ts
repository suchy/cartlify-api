import {
  QueryFieldsParamFactory,
  PathIdParamFactory,
  QueryFiltersParamFactory,
  QuerySortParamsFactory,
  ItemRensponseFactory,
  ArrayResponseFactory,
  RequestBodyFactory,
  STORE_ID_PARAM,
  FILTER_PARAM_STRING_SCHEMA,
  FILTER_PARAM_NUMBER_SCHEMA,
  FILTER_PARAM_DATE_SCHEMA,
  SECURITY_SCHEMA
} from '../../../../helpers/schema';

import { STATUS_OK, STATUS_NOT_FOUND } from '../../../../constants';

import { orderValidationSchema } from '../../../../domain/order/order/order-schema';

import {
  orderNotFoundErrorExample,
  shippingMethodNotFoundErrorExample,
  storeNotFoundErrorExample
} from '../../../../helpers/errors/not-found-error-schema-examples';

const fields = Object.keys(orderValidationSchema.properties);

const orderIdParam = PathIdParamFactory('orderId');

const fieldsParam = QueryFieldsParamFactory(fields);

const sortParams = QuerySortParamsFactory(fields);

const statuses = orderValidationSchema.properties.status.enum;

const filtersParams = QueryFiltersParamFactory([
  {
    name: 'createdAt',
    description: 'createdAt filter',
    schema: FILTER_PARAM_DATE_SCHEMA
  },
  {
    name: 'id',
    description: 'id filter',
    schema: FILTER_PARAM_STRING_SCHEMA
  },
  {
    name: 'productsValue',
    description: 'productsValue filter',
    schema: FILTER_PARAM_NUMBER_SCHEMA
  },
  {
    name: 'status',
    description: 'status filter',
    schema: {
      oneOf: [
        {
          type: 'string',
          enum: statuses
        },
        {
          type: 'object',
          properties: {
            in: {
              type: 'array',
              items: {
                type: 'string',
                enum: statuses
              }
            }
          }
        }
      ]
    }
  },
  {
    name: 'totalValue',
    description: 'totalValue filter',
    schema: FILTER_PARAM_NUMBER_SCHEMA
  },
  {
    name: 'updatedAt',
    description: 'createdAt filter',
    schema: FILTER_PARAM_DATE_SCHEMA
  }
]);

const path = '/management/stores/{storeId}/orders';

const tags = ['orders'];

export const managementOrdersSchema = {
  [path]: {
    get: {
      tags,
      description: 'This should return all store orders',
      operationId: 'get-orders',
      parameters: [
        STORE_ID_PARAM,
        fieldsParam,
        ...sortParams,
        ...filtersParams
      ],
      responses: {
        [STATUS_OK]: ArrayResponseFactory('Order', 'OK'),
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Store was not found',
          { storeNotFoundErrorExample }
        )
      },
      security: SECURITY_SCHEMA
    }
  },

  [path + '/{orderId}']: {
    get: {
      tags,
      description: 'This should return order',
      operationId: 'get-order',
      parameters: [STORE_ID_PARAM, orderIdParam, fieldsParam],
      responses: {
        [STATUS_OK]: ItemRensponseFactory('Order', 'OK'),
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Order or store was not found',
          { orderNotFoundErrorExample, storeNotFoundErrorExample }
        )
      },
      security: SECURITY_SCHEMA
    }
  },

  [path + '/{orderId}/status']: {
    patch: {
      tags,
      description: 'Change order status',
      operationId: 'change-order-status',
      parameters: [STORE_ID_PARAM, orderIdParam],
      requestBody: RequestBodyFactory(
        {
          type: 'object',
          properties: { status: orderValidationSchema.properties.status }
        },
        ''
      ),
      responses: {
        [STATUS_OK]: ItemRensponseFactory('Order', 'Order status changed'),
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Order or store was not found',
          { orderNotFoundErrorExample, storeNotFoundErrorExample }
        )
      },
      security: SECURITY_SCHEMA
    }
  },

  [path + '/{orderId}/shipping-method']: {
    patch: {
      tags,
      description: 'Change order shipping method',
      operationId: 'change-order-shipping-method',
      parameters: [STORE_ID_PARAM, orderIdParam],
      requestBody: RequestBodyFactory(
        {
          type: 'object',
          properties: {
            shippingMethod: orderValidationSchema.properties.shippingMethod
          }
        },
        ''
      ),
      responses: {
        [STATUS_OK]: ItemRensponseFactory(
          'Order',
          'Order shipping method changed'
        ),
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Order, shipping method or store was not found',
          {
            orderNotFoundErrorExample,
            shippingMethodNotFoundErrorExample,
            storeNotFoundErrorExample
          }
        )
      },
      security: SECURITY_SCHEMA
    }
  }
};
