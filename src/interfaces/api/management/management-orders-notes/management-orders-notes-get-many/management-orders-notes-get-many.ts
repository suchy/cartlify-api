import { RequestHandler } from 'express';

import { getOrderNotesWithCount } from '../../../../../domain/order-note/get-order-notes-with-count/get-order-notes-with-count';
import { ManagementOrdersNotesGetManyResponseFactory } from './management-orders-notes-get-many-response';

import { STATUS_OK } from '../../../../../constants';
import { OrderNote } from '../../../../../domain/order-note/order-note/order-note';
import { RequestQuery } from '../../../../../helpers/query';

export type ManagementOrdersNotesGetMany = RequestHandler<
  { orderId: string },
  ReturnType<typeof ManagementOrdersNotesGetManyResponseFactory>,
  any,
  RequestQuery<OrderNote>
>;

type ManagementOrdersNotesGetManyFactory = (dependencies: {
  getOrderNotesWithCount: getOrderNotesWithCount;
}) => ManagementOrdersNotesGetMany;

export const ManagementOrdersNotesGetManyFactory: ManagementOrdersNotesGetManyFactory = ({
  getOrderNotesWithCount
}) => async (req, res) => {
  const { context } = res.locals;
  const { orderId } = req.params;
  const { fields, sortBy, sortDir, page, perPage = 50, ...query } = req.query;

  const options = { sortBy, sortDir, page, perPage };

  const { orderNotes, orderNotesCount } = await getOrderNotesWithCount({
    context,
    orderId,
    query,
    options
  });

  const response = ManagementOrdersNotesGetManyResponseFactory({
    fields,
    orderNotes,
    orderNotesCount,
    orderNotesPerPage: perPage
  });

  res.status(STATUS_OK).json(response);
};
