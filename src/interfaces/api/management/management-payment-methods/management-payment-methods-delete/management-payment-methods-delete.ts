import { RequestHandler } from 'express';

import { deletePaymentMethod } from '../../../../../domain/payment-method/delete-payment-method/delete-payment-method';

import { STATUS_NO_CONTENT } from '../../../../../constants';

export type ManagementPaymentMethodsDelete = RequestHandler<
  { paymentMethodId: string },
  {},
  any,
  any
>;

type ManagementPaymentMethodsDeleteFactory = (dependencies: {
  deletePaymentMethod: deletePaymentMethod;
}) => ManagementPaymentMethodsDelete;

export const ManagementPaymentMethodsDeleteFactory: ManagementPaymentMethodsDeleteFactory = ({
  deletePaymentMethod
}) => async (req, res) => {
  const { context } = res.locals;
  const { paymentMethodId } = req.params;

  await deletePaymentMethod({
    context,
    paymentMethodId
  });

  res.status(STATUS_NO_CONTENT).json();
};
