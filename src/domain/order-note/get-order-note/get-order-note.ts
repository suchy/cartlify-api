import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { OrderNote } from '../order-note/order-note';
import { OrderNotesRepository } from '../order-notes-repository';

import { throwNotFoundError } from '../../../helpers/errors/not-found-error';
import { PERMISSIONS } from '../../../constants';

interface GetOrderNoteFactoryDependencies {
  checkPermissions: checkPermissions;
  orderNotesRepository: OrderNotesRepository;
  throwNotFoundError: throwNotFoundError;
}

interface GetOrderNoteParams {
  context: Context;
  orderNoteId: string;
}

export type getOrderNote = (params: GetOrderNoteParams) => Promise<OrderNote>;

export type GetOrderNoteFactory = (
  dependencies: GetOrderNoteFactoryDependencies
) => getOrderNote;

export const GetOrderNoteFactory: GetOrderNoteFactory = ({
  checkPermissions,
  orderNotesRepository,
  throwNotFoundError
}) => async ({ context, orderNoteId }) => {
  checkPermissions(context, PERMISSIONS.ordersNotesRead);

  const { storeId } = context;

  const query = { storeId, id: orderNoteId };

  const orderNote = await orderNotesRepository.findOne(query);

  if (!orderNote) {
    return throwNotFoundError('Order note not found', { orderNoteId });
  }

  return orderNote;
};
