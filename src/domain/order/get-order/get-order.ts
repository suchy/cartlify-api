import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { Order } from '../../../domain/order/order/order';
import { OrdersRepository } from '../orders-repository';

import { throwNotFoundError } from '../../../helpers/errors/not-found-error';
import { PERMISSIONS } from '../../../constants';

export type getOrder = (params: {
  context: Context;
  orderId: string;
}) => Promise<Order>;

export type GetOrderFactory = (dependencies: {
  checkPermissions: checkPermissions;
  ordersRepository: OrdersRepository;
  throwNotFoundError: throwNotFoundError;
}) => getOrder;

export const GetOrderFactory: GetOrderFactory = ({
  checkPermissions,
  ordersRepository,
  throwNotFoundError
}) => async ({ context, orderId }) => {
  checkPermissions(context, PERMISSIONS.ordersRead);

  const { storeId } = context;

  const order = await ordersRepository.findOne({ storeId, id: orderId });

  if (!order) {
    return throwNotFoundError('Order not found', { orderId });
  }

  return order;
};
