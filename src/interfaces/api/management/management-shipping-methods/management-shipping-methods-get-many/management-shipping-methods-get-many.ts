import { RequestHandler } from 'express';

import { getShippingMethodsWithCount } from '../../../../../domain/shipping-method/get-shipping-methods-with-count/get-shipping-methods-with-count';
import { ManagementShippingMethodsGetManyResponseFactory } from './management-shipping-methods-get-many-response';

import { STATUS_OK } from '../../../../../constants';
import { ShippingMethod } from '../../../../../domain/shipping-method/shipping-method/shipping-method';
import { RequestQuery } from '../../../../../helpers/query';

export type ManagementShippingMethodsGetMany = RequestHandler<
  {},
  ReturnType<typeof ManagementShippingMethodsGetManyResponseFactory>,
  any,
  RequestQuery<ShippingMethod>
>;

type ManagementShippingMethodsGetManyFactory = (dependencies: {
  getShippingMethodsWithCount: getShippingMethodsWithCount;
}) => ManagementShippingMethodsGetMany;

export const ManagementShippingMethodsGetManyFactory: ManagementShippingMethodsGetManyFactory = ({
  getShippingMethodsWithCount
}) => async (req, res) => {
  const { context } = res.locals;
  const { fields, sortBy, sortDir, page, perPage = 50, ...query } = req.query;

  const options = { sortBy, sortDir, page, perPage };

  const {
    shippingMethods,
    shippingMethodsCount
  } = await getShippingMethodsWithCount({
    context,
    query,
    options
  });

  const response = ManagementShippingMethodsGetManyResponseFactory({
    fields,
    shippingMethods,
    shippingMethodsCount,
    shippingMethodsPerPage: perPage
  });

  res.status(STATUS_OK).json(response);
};
