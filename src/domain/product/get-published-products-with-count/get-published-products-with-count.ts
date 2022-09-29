import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { Product } from '../product/product';
import { ProductsRepository } from '../products-repository';

import { PERMISSIONS } from '../../../constants';
import { Query, QueryOptions } from '../../../helpers/query';

export type getPublishedProductsWithCount = (params: {
  context: Context;
  query?: Query<Product>;
  options?: QueryOptions<Product>;
}) => Promise<{ publishedProducts: Product[]; publishedProductsCount: number }>;

export type GetPublishedProductsWithCountFactory = (dependencies: {
  checkPermissions: checkPermissions;
  productsRepository: ProductsRepository;
}) => getPublishedProductsWithCount;

export const GetPublishedProductsWithCountFactory: GetPublishedProductsWithCountFactory = ({
  checkPermissions,
  productsRepository
}) => async ({ context, query = {}, options = {} }) => {
  checkPermissions(context, PERMISSIONS.productsRead);

  const storeId = context.storeId as string;

  const publishedProductsQuery = { ...query, published: true, storeId };

  const [publishedProducts, publishedProductsCount] = await Promise.all([
    productsRepository.find(publishedProductsQuery, options),
    productsRepository.count(publishedProductsQuery)
  ]);

  return {
    publishedProducts,
    publishedProductsCount
  };
};
