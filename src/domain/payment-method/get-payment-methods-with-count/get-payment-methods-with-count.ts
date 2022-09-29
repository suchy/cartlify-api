import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { PaymentMethod } from '../payment-method/payment-method';
import { PaymentMethodsRepository } from '../payment-methods-repository';

import { PERMISSIONS } from '../../../constants';
import { Query, QueryOptions } from '../../../helpers/query';

export type getPaymentMethodsWithCount = (params: {
  context: Context;
  query: Query<PaymentMethod>;
  options?: QueryOptions<PaymentMethod>;
}) => Promise<{ paymentMethods: PaymentMethod[]; paymentMethodsCount: number }>;

export type GetPaymentMethodsWithCountFactory = (dependencies: {
  checkPermissions: checkPermissions;
  paymentMethodsRepository: PaymentMethodsRepository;
}) => getPaymentMethodsWithCount;

export const GetPaymentMethodsWithCountFactory: GetPaymentMethodsWithCountFactory = ({
  checkPermissions,
  paymentMethodsRepository
}) => async ({ context, query = {}, options = {} }) => {
  checkPermissions(context, PERMISSIONS.paymentMethodsRead);

  const storeId = context.storeId as string;

  const publishedPaymentMethodsQuery = { ...query, storeId };

  const [paymentMethods, paymentMethodsCount] = await Promise.all([
    paymentMethodsRepository.find(publishedPaymentMethodsQuery, options),
    paymentMethodsRepository.count(publishedPaymentMethodsQuery)
  ]);

  return { paymentMethods, paymentMethodsCount };
};
