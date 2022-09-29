import {
  PublishPaymentMethodFactory,
  publishPaymentMethod
} from './publish-payment-method';
import { PERMISSIONS } from '../../../constants';

describe('publish-payment-method', () => {
  let dependencies: any;
  let publishPaymentMethod: publishPaymentMethod;
  let input: any;
  let paymentMethod: any;

  beforeEach(() => {
    paymentMethod = {
      publish: jest.fn(() => paymentMethod),
      serialize: jest.fn(() => ({}))
    };

    dependencies = {
      checkPermissions: jest.fn(),
      getPaymentMethod: jest.fn(() => paymentMethod),
      savePaymentMethod: jest.fn(() => true),
      throwNotFoundError: jest.fn()
    };

    publishPaymentMethod = PublishPaymentMethodFactory(dependencies);

    input = {
      context: {
        storeId: 'store-id',
        user: {}
      },
      paymentMethodId: 'payment-method-id'
    };
  });

  it('should export PublishPaymentMethodFactory function', () => {
    expect(typeof PublishPaymentMethodFactory).toBe('function');
  });

  it('PublishPaymentMethodFactory should return publishPaymentMethod function', () => {
    expect(typeof publishPaymentMethod).toBe('function');
  });

  describe('publishPaymentMethod', () => {
    it('should check user permissions for writing payment methods', async () => {
      await publishPaymentMethod(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.paymentMethodsWrite
      );
    });

    it('should call getPaymentMethod', async () => {
      await publishPaymentMethod(input);
      expect(dependencies.getPaymentMethod).toHaveBeenCalledWith(input);
    });

    it('should call paymentMethod.publish', async () => {
      await publishPaymentMethod(input);
      expect(paymentMethod.publish).toHaveBeenCalled();
    });

    it('should call savePaymentMethod', async () => {
      await publishPaymentMethod(input);

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

      publishPaymentMethod = PublishPaymentMethodFactory(dependencies);

      await publishPaymentMethod(input);

      expect(dependencies.throwNotFoundError).toBeCalledWith(
        'Payment method not found',
        {
          storeId: input.context.storeId
        }
      );
    });

    it('should return object if payment method was published', async () => {
      const publishedPaymentMethod = await publishPaymentMethod(input);
      expect(publishedPaymentMethod).toStrictEqual(paymentMethod);
    });
  });
});
