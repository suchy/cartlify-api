import {
  ArrayResponseFactory,
  ItemRensponseFactory,
  QueryFieldsParamFactory,
  QueryFiltersParamFactory,
  QuerySortParamsFactory,
  RequestBodyFactory,
  STORE_ID_PARAM,
  FILTER_PARAM_STRING_SCHEMA,
  // FILTER_PARAM_NUMBER_SCHEMA,
  FILTER_PARAM_DATE_SCHEMA,
  FILTER_PARAM_BOOL_SCHEMA,
  SECURITY_SCHEMA
} from '../../../../helpers/schema';

import {
  STATUS_OK,
  STATUS_CREATED,
  STATUS_NOT_FOUND
} from '../../../../constants';

import { storeValidationSchema } from '../../../../domain/store/store/store-validation-schema';
import { storeNotFoundErrorExample } from '../../../../helpers/errors/not-found-error-schema-examples';

const fields = Object.keys(storeValidationSchema.properties);

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
    name: 'name',
    description: 'name filter',
    schema: FILTER_PARAM_STRING_SCHEMA
  },
  {
    name: 'published',
    description: 'published filter',
    schema: FILTER_PARAM_BOOL_SCHEMA
  },
  {
    name: 'updatedAt',
    description: 'updatedAt filter',
    schema: FILTER_PARAM_DATE_SCHEMA
  }
]);

const path = '/management/stores';

const tags = ['stores'];

export const managementStoresSchema = {
  [path]: {
    post: {
      tags,
      description: 'Create a store',
      operationId: 'create-store',
      requestBody: RequestBodyFactory(storeValidationSchema, ''),
      responses: {
        [STATUS_CREATED]: ItemRensponseFactory('Store', 'Store created')
      },
      security: SECURITY_SCHEMA
    },

    get: {
      tags,
      description: 'This should return user stores',
      operationId: 'get-stores',
      parameters: [fieldsParam, ...sortParams, ...filtersParams],
      responses: {
        [STATUS_OK]: ArrayResponseFactory('Store', 'OK')
      },
      security: SECURITY_SCHEMA
    }
  },

  [path + '/{storeId}']: {
    get: {
      tags,
      description: 'This should return store',
      operationId: 'get-store',
      parameters: [STORE_ID_PARAM, fieldsParam],
      responses: {
        [STATUS_OK]: ItemRensponseFactory('Store', 'OK'),
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Store not found',
          { storeNotFoundErrorExample }
        )
      },
      security: SECURITY_SCHEMA
    },

    patch: {
      tags,
      description: 'Update store details',
      operationId: 'update-store',
      parameters: [STORE_ID_PARAM],
      requestBody: RequestBodyFactory(storeValidationSchema, ''),
      responses: {
        [STATUS_OK]: ItemRensponseFactory('Store', 'Store updated'),
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Store not found',
          { storeNotFoundErrorExample }
        )
      },
      security: SECURITY_SCHEMA
    }
  },

  [path + '/{storeId}/publish']: {
    patch: {
      tags,
      description: 'Publish store',
      operationId: 'publish-store',
      parameters: [STORE_ID_PARAM],
      responses: {
        [STATUS_OK]: ItemRensponseFactory('Store', 'Store published'),
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Store not found',
          { storeNotFoundErrorExample }
        )
      },
      security: SECURITY_SCHEMA
    }
  },

  [path + '/{storeId}/unpublish']: {
    patch: {
      tags,
      description: 'Unpublish store',
      operationId: 'unpublish-store',
      parameters: [STORE_ID_PARAM],
      responses: {
        [STATUS_OK]: ItemRensponseFactory('Store', 'Store unpublished'),
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Store not found',
          { storeNotFoundErrorExample }
        )
      },
      security: SECURITY_SCHEMA
    }
  }
};
