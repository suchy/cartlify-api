import { RequestHandler } from 'express';

import { getOrderNote } from '../../../../../domain/order-note/get-order-note/get-order-note';
import { ManagementOrdersNotesGetOneResponseFactory } from './management-orders-notes-get-one-response';

import { STATUS_OK } from '../../../../../constants';
import { OrderNote } from '../../../../../domain/order-note/order-note/order-note';
import { RequestQueryOne } from '../../../../../helpers/query';

export type ManagementOrdersNotesGetOne = RequestHandler<
  { orderNoteId: string },
  ReturnType<typeof ManagementOrdersNotesGetOneResponseFactory>,
  { content: string },
  RequestQueryOne<OrderNote>
>;

type ManagementOrdersNotesGetOneFactory = (dependencies: {
  getOrderNote: getOrderNote;
}) => ManagementOrdersNotesGetOne;

export const ManagementOrdersNotesGetOneFactory: ManagementOrdersNotesGetOneFactory = ({
  getOrderNote
}) => async (req, res) => {
  const { context } = res.locals;
  const { orderNoteId } = req.params;
  const { fields } = req.query;

  const orderNote = await getOrderNote({ context, orderNoteId });

  const response = ManagementOrdersNotesGetOneResponseFactory({
    fields,
    orderNote
  });

  res.status(STATUS_OK).json(response);
};
