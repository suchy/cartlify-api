import { RequestHandler } from 'express';

import { createProduct } from '../../../../../domain/product/create-product/create-product';
import { ManagementProductsCreateResponseFactory } from './management-products-create-response';

import { STATUS_CREATED } from '../../../../../constants';
import { Product } from '../../../../../domain/product/product/product';
import { RequestQueryOne } from '../../../../../helpers/query';

export type ManagementProductsCreate = RequestHandler<
  {},
  ReturnType<typeof ManagementProductsCreateResponseFactory>,
  any,
  RequestQueryOne<Product>
>;

type ManagementProductsCreateFactory = (dependencies: {
  createProduct: createProduct;
}) => ManagementProductsCreate;

export const ManagementProductsCreateFactory: ManagementProductsCreateFactory = ({
  createProduct
}) => async (req, res) => {
  const { context } = res.locals;
  const productProps = req.body;
  const { fields } = req.query;

  const product = await createProduct({
    context,
    productProps
  });

  const response = ManagementProductsCreateResponseFactory({ fields, product });

  res.status(STATUS_CREATED).json(response);
};
