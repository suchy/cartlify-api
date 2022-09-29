import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { Product, ProductFactory } from '../product/product';
import { ProductsRepository } from '../products-repository';

import { PERMISSIONS } from '../../../constants';
import { createId } from '../../../helpers/create-id';

export type createProduct = (params: {
  context: Context;
  productProps: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'storeId'>;
}) => Promise<Product>;

export type CreateProductFactory = (dependencies: {
  checkPermissions: checkPermissions;
  createId: createId;
  ProductFactory: ProductFactory;
  productsRepository: ProductsRepository;
}) => createProduct;

export const CreateProductFactory: CreateProductFactory = ({
  checkPermissions,
  createId,
  ProductFactory,
  productsRepository
}) => async ({ context, productProps }) => {
  checkPermissions(context, PERMISSIONS.productsCreate);

  const timestamp = new Date();

  const storeId = context.storeId as string;

  const product = ProductFactory({
    ...productProps,
    storeId,
    id: createId(),
    createdAt: timestamp,
    updatedAt: timestamp
  });

  await productsRepository.insert(product);

  return product;
};
