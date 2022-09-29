import {
  QueryFieldsParamFactory,
  QueryFiltersParamFactory,
  QuerySortParamsFactory,
  PathIdParamFactory,
  ItemRensponseFactory,
  ArrayResponseFactory,
  RequestBodyFactory,
  STORE_ID_PARAM,
  FILTER_PARAM_STRING_SCHEMA,
  // FILTER_PARAM_NUMBER_SCHEMA,
  FILTER_PARAM_DATE_SCHEMA,
  SECURITY_SCHEMA
} from '../../../../helpers/schema';

import {
  STATUS_OK,
  STATUS_CREATED,
  STATUS_NOT_FOUND,
  STATUS_NO_CONTENT
} from '../../../../constants';

import { orderNoteValidationSchema } from '../../../../domain/order-note/order-note/order-note-validation-schema';

import {
  orderNoteNotFoundErrorExample,
  orderNotFoundErrorExample,
  storeNotFoundErrorExample
} from '../../../../helpers/errors/not-found-error-schema-examples';

const fields = Object.keys(orderNoteValidationSchema.properties);

const orderIdParam = PathIdParamFactory('orderId');

const orderNoteIdParam = PathIdParamFactory('orderNoteId');

const fieldsParam = QueryFieldsParamFactory(fields);

const sortParams = QuerySortParamsFactory(fields);

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
    name: 'updatedAt',
    description: 'updatedAt filter',
    schema: FILTER_PARAM_DATE_SCHEMA
  }
]);

const path = '/management/stores/{storeId}/orders/{orderId}/notes';

const tags = ['orders notes'];

export const managementOrdersNotesSchema = {
  [path]: {
    post: {
      tags,
      description: 'Create order note',
      operationId: 'create-order-note',
      parameters: [STORE_ID_PARAM, orderIdParam],
      requestBody: RequestBodyFactory(orderNoteValidationSchema, ''),
      responses: {
        [STATUS_CREATED]: ItemRensponseFactory(
          'OrderNote',
          'Order note created'
        ),
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Order or store was not found',
          { orderNotFoundErrorExample, storeNotFoundErrorExample }
        )
      },
      security: SECURITY_SCHEMA
    },

    get: {
      tags,
      description: 'This should return order notes',
      operationId: 'get-order-notes',
      parameters: [
        STORE_ID_PARAM,
        orderIdParam,
        fieldsParam,
        ...sortParams,
        ...filtersParams
      ],
      responses: {
        [STATUS_OK]: ArrayResponseFactory('OrderNote', 'OK'),
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Order or store was not found',
          { orderNotFoundErrorExample, storeNotFoundErrorExample }
        )
      },
      security: SECURITY_SCHEMA
    }
  },

  [path + '/{orderNoteId}']: {
    get: {
      tags,
      description: 'This should return order note',
      operationId: 'get-order-note',
      parameters: [STORE_ID_PARAM, orderIdParam, orderNoteIdParam, fieldsParam],
      responses: {
        [STATUS_OK]: ItemRensponseFactory('OrderNote', 'OK'),
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Order note, order or store was not found',
          {
            orderNoteNotFoundErrorExample,
            orderNotFoundErrorExample,
            storeNotFoundErrorExample
          }
        )
      },
      security: SECURITY_SCHEMA
    },

    delete: {
      tags,
      description: 'Delete order note',
      operationId: 'delete-order-note',
      parameters: [STORE_ID_PARAM, orderIdParam, orderNoteIdParam],
      responses: {
        [STATUS_NO_CONTENT]: { description: 'Order note  deleted' },
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Order note, order or store was not found',
          {
            orderNoteNotFoundErrorExample,
            orderNotFoundErrorExample,
            storeNotFoundErrorExample
          }
        )
      },
      security: SECURITY_SCHEMA
    }
  },

  [path + '/{orderNoteId}/content']: {
    patch: {
      tags,
      description: 'This should update order note content',
      operationId: 'update-order-note-content',
      parameters: [STORE_ID_PARAM, orderIdParam, orderNoteIdParam],
      requestBody: RequestBodyFactory(orderNoteValidationSchema, ''),
      responses: {
        [STATUS_OK]: ItemRensponseFactory(
          'OrderNote',
          'Order note ccontent updated'
        ),
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Order note, order or store was not found',
          {
            orderNoteNotFoundErrorExample,
            orderNotFoundErrorExample,
            storeNotFoundErrorExample
          }
        )
      },
      security: SECURITY_SCHEMA
    }
  }
};
