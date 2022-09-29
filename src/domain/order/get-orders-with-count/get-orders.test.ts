import { GetOrdersFactory, getOrders } from './get-orders-with-count';
import { PERMISSIONS } from '../../../constants';

describe('get-orders', () => {
  let dependencies: any;
  let getOrders: getOrders;
  let input: any;

  beforeEach(() => {
    dependencies = {
      checkPermissions: jest.fn(),
      findOrders: jest.fn(() => []),
      OrderFactory: jest.fn(() => ({}))
    };

    getOrders = GetOrdersFactory(dependencies);

    input = {
      context: {
        storeId: 'store-id',
        user: {}
      }
    };
  });

  it('should export GetOrdersFactory function', () => {
    expect(typeof GetOrdersFactory).toBe('function');
  });

  it('GetOrdersFactory should return getOrders function', () => {
    expect(typeof getOrders).toBe('function');
  });

  describe('getOrders', () => {
    it('should check user permissions for reading orders', async () => {
      await getOrders(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.ordersRead
      );
    });

    it('should call findOrders', async () => {
      await getOrders(input);

      const query = { storeId: input.context.storeId };

      const options = {};

      expect(dependencies.findOrders).toHaveBeenCalledWith(query, options);
    });

    it('should return empty array if no orders were found', async () => {
      const orders = await getOrders(input);
      expect(orders).toStrictEqual([]);
    });

    it('should return objects array if orders were found', async () => {
      dependencies = {
        ...dependencies,
        findOrders: jest.fn(() => [{}])
      };

      getOrders = GetOrdersFactory(dependencies);
      const orders = await getOrders(input);
      expect(orders).toStrictEqual([{}]);
    });
  });
});
