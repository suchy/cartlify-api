import { Order } from '../../../../domain/order/order/order';
import { FieldsOption } from '../../../../helpers/query';
import { filterFields } from '../../../../helpers/filter-fields';

type ManagementOrdersResponseOneFactory = (params: {
  fields?: FieldsOption<Order>[];
  order: Order;
}) => Partial<Order>;

export const ManagementOrdersResponseOneFactory: ManagementOrdersResponseOneFactory = ({
  fields,
  order
}) => {
  let orderWithFilteredFields: Partial<Order> = order;

  if (fields) {
    orderWithFilteredFields = filterFields<Order>(fields)(order);
  }

  return orderWithFilteredFields;
};
