import { RequestHandler } from 'express';

import { createOrder } from '../../../../../domain/order/create-order/create-order';
import { ExpositionOrdersCreateResponseFactory } from './exposition-orders-create-response';

import { STATUS_CREATED } from '../../../../../constants';
import { Order } from '../../../../../domain/order/order/order';
import { RequestQueryOne } from '../../../../../helpers/query';

export type ExpositionOrdersCreate = RequestHandler<
  {},
  ReturnType<typeof ExpositionOrdersCreateResponseFactory>,
  any,
  RequestQueryOne<Order>
>;

type ExpositionOrdersCreateFactory = (dependencies: {
  createOrder: createOrder;
}) => ExpositionOrdersCreate;

export const ExpositionOrdersCreateFactory: ExpositionOrdersCreateFactory = ({
  createOrder
}) => async (req, res) => {
  const { context } = res.locals;
  const { fields } = req.query;

  const order = await createOrder({
    ...req.body,
    context
  });

  const response = ExpositionOrdersCreateResponseFactory({
    fields,
    order
  });

  res.status(STATUS_CREATED).json(response);
};
