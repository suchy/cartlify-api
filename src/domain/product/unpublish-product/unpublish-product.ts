import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { Product } from '../product/product';
import { ProductsRepository } from '../products-repository';
import { ProductServiceFactory } from '../product-service/product-service';

import { throwNotFoundError } from '../../../helpers/errors/not-found-error';
import { PERMISSIONS } from '../../../constants';

export type unpublishProduct = (params: {
  context: Context;
  productId: string;
}) => Promise<Product>;

export type UnpublishProductFactory = (dependencies: {
  checkPermissions: checkPermissions;
  productsRepository: ProductsRepository;
  ProductServiceFactory: ProductServiceFactory;
  throwNotFoundError: throwNotFoundError;
}) => unpublishProduct;

export const UnpublishProductFactory: UnpublishProductFactory = ({
  checkPermissions,
  productsRepository,
  ProductServiceFactory,
  throwNotFoundError
}) => async ({ context, productId }) => {
  checkPermissions(context, PERMISSIONS.productsWrite);

  const storeId = context.storeId as string;

  const query = { storeId, id: productId };

  const product = await productsRepository.findOne(query);

  if (!product) {
    return throwNotFoundError('Product not found', { productId });
  }

  const productService = ProductServiceFactory(product);

  const unpublishedProduct = productService.unpublish();

  const isUpdated = await productsRepository.update(query, unpublishedProduct);

  if (!isUpdated) {
    return throwNotFoundError('Product not found', { productId });
  }

  return unpublishedProduct;
};
