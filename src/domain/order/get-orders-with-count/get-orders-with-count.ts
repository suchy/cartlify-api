import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { Order } from '../order/order';
import { OrdersRepository } from '../orders-repository';

import { PERMISSIONS } from '../../../constants';
import { Query, QueryOptions } from '../../../helpers/query';

export type getOrdersWithCount = (params: {
  context: Context;
  query?: Query<Order>;
  options?: QueryOptions<Order>;
}) => Promise<{ orders: Order[]; ordersCount: number }>;

export type GetOrdersWithCountFactory = (dependencies: {
  checkPermissions: checkPermissions;
  ordersRepository: OrdersRepository;
}) => getOrdersWithCount;

export const GetOrdersWithCountFactory: GetOrdersWithCountFactory = ({
  checkPermissions,
  ordersRepository
}) => async ({ context, query = {}, options = {} }) => {
  checkPermissions(context, PERMISSIONS.ordersRead);

  const storeId = context.storeId as string;

  const ordersQuery = { ...query, storeId };

  const [orders, ordersCount] = await Promise.all([
    ordersRepository.find(ordersQuery, options),
    ordersRepository.count(ordersQuery)
  ]);

  return { orders, ordersCount };
};
