import { RequestHandler } from 'express';

import { getPaymentMethodsWithCount } from '../../../../../domain/payment-method/get-payment-methods-with-count/get-payment-methods-with-count';
import { ManagementPaymentMethodsGetManyResponseFactory } from './management-payment-methods-get-many-response';

import { STATUS_OK } from '../../../../../constants';
import { PaymentMethod } from '../../../../../domain/payment-method/payment-method/payment-method';
import { RequestQuery } from '../../../../../helpers/query';

export type ManagementPaymentMethodsGetMany = RequestHandler<
  {},
  ReturnType<typeof ManagementPaymentMethodsGetManyResponseFactory>,
  any,
  RequestQuery<PaymentMethod>
>;

type ManagementPaymentMethodsGetManyFactory = (dependencies: {
  getPaymentMethodsWithCount: getPaymentMethodsWithCount;
}) => ManagementPaymentMethodsGetMany;

export const ManagementPaymentMethodsGetManyFactory: ManagementPaymentMethodsGetManyFactory = ({
  getPaymentMethodsWithCount
}) => async (req, res) => {
  const { context } = res.locals;
  const { fields, sortBy, sortDir, page, perPage = 50, ...query } = req.query;

  const options = { sortBy, sortDir, page, perPage };

  const {
    paymentMethods,
    paymentMethodsCount
  } = await getPaymentMethodsWithCount({
    context,
    query,
    options
  });

  const response = ManagementPaymentMethodsGetManyResponseFactory({
    fields,
    paymentMethods,
    paymentMethodsCount,
    paymentMethodsPerPage: perPage
  });

  res.status(STATUS_OK).json(response);
};
