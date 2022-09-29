import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import {
  PaymentMethod,
  PaymentMethodFactory
} from '../payment-method/payment-method';

import { PaymentMethodsRepository } from '../payment-methods-repository';

import { createId } from '../../../helpers/create-id';
import { PERMISSIONS } from '../../../constants';

export type createPaymentMethod = ({
  context,
  paymentMethodProps
}: {
  context: Context;
  paymentMethodProps: Omit<
    PaymentMethod,
    'id' | 'createdAt' | 'updatedAt' | 'storeId'
  >;
}) => Promise<PaymentMethod>;

export type CreatePaymentMethodFactory = (dependencies: {
  checkPermissions: checkPermissions;
  createId: createId;
  PaymentMethodFactory: PaymentMethodFactory;
  paymentMethodsRepository: PaymentMethodsRepository;
}) => createPaymentMethod;

export const CreatePaymentMethodFactory: CreatePaymentMethodFactory = ({
  checkPermissions,
  createId,
  PaymentMethodFactory,
  paymentMethodsRepository
}) => async ({ context, paymentMethodProps }) => {
  checkPermissions(context, PERMISSIONS.paymentMethodsCreate);

  const timestamp = new Date();

  const storeId = context.storeId as string;

  const paymentMethod = PaymentMethodFactory({
    ...paymentMethodProps,
    storeId,
    id: createId(),
    createdAt: timestamp,
    updatedAt: timestamp
  });

  await paymentMethodsRepository.insert(paymentMethod);

  return paymentMethod;
};
