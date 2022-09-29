import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { PaymentMethod } from '../payment-method/payment-method';
import { PaymentMethodsRepository } from '../payment-methods-repository';

import { PERMISSIONS } from '../../../constants';
import { Query, QueryOptions } from '../../../helpers/query';

export type getPublishedPaymentMethodsWithCount = (params: {
  context: Context;
  query: Query<PaymentMethod>;
  options?: QueryOptions<PaymentMethod>;
}) => Promise<{
  publishedPaymentMethods: PaymentMethod[];
  publishedPaymentMethodsCount: number;
}>;

export type GetPublishedPaymentMethodsWithCountFactory = (dependencies: {
  checkPermissions: checkPermissions;
  paymentMethodsRepository: PaymentMethodsRepository;
}) => getPublishedPaymentMethodsWithCount;

export const GetPublishedPaymentMethodsWithCountFactory: GetPublishedPaymentMethodsWithCountFactory = ({
  checkPermissions,
  paymentMethodsRepository
}) => async ({ context, query = {}, options = {} }) => {
  checkPermissions(context, PERMISSIONS.paymentMethodsRead);

  const storeId = context.storeId as string;

  const publishedPaymentMethodsQuery = { ...query, published: true, storeId };

  const [
    publishedPaymentMethods,
    publishedPaymentMethodsCount
  ] = await Promise.all([
    paymentMethodsRepository.find(publishedPaymentMethodsQuery, options),
    paymentMethodsRepository.count(publishedPaymentMethodsQuery)
  ]);

  return { publishedPaymentMethods, publishedPaymentMethodsCount };
};
