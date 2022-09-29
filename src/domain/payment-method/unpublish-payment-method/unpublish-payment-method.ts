import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { PaymentMethod } from '../payment-method/payment-method';
import { PaymentMethodsRepository } from '../payment-methods-repository';
import { PaymentMethodServiceFactory } from '../payment-methods-service/payment-methods-service';

import { throwNotFoundError } from '../../../helpers/errors/not-found-error';
import { PERMISSIONS } from '../../../constants';

export type unpublishPaymentMethod = (params: {
  context: Context;
  paymentMethodId: string;
}) => Promise<PaymentMethod>;

export type UnpublishPaymentMethodFactory = (dependencies: {
  checkPermissions: checkPermissions;
  paymentMethodsRepository: PaymentMethodsRepository;
  PaymentMethodServiceFactory: PaymentMethodServiceFactory;
  throwNotFoundError: throwNotFoundError;
}) => unpublishPaymentMethod;

export const UnpublishPaymentMethodFactory: UnpublishPaymentMethodFactory = ({
  checkPermissions,
  paymentMethodsRepository,
  PaymentMethodServiceFactory,
  throwNotFoundError
}) => async ({ context, paymentMethodId }) => {
  checkPermissions(context, PERMISSIONS.paymentMethodsWrite);

  const storeId = context.storeId as string;

  const query = { storeId, id: paymentMethodId };

  const paymentMethod = await paymentMethodsRepository.findOne(query);

  if (!paymentMethod) {
    return throwNotFoundError('Payment method not found', { paymentMethodId });
  }

  const paymentMethodService = PaymentMethodServiceFactory(paymentMethod);

  const unpublishedPaymentMethod = paymentMethodService.unpublish();

  const isUpdated = await paymentMethodsRepository.update(
    query,
    unpublishedPaymentMethod
  );

  if (!isUpdated) {
    return throwNotFoundError('Payment method not found', { paymentMethodId });
  }

  return unpublishedPaymentMethod;
};
