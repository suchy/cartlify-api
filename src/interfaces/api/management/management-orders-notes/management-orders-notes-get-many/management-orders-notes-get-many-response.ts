import { OrderNote } from '../../../../../domain/order-note/order-note/order-note';
import { FieldsOption } from '../../../../../helpers/query';
import { filterFields } from '../../../../../helpers/filter-fields';

type ManagementOrdersNotesGetManyResponseFactory = (params: {
  fields?: FieldsOption<OrderNote>[];
  orderNotes: OrderNote[];
  orderNotesCount: number;
  orderNotesPerPage: number;
}) => {
  orderNotes: Partial<OrderNote>[];
  pages: number;
  total: number;
};

export const ManagementOrdersNotesGetManyResponseFactory: ManagementOrdersNotesGetManyResponseFactory = ({
  fields,
  orderNotes,
  orderNotesCount,
  orderNotesPerPage
}) => {
  let orderNotesWithFilteredFields: Partial<OrderNote>[] = orderNotes;

  if (fields) {
    const fieldsFilter = filterFields<OrderNote>(fields);
    orderNotesWithFilteredFields = orderNotes.map(fieldsFilter);
  }

  const pagesCount = Math.ceil(orderNotesCount / orderNotesPerPage);

  return {
    orderNotes: orderNotesWithFilteredFields,
    pages: pagesCount,
    total: orderNotesCount
  };
};
