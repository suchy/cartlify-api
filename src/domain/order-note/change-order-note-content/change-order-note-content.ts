import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { OrderNote } from '../order-note/order-note';
import { OrderNotesRepository } from '../order-notes-repository';
import { OrderNoteServiceFactory } from '../order-note-service/order-note-service';

import { throwNotFoundError } from '../../../helpers/errors/not-found-error';
import { PERMISSIONS } from '../../../constants';

export type changeOrderNoteContent = (params: {
  context: Context;
  orderNoteId: string;
  content: string;
}) => Promise<OrderNote>;

export type ChangeOrderNoteContentFactory = (dependencies: {
  checkPermissions: checkPermissions;
  orderNotesRepository: OrderNotesRepository;
  OrderNoteServiceFactory: OrderNoteServiceFactory;
  throwNotFoundError: throwNotFoundError;
}) => changeOrderNoteContent;

export const ChangeOrderNoteContentFactory: ChangeOrderNoteContentFactory = ({
  checkPermissions,
  orderNotesRepository,
  OrderNoteServiceFactory,
  throwNotFoundError
}) => async ({ context, orderNoteId, content }) => {
  checkPermissions(context, PERMISSIONS.ordersNotesWrite);

  const storeId = context.storeId as string;

  const query = { storeId, id: orderNoteId };

  const orderNote = await orderNotesRepository.findOne(query);

  if (!orderNote) {
    return throwNotFoundError('Order note not found.', { orderNoteId });
  }

  const orderNoteService = OrderNoteServiceFactory(orderNote);

  const changedOrderNote = orderNoteService.changeContent(content);

  const isUpdated = await orderNotesRepository.update(query, changedOrderNote);

  if (!isUpdated) {
    return throwNotFoundError('Order note not found', { orderNoteId });
  }

  return changedOrderNote;
};
