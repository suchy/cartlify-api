import { RequestHandler } from 'express';

import { getPublishedProduct } from '../../../../../domain/product/get-published-product/get-published-product';
import { ExpositionProductsGetStockResponseFactory } from './exposition-products-get-stock-response';

import { STATUS_OK } from '../../../../../constants';

export type ExpositionProductsGetStock = RequestHandler<
  { productId: string },
  ReturnType<typeof ExpositionProductsGetStockResponseFactory>,
  any,
  {}
>;

type ExpositionProductsGetStockFactory = (dependencies: {
  getPublishedProduct: getPublishedProduct;
}) => ExpositionProductsGetStock;

export const ExpositionProductsGetStockFactory: ExpositionProductsGetStockFactory = ({
  getPublishedProduct
}) => async (req, res) => {
  const { context } = res.locals;
  const { productId } = req.params;

  const product = await getPublishedProduct({ context, productId });

  const response = ExpositionProductsGetStockResponseFactory({ product });

  res.status(STATUS_OK).json(response);
};
