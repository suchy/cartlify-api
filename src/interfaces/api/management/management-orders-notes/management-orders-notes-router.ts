import { Router } from 'express';

import { handleAsync } from '../../middlewares/handle-async';

import { ManagementOrdersNotesChangeContent } from './management-orders-notes-change-content/management-orders-notes-change-content';
import { ManagementOrdersNotesCreate } from './management-orders-notes-create/management-orders-notes-create';
import { ManagementOrdersNotesDelete } from './management-orders-notes-delete/management-orders-notes-delete';
import { ManagementOrdersNotesGetMany } from './management-orders-notes-get-many/management-orders-notes-get-many';
import { ManagementOrdersNotesGetOne } from './management-orders-notes-get-one/management-orders-notes-get-one';

interface ManagementOrdersNotesRouterFactoryDependencies {
  managementOrdersNotesChangeContent: ManagementOrdersNotesChangeContent;
  managementOrdersNotesCreate: ManagementOrdersNotesCreate;
  managementOrdersNotesDelete: ManagementOrdersNotesDelete;
  managementOrdersNotesGetMany: ManagementOrdersNotesGetMany;
  managementOrdersNotesGetOne: ManagementOrdersNotesGetOne;
}

export const ManagementOrdersNotesRouterFactory = ({
  managementOrdersNotesChangeContent,
  managementOrdersNotesCreate,
  managementOrdersNotesDelete,
  managementOrdersNotesGetMany,
  managementOrdersNotesGetOne
}: ManagementOrdersNotesRouterFactoryDependencies) => {
  const managementOrdersNotesRouter = Router();

  managementOrdersNotesRouter.patch(
    '/management/stores/:storeId/orders/:orderId/notes/:orderNoteId/content',
    handleAsync(managementOrdersNotesChangeContent)
  );

  managementOrdersNotesRouter.post(
    '/management/stores/:storeId/orders/:orderId/notes',
    handleAsync(managementOrdersNotesCreate)
  );

  managementOrdersNotesRouter.delete(
    '/management/stores/:storeId/orders/:orderId/notes/:orderNoteId',
    handleAsync(managementOrdersNotesDelete)
  );

  managementOrdersNotesRouter.get(
    '/management/stores/:storeId/orders/:orderId/notes',
    handleAsync(managementOrdersNotesGetMany)
  );

  managementOrdersNotesRouter.get(
    '/management/stores/:storeId/orders/:orderId/notes/:orderNoteId',
    handleAsync(managementOrdersNotesGetOne)
  );

  return managementOrdersNotesRouter;
};
