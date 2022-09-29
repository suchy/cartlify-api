import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { Store } from '../store/store';
import { StoresRepository } from '../stores-repository';
import { StoreServiceFactory } from '../store-service/store-service';

import { throwNotFoundError } from '../../../helpers/errors/not-found-error';
import { PERMISSIONS } from '../../../constants';

export type unpublishStore = (params: { context: Context }) => Promise<Store>;

export type UnpublishStoreFactory = (dependencies: {
  checkPermissions: checkPermissions;
  storesRepository: StoresRepository;
  StoreServiceFactory: StoreServiceFactory;
  throwNotFoundError: throwNotFoundError;
}) => unpublishStore;

export const UnpublishStoreFactory: UnpublishStoreFactory = ({
  checkPermissions,
  storesRepository,
  StoreServiceFactory,
  throwNotFoundError
}) => async ({ context }) => {
  checkPermissions(context, PERMISSIONS.storesWrite);

  const storeId = context.storeId as string;

  const query = { id: storeId };

  const store = await storesRepository.findOne(query);

  if (!store) {
    return throwNotFoundError('Store not found.', { storeId });
  }

  const storeService = StoreServiceFactory(store);

  const unpublishedStore = storeService.unpublish();

  const isUpdated = await storesRepository.update(query, unpublishedStore);

  if (!isUpdated) {
    return throwNotFoundError('Store not found.', { storeId });
  }

  return unpublishedStore;
};
