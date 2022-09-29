import {
  GetPaymentMethodFactory,
  getPaymentMethod
} from './get-payment-method';
import { PERMISSIONS } from '../../../constants';

describe('get-payment-method', () => {
  let dependencies: any;
  let getPaymentMethod: getPaymentMethod;
  let input: any;

  beforeEach(() => {
    dependencies = {
      checkPermissions: jest.fn(),
      findPaymentMethod: jest.fn(() => ({})),
      PaymentMethodFactory: jest.fn(() => ({})),
      throwNotFoundError: jest.fn()
    };

    getPaymentMethod = GetPaymentMethodFactory(dependencies);

    input = {
      context: {
        storeId: 'store-id',
        user: {}
      },
      paymentMethodId: 'payment-method-id'
    };
  });

  it('should export GetPaymentMethodFactory function', () => {
    expect(typeof GetPaymentMethodFactory).toBe('function');
  });

  it('GetPaymentMethodFactory should return getPaymentMethod function', () => {
    expect(typeof getPaymentMethod).toBe('function');
  });

  describe('getPaymentMethod', () => {
    it('should check user permissions for reading payment methods', async () => {
      await getPaymentMethod(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.paymentMethodsRead
      );
    });

    it('should call findPaymentMethod', async () => {
      await getPaymentMethod(input);

      const query = {
        storeId: input.context.storeId,
        id: input.paymentMethodId
      };

      expect(dependencies.findPaymentMethod).toHaveBeenCalledWith(query);
    });

    it('should return object if payment method was found', async () => {
      const paymentMethod = await getPaymentMethod(input);
      expect(paymentMethod).toStrictEqual({});
    });

    it('should call throwNotFoundError if payment method was not found', async () => {
      dependencies = {
        ...dependencies,
        findPaymentMethod: jest.fn()
      };

      getPaymentMethod = GetPaymentMethodFactory(dependencies);

      await getPaymentMethod(input);

      expect(dependencies.throwNotFoundError).toHaveBeenCalledWith(
        'Payment method not found',
        {
          paymentMethodId: input.paymentMethodId
        }
      );
    });
  });
});
