import { PaymentMethod } from '../../../../domain/payment-method/payment-method/payment-method';
import { FieldsOption } from '../../../../helpers/query';
import { filterFields } from '../../../../helpers/filter-fields';

type ManagementPaymentMethodsResponseOneFactory = (params: {
  fields?: FieldsOption<PaymentMethod>[];
  paymentMethod: PaymentMethod;
}) => Partial<PaymentMethod>;

export const ManagementPaymentMethodsResponseOneFactory: ManagementPaymentMethodsResponseOneFactory = ({
  fields,
  paymentMethod
}) => {
  let paymentMethodWithFilteredFields: Partial<PaymentMethod> = paymentMethod;

  if (fields) {
    paymentMethodWithFilteredFields = filterFields<PaymentMethod>(fields)(
      paymentMethod
    );
  }

  return paymentMethodWithFilteredFields;
};
