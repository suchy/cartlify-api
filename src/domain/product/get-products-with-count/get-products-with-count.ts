import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { Product } from '../product/product';
import { ProductsRepository } from '../products-repository';

import { PERMISSIONS } from '../../../constants';
import { Query, QueryOptions } from '../../../helpers/query';

export type getProductsWithCount = (params: {
  context: Context;
  query?: Query<Product>;
  options?: QueryOptions<Product>;
}) => Promise<{ products: Product[]; productsCount: number }>;

export type GetProductsWithCountFactory = (dependencies: {
  checkPermissions: checkPermissions;
  productsRepository: ProductsRepository;
}) => getProductsWithCount;

export const GetProductsWithCountFactory: GetProductsWithCountFactory = ({
  checkPermissions,
  productsRepository
}) => async ({ context, query = {}, options = {} }) => {
  checkPermissions(context, PERMISSIONS.productsRead);

  const storeId = context.storeId as string;

  const productsQuery = { ...query, storeId };

  const [products, productsCount] = await Promise.all([
    productsRepository.find(productsQuery, options),
    productsRepository.count(productsQuery)
  ]);

  return {
    products,
    productsCount
  };
};
