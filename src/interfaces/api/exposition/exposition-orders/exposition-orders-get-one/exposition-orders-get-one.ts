import { RequestHandler } from 'express';

import { getOrder } from '../../../../../domain/order/get-order/get-order';
import { ExpositionOrdersGetOneResponseFactory } from './exposition-orders-get-one-response';

import { STATUS_OK } from '../../../../../constants';
import { Order } from '../../../../../domain/order/order/order';
import { RequestQueryOne } from '../../../../../helpers/query';

type OrderFields = Omit<Order, 'client' | 'comment'>;

export type ExpositionOrdersGetOne = RequestHandler<
  { orderId: string },
  ReturnType<typeof ExpositionOrdersGetOneResponseFactory>,
  any,
  RequestQueryOne<OrderFields>
>;

type ExpositionOrdersGetOneFactory = (dependencies: {
  getOrder: getOrder;
}) => ExpositionOrdersGetOne;

export const ExpositionOrdersGetOneFactory: ExpositionOrdersGetOneFactory = ({
  getOrder
}) => async (req, res) => {
  const { context } = res.locals;
  const { orderId } = req.params;
  const { fields } = req.query;

  const order = await getOrder({
    context,
    orderId
  });

  const response = ExpositionOrdersGetOneResponseFactory({
    fields,
    order
  });

  res.status(STATUS_OK).json(response);
};
