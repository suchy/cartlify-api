import { PaymentMethod } from '../../../../../domain/payment-method/payment-method/payment-method';
import { FieldsOption } from '../../../../../helpers/query';
import { filterFields } from '../../../../../helpers/filter-fields';

export type ExpositionPaymentMethodsGetOneResponseFactory = (params: {
  fields?: FieldsOption<PaymentMethod>[];
  paymentMethod: PaymentMethod;
}) => Partial<PaymentMethod>;

export const ExpositionPaymentMethodsGetOneResponseFactory: ExpositionPaymentMethodsGetOneResponseFactory = ({
  fields,
  paymentMethod
}) => {
  let paymentMethodWithFilteredFields: Partial<PaymentMethod> = paymentMethod;

  if (fields) {
    paymentMethodWithFilteredFields = filterFields(fields)(paymentMethod);
  }

  return paymentMethodWithFilteredFields;
};
