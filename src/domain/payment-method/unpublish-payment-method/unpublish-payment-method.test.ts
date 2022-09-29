import {
  UnpublishPaymentMethodFactory,
  unpublishPaymentMethod
} from './unpublish-payment-method';
import { PERMISSIONS } from '../../../constants';

describe('unpublish-payment-method', () => {
  let dependencies: any;
  let unpublishPaymentMethod: unpublishPaymentMethod;
  let input: any;
  let paymentMethod: any;

  beforeEach(() => {
    paymentMethod = {
      unpublish: jest.fn(() => paymentMethod),
      serialize: jest.fn(() => ({}))
    };

    dependencies = {
      checkPermissions: jest.fn(),
      getPaymentMethod: jest.fn(() => paymentMethod),
      savePaymentMethod: jest.fn(() => true),
      throwNotFoundError: jest.fn()
    };

    unpublishPaymentMethod = UnpublishPaymentMethodFactory(dependencies);

    input = {
      context: {
        storeId: 'store-id',
        user: {}
      },
      paymentMethodId: 'payment-method-id'
    };
  });

  it('should export UnpublishPaymentMethodFactory function', () => {
    expect(typeof UnpublishPaymentMethodFactory).toBe('function');
  });

  it('UnpublishPaymentMethodFactory should return unpublishPaymentMethod function', () => {
    expect(typeof unpublishPaymentMethod).toBe('function');
  });

  describe('unpublishPaymentMethod', () => {
    it('should check user permissions for writing payment methods', async () => {
      await unpublishPaymentMethod(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.paymentMethodsWrite
      );
    });

    it('should call getPaymentMethod', async () => {
      await unpublishPaymentMethod(input);
      expect(dependencies.getPaymentMethod).toHaveBeenCalledWith(input);
    });

    it('should call paymentMethod.unpublish', async () => {
      await unpublishPaymentMethod(input);
      expect(paymentMethod.unpublish).toHaveBeenCalled();
    });

    it('should call savePaymentMethod', async () => {
      await unpublishPaymentMethod(input);

      const query = {
        storeId: input.context.storeId,
        id: input.paymentMethodId
      };
      expect(dependencies.savePaymentMethod).toHaveBeenCalledWith(query, {});
    });

    it('should call throwNotFoundError if payment method was not found', async () => {
      dependencies = {
        ...dependencies,
        savePaymentMethod: jest.fn()
      };

      unpublishPaymentMethod = UnpublishPaymentMethodFactory(dependencies);

      await unpublishPaymentMethod(input);

      expect(dependencies.throwNotFoundError).toBeCalledWith(
        'Payment method not found',
        {
          storeId: input.context.storeId
        }
      );
    });

    it('should return object if payment method was unpublished', async () => {
      const unpublishedPaymentMethod = await unpublishPaymentMethod(input);
      expect(unpublishedPaymentMethod).toStrictEqual(paymentMethod);
    });
  });
});
