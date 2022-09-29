import {
  QueryFieldsParamFactory,
  QueryFiltersParamFactory,
  QuerySortParamsFactory,
  PathIdParamFactory,
  ItemRensponseFactory,
  ArrayResponseFactory,
  FILTER_PARAM_STRING_SCHEMA,
  FILTER_PARAM_NUMBER_SCHEMA,
  FILTER_PARAM_DATE_SCHEMA,
  SECURITY_SCHEMA
} from '../../../../helpers/schema';

import { STATUS_OK, STATUS_NOT_FOUND } from '../../../../constants';
import { shippingMethodValidationSchema } from '../../../../domain/shipping-method/shipping-method/shipping-method-validation-schema';

import {
  shippingMethodNotFoundErrorExample,
  storeNotFoundErrorExample
} from '../../../../helpers/errors/not-found-error-schema-examples';

const fields = Object.keys(shippingMethodValidationSchema.properties).filter(
  (field) => field !== 'published'
);

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
    name: 'updatedAt',
    description: 'createdAt filter',
    schema: FILTER_PARAM_DATE_SCHEMA
  }
]);

const path = '/exposition/shipping-methods';

const tags = ['shipping methods'];

export const expositionShippingMethodsSchema = {
  [path]: {
    get: {
      tags,
      description: 'This should return all store shipping methods',
      operationId: 'get-store-shipping-methods',
      parameters: [fieldsParam, ...sortParams, ...filtersParams],
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
      parameters: [shippingMethodIdParam, fieldsParam],
      responses: {
        [STATUS_OK]: ItemRensponseFactory('ShippingMethod', 'OK'),
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
