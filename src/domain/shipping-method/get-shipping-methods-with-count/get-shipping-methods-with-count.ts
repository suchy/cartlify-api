import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { ShippingMethod } from '../shipping-method/shipping-method';
import { ShippingMethodsRepository } from '../shipping-methods-repository';

import { PERMISSIONS } from '../../../constants';
import { Query, QueryOptions } from '../../../helpers/query';

export type getShippingMethodsWithCount = (params: {
  context: Context;
  query?: Query<ShippingMethod>;
  options?: QueryOptions<ShippingMethod>;
}) => Promise<{
  shippingMethods: ShippingMethod[];
  shippingMethodsCount: number;
}>;

export type GetShippingMethodsWithCountFactory = (dependencies: {
  checkPermissions: checkPermissions;
  shippingMethodsRepository: ShippingMethodsRepository;
}) => getShippingMethodsWithCount;

export const GetShippingMethodsWithCountFactory: GetShippingMethodsWithCountFactory = ({
  checkPermissions,
  shippingMethodsRepository
}) => async ({ context, query, options = {} }) => {
  checkPermissions(context, PERMISSIONS.shippingMethodsRead);

  const storeId = context.storeId as string;

  const shippingMethodsQuery = { ...query, storeId };

  const [shippingMethods, shippingMethodsCount] = await Promise.all([
    shippingMethodsRepository.find(shippingMethodsQuery, options),
    shippingMethodsRepository.count(shippingMethodsQuery)
  ]);

  return { shippingMethods, shippingMethodsCount };
};
