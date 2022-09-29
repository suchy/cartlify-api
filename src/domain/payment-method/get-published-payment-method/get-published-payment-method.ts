import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { PaymentMethod } from '../payment-method/payment-method';
import { PaymentMethodsRepository } from '../payment-methods-repository';

import { throwNotFoundError } from '../../../helpers/errors/not-found-error';
import { PERMISSIONS } from '../../../constants';

export type getPublishedPaymentMethod = (params: {
  context: Context;
  paymentMethodId: string;
}) => Promise<PaymentMethod>;

export type GetPublishedPaymentMethodFactory = (dependencies: {
  checkPermissions: checkPermissions;
  paymentMethodsRepository: PaymentMethodsRepository;
  throwNotFoundError: throwNotFoundError;
}) => getPublishedPaymentMethod;

export const GetPublishedPaymentMethodFactory: GetPublishedPaymentMethodFactory = ({
  checkPermissions,
  paymentMethodsRepository,
  throwNotFoundError
}) => async ({ context, paymentMethodId }) => {
  checkPermissions(context, PERMISSIONS.paymentMethodsRead);

  const { storeId } = context;

  const query = { storeId, id: paymentMethodId, published: true };

  const paymentMethod = await paymentMethodsRepository.findOne(query);

  if (!paymentMethod) {
    return throwNotFoundError('Payment method not found', { paymentMethodId });
  }

  return paymentMethod;
};
