import { RequestHandler } from 'express';

import { deleteProduct } from '../../../../../domain/product/delete-product/delete-product';

import { STATUS_NO_CONTENT } from '../../../../../constants';

export type ManagementProductsDelete = RequestHandler<
  { productId: string },
  {},
  any,
  any
>;

type ManagementProductsDeleteFactory = (dependencies: {
  deleteProduct: deleteProduct;
}) => ManagementProductsDelete;

export const ManagementProductsDeleteFactory: ManagementProductsDeleteFactory = ({
  deleteProduct
}) => async (req, res) => {
  const { context } = res.locals;
  const { productId } = req.params;

  await deleteProduct({
    context,
    productId
  });

  res.status(STATUS_NO_CONTENT).json();
};
