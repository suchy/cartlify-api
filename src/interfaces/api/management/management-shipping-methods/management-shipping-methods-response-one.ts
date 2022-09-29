import { ShippingMethod } from '../../../../domain/shipping-method/shipping-method/shipping-method';
import { FieldsOption } from '../../../../helpers/query';
import { filterFields } from '../../../../helpers/filter-fields';

type ManagementShippingMethodsResponseOneFactory = (params: {
  fields?: FieldsOption<ShippingMethod>[];
  shippingMethod: ShippingMethod;
}) => Partial<ShippingMethod>;

export const ManagementShippingMethodsResponseOneFactory: ManagementShippingMethodsResponseOneFactory = ({
  fields,
  shippingMethod
}) => {
  let shippingMethodWithFilteredFields: Partial<ShippingMethod> = shippingMethod;

  if (fields) {
    shippingMethodWithFilteredFields = filterFields<ShippingMethod>(fields)(
      shippingMethod
    );
  }

  return shippingMethodWithFilteredFields;
};
