import {
  DeleteShippingMethodFactory,
  deleteShippingMethod
} from './delete-shipping-method';
import { PERMISSIONS } from '../../../constants';

describe('delete-shipping-method', () => {
  let dependencies: any;
  let deleteShippingMethod: deleteShippingMethod;
  let input: any;

  beforeEach(() => {
    dependencies = {
      checkPermissions: jest.fn(),
      remove: jest.fn(() => true),
      throwNotFoundError: jest.fn()
    };

    deleteShippingMethod = DeleteShippingMethodFactory(dependencies);

    input = {
      context: {
        storeId: 'store-id',
        user: {}
      },
      shippingMethodId: 'shipping-method-id'
    };
  });

  it('should export DeleteShippingMethodFactory function', () => {
    expect(typeof DeleteShippingMethodFactory).toBe('function');
  });

  it('DeleteShippingMethodFactory should return deleteShippingMethod function', () => {
    expect(typeof deleteShippingMethod).toBe('function');
  });

  describe('deleteShippingMethod', () => {
    it('should check user permissions for deleting shipping methods', async () => {
      await deleteShippingMethod(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.shippingMethodsDelete
      );
    });

    it('should call remove', async () => {
      await deleteShippingMethod(input);

      expect(dependencies.remove).toHaveBeenLastCalledWith({
        storeId: input.context.storeId,
        id: input.shippingMethodId
      });
    });

    it('should call throwNotFoundError if shipping method was not deleted', async () => {
      dependencies = {
        ...dependencies,
        remove: jest.fn(() => false)
      };

      deleteShippingMethod = DeleteShippingMethodFactory(dependencies);

      await deleteShippingMethod(input);

      expect(dependencies.throwNotFoundError).toHaveBeenCalledWith(
        'Shipping method not found',
        {
          shippingMethodId: input.shippingMethodId
        }
      );
    });

    it('should return true if shipping method was deleted', async () => {
      const isDeleted = await deleteShippingMethod(input);
      expect(isDeleted).toBe(true);
    });
  });
});
