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

import { productValidationSchema } from '../../../../domain/product/product/product-validation-schema';

import {
  productNotFoundErrorExample,
  storeNotFoundErrorExample
} from '../../../../helpers/errors/not-found-error-schema-examples';

const fields = Object.keys(productValidationSchema.properties);

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
    name: 'published',
    description: 'published filter',
    schema: FILTER_PARAM_BOOL_SCHEMA
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

const path = '/management/stores/{storeId}/products';

const tags = ['products'];

export const managementProductsSchema = {
  [path]: {
    post: {
      tags,
      description: 'Create product',
      operationId: 'create-product',
      parameters: [STORE_ID_PARAM],
      requestBody: RequestBodyFactory(productValidationSchema, ''),
      responses: {
        [STATUS_CREATED]: ItemRensponseFactory('Product', 'Product created'),
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
      description: 'This should return all store products',
      operationId: 'get-products',
      parameters: [
        STORE_ID_PARAM,
        fieldsParam,
        ...sortParams,
        ...filtersParams
      ],
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
      parameters: [STORE_ID_PARAM, productIdParam, fieldsParam],
      responses: {
        [STATUS_OK]: ItemRensponseFactory('Product', 'OK'),
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Product or store was not found',
          { productNotFoundErrorExample, storeNotFoundErrorExample }
        )
      },
      security: SECURITY_SCHEMA
    },

    patch: {
      tags,
      description: 'Update product details',
      operationId: 'update-product',
      parameters: [STORE_ID_PARAM, productIdParam],
      requestBody: RequestBodyFactory(productValidationSchema, ''),
      responses: {
        [STATUS_OK]: ItemRensponseFactory('Product', 'Product updated'),
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Product or store was not found',
          { productNotFoundErrorExample, storeNotFoundErrorExample }
        )
      },
      security: SECURITY_SCHEMA
    },

    delete: {
      tags,
      description: 'Delete product',
      operationId: 'delete-product',
      parameters: [STORE_ID_PARAM, productIdParam],
      responses: {
        [STATUS_NO_CONTENT]: { description: 'Product deleted' },
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Product or store was not found',
          { productNotFoundErrorExample, storeNotFoundErrorExample }
        )
      },
      security: SECURITY_SCHEMA
    }
  },

  [path + '/{productId}/publish']: {
    patch: {
      tags,
      description: 'Publish product',
      operationId: 'publish-product',
      parameters: [STORE_ID_PARAM, productIdParam],
      responses: {
        [STATUS_OK]: ItemRensponseFactory('Product', 'Product published'),
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Product or store was not found',
          { productNotFoundErrorExample, storeNotFoundErrorExample }
        )
      },
      security: SECURITY_SCHEMA
    }
  },

  [path + '/{productId}/unpublish']: {
    patch: {
      tags,
      description: 'Unpublish product',
      operationId: 'unpublish-product',
      parameters: [STORE_ID_PARAM, productIdParam],
      responses: {
        [STATUS_OK]: ItemRensponseFactory('Product', 'Product unpublished'),
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
