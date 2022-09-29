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

import { productValidationSchema } from '../../../../domain/product/product/product-validation-schema';

import {
  productNotFoundErrorExample,
  storeNotFoundErrorExample
} from '../../../../helpers/errors/not-found-error-schema-examples';

const fields = Object.keys(productValidationSchema.properties).filter(
  (field) => field !== 'published'
);

const productIdParam = PathIdParamFactory('productId');

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
    name: 'stock',
    description: 'stock filter',
    schema: FILTER_PARAM_NUMBER_SCHEMA
  },
  {
    name: 'updatedAt',
    description: 'updatedAt filter',
    schema: FILTER_PARAM_DATE_SCHEMA
  }
]);

const path = '/exposition/products';

const tags = ['products'];

export const expositionProductsSchema = {
  [path]: {
    get: {
      tags,
      description: 'This should return all store products',
      operationId: 'get-products',
      parameters: [fieldsParam, ...sortParams, ...filtersParams],
      responses: {
        [STATUS_OK]: ArrayResponseFactory('Product', 'OK'),
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Store was not found',
          { storeNotFoundErrorExample }
        )
      },
      security: SECURITY_SCHEMA
    }
  },

  [path + '/{productId}']: {
    get: {
      tags,
      description: 'This should return product',
      operationId: 'get-product',
      parameters: [productIdParam, fieldsParam],
      responses: {
        [STATUS_OK]: ItemRensponseFactory('Product', 'OK'),
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Product or store was not found',
          { productNotFoundErrorExample, storeNotFoundErrorExample }
        )
      },
      security: SECURITY_SCHEMA
    }
  },

  [path + '/stock']: {
    get: {
      tags,
      description: 'This should return all store products',
      operationId: 'get-products-stock',
      parameters: [...sortParams, ...filtersParams],
      responses: {
        [STATUS_OK]: ArrayResponseFactory('Product', 'OK'),
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Store was not found',
          { storeNotFoundErrorExample }
        )
      },
      security: SECURITY_SCHEMA
    }
  },

  [path + '/{productId}/stock']: {
    get: {
      tags,
      description: 'This should return product',
      operationId: 'get-product-stock',
      parameters: [productIdParam],
      responses: {
        [STATUS_OK]: ItemRensponseFactory('Product', 'OK'),
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Product or store was not found',
          { productNotFoundErrorExample, storeNotFoundErrorExample }
        )
      },
      security: SECURITY_SCHEMA
    }
  }
};
