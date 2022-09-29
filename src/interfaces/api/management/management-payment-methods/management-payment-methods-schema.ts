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

import {
  paymentMethodValidationSchema,
  payuSettingsSchema
} from '../../../../domain/payment-method/payment-method/payment-method-validation-schema';

import {
  paymentMethodNotFoundErrorExample,
  storeNotFoundErrorExample
} from '../../../../helpers/errors/not-found-error-schema-examples';

const fields = Object.keys(paymentMethodValidationSchema.properties);

const paymentMethodIdParam = PathIdParamFactory('paymentMethodId');

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
    name: 'provider',
    description: 'provider filter',
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

const path = '/management/stores/{storeId}/payment-methods';

const tags = ['payment-methods'];

export const managementPaymentMethodsSchema = {
  [path]: {
    post: {
      tags,
      description: 'Create payment method',
      operationId: 'create-payment-method',
      parameters: [STORE_ID_PARAM],
      requestBody: RequestBodyFactory(paymentMethodValidationSchema, ''),
      responses: {
        [STATUS_CREATED]: ItemRensponseFactory(
          'PaymentMethod',
          'Payment method created'
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
      description: 'This should return all store payment methods',
      operationId: 'get-payment-methods',
      parameters: [
        STORE_ID_PARAM,
        fieldsParam,
        ...sortParams,
        ...filtersParams
      ],
      responses: {
        [STATUS_OK]: ArrayResponseFactory('PaymentMethod', 'OK'),
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Store was not found',
          { storeNotFoundErrorExample }
        )
      },
      security: SECURITY_SCHEMA
    }
  },

  [path + '/{paymentMethodId}']: {
    get: {
      tags,
      description: 'This should return payment method',
      operationId: 'get-payment-method',
      parameters: [STORE_ID_PARAM, paymentMethodIdParam, fieldsParam],
      responses: {
        [STATUS_OK]: ItemRensponseFactory('PaymentMethod', 'OK'),
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Payment method or store was not found',
          { paymentMethodNotFoundErrorExample, storeNotFoundErrorExample }
        )
      },
      security: SECURITY_SCHEMA
    },

    delete: {
      tags,
      description: 'Delete payment method',
      operationId: 'delete-payment-method',
      parameters: [STORE_ID_PARAM, paymentMethodIdParam],
      responses: {
        [STATUS_NO_CONTENT]: { description: 'Payment method deleted' },
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Payment method or store was not found',
          { paymentMethodNotFoundErrorExample, storeNotFoundErrorExample }
        )
      },
      security: SECURITY_SCHEMA
    }
  },

  [path + '/{paymentMethodId}/provider-settings']: {
    patch: {
      tags,
      description: 'Update payment method provider settings',
      operationId: 'update-payment-method-provider-settings',
      parameters: [STORE_ID_PARAM, paymentMethodIdParam],
      requestBody: RequestBodyFactory(payuSettingsSchema, ''),
      responses: {
        [STATUS_OK]: ItemRensponseFactory(
          'PaymentMethod',
          'Payment method updated'
        ),
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Payment method or store was not found',
          { paymentMethodNotFoundErrorExample, storeNotFoundErrorExample }
        )
      },
      security: SECURITY_SCHEMA
    }
  },

  [path + '/{paymentMethodId}/publish']: {
    patch: {
      tags,
      description: 'Publish payment method',
      operationId: 'publish-payment-method',
      parameters: [STORE_ID_PARAM, paymentMethodIdParam],
      responses: {
        [STATUS_OK]: ItemRensponseFactory(
          'PaymentMethod',
          'Payment method published'
        ),
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Payment method or store was not found',
          { paymentMethodNotFoundErrorExample, storeNotFoundErrorExample }
        )
      },
      security: SECURITY_SCHEMA
    }
  },

  [path + '/{paymentMethodId}/unpublish']: {
    patch: {
      tags,
      description: 'Unpublish payment method',
      operationId: 'unpublish-payment-method',
      parameters: [STORE_ID_PARAM, paymentMethodIdParam],
      responses: {
        [STATUS_OK]: ItemRensponseFactory(
          'PaymentMethod',
          'Payment method unpublished'
        ),
        [STATUS_NOT_FOUND]: ItemRensponseFactory(
          'NotFoundError',
          'Payment method or store was not found',
          { paymentMethodNotFoundErrorExample, storeNotFoundErrorExample }
        )
      },
      security: SECURITY_SCHEMA
    }
  }
};
