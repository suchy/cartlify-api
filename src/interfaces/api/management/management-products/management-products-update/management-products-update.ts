import { RequestHandler } from 'express';

import { changeProduct } from '../../../../../domain/product/change-product/change-product';
import { ManagementProductsUpdateResponseFactory } from './management-products-update-response';

import { STATUS_OK } from '../../../../../constants';
import { Product } from '../../../../../domain/product/product/product';
import { RequestQueryOne } from '../../../../../helpers/query';

export type ManagementProductsUpdate = RequestHandler<
  { productId: string },
  ReturnType<typeof ManagementProductsUpdateResponseFactory>,
  any,
  RequestQueryOne<Product>
>;

type ManagementProductsUpdateFactory = (dependencies: {
  changeProduct: changeProduct;
}) => ManagementProductsUpdate;

export const ManagementProductsUpdateFactory: ManagementProductsUpdateFactory = ({
  changeProduct
}) => async (req, res) => {
  const { context } = res.locals;
  const { productId } = req.params;
  const productProps = req.body;
  const { fields } = req.query;

  const product = await changeProduct({
    context,
    productId,
    productProps
  });

  const response = ManagementProductsUpdateResponseFactory({ fields, product });

  res.status(STATUS_OK).json(response);
};
