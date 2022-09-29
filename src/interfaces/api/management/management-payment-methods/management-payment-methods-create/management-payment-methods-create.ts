import { RequestHandler } from 'express';

import { createPaymentMethod } from '../../../../../domain/payment-method/create-payment-method/create-payment-method';
import { ManagementPaymentMethodsCreateResponseFactory } from './management-payment-methods-create-response';

import { STATUS_CREATED } from '../../../../../constants';
import { PaymentMethod } from '../../../../../domain/payment-method/payment-method/payment-method';
import { RequestQueryOne } from '../../../../../helpers/query';

export type ManagementPaymentMethodsCreate = RequestHandler<
  {},
  ReturnType<typeof ManagementPaymentMethodsCreateResponseFactory>,
  any,
  RequestQueryOne<PaymentMethod>
>;

type ManagementPaymentMethodsCreateFactory = (dependencies: {
  createPaymentMethod: createPaymentMethod;
}) => ManagementPaymentMethodsCreate;

export const ManagementPaymentMethodsCreateFactory: ManagementPaymentMethodsCreateFactory = ({
  createPaymentMethod
}) => async (req, res) => {
  const { context } = res.locals;
  const paymentMethodProps = req.body;
  const { fields } = req.query;

  const paymentMethod = await createPaymentMethod({
    context,
    paymentMethodProps
  });

  const response = ManagementPaymentMethodsCreateResponseFactory({
    fields,
    paymentMethod
  });

  res.status(STATUS_CREATED).json(response);
};
