import { RequestHandler } from 'express';

import { changeOrderNoteContent } from '../../../../../domain/order-note/change-order-note-content/change-order-note-content';
import { ManagementOrdersNotesChangeContentResponseFactory } from './management-orders-notes-change-content-response';

import { STATUS_OK } from '../../../../../constants';
import { OrderNote } from '../../../../../domain/order-note/order-note/order-note';
import { RequestQueryOne } from '../../../../../helpers/query';

export type ManagementOrdersNotesChangeContent = RequestHandler<
  { orderNoteId: string },
  ReturnType<typeof ManagementOrdersNotesChangeContentResponseFactory>,
  { content: string },
  RequestQueryOne<OrderNote>
>;

type ManagementOrdersNotesChangeContentFactory = (dependencies: {
  changeOrderNoteContent: changeOrderNoteContent;
}) => ManagementOrdersNotesChangeContent;

export const ManagementOrdersNotesChangeContentFactory: ManagementOrdersNotesChangeContentFactory = ({
  changeOrderNoteContent
}) => async (req, res) => {
  const { context } = res.locals;
  const { orderNoteId } = req.params;
  const { content } = req.body;
  const { fields } = req.query;

  const orderNote = await changeOrderNoteContent({
    context,
    orderNoteId,
    content
  });

  const response = ManagementOrdersNotesChangeContentResponseFactory({
    fields,
    orderNote
  });

  res.status(STATUS_OK).json(response);
};
