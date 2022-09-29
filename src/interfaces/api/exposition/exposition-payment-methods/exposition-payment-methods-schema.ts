import {
  QueryFieldsParamFactory,
  QueryFiltersParamFactory,
  QuerySortParamsFactory,
  PathIdParamFactory,
  ItemRensponseFactory,
  ArrayResponseFactory,
  FILTER_PARAM_STRING_SCHEMA,
  FILTER_PARAM_DATE_SCHEMA,
  SECURITY_SCHEMA
} from '../../../../helpers/schema';

import { STATUS_OK, STATUS_NOT_FOUND } from '../../../../constants';

import { paymentMethodValidationSchema } from '../../../../domain/payment-method/payment-method/payment-method-validation-schema';

import {
  paymentMethodNotFoundErrorExample,
  storeNotFoundErrorExample
} from '../../../../helpers/errors/not-found-error-schema-examples';

const fields = Object.keys(paymentMethodValidationSchema.properties).filter(
  (field) => field !== 'published'
);

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
    name: 'updatedAt',
    description: 'updatedAt filter',
    schema: FILTER_PARAM_DATE_SCHEMA
  }
]);

const path = '/exposition/payment-methods';

const tags = ['payment-methods'];

export const expositionPaymentMethodsSchema = {
  [path]: {
    get: {
      tags,
      description: 'This should return all store payment methods',
      operationId: 'get-payment-methods',
      parameters: [fieldsParam, ...sortParams, ...filtersParams],
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
      parameters: [paymentMethodIdParam, fieldsParam],
      responses: {
        [STATUS_OK]: ItemRensponseFactory('PaymentMethod', 'OK'),
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
