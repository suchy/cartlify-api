import { RequestHandler } from 'express';

import { getPublishedPaymentMethodsWithCount } from '../../../../../domain/payment-method/get-published-payment-methods-with-count/get-published-payment-methods-with-count';
import { ExpositionPaymentMethodsGetManyResponseFactory } from './exposition-payment-methods-get-many-response';

import { STATUS_OK } from '../../../../../constants';
import { PaymentMethod } from '../../../../../domain/payment-method/payment-method/payment-method';
import { RequestQuery } from '../../../../../helpers/query';

export type ExpositionPaymentMethodsGetMany = RequestHandler<
  {},
  ReturnType<typeof ExpositionPaymentMethodsGetManyResponseFactory>,
  any,
  RequestQuery<PaymentMethod>
>;

type ExpositionPaymentMethodsGetManyFactory = (dependencies: {
  getPublishedPaymentMethodsWithCount: getPublishedPaymentMethodsWithCount;
}) => ExpositionPaymentMethodsGetMany;

export const ExpositionPaymentMethodsGetManyFactory: ExpositionPaymentMethodsGetManyFactory = ({
  getPublishedPaymentMethodsWithCount
}) => async (req, res) => {
  const { context } = res.locals;
  const { fields, sortBy, sortDir, page, perPage = 50, ...query } = req.query;

  const options = { fields, sortBy, sortDir, page, perPage };

  const {
    publishedPaymentMethods,
    publishedPaymentMethodsCount
  } = await getPublishedPaymentMethodsWithCount({
    context,
    query,
    options
  });

  const response = ExpositionPaymentMethodsGetManyResponseFactory({
    fields,
    paymentMethods: publishedPaymentMethods,
    paymentMethodsCount: publishedPaymentMethodsCount,
    paymentMethodsPerPage: perPage
  });

  res.status(STATUS_OK).json(response);
};
