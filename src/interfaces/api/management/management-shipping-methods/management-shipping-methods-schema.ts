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
  FILTER_PARAM_NUMBER_SCHEMA,
  FILTER_PARAM_DATE_SCHEMA,
  FILTER_PARAM_BOOL_SCHEMA,
  SECURITY_SCHEMA
} from '../../../../helpers/schema';

import {
  STATUS_OK,
  STATUS_CREATED,
  STATUS_NOT_FOUND,
  STATUS_NO_CONTENT
} from '../../../../constants';

import { shippingMethodValidationSchema } from '../../../../domain/shipping-method/shipping-method/shipping-method-validation-schema';

import {
  shippingMethodNotFoundErrorExample,
  storeNotFoundErrorExample
} from '../../../../helpers/errors/not-found-error-schema-examples';

const fields = Object.keys(shippingMethodValidationSchema.properties);

const shippingMethodIdParam = PathIdParamFactory('shippingMethodId');

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
    name: 'price',
    description: 'price filter',
    schema: FILTER_PARAM_NUMBER_SCHEMA
  },
  {
    name: 'published',
    description: 'published filter',
    schema: FILTER_PARAM_BOOL_SCHEMA
  },
  {
    name: 'updatedAt',
    description: 'createdAt filter',
    schema: FILTER_PARAM_DATE_SCHEMA
  }
]);

const path = '/management/stores/{storeId}/shipping-methods';

const tags = ['shipping methods'];

export const managementShippingMethodsSchema = {
  [path]: {
    post: {
      tags,
      description: 'Create shipping method',
      operationId: 'create-shipping-method',
      parameters: [STORE_ID_PARAM],
      requestBody: RequestBodyFactory(shippingMethodValidationSchema, ''),
      responses: {
        [STATUS_CREATED]: ItemRensponseFactory(
          'ShippingMethod',
          'Shipping method created'
        ),
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Store was not found',
          { storeNotFoundErrorExample }
        )
      },
      security: SECURITY_SCHEMA
    },

    get: {
      tags,
      description: 'This should return all store shipping methods',
      operationId: 'get-store-shipping-methods',
      parameters: [
        STORE_ID_PARAM,
        fieldsParam,
        ...sortParams,
        ...filtersParams
      ],
      responses: {
        [STATUS_OK]: ArrayResponseFactory('ShippingMethod', 'OK'),
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Store was not found',
          { storeNotFoundErrorExample }
        )
      },
      security: SECURITY_SCHEMA
    }
  },

  [path + '/{shippingMethodId}']: {
    get: {
      tags,
      description: 'This should return shipping method',
      operationId: 'get-shipping-method',
      parameters: [STORE_ID_PARAM, shippingMethodIdParam, fieldsParam],
      responses: {
        [STATUS_OK]: ItemRensponseFactory('ShippingMethod', 'OK'),
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Shipping method or store was not found',
          { shippingMethodNotFoundErrorExample, storeNotFoundErrorExample }
        )
      },
      security: SECURITY_SCHEMA
    },

    patch: {
      tags,
      description: 'Update shipping method details',
      operationId: 'update-shipping-method',
      parameters: [STORE_ID_PARAM, shippingMethodIdParam],
      requestBody: RequestBodyFactory(shippingMethodValidationSchema, ''),
      responses: {
        [STATUS_OK]: ItemRensponseFactory(
          'ShippingMethod',
          'Shipping method updated'
        ),
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Shipping method or store was not found',
          { shippingMethodNotFoundErrorExample, storeNotFoundErrorExample }
        )
      },
      security: SECURITY_SCHEMA
    },

    delete: {
      tags,
      description: 'Delete shipping method',
      operationId: 'delete-shipping-method',
      parameters: [STORE_ID_PARAM, shippingMethodIdParam],
      responses: {
        [STATUS_NO_CONTENT]: { description: 'Shipping method deleted' },
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Shipping method or store was not found',
          { shippingMethodNotFoundErrorExample, storeNotFoundErrorExample }
        )
      },
      security: SECURITY_SCHEMA
    }
  },

  [path + '/{shippingMethodId}/publish']: {
    patch: {
      tags,
      description: 'Publish shipping method',
      operationId: 'publish-shipping-method',
      parameters: [STORE_ID_PARAM, shippingMethodIdParam],
      responses: {
        [STATUS_OK]: ItemRensponseFactory(
          'ShippingMethod',
          'Shipping method published'
        ),
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Shipping method or store was not found',
          { shippingMethodNotFoundErrorExample, storeNotFoundErrorExample }
        )
      },
      security: SECURITY_SCHEMA
    }
  },

  [path + '/{shippingMethodId}/unpublish']: {
    patch: {
      tags,
      description: 'Unpublish shipping method',
      operationId: 'unpublish-shipping-method',
      parameters: [STORE_ID_PARAM, shippingMethodIdParam],
      responses: {
        [STATUS_OK]: ItemRensponseFactory(
          'ShippingMethod',
          'Shipping method unpublished'
        ),
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Shipping method or store was not found',
          { shippingMethodNotFoundErrorExample, storeNotFoundErrorExample }
        )
      },
      security: SECURITY_SCHEMA
    }
  }
};
