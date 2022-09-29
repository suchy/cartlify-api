import { RequestHandler } from 'express';

import { getPublishedShippingMethodsWithCount } from '../../../../../domain/shipping-method/get-published-shipping-methods-with-count/get-published-shipping-methods-with-count';
import { ExpositionShippingMethodsGetManyResponseFactory } from './exposition-shipping-methods-get-many-response';

import { STATUS_OK } from '../../../../../constants';
import { ShippingMethod } from '../../../../../domain/shipping-method/shipping-method/shipping-method';
import { RequestQuery } from '../../../../../helpers/query';

export type ExpositionShippingMethodsGetMany = RequestHandler<
  {},
  ReturnType<typeof ExpositionShippingMethodsGetManyResponseFactory>,
  any,
  RequestQuery<ShippingMethod>
>;

type ExpositionShippingMethodsGetManyFactory = (dependencies: {
  getPublishedShippingMethodsWithCount: getPublishedShippingMethodsWithCount;
}) => ExpositionShippingMethodsGetMany;

export const ExpositionShippingMethodsGetManyFactory: ExpositionShippingMethodsGetManyFactory = ({
  getPublishedShippingMethodsWithCount
}) => async (req, res) => {
  const { context } = res.locals;
  const { fields, sortBy, sortDir, page, perPage = 50, ...query } = req.query;

  const options = { sortBy, sortDir, page, perPage };

  const {
    publishedShippingMethods,
    publishedShippingMethodsCount
  } = await getPublishedShippingMethodsWithCount({
    context,
    query,
    options
  });

  const response = ExpositionShippingMethodsGetManyResponseFactory({
    fields,
    shippingMethods: publishedShippingMethods,
    shippingMethodsCount: publishedShippingMethodsCount,
    shippingMethodsPerPage: perPage
  });

  res.status(STATUS_OK).json(response);
};
