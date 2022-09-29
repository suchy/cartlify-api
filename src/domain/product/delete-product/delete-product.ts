import {
  checkPermissions,
  Context
} from '../../../helpers/check-permissions/check-permissions';
import { throwNotFoundError } from '../../../helpers/errors/not-found-error';
import { PERMISSIONS } from '../../../constants';
import { ProductsRepository } from '../products-repository';

export type deleteProduct = (params: {
  context: Context;
  productId: string;
}) => Promise<boolean>;

export type DeleteProductFactory = (dependencies: {
  checkPermissions: checkPermissions;
  productsRepository: ProductsRepository;
  throwNotFoundError: throwNotFoundError;
}) => deleteProduct;

export const DeleteProductFactory: DeleteProductFactory = ({
  checkPermissions,
  productsRepository,
  throwNotFoundError
}) => async ({ context, productId }) => {
  checkPermissions(context, PERMISSIONS.productsDelete);

  const storeId = context.storeId as string;

  const isDeleted = await productsRepository.remove({ storeId, id: productId });

  if (!isDeleted) {
    return throwNotFoundError('Product not found', { productId });
  }

  return isDeleted;
};
