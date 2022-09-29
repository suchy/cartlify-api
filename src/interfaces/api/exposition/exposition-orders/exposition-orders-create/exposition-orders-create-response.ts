import { Order } from '../../../../../domain/order/order/order';
import { FieldsOption } from '../../../../../helpers/query';
import { filterFields } from '../../../../../helpers/filter-fields';

export type ExpositionOrdersCreateResponseFactory = (params: {
  fields?: FieldsOption<Order>[];
  order: Order;
}) => Partial<Order>;

export const ExpositionOrdersCreateResponseFactory: ExpositionOrdersCreateResponseFactory = ({
  fields,
  order
}) => {
  let orderWithFilteredFields: Partial<Order> = order;

  if (fields) {
    orderWithFilteredFields = filterFields(fields)(order);
  }

  return orderWithFilteredFields;
};
