import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { Order, OrderStatus } from '../order/order';
import { OrdersRepository } from '../orders-repository';
import { OrderServiceFactory } from '../order-service/order-service';

import { throwNotFoundError } from '../../../helpers/errors/not-found-error';
import { PERMISSIONS } from '../../../constants';

export type changeOrderStatus = (params: {
  context: Context;
  orderId: string;
  status: keyof typeof OrderStatus;
}) => Promise<Order>;

export type ChangeOrderStatusFactory = (dependencies: {
  checkPermissions: checkPermissions;
  ordersRepository: OrdersRepository;
  OrderServiceFactory: OrderServiceFactory;
  throwNotFoundError: throwNotFoundError;
}) => changeOrderStatus;

export const ChangeOrderStatusFactory: ChangeOrderStatusFactory = ({
  checkPermissions,
  ordersRepository,
  OrderServiceFactory,
  throwNotFoundError
}) => async ({ context, orderId, status }) => {
  checkPermissions(context, PERMISSIONS.ordersWrite);

  const { storeId } = context;

  const query = { storeId, id: orderId };

  const order = await ordersRepository.findOne(query);

  if (!order) {
    return throwNotFoundError('Order not found', { orderId });
  }

  const orderService = OrderServiceFactory(order);

  const updatedOrder = orderService.changeStatus(status);

  const isUpdated = await ordersRepository.update(query, updatedOrder);

  if (!isUpdated) {
    return throwNotFoundError('Order not found', { orderId });
  }

  return updatedOrder;
};
