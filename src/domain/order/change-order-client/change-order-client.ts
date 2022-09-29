import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { Order, OrderClient } from '../../../domain/order/order/order';
import { OrdersRepository } from '../orders-repository';
import { OrderServiceFactory } from '../order-service/order-service';

import { throwNotFoundError } from '../../../helpers/errors/not-found-error';
import { PERMISSIONS } from '../../../constants';

export type changeOrderClient = (params: {
  context: Context;
  orderId: string;
  client: OrderClient;
}) => Promise<Order>;

export type ChangeOrderClientFactory = (dependencies: {
  checkPermissions: checkPermissions;
  ordersRepository: OrdersRepository;
  OrderServiceFactory: OrderServiceFactory;
  throwNotFoundError: throwNotFoundError;
}) => changeOrderClient;

export const ChangeOrderClientFactory: ChangeOrderClientFactory = ({
  checkPermissions,
  ordersRepository,
  OrderServiceFactory,
  throwNotFoundError
}) => async ({ context, orderId, client }) => {
  checkPermissions(context, PERMISSIONS.ordersWrite);

  const { storeId } = context;

  const query = { storeId, id: orderId };

  const order = await ordersRepository.findOne(query);

  if (!order) {
    return throwNotFoundError('Order not found', { orderId });
  }

  const orderService = OrderServiceFactory(order);

  const updatedOrder = orderService.changeClient(client);

  const isUpdated = await ordersRepository.update(query, updatedOrder);

  if (!isUpdated) {
    return throwNotFoundError('Order not found', { orderId });
  }

  return updatedOrder;
};
