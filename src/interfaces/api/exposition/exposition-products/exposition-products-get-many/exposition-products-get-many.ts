import { RequestHandler } from 'express';

import { getPublishedProductsWithCount } from '../../../../../domain/product/get-published-products-with-count/get-published-products-with-count';
import { ExpositionProductsGetManyResponseFactory } from './exposition-products-get-many-response';

import { STATUS_OK } from '../../../../../constants';
import { Product } from '../../../../../domain/product/product/product';
import { RequestQuery } from '../../../../../helpers/query';

export type ExpositionProductsGetMany = RequestHandler<
  {},
  ReturnType<typeof ExpositionProductsGetManyResponseFactory>,
  any,
  RequestQuery<Product>
>;

type ExpositionProductsGetManyFactory = (dependencies: {
  getPublishedProductsWithCount: getPublishedProductsWithCount;
}) => ExpositionProductsGetMany;

export const ExpositionProductsGetManyFactory: ExpositionProductsGetManyFactory = ({
  getPublishedProductsWithCount
}) => async (req, res) => {
  const { context } = res.locals;
  const { fields, sortBy, sortDir, page, perPage = 50, ...query } = req.query;

  const options = { sortBy, sortDir, page, perPage };

  const {
    publishedProducts,
    publishedProductsCount
  } = await getPublishedProductsWithCount({
    context,
    query,
    options
  });

  const response = ExpositionProductsGetManyResponseFactory({
    fields,
    products: publishedProducts,
    productsCount: publishedProductsCount,
    productsPerPage: perPage
  });

  res.status(STATUS_OK).json(response);
};
