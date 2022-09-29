import { RequestHandler } from 'express';

import { getProductsWithCount } from '../../../../../domain/product/get-products-with-count/get-products-with-count';
import { ManagementProductsGetManyResponseFactory } from './management-products-get-many-response';

import { STATUS_OK } from '../../../../../constants';
import { Product } from '../../../../../domain/product/product/product';
import { RequestQuery } from '../../../../../helpers/query';

export type ManagementProductsGetMany = RequestHandler<
  {},
  ReturnType<typeof ManagementProductsGetManyResponseFactory>,
  any,
  RequestQuery<Product>
>;

type ManagementProductsGetManyFactory = (dependencies: {
  getProductsWithCount: getProductsWithCount;
}) => ManagementProductsGetMany;

export const ManagementProductsGetManyFactory: ManagementProductsGetManyFactory = ({
  getProductsWithCount
}) => async (req, res) => {
  const { context } = res.locals;
  const { fields, sortBy, sortDir, page, perPage = 50, ...query } = req.query;

  const options = { sortBy, sortDir, page, perPage };

  const { products, productsCount } = await getProductsWithCount({
    context,
    query,
    options
  });

  const response = ManagementProductsGetManyResponseFactory({
    fields,
    products,
    productsCount,
    productsPerPage: perPage
  });

  res.status(STATUS_OK).json(response);
};
