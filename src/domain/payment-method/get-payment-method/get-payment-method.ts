import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { PaymentMethod } from '../payment-method/payment-method';
import { PaymentMethodsRepository } from '../payment-methods-repository';

import { throwNotFoundError } from '../../../helpers/errors/not-found-error';
import { PERMISSIONS } from '../../../constants';

export type getPaymentMethod = (params: {
  context: Context;
  paymentMethodId: string;
}) => Promise<PaymentMethod>;

export type GetPaymentMethodFactory = (dependencies: {
  checkPermissions: checkPermissions;
  paymentMethodsRepository: PaymentMethodsRepository;
  throwNotFoundError: throwNotFoundError;
}) => getPaymentMethod;

export const GetPaymentMethodFactory: GetPaymentMethodFactory = ({
  checkPermissions,
  paymentMethodsRepository,
  throwNotFoundError
}) => async ({ context, paymentMethodId }) => {
  checkPermissions(context, PERMISSIONS.paymentMethodsRead);

  const { storeId } = context;

  const query = { storeId, id: paymentMethodId };

  const paymentMethod = await paymentMethodsRepository.findOne(query);

  if (!paymentMethod) {
    return throwNotFoundError('Payment method not found', { paymentMethodId });
  }

  return paymentMethod;
};
