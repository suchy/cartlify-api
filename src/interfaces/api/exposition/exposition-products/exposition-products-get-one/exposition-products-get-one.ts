import { RequestHandler } from 'express';

import { getPublishedProduct } from '../../../../../domain/product/get-published-product/get-published-product';
import { ExpositionProductsGetOneResponseFactory } from './exposition-products-get-one-response';

import { STATUS_OK } from '../../../../../constants';
import { Product } from '../../../../../domain/product/product/product';
import { RequestQueryOne } from '../../../../../helpers/query';

export type ExpositionProductsGetOne = RequestHandler<
  { productId: string },
  ReturnType<typeof ExpositionProductsGetOneResponseFactory>,
  any,
  RequestQueryOne<Product>
>;

type ExpositionProductsGetOneFactory = (dependencies: {
  getPublishedProduct: getPublishedProduct;
}) => ExpositionProductsGetOne;

export const ExpositionProductsGetOneFactory: ExpositionProductsGetOneFactory = ({
  getPublishedProduct
}) => async (req, res) => {
  const { context } = res.locals;
  const { productId } = req.params;
  const { fields } = req.query;

  const product = await getPublishedProduct({ context, productId });

  const response = ExpositionProductsGetOneResponseFactory({ fields, product });

  res.status(STATUS_OK).json(response);
};
