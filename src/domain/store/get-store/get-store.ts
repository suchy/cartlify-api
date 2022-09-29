import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { Store } from '../store/store';
import { StoresRepository } from '../stores-repository';

import { throwNotFoundError } from '../../../helpers/errors/not-found-error';
import { PERMISSIONS } from '../../../constants';

export type getStore = (params: { context: Context }) => Promise<Store>;

export type GetStoreFactory = (dependencies: {
  checkPermissions: checkPermissions;
  storesRepository: StoresRepository;
  throwNotFoundError: throwNotFoundError;
}) => getStore;

export const GetStoreFactory: GetStoreFactory = ({
  checkPermissions,
  storesRepository,
  throwNotFoundError
}) => async ({ context }) => {
  checkPermissions(context, PERMISSIONS.storesRead);

  const { storeId } = context;

  const store = await storesRepository.findOne({ id: storeId });

  if (!store) {
    return throwNotFoundError('Store not found.', { storeId });
  }

  return store;
};
