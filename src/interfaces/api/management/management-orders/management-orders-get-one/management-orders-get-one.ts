import { RequestHandler } from 'express';

import { getOrder } from '../../../../../domain/order/get-order/get-order';
import { ManagementOrdersGetOneResponseFactory } from './management-orders-get-one-response';

import { STATUS_OK } from '../../../../../constants';
import { Order } from '../../../../../domain/order/order/order';
import { RequestQueryOne } from '../../../../../helpers/query';

type OrderFields = Omit<Order, 'client' | 'comment'>;

export type ManagementOrdersGetOne = RequestHandler<
  { orderId: string },
  ReturnType<typeof ManagementOrdersGetOneResponseFactory>,
  any,
  RequestQueryOne<OrderFields>
>;

type ManagementOrdersGetOneFactory = (dependencies: {
  getOrder: getOrder;
}) => ManagementOrdersGetOne;

export const ManagementOrdersGetOneFactory: ManagementOrdersGetOneFactory = ({
  getOrder
}) => async (req, res) => {
  const { context } = res.locals;
  const { orderId } = req.params;
  const { fields } = req.query;

  const order = await getOrder({
    context,
    orderId
  });

  const response = ManagementOrdersGetOneResponseFactory({
    fields,
    order
  });

  res.status(STATUS_OK).json(response);
};
