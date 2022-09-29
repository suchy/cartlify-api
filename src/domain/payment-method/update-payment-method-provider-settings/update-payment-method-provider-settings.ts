import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import {
  PaymentMethod,
  ProviderSettings
} from '../payment-method/payment-method';

import { PaymentMethodsRepository } from '../payment-methods-repository';
import { PaymentMethodServiceFactory } from '../payment-methods-service/payment-methods-service';

import { throwNotFoundError } from '../../../helpers/errors/not-found-error';
import { PERMISSIONS } from '../../../constants';

export type updatePaymentMethodProviderSettings = (params: {
  context: Context;
  paymentMethodId: string;
  paymentMethodProviderSettings: ProviderSettings;
}) => Promise<PaymentMethod>;

export type UpdatePaymentMethodProviderSettingsFactory = (dependencies: {
  checkPermissions: checkPermissions;
  paymentMethodsRepository: PaymentMethodsRepository;
  PaymentMethodServiceFactory: PaymentMethodServiceFactory;
  throwNotFoundError: throwNotFoundError;
}) => updatePaymentMethodProviderSettings;

export const UpdatePaymentMethodProviderSettingsFactory: UpdatePaymentMethodProviderSettingsFactory = ({
  checkPermissions,
  paymentMethodsRepository,
  PaymentMethodServiceFactory,
  throwNotFoundError
}) => async ({ context, paymentMethodId, paymentMethodProviderSettings }) => {
  checkPermissions(context, PERMISSIONS.paymentMethodsWrite);

  const storeId = context.storeId as string;

  const query = { storeId, id: paymentMethodId };

  const paymentMethod = await paymentMethodsRepository.findOne(query);

  if (!paymentMethod) {
    return throwNotFoundError('Payment method not found', { paymentMethodId });
  }

  const paymentMethodService = PaymentMethodServiceFactory(paymentMethod);

  const updatedPaymentMethod = paymentMethodService.updateProviderSettings(
    paymentMethodProviderSettings
  );

  const isUpdated = await paymentMethodsRepository.update(
    query,
    updatedPaymentMethod
  );

  if (!isUpdated) {
    return throwNotFoundError('Payment method not found', { paymentMethodId });
  }

  return updatedPaymentMethod;
};
