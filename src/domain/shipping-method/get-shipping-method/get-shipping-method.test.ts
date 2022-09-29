import {
  GetShippingMethodFactory,
  getShippingMethod
} from './get-shipping-method';
import { PERMISSIONS } from '../../../constants';

describe('get-shipping-method', () => {
  let dependencies: any;
  let getShippingMethod: getShippingMethod;
  let input: any;

  beforeEach(() => {
    dependencies = {
      checkPermissions: jest.fn(),
      findOne: jest.fn(() => ({})),
      throwNotFoundError: jest.fn(),
      ShippingMethodFactory: jest.fn(() => ({}))
    };

    getShippingMethod = GetShippingMethodFactory(dependencies);

    input = {
      context: {
        storeId: 'store-id',
        user: {}
      },
      shippingMethodId: 'shipping-method-id'
    };
  });

  it('should export GetShippingMethodFactory function', () => {
    expect(typeof GetShippingMethodFactory).toBe('function');
  });

  it('GetShippingMethodFactory should return getShippingMethod function', () => {
    expect(typeof getShippingMethod).toBe('function');
  });

  describe('getShippingMethod', () => {
    it('should check user permissions for reading shipping methods', async () => {
      await getShippingMethod(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.shippingMethodsRead
      );
    });

    it('should call findOne', async () => {
      await getShippingMethod(input);

      const query = {
        storeId: input.context.storeId,
        id: input.shippingMethodId
      };
      expect(dependencies.findOne).toHaveBeenCalledWith(query);
    });

    it('should call throwNotFoundError if shipping method was not found', async () => {
      dependencies = {
        ...dependencies,
        findOne: jest.fn()
      };

      getShippingMethod = GetShippingMethodFactory(dependencies);

      await getShippingMethod(input);

      expect(dependencies.throwNotFoundError).toHaveBeenCalledWith(
        'Shipping method not found',
        {
          shippingMethodId: input.shippingMethodId
        }
      );
    });

    it('should call ShippingMethodFactory', async () => {
      await getShippingMethod(input);
      const rawShippingMethod = dependencies.findOne();

      expect(dependencies.ShippingMethodFactory).toHaveBeenCalledWith(
        rawShippingMethod
      );
    });

    it('should return filtered fields', async () => {
      const returnedShippingMethod = {
        id: 'shipping-method-id',
        name: 'shipping-method-name'
      };

      dependencies = {
        ...dependencies,
        ShippingMethodFactory: jest.fn(() => returnedShippingMethod)
      };

      getShippingMethod = GetShippingMethodFactory(dependencies);

      input = { ...input, options: { fields: ['id'] } };

      let shippingMethod = await getShippingMethod(input);
      expect(shippingMethod).toStrictEqual({ id: returnedShippingMethod.id });

      input = { ...input, options: { fields: ['name'] } };

      shippingMethod = await getShippingMethod(input);
      expect(shippingMethod).toStrictEqual({
        name: returnedShippingMethod.name
      });

      input = { ...input, options: { fields: ['id', 'name'] } };

      shippingMethod = await getShippingMethod(input);
      expect(shippingMethod).toStrictEqual(returnedShippingMethod);
    });

    it('should return object if shipping method was found', async () => {
      const shippingMethod = await getShippingMethod(input);
      expect(shippingMethod).toStrictEqual({});
    });
  });
});
