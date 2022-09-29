import { RequestHandler } from 'express';

import { publishPaymentMethod } from '../../../../../domain/payment-method/publish-payment-method/publish-payment-method';
import { ManagementPaymentMethodsPublishResponseFactory } from './management-payment-methods-publish-response';

import { STATUS_OK } from '../../../../../constants';
import { PaymentMethod } from '../../../../../domain/payment-method/payment-method/payment-method';
import { RequestQueryOne } from '../../../../../helpers/query';

export type ManagementPaymentMethodsPublish = RequestHandler<
  { paymentMethodId: string },
  ReturnType<typeof ManagementPaymentMethodsPublishResponseFactory>,
  any,
  RequestQueryOne<PaymentMethod>
>;

type ManagementPaymentMethodsPublishFactory = (dependencies: {
  publishPaymentMethod: publishPaymentMethod;
}) => ManagementPaymentMethodsPublish;

export const ManagementPaymentMethodsPublishFactory: ManagementPaymentMethodsPublishFactory = ({
  publishPaymentMethod
}) => async (req, res) => {
  const { context } = res.locals;
  const { paymentMethodId } = req.params;
  const { fields } = req.query;

  const paymentMethod = await publishPaymentMethod({
    context,
    paymentMethodId
  });

  const response = ManagementPaymentMethodsPublishResponseFactory({
    fields,
    paymentMethod
  });

  res.status(STATUS_OK).json(response);
};
