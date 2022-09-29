import { Order } from '../../../../../domain/order/order/order';
import { FieldsOption } from '../../../../../helpers/query';
import { filterFields } from '../../../../../helpers/filter-fields';

export type ExpositionOrdersGetOneResponseFactory = (params: {
  fields?: FieldsOption<Order>[];
  order: Order;
}) => Partial<Order>;

export const ExpositionOrdersGetOneResponseFactory: ExpositionOrdersGetOneResponseFactory = ({
  fields,
  order
}) => {
  let orderWithFilteredFields: Partial<Order> = order;

  if (fields) {
    orderWithFilteredFields = filterFields(fields)(order);
  }

  return orderWithFilteredFields;
};
