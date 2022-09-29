import { RequestHandler } from 'express';

import { changeOrderStatus } from '../../../../../domain/order/change-order-status/change-order-status';
import { ManagementOrdersChangeStatusResponseFactory } from './management-orders-change-status-response';

import { STATUS_OK } from '../../../../../constants';
import { Order } from '../../../../../domain/order/order/order';
import { RequestQueryOne } from '../../../../../helpers/query';

export type ManagementOrdersChangeStatus = RequestHandler<
  { orderId: string },
  ReturnType<typeof ManagementOrdersChangeStatusResponseFactory>,
  { status: Order['status'] },
  RequestQueryOne<Order>
>;

type ManagementOrdersChangeStatusFactory = (dependencies: {
  changeOrderStatus: changeOrderStatus;
}) => ManagementOrdersChangeStatus;

export const ManagementOrdersChangeStatusFactory: ManagementOrdersChangeStatusFactory = ({
  changeOrderStatus
}) => async (req, res) => {
  const { context } = res.locals;
  const { orderId } = req.params;
  const { status } = req.body;
  const { fields } = req.query;

  const order = await changeOrderStatus({ context, orderId, status });

  const response = ManagementOrdersChangeStatusResponseFactory({
    fields,
    order
  });

  res.status(STATUS_OK).json(response);
};
