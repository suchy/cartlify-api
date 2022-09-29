import { ShippingMethod } from '../../../../../domain/shipping-method/shipping-method/shipping-method';
import { FieldsOption } from '../../../../../helpers/query';
import { filterFields } from '../../../../../helpers/filter-fields';

export type ManagementShippingMethodsGetManyResponseFactory = (params: {
  fields?: FieldsOption<ShippingMethod>[];
  shippingMethods: ShippingMethod[];
  shippingMethodsCount: number;
  shippingMethodsPerPage: number;
}) => {
  shippingMethods: Partial<ShippingMethod>[];
  pages: number;
  total: number;
};

export const ManagementShippingMethodsGetManyResponseFactory: ManagementShippingMethodsGetManyResponseFactory = ({
  fields,
  shippingMethods,
  shippingMethodsCount,
  shippingMethodsPerPage
}) => {
  let shippingMethodsWithFilteredFields: Partial<ShippingMethod>[] = shippingMethods;

  if (fields) {
    const fieldsFilter = filterFields<ShippingMethod>(fields);
    shippingMethodsWithFilteredFields = shippingMethods.map(fieldsFilter);
  }

  const pagesCount = Math.ceil(shippingMethodsCount / shippingMethodsPerPage);

  return {
    shippingMethods: shippingMethodsWithFilteredFields,
    pages: pagesCount,
    total: shippingMethodsCount
  };
};
