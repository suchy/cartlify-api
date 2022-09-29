import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { StoreFactory, StoreProps, Store } from '../store/store';
import { StoresRepository } from '../stores-repository';

import { createId } from '../../../helpers/create-id';
import { PERMISSIONS } from '../../../constants';

export type createStore = (params: {
  context: Context;
  storeProps: StoreProps;
}) => Promise<Store>;

export type CreateStoreFactory = (dependencies: {
  checkPermissions: checkPermissions;
  createId: createId;
  storesRepository: StoresRepository;
  StoreFactory: StoreFactory;
}) => createStore;

export const CreateStoreFactory: CreateStoreFactory = ({
  checkPermissions,
  createId,
  storesRepository,
  StoreFactory
}) => async ({ context, storeProps }) => {
  checkPermissions(context, PERMISSIONS.storesCreate);

  const timestamp = new Date();

  const store = StoreFactory({
    ...storeProps,
    id: createId(),
    createdAt: timestamp,
    updatedAt: timestamp
  });

  await storesRepository.insert(store);

  return store;
};
