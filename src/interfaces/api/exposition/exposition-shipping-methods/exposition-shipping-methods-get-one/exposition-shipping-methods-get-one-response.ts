import { ShippingMethod } from '../../../../../domain/shipping-method/shipping-method/shipping-method';
import { FieldsOption } from '../../../../../helpers/query';
import { filterFields } from '../../../../../helpers/filter-fields';

export type ExpositionShippingMethodsGetOneResponseFactory = (params: {
  fields?: FieldsOption<ShippingMethod>[];
  shippingMethod: ShippingMethod;
}) => Partial<ShippingMethod>;

export const ExpositionShippingMethodsGetOneResponseFactory: ExpositionShippingMethodsGetOneResponseFactory = ({
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
