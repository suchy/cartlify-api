import { RequestHandler } from 'express';

import { getOrdersWithCount } from '../../../../../domain/order/get-orders-with-count/get-orders-with-count';
import { ManagementOrdersGetManyResponseFactory } from './management-orders-get-many-response';

import { STATUS_OK } from '../../../../../constants';
import { Order } from '../../../../../domain/order/order/order';
import { RequestQuery } from '../../../../../helpers/query';

export type ManagementOrdersGetMany = RequestHandler<
  {},
  ReturnType<typeof ManagementOrdersGetManyResponseFactory>,
  {},
  RequestQuery<Order>
>;

type ManagementOrdersGetManyFactory = (dependencies: {
  getOrdersWithCount: getOrdersWithCount;
}) => ManagementOrdersGetMany;

export const ManagementOrdersGetManyFactory: ManagementOrdersGetManyFactory = ({
  getOrdersWithCount
}) => async (req, res) => {
  const { context } = res.locals;
  const { fields, sortBy, sortDir, page, perPage = 50, ...query } = req.query;

  const options = { sortBy, sortDir, page, perPage };

  const { orders, ordersCount } = await getOrdersWithCount({
    context,
    query,
    options
  });

  const response = ManagementOrdersGetManyResponseFactory({
    fields,
    orders,
    ordersCount,
    ordersPerPage: perPage
  });

  res.status(STATUS_OK).json(response);
};
