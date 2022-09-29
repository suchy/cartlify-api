import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { Order } from '../order/order';
import { OrdersRepository } from '../orders-repository';
import { OrderServiceFactory } from '../order-service/order-service';

import { getShippingMethod } from '../../shipping-method/get-shipping-method/get-shipping-method';
import { throwNotFoundError } from '../../../helpers/errors/not-found-error';
import { PERMISSIONS } from '../../../constants';

export type changeOrderShippingMethod = (params: {
  context: Context;
  orderId: string;
  shippingMethodId: string;
}) => Promise<Order>;

export type ChangeOrderShippingMethodFactory = (dependencies: {
  checkPermissions: checkPermissions;
  getShippingMethod: getShippingMethod;
  ordersRepository: OrdersRepository;
  OrderServiceFactory: OrderServiceFactory;
  throwNotFoundError: throwNotFoundError;
}) => changeOrderShippingMethod;

export const ChangeOrderShippingMethodFactory: ChangeOrderShippingMethodFactory = ({
  checkPermissions,
  getShippingMethod,
  ordersRepository,
  OrderServiceFactory,
  throwNotFoundError
}) => async ({ context, orderId, shippingMethodId }) => {
  checkPermissions(context, PERMISSIONS.ordersWrite);

  const { storeId } = context;

  const query = { storeId, id: orderId };

  const order = await ordersRepository.findOne(query);

  if (!order) {
    return throwNotFoundError('Order not found', { orderId });
  }

  const orderService = OrderServiceFactory(order);

  const shippingMethod = await getShippingMethod({ context, shippingMethodId });

  const updatedOrder = orderService.changeShippingMethod(shippingMethod);

  const isUpdated = await ordersRepository.update(query, updatedOrder);

  if (!isUpdated) {
    return throwNotFoundError('Order not found', { orderId });
  }

  return updatedOrder;
};
