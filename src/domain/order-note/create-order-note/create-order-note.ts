import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { OrderNote, OrderNoteFactory } from '../order-note/order-note';
import { OrderNotesRepository } from '../order-notes-repository';

import { OrdersRepository } from '../../order/orders-repository';

import { createId } from '../../../helpers/create-id';
import { throwNotFoundError } from '../../../helpers/errors/not-found-error';
import { PERMISSIONS } from '../../../constants';

export type createOrderNote = (params: {
  context: Context;
  orderId: string;
  content: string;
}) => Promise<OrderNote>;

export type CreateOrderNoteFactory = (deppendencies: {
  checkPermissions: checkPermissions;
  createId: createId;
  OrderNoteFactory: OrderNoteFactory;
  orderNotesRepository: OrderNotesRepository;
  ordersRepository: OrdersRepository;
  throwNotFoundError: throwNotFoundError;
}) => createOrderNote;

export const CreateOrderNoteFactory: CreateOrderNoteFactory = ({
  checkPermissions,
  createId,
  OrderNoteFactory,
  orderNotesRepository,
  ordersRepository,
  throwNotFoundError
}) => async ({ context, orderId, content }) => {
  checkPermissions(context, PERMISSIONS.ordersNotesCreate);

  const storeId = context.storeId as string;

  const order = ordersRepository.findOne({ storeId, id: orderId });

  if (!order) {
    return throwNotFoundError('Order not found.', { orderId });
  }

  const timestamp = new Date();

  const orderNote = OrderNoteFactory({
    content,
    createdAt: timestamp,
    id: createId(),
    orderId,
    storeId,
    updatedAt: timestamp
  });

  await orderNotesRepository.insert(orderNote);

  return orderNote;
};
