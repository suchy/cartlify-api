import { RequestHandler } from 'express';

import { changeOrderShippingMethod } from '../../../../../domain/order/change-order-shipping-method/change-order-shipping-method';
import { ManagementOrdersChangeShippingMethodResponseFactory } from './management-orders-change-shipping-method-response';

import { STATUS_OK } from '../../../../../constants';
import { Order } from '../../../../../domain/order/order/order';
import { RequestQueryOne } from '../../../../../helpers/query';

export type ManagementOrdersChangeShippingMethod = RequestHandler<
  { orderId: string },
  ReturnType<typeof ManagementOrdersChangeShippingMethodResponseFactory>,
  { shippingMethodId: string },
  RequestQueryOne<Order>
>;

type ManagementOrdersChangeShippingMethodFactory = (dependencies: {
  changeOrderShippingMethod: changeOrderShippingMethod;
}) => ManagementOrdersChangeShippingMethod;

export const ManagementOrdersChangeShippingMethodFactory: ManagementOrdersChangeShippingMethodFactory = ({
  changeOrderShippingMethod
}) => async (req, res) => {
  const { context } = res.locals;
  const { orderId } = req.params;
  const { shippingMethodId } = req.body;
  const { fields } = req.query;

  const order = await changeOrderShippingMethod({
    context,
    orderId,
    shippingMethodId
  });

  const response = ManagementOrdersChangeShippingMethodResponseFactory({
    fields,
    order
  });

  res.status(STATUS_OK).json(response);
};
