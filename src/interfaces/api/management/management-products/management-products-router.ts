import { Router } from 'express';

import { ManagementProductsCreate } from './management-products-create/management-products-create';
import { ManagementProductsDelete } from './management-products-delete/management-products-delete';
import { ManagementProductsGetMany } from './management-products-get-many/management-products-get-many';
import { ManagementProductsGetOne } from './management-products-get-one/management-products-get-one';
import { ManagementProductsPublish } from './management-products-publish/management-products-publish';
import { ManagementProductsUnpublish } from './management-products-unpublish/management-products-unpublish';
import { ManagementProductsUpdate } from './management-products-update/management-products-update';
import { handleAsync } from '../../middlewares/handle-async';

interface ManagementProductsRouterFactoryDependencies {
  managementProductsCreate: ManagementProductsCreate;
  managementProductsDelete: ManagementProductsDelete;
  managementProductsGetMany: ManagementProductsGetMany;
  managementProductsGetOne: ManagementProductsGetOne;
  managementProductsPublish: ManagementProductsPublish;
  managementProductsUnpublish: ManagementProductsUnpublish;
  managementProductsUpdate: ManagementProductsUpdate;
}

export const ManagementProductsRouterFactory = ({
  managementProductsCreate,
  managementProductsDelete,
  managementProductsGetMany,
  managementProductsGetOne,
  managementProductsPublish,
  managementProductsUnpublish,
  managementProductsUpdate
}: ManagementProductsRouterFactoryDependencies) => {
  const productsRouter = Router();

  productsRouter.post(
    '/management/stores/:storeId/products',
    handleAsync(managementProductsCreate)
  );

  productsRouter.delete(
    '/management/stores/:storeId/products/:productId',
    handleAsync(managementProductsDelete)
  );

  productsRouter.get(
    '/management/stores/:storeId/products',
    handleAsync(managementProductsGetMany)
  );

  productsRouter.get(
    '/management/stores/:storeId/products/:productId',
    handleAsync(managementProductsGetOne)
  );

  productsRouter.patch(
    '/management/stores/:storeId/products/:productId',
    handleAsync(managementProductsUpdate)
  );

  productsRouter.patch(
    '/management/stores/:storeId/products/:productId/publish',
    handleAsync(managementProductsPublish)
  );

  productsRouter.patch(
    '/management/stores/:storeId/products/:productId/unpublish',
    handleAsync(managementProductsUnpublish)
  );

  return productsRouter;
};
