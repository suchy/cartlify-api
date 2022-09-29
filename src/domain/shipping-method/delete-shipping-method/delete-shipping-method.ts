import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';

import { ShippingMethodsRepository } from '../shipping-methods-repository';

import { throwNotFoundError } from '../../../helpers/errors/not-found-error';
import { PERMISSIONS } from '../../../constants';

export type deleteShippingMethod = (params: {
  context: Context;
  shippingMethodId: string;
}) => Promise<boolean>;

export type DeleteShippingMethodFactory = (dependencies: {
  checkPermissions: checkPermissions;
  shippingMethodsRepository: ShippingMethodsRepository;
  throwNotFoundError: throwNotFoundError;
}) => deleteShippingMethod;

export const DeleteShippingMethodFactory: DeleteShippingMethodFactory = ({
  checkPermissions,
  shippingMethodsRepository,
  throwNotFoundError
}) => async ({ context, shippingMethodId }) => {
  checkPermissions(context, PERMISSIONS.shippingMethodsDelete);

  const storeId = context.storeId as string;

  const isDeleted = await shippingMethodsRepository.remove({
    storeId,
    id: shippingMethodId
  });

  if (!isDeleted) {
    return throwNotFoundError('Shipping method not found', {
      shippingMethodId
    });
  }

  return isDeleted;
};
