import { RequestHandler } from 'express';

import { unpublishPaymentMethod } from '../../../../../domain/payment-method/unpublish-payment-method/unpublish-payment-method';
import { ManagementPaymentMethodsUnpublishResponseFactory } from './management-payment-methods-unpublish-response';

import { STATUS_OK } from '../../../../../constants';
import { PaymentMethod } from '../../../../../domain/payment-method/payment-method/payment-method';
import { RequestQueryOne } from '../../../../../helpers/query';

export type ManagementPaymentMethodsUnpublish = RequestHandler<
  { paymentMethodId: string },
  ReturnType<typeof ManagementPaymentMethodsUnpublishResponseFactory>,
  any,
  RequestQueryOne<PaymentMethod>
>;

type ManagementPaymentMethodsUnpublishFactory = (dependencies: {
  unpublishPaymentMethod: unpublishPaymentMethod;
}) => ManagementPaymentMethodsUnpublish;

export const ManagementPaymentMethodsUnpublishFactory: ManagementPaymentMethodsUnpublishFactory = ({
  unpublishPaymentMethod
}) => async (req, res) => {
  const { context } = res.locals;
  const { paymentMethodId } = req.params;
  const { fields } = req.query;

  const paymentMethod = await unpublishPaymentMethod({
    context,
    paymentMethodId
  });

  const response = ManagementPaymentMethodsUnpublishResponseFactory({
    fields,
    paymentMethod
  });

  res.status(STATUS_OK).json(response);
};
