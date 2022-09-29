import { RequestHandler } from 'express';

import { getPublishedPaymentMethod } from '../../../../../domain/payment-method/get-published-payment-method/get-published-payment-method';
import { ExpositionPaymentMethodsGetOneResponseFactory } from './exposition-payment-methods-get-one-response';

import { STATUS_OK } from '../../../../../constants';
import { PaymentMethod } from '../../../../../domain/payment-method/payment-method/payment-method';
import { RequestQueryOne } from '../../../../../helpers/query';

export type ExpositionPaymentMethodsGetOne = RequestHandler<
  { paymentMethodId: string },
  ReturnType<typeof ExpositionPaymentMethodsGetOneResponseFactory>,
  any,
  RequestQueryOne<PaymentMethod>
>;

type ExpositionPaymentMethodsGetOneFactory = (dependencies: {
  getPublishedPaymentMethod: getPublishedPaymentMethod;
}) => ExpositionPaymentMethodsGetOne;

export const ExpositionPaymentMethodsGetOneFactory: ExpositionPaymentMethodsGetOneFactory = ({
  getPublishedPaymentMethod
}) => async (req, res) => {
  const { context } = res.locals;
  const { paymentMethodId } = req.params;
  const { fields } = req.query;

  const paymentMethod = await getPublishedPaymentMethod({
    context,
    paymentMethodId
  });

  const response = ExpositionPaymentMethodsGetOneResponseFactory({
    fields,
    paymentMethod
  });

  res.status(STATUS_OK).json(response);
};
