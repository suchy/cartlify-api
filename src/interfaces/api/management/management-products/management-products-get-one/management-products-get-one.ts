import { RequestHandler } from 'express';

import { getProduct } from '../../../../../domain/product/get-product/get-product';
import { ManagementProductsGetOneResponseFactory } from './management-products-get-one-response';

import { STATUS_OK } from '../../../../../constants';
import { Product } from '../../../../../domain/product/product/product';
import { RequestQueryOne } from '../../../../../helpers/query';

export type ManagementProductsGetOne = RequestHandler<
  { productId: string },
  ReturnType<typeof ManagementProductsGetOneResponseFactory>,
  any,
  RequestQueryOne<Product>
>;

type ManagementProductsGetOneFactory = (dependencies: {
  getProduct: getProduct;
}) => ManagementProductsGetOne;

export const ManagementProductsGetOneFactory: ManagementProductsGetOneFactory = ({
  getProduct
}) => async (req, res) => {
  const { context } = res.locals;
  const { productId } = req.params;
  const { fields } = req.query;

  const product = await getProduct({ context, productId });

  const response = ManagementProductsGetOneResponseFactory({ fields, product });

  res.status(STATUS_OK).json(response);
};
