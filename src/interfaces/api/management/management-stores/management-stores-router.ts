import { Router } from 'express';

import { handleAsync } from '../../middlewares/handle-async';

import { ManagementStoresCreate } from './management-stores-create/management-stores-create';
import { ManagementStoresGetOne } from './management-stores-get-one/management-stores-get-one';
import { ManagementStoresPublish } from './management-stores-publish/management-stores-publish';
import { ManagementStoresUnpublish } from './management-stores-unpublish/management-stores-unpublish';
import { ManagementStoresUpdate } from './management-stores-update/management-stores-update';

interface ManagementStoresRouterFactoryDependencies {
  managementStoresCreate: ManagementStoresCreate;
  managementStoresGetOne: ManagementStoresGetOne;
  managementStoresPublish: ManagementStoresPublish;
  managementStoresUnpublish: ManagementStoresUnpublish;
  managementStoresUpdate: ManagementStoresUpdate;
}
export const ManagementStoresRouterFactory = ({
  managementStoresCreate,
  managementStoresGetOne,
  managementStoresPublish,
  managementStoresUnpublish,
  managementStoresUpdate
}: ManagementStoresRouterFactoryDependencies) => {
  const storesRouter = Router();

  storesRouter.post('/management/stores', handleAsync(managementStoresCreate));

  storesRouter.get(
    '/management/stores/:storeId',
    handleAsync(managementStoresGetOne)
  );

  storesRouter.patch(
    '/management/stores/:storeId/publish',
    handleAsync(managementStoresPublish)
  );

  storesRouter.patch(
    '/management/stores/:storeId/unpublish',
    handleAsync(managementStoresUnpublish)
  );

  storesRouter.patch(
    '/management/stores/:storeId',
    handleAsync(managementStoresUpdate)
  );

  return storesRouter;
};
