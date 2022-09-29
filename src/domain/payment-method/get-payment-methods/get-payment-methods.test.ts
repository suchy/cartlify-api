import {
  GetPaymentMethodsFactory,
  getPaymentMethods
} from './get-payment-methods';
import { PERMISSIONS } from '../../../constants';

describe('get-payment-methods', () => {
  let dependencies: any;
  let getPaymentMethods: getPaymentMethods;
  let input: any;

  beforeEach(() => {
    dependencies = {
      checkPermissions: jest.fn(),
      findPaymentMethods: jest.fn(() => [{}]),
      PaymentMethodFactory: jest.fn(() => ({}))
    };

    getPaymentMethods = GetPaymentMethodsFactory(dependencies);

    input = {
      context: {
        storeId: 'store-id',
        user: {}
      }
    };
  });

  it('should export GetPaymentMethodsFactory function', () => {
    expect(typeof GetPaymentMethodsFactory).toBe('function');
  });

  it('GetPaymentMethodsFactory should return getPaymentMethods function', () => {
    expect(typeof getPaymentMethods).toBe('function');
  });

  describe('getPaymentMethods', () => {
    it('should check user permissions for reading payment methods', async () => {
      await getPaymentMethods(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.paymentMethodsRead
      );
    });

    it('should call findPaymentMethods', async () => {
      await getPaymentMethods(input);

      const query = { storeId: input.context.storeId };

      const options = {};

      expect(dependencies.findPaymentMethods).toHaveBeenCalledWith(
        query,
        options
      );
    });

    it('should call PaymentMethodFactory', async () => {
      await getPaymentMethods(input);
      expect(dependencies.PaymentMethodFactory).toHaveBeenCalledWith({});
    });

    it('should return empty array if no payment methods were found', async () => {
      dependencies = {
        ...dependencies,
        findPaymentMethods: jest.fn(() => [])
      };

      getPaymentMethods = GetPaymentMethodsFactory(dependencies);

      const paymentMethods = await getPaymentMethods(input);
      expect(paymentMethods).toStrictEqual([]);
    });

    it('should return objects array if payment methods were found', async () => {
      const paymentMethods = await getPaymentMethods(input);
      expect(paymentMethods).toStrictEqual([{}]);
    });

    it('should return limited fields', async () => {
      const returnedPaymentMethod = {
        id: 'payment-method-id',
        name: 'payment-method-name'
      };

      dependencies = {
        ...dependencies,
        PaymentMethodFactory: jest.fn(() => returnedPaymentMethod)
      };

      getPaymentMethods = GetPaymentMethodsFactory(dependencies);

      input = {
        ...input,
        query: {},
        options: { fields: ['id'] }
      };

      let paymentMethods = await getPaymentMethods(input);

      input = {
        ...input,
        query: {},
        options: { fields: ['name'] }
      };

      paymentMethods = await getPaymentMethods(input);

      expect(paymentMethods).toStrictEqual([
        { name: returnedPaymentMethod.name }
      ]);

      input = {
        ...input,
        query: {},
        options: { fields: ['id', 'name'] }
      };

      paymentMethods = await getPaymentMethods(input);

      expect(paymentMethods).toStrictEqual([returnedPaymentMethod]);
    });
  });
});
