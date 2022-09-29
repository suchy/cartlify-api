import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { Store } from '../store/store';
import { StoresRepository } from '../stores-repository';

import {
  StoreServiceFactory,
  UpdatableStoreProps
} from '../store-service/store-service';

import { throwNotFoundError } from '../../../helpers/errors/not-found-error';
import { PERMISSIONS } from '../../../constants';

export type changeStore = (params: {
  context: Context;
  storeProps: UpdatableStoreProps;
}) => Promise<Store>;

export type ChangeStoreFactory = (dependencies: {
  checkPermissions: checkPermissions;
  storesRepository: StoresRepository;
  StoreServiceFactory: StoreServiceFactory;
  throwNotFoundError: throwNotFoundError;
}) => changeStore;

export const ChangeStoreFactory: ChangeStoreFactory = ({
  checkPermissions,
  storesRepository,
  StoreServiceFactory,
  throwNotFoundError
}) => async ({ context, storeProps }) => {
  checkPermissions(context, PERMISSIONS.storesWrite);

  const storeId = context.storeId as string;

  const query = { id: storeId };

  const store = await storesRepository.findOne(query);

  if (!store) {
    return throwNotFoundError('Store not found.', { storeId });
  }

  const storeService = StoreServiceFactory(store);

  const updatedStore = storeService.update(storeProps);

  const isUpdated = await storesRepository.update(query, updatedStore);

  if (!isUpdated) {
    return throwNotFoundError('Store not found.', { storeId });
  }

  return updatedStore;
};
