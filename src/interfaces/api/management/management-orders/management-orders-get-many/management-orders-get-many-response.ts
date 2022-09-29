import { Order } from '../../../../../domain/order/order/order';
import { FieldsOption } from '../../../../../helpers/query';
import { filterFields } from '../../../../../helpers/filter-fields';

export type ManagementOrdersGetManyResponseFactory = (params: {
  fields?: FieldsOption<Order>[];
  orders: Order[];
  ordersCount: number;
  ordersPerPage: number;
}) => {
  orders: Partial<Order>[];
  pages: number;
  total: number;
};

export const ManagementOrdersGetManyResponseFactory: ManagementOrdersGetManyResponseFactory = ({
  fields,
  orders,
  ordersCount,
  ordersPerPage
}) => {
  let ordersWithFilteredFields: Partial<Order>[] = orders;

  if (fields) {
    const fieldsFilter = filterFields<Order>(fields);
    ordersWithFilteredFields = orders.map(fieldsFilter);
  }

  const pagesCount = Math.ceil(ordersCount / ordersPerPage);

  return {
    orders: ordersWithFilteredFields,
    pages: pagesCount,
    total: ordersCount
  };
};
