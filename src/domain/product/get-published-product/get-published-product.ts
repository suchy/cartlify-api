import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { Product } from '../product/product';
import { ProductsRepository } from '../products-repository';

import { throwNotFoundError } from '../../../helpers/errors/not-found-error';
import { PERMISSIONS } from '../../../constants';

export type getPublishedProduct = (params: {
  context: Context;
  productId: string;
}) => Promise<Product>;

export type GetPublishedProductFactory = (dependencies: {
  checkPermissions: checkPermissions;
  productsRepository: ProductsRepository;
  throwNotFoundError: throwNotFoundError;
}) => getPublishedProduct;

export const GetPublishedProductFactory: GetPublishedProductFactory = ({
  checkPermissions,
  productsRepository,
  throwNotFoundError
}) => async ({ context, productId }) => {
  checkPermissions(context, PERMISSIONS.productsRead);

  const storeId = context.storeId as string;

  const query = { storeId, id: productId, published: true };

  const publishedProduct = await productsRepository.findOne(query);

  if (!publishedProduct) {
    return throwNotFoundError('Product not found', { productId });
  }

  return publishedProduct;
};
