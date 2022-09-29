import { OrderNote } from '../../../../domain/order-note/order-note/order-note';
import { FieldsOption } from '../../../../helpers/query';
import { filterFields } from '../../../../helpers/filter-fields';

type ManagementOrdersNotesResponseOneFactory = (params: {
  fields?: FieldsOption<OrderNote>[];
  orderNote: OrderNote;
}) => Partial<OrderNote>;

export const ManagementOrdersNotesResponseOneFactory: ManagementOrdersNotesResponseOneFactory = ({
  fields,
  orderNote
}) => {
  let orderNoteWithFilteredFields: Partial<OrderNote> = orderNote;

  if (fields) {
    orderNoteWithFilteredFields = filterFields<OrderNote>(fields)(orderNote);
  }

  return orderNoteWithFilteredFields;
};
