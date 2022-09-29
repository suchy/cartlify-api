import { RequestHandler } from 'express';

import { unpublishProduct } from '../../../../../domain/product/unpublish-product/unpublish-product';
import { ManagementProductsUnpublishResponseFactory } from './management-products-unpublish-response';

import { STATUS_OK } from '../../../../../constants';
import { Product } from '../../../../../domain/product/product/product';
import { RequestQueryOne } from '../../../../../helpers/query';

export type ManagementProductsUnpublish = RequestHandler<
  { productId: string },
  ReturnType<typeof ManagementProductsUnpublishResponseFactory>,
  any,
  RequestQueryOne<Product>
>;

type ManagementProductsUnpublishFactory = (dependencies: {
  unpublishProduct: unpublishProduct;
}) => ManagementProductsUnpublish;

export const ManagementProductsUnpublishFactory: ManagementProductsUnpublishFactory = ({
  unpublishProduct
}) => async (req, res) => {
  const { context } = res.locals;
  const { productId } = req.params;
  const { fields } = req.query;

  const product = await unpublishProduct({ context, productId });

  const response = ManagementProductsUnpublishResponseFactory({
    fields,
    product
  });

  res.status(STATUS_OK).json(response);
};
