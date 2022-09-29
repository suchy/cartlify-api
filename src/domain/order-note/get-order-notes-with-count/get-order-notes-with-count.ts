import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { OrderNote } from '../order-note/order-note';
import { OrderNotesRepository } from '../order-notes-repository';

import { PERMISSIONS } from '../../../constants';
import { Query, QueryOptions } from '../../../helpers/query';

export type getOrderNotesWithCount = (params: {
  context: Context;
  orderId: string;
  query?: Query<OrderNote>;
  options?: QueryOptions<OrderNote>;
}) => Promise<{ orderNotes: OrderNote[]; orderNotesCount: number }>;

export type GetOrderNotesWithCountFactory = (dependencies: {
  checkPermissions: checkPermissions;
  orderNotesRepository: OrderNotesRepository;
}) => getOrderNotesWithCount;

export const GetOrderNotesWithCountFactory: GetOrderNotesWithCountFactory = ({
  checkPermissions,
  orderNotesRepository
}) => async ({ context, orderId, query = {}, options = {} }) => {
  checkPermissions(context, PERMISSIONS.ordersNotesRead);

  const { storeId } = context;

  const orderNotesQuery = { ...query, orderId, storeId };

  const [orderNotes, orderNotesCount] = await Promise.all([
    orderNotesRepository.find(orderNotesQuery, options),
    orderNotesRepository.count(orderNotesQuery)
  ]);

  return { orderNotes, orderNotesCount };
};
