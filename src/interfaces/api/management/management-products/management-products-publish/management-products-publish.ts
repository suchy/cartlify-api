import { RequestHandler } from 'express';

import { publishProduct } from '../../../../../domain/product/publish-product/publish-product';
import { ManagementProductsPublishResponseFactory } from './management-products-publish-response';

import { STATUS_OK } from '../../../../../constants';
import { Product } from '../../../../../domain/product/product/product';
import { RequestQueryOne } from '../../../../../helpers/query';

export type ManagementProductsPublish = RequestHandler<
  { productId: string },
  ReturnType<typeof ManagementProductsPublishResponseFactory>,
  any,
  RequestQueryOne<Product>
>;

type ManagementProductsPublishFactory = (dependencies: {
  publishProduct: publishProduct;
}) => ManagementProductsPublish;

export const ManagementProductsPublishFactory: ManagementProductsPublishFactory = ({
  publishProduct
}) => async (req, res) => {
  const { context } = res.locals;
  const { productId } = req.params;
  const { fields } = req.query;

  const product = await publishProduct({ context, productId });

  const response = ManagementProductsPublishResponseFactory({
    fields,
    product
  });

  res.status(STATUS_OK).json(response);
};
