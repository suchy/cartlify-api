import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { PaymentMethodsRepository } from '../payment-methods-repository';

import { throwNotFoundError } from '../../../helpers/errors/not-found-error';
import { PERMISSIONS } from '../../../constants';

export type deletePaymentMethod = (params: {
  context: Context;
  paymentMethodId: string;
}) => Promise<boolean>;

export type DeletePaymentMethodFactory = (dependencies: {
  checkPermissions: checkPermissions;
  paymentMethodsRepository: PaymentMethodsRepository;
  throwNotFoundError: throwNotFoundError;
}) => deletePaymentMethod;

export const DeletePaymentMethodFactory: DeletePaymentMethodFactory = ({
  checkPermissions,
  paymentMethodsRepository,
  throwNotFoundError
}) => async ({ context, paymentMethodId }) => {
  checkPermissions(context, PERMISSIONS.paymentMethodsDelete);

  const { storeId } = context;

  const isDeleted = await paymentMethodsRepository.remove({
    storeId,
    id: paymentMethodId
  });

  if (!isDeleted) {
    return throwNotFoundError('Payment method not found.', { paymentMethodId });
  }

  return isDeleted;
};
