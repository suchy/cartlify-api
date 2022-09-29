import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { ShippingMethod } from '../shipping-method/shipping-method';
import { ShippingMethodsRepository } from '../shipping-methods-repository';

import { PERMISSIONS } from '../../../constants';
import { Query, QueryOptions } from '../../../helpers/query';

export type getPublishedShippingMethodsWithCount = (params: {
  context: Context;
  query?: Query<ShippingMethod>;
  options?: QueryOptions<ShippingMethod>;
}) => Promise<{
  publishedShippingMethods: ShippingMethod[];
  publishedShippingMethodsCount: number;
}>;

export type GetPublishedShippingMethodsWithCountFactory = (dependencies: {
  checkPermissions: checkPermissions;
  shippingMethodsRepository: ShippingMethodsRepository;
}) => getPublishedShippingMethodsWithCount;

export const GetPublishedShippingMethodsWithCountFactory: GetPublishedShippingMethodsWithCountFactory = ({
  checkPermissions,
  shippingMethodsRepository
}) => async ({ context, query, options = {} }) => {
  checkPermissions(context, PERMISSIONS.shippingMethodsRead);

  const storeId = context.storeId as string;

  const publishedShippingMethodsQuery = { ...query, storeId, published: true };

  const [
    publishedShippingMethods,
    publishedShippingMethodsCount
  ] = await Promise.all([
    shippingMethodsRepository.find(publishedShippingMethodsQuery, options),
    shippingMethodsRepository.count(publishedShippingMethodsQuery)
  ]);

  return { publishedShippingMethods, publishedShippingMethodsCount };
};
