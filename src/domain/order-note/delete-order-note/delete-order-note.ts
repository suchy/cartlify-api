import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { OrderNotesRepository } from '../order-notes-repository';

import { throwNotFoundError } from '../../../helpers/errors/not-found-error';
import { PERMISSIONS } from '../../../constants';

export type deleteOrderNote = (params: {
  context: Context;
  orderNoteId: string;
}) => Promise<boolean>;

export type DeleteOrderNoteFactory = (dependencies: {
  checkPermissions: checkPermissions;
  orderNotesRepository: OrderNotesRepository;
  throwNotFoundError: throwNotFoundError;
}) => deleteOrderNote;

export const DeleteOrderNoteFactory: DeleteOrderNoteFactory = ({
  checkPermissions,
  orderNotesRepository,
  throwNotFoundError
}) => async ({ context, orderNoteId }) => {
  checkPermissions(context, PERMISSIONS.ordersNotesDelete);

  const { storeId } = context;

  const isDeleted = await orderNotesRepository.remove({
    storeId,
    id: orderNoteId
  });

  if (!isDeleted) {
    throwNotFoundError('Order note not found', { orderNoteId });
  }

  return isDeleted;
};
