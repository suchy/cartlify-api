import {
  GetShippingMethodsFactory,
  getShippingMethods
} from './get-shipping-methods';
import { PERMISSIONS } from '../../../constants';

describe('get-shipping-methods', () => {
  let dependencies: any;
  let getShippingMethods: getShippingMethods;
  let input: any;

  beforeEach(() => {
    dependencies = {
      checkPermissions: jest.fn(),
      find: jest.fn(() => [{}]),
      ShippingMethodFactory: jest.fn(() => ({}))
    };

    getShippingMethods = GetShippingMethodsFactory(dependencies);

    input = {
      context: {
        storeId: 'store-id',
        user: {}
      }
    };
  });

  it('should export GetShippingMethodsFactory function', () => {
    expect(typeof GetShippingMethodsFactory).toBe('function');
  });

  it('GetShippingMethodsFactory should return getShippingMethods function', () => {
    expect(typeof getShippingMethods).toBe('function');
  });

  describe('getShippingMethods', () => {
    it('should check user permissions for reading shipping methods', async () => {
      await getShippingMethods(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.shippingMethodsRead
      );
    });

    it('should call find', async () => {
      await getShippingMethods(input);

      const query = { storeId: input.context.storeId };

      const options = {};

      expect(dependencies.find).toHaveBeenCalledWith(query, options);
    });

    it('should call ShippingMethodFactory', async () => {
      await getShippingMethods(input);
      expect(dependencies.ShippingMethodFactory).toHaveBeenCalledWith({});
    });

    it('should return empty array if no shipping methods were found', async () => {
      dependencies = {
        ...dependencies,
        find: jest.fn(() => [])
      };

      getShippingMethods = GetShippingMethodsFactory(dependencies);

      const shippingMethods = await getShippingMethods(input);
      expect(shippingMethods).toStrictEqual([]);
    });

    it('should return objects array if shipping methods were found', async () => {
      const shippingMethods = await getShippingMethods(input);
      expect(shippingMethods).toStrictEqual([{}]);
    });

    it('should return limited fields', async () => {
      const returnedShippingMethod = {
        id: 'shipping-method-id',
        name: 'shipping-method-name'
      };

      dependencies = {
        ...dependencies,
        ShippingMethodFactory: jest.fn(() => returnedShippingMethod)
      };

      getShippingMethods = GetShippingMethodsFactory(dependencies);

      input = {
        ...input,
        query: {},
        options: { fields: ['id'] }
      };

      let shippingMethods = await getShippingMethods(input);

      input = {
        ...input,
        query: {},
        options: { fields: ['name'] }
      };

      shippingMethods = await getShippingMethods(input);

      expect(shippingMethods).toStrictEqual([
        { name: returnedShippingMethod.name }
      ]);

      input = {
        ...input,
        query: {},
        options: { fields: ['id', 'name'] }
      };

      shippingMethods = await getShippingMethods(input);

      expect(shippingMethods).toStrictEqual([returnedShippingMethod]);
    });
  });
});
