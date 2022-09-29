import {
  DeletePaymentMethodFactory,
  deletePaymentMethod
} from './delete-payment-method';
import { PERMISSIONS } from '../../../constants';

describe('delete-payment-method', () => {
  let dependencies: any;
  let deletePaymentMethod: deletePaymentMethod;
  let input: any;

  beforeEach(() => {
    dependencies = {
      checkPermissions: jest.fn(),
      removePaymentMethod: jest.fn(() => true),
      throwNotFoundError: jest.fn()
    };

    deletePaymentMethod = DeletePaymentMethodFactory(dependencies);

    input = {
      context: {
        storeId: 'store-id',
        user: {}
      },
      paymentMethodId: 'payment-method-id'
    };
  });

  it('should export DeletePaymentMethodFactory function', () => {
    expect(typeof DeletePaymentMethodFactory).toBe('function');
  });

  it('DeletePaymentMethodFactory should return deletePaymentMethod function', () => {
    expect(typeof deletePaymentMethod).toBe('function');
  });

  describe('deletePaymentMethod', () => {
    it('should check user permissions for deleting payment methods', async () => {
      await deletePaymentMethod(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.paymentMethodsDelete
      );
    });

    it('should call removePaymentMethod', async () => {
      await deletePaymentMethod(input);

      expect(dependencies.removePaymentMethod).toHaveBeenCalledWith({
        storeId: input.context.storeId,
        id: input.paymentMethodId
      });
    });

    it('should call throwNotFoundError if payment method was not deleted', async () => {
      dependencies = {
        ...dependencies,
        removePaymentMethod: jest.fn(() => false)
      };

      deletePaymentMethod = DeletePaymentMethodFactory(dependencies);
      await deletePaymentMethod(input);

      expect(dependencies.throwNotFoundError).toHaveBeenCalledWith(
        'Payment method not found',
        {
          paymentMethodId: input.paymentMethodId
        }
      );
    });

    it('should return true if payment method was deleted', async () => {
      const isDeleted = await deletePaymentMethod(input);
      expect(isDeleted).toBe(true);
    });
  });
});
