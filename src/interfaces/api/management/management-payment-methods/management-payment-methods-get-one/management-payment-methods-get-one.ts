import { RequestHandler } from 'express';

import { getPaymentMethod } from '../../../../../domain/payment-method/get-payment-method/get-payment-method';
import { ManagementPaymentMethodsGetOneResponseFactory } from './management-payment-methods-get-one-response';

import { STATUS_OK } from '../../../../../constants';
import { PaymentMethod } from '../../../../../domain/payment-method/payment-method/payment-method';
import { RequestQueryOne } from '../../../../../helpers/query';

export type ManagementPaymentMethodsGetOne = RequestHandler<
  { paymentMethodId: string },
  ReturnType<typeof ManagementPaymentMethodsGetOneResponseFactory>,
  any,
  RequestQueryOne<PaymentMethod>
>;

type ManagementPaymentMethodsGetOneFactory = (dependencies: {
  getPaymentMethod: getPaymentMethod;
}) => ManagementPaymentMethodsGetOne;

export const ManagementPaymentMethodsGetOneFactory: ManagementPaymentMethodsGetOneFactory = ({
  getPaymentMethod
}) => async (req, res) => {
  const { context } = res.locals;
  const { paymentMethodId } = req.params;
  const { fields } = req.query;

  const paymentMethod = await getPaymentMethod({
    context,
    paymentMethodId
  });

  const response = ManagementPaymentMethodsGetOneResponseFactory({
    fields,
    paymentMethod
  });

  res.status(STATUS_OK).json(response);
};
