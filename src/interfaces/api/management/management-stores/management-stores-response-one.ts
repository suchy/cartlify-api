import { Store } from '../../../../domain/store/store/store';
import { FieldsOption } from '../../../../helpers/query';
import { filterFields } from '../../../../helpers/filter-fields';

type ManagementStoresResponseOneFactory = (params: {
  fields?: FieldsOption<Store>[];
  store: Store;
}) => Partial<Store>;

export const ManagementStoresResponseOneFactory: ManagementStoresResponseOneFactory = ({
  fields,
  store
}) => {
  let storeWithFilteredFields: Partial<Store> = store;

  if (fields) {
    storeWithFilteredFields = filterFields<Store>(fields)(store);
  }

  return storeWithFilteredFields;
};
