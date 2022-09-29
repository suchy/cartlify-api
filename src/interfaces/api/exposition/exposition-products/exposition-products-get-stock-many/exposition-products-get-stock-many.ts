import { RequestHandler } from 'express';

import { getPublishedProductsWithCount } from '../../../../../domain/product/get-published-products-with-count/get-published-products-with-count';
import { ExpositionProductsGetStockManyResponseFactory } from './exposition-products-get-stock-many-response';

import { STATUS_OK } from '../../../../../constants';
import { Product } from '../../../../../domain/product/product/product';
import { RequestQuery } from '../../../../../helpers/query';

export type ExpositionProductsGetStockMany = RequestHandler<
  {},
  ReturnType<typeof ExpositionProductsGetStockManyResponseFactory>,
  any,
  Omit<RequestQuery<Product>, 'fields'>
>;

type ExpositionProductsGetStockManyFactory = (dependencies: {
  getPublishedProductsWithCount: getPublishedProductsWithCount;
}) => ExpositionProductsGetStockMany;

export const ExpositionProductsGetStockManyFactory: ExpositionProductsGetStockManyFactory = ({
  getPublishedProductsWithCount
}) => async (req, res) => {
  const { context } = res.locals;
  const { sortBy, sortDir, page, perPage = 50, ...query } = req.query;

  const options = { sortBy, sortDir, page, perPage };

  const {
    publishedProducts,
    publishedProductsCount
  } = await getPublishedProductsWithCount({
    context,
    query,
    options
  });

  const response = ExpositionProductsGetStockManyResponseFactory({
    products: publishedProducts,
    productsCount: publishedProductsCount,
    productsPerPage: perPage
  });

  res.status(STATUS_OK).json(response);
};
