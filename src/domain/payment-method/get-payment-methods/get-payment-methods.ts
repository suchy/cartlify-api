import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { PaymentMethod } from '../payment-method/payment-method';
import { PaymentMethodsRepository } from '../payment-methods-repository';

import { PERMISSIONS } from '../../../constants';
import { Query, QueryOptions } from '../../../helpers/query';

export type getPaymentMethods = (params: {
  context: Context;
  query: Query<PaymentMethod>;
  options?: QueryOptions<PaymentMethod>;
}) => Promise<PaymentMethod[]>;

export type GetPaymentMethodsFactory = (dependencies: {
  checkPermissions: checkPermissions;
  paymentMethodsRepository: PaymentMethodsRepository;
}) => getPaymentMethods;

export const GetPaymentMethodsFactory: GetPaymentMethodsFactory = ({
  checkPermissions,
  paymentMethodsRepository
}) => async ({ context, query = {}, options = {} }) => {
  checkPermissions(context, PERMISSIONS.paymentMethodsRead);

  const storeId = context.storeId as string;

  const paymentMethodsQuery = { ...query, storeId };

  const paymentMethods = await paymentMethodsRepository.find(
    paymentMethodsQuery,
    options
  );

  return paymentMethods;
};
