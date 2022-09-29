import { RequestHandler } from 'express';

import { deleteOrderNote } from '../../../../../domain/order-note/delete-order-note/delete-order-note';

import { STATUS_NO_CONTENT } from '../../../../../constants';

export type ManagementOrdersNotesDelete = RequestHandler<
  { orderNoteId: string },
  {},
  any,
  any
>;

type ManagementOrdersNotesDeleteFactory = (dependencies: {
  deleteOrderNote: deleteOrderNote;
}) => ManagementOrdersNotesDelete;

export const ManagementOrdersNotesDeleteFactory: ManagementOrdersNotesDeleteFactory = ({
  deleteOrderNote
}) => async (req, res) => {
  const { context } = res.locals;
  const { orderNoteId } = req.params;

  await deleteOrderNote({
    context,
    orderNoteId
  });

  res.status(STATUS_NO_CONTENT).json();
};
