import { RequestHandler } from 'express';

import { createOrderNote } from '../../../../../domain/order-note/create-order-note/create-order-note';
import { ManagementOrdersNotesCreateResponseFactory } from './management-orders-notes-create-response';

import { STATUS_CREATED } from '../../../../../constants';
import { OrderNote } from '../../../../../domain/order-note/order-note/order-note';
import { RequestQueryOne } from '../../../../../helpers/query';

export type ManagementOrdersNotesCreate = RequestHandler<
  { orderId: string },
  ReturnType<typeof ManagementOrdersNotesCreateResponseFactory>,
  { content: string },
  RequestQueryOne<OrderNote>
>;

type ManagementOrdersNotesCreateFactory = (dependencies: {
  createOrderNote: createOrderNote;
}) => ManagementOrdersNotesCreate;

export const ManagementOrdersNotesCreateFactory: ManagementOrdersNotesCreateFactory = ({
  createOrderNote
}) => async (req, res) => {
  const { context } = res.locals;
  const { orderId } = req.params;
  const { content } = req.body;
  const { fields } = req.query;

  const orderNote = await createOrderNote({
    context,
    orderId,
    content
  });

  const response = ManagementOrdersNotesCreateResponseFactory({
    fields,
    orderNote
  });

  res.status(STATUS_CREATED).json(response);
};
