import { PaymentMethod } from '../../../../../domain/payment-method/payment-method/payment-method';
import { FieldsOption } from '../../../../../helpers/query';
import { filterFields } from '../../../../../helpers/filter-fields';

export type ManagementPaymentMethodsGetManyResponseFactory = (params: {
  fields?: FieldsOption<PaymentMethod>[];
  paymentMethods: PaymentMethod[];
  paymentMethodsCount: number;
  paymentMethodsPerPage: number;
}) => {
  paymentMethods: Partial<PaymentMethod>[];
  pages: number;
  total: number;
};

export const ManagementPaymentMethodsGetManyResponseFactory: ManagementPaymentMethodsGetManyResponseFactory = ({
  fields,
  paymentMethods,
  paymentMethodsCount,
  paymentMethodsPerPage
}) => {
  let paymentMethodsWithFilteredFields: Partial<PaymentMethod>[] = paymentMethods;

  if (fields) {
    const fieldsFilter = filterFields<PaymentMethod>(fields);
    paymentMethodsWithFilteredFields = paymentMethods.map(fieldsFilter);
  }

  const pagesCount = Math.ceil(paymentMethodsCount / paymentMethodsPerPage);

  return {
    paymentMethods: paymentMethodsWithFilteredFields,
    pages: pagesCount,
    total: paymentMethodsCount
  };
};
