import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { Product } from '../product/product';
import { ProductsRepository } from '../products-repository';

import { throwNotFoundError } from '../../../helpers/errors/not-found-error';
import { PERMISSIONS } from '../../../constants';

export type getProduct = (params: {
  context: Context;
  productId: string;
}) => Promise<Product>;

export type GetProductFactory = (dependencies: {
  checkPermissions: checkPermissions;
  productsRepository: ProductsRepository;
  throwNotFoundError: throwNotFoundError;
}) => getProduct;

export const GetProductFactory: GetProductFactory = ({
  checkPermissions,
  productsRepository,
  throwNotFoundError
}) => async ({ context, productId }) => {
  checkPermissions(context, PERMISSIONS.productsRead);

  const storeId = context.storeId as string;

  const query = { storeId, id: productId };

  const product = await productsRepository.findOne(query);

  if (!product) {
    return throwNotFoundError('Product not found', { productId });
  }

  return product;
};
