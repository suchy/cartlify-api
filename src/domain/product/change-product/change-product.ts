import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { Product } from '../product/product';

import {
  ProductServiceFactory,
  UpdatableProductProps
} from '../product-service/product-service';

import { throwNotFoundError } from '../../../helpers/errors/not-found-error';
import { PERMISSIONS } from '../../../constants';
import { ProductsRepository } from '../products-repository';

export type changeProduct = (params: {
  context: Context;
  productId: string;
  productProps: UpdatableProductProps;
}) => Promise<Product>;

export type ChangeProductFactory = (dependencies: {
  checkPermissions: checkPermissions;
  productsRepository: ProductsRepository;
  ProductServiceFactory: ProductServiceFactory;
  throwNotFoundError: throwNotFoundError;
}) => changeProduct;

export const ChangeProductFactory: ChangeProductFactory = ({
  checkPermissions,
  productsRepository,
  ProductServiceFactory,
  throwNotFoundError
}) => async ({ context, productId, productProps }) => {
  checkPermissions(context, PERMISSIONS.productsWrite);

  const storeId = context.storeId as string;

  const query = { id: productId, storeId };

  const product = await productsRepository.findOne(query);

  if (!product) {
    return throwNotFoundError('Product not found', { productId });
  }

  const productService = ProductServiceFactory(product);

  const updatedProduct = productService.update(productProps);

  const isUpdated = await productsRepository.update(query, updatedProduct);

  if (!isUpdated) {
    return throwNotFoundError('Product not found', { productId });
  }

  return updatedProduct;
};
