import { GetOrderFactory, getOrder } from './get-order';
import { PERMISSIONS } from '../../../constants';

describe('get-order', () => {
  let dependencies: any;
  let getOrder: getOrder;
  let input: any;

  beforeEach(() => {
    dependencies = {
      checkPermissions: jest.fn(),
      findOrder: jest.fn(() => ({})),
      throwNotFoundError: jest.fn(),
      OrderFactory: jest.fn(() => ({}))
    };

    getOrder = GetOrderFactory(dependencies);

    input = {
      context: {
        storeId: 'store-id',
        user: {}
      },
      orderId: 'order-id'
    };
  });

  it('should export GetOrderFactory function', () => {
    expect(typeof GetOrderFactory).toBe('function');
  });

  it('GetOrderFactory should return getOrder function', () => {
    expect(typeof getOrder).toBe('function');
  });

  describe('getOrder', () => {
    it('should check user permissions for reading orders', async () => {
      await getOrder(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.ordersRead
      );
    });

    it('should call findOrder', async () => {
      await getOrder(input);

      const query = {
        storeId: input.context.storeId,
        id: input.orderId
      };

      expect(dependencies.findOrder).toHaveBeenCalledWith(query);
    });

    it('should call throwNotFoundError if order was not found', async () => {
      dependencies = {
        ...dependencies,
        findOrder: jest.fn()
      };

      getOrder = GetOrderFactory(dependencies);

      await getOrder(input);

      expect(
        dependencies.throwNotFoundError
      ).toHaveBeenCalledWith('Order not found', { orderId: input.orderId });
    });

    it('should call OrderFactory', async () => {
      await getOrder(input);
      expect(dependencies.OrderFactory).toHaveBeenCalledWith({});
    });

    it('should return filtered fields', async () => {
      const returnedOrder = {
        id: 'order-id',
        totalAmount: 100
      };

      dependencies = {
        ...dependencies,
        OrderFactory: jest.fn(() => returnedOrder)
      };

      getOrder = GetOrderFactory(dependencies);

      input = { ...input, options: { fields: ['id'] } };

      let order = await getOrder(input);
      expect(order).toStrictEqual({ id: returnedOrder.id });

      input = { ...input, options: { fields: ['totalAmount'] } };

      order = await getOrder(input);
      expect(order).toStrictEqual({ totalAmount: returnedOrder.totalAmount });

      input = { ...input, options: { fields: ['id', 'totalAmount'] } };

      order = await getOrder(input);
      expect(order).toStrictEqual(returnedOrder);
    });

    it('should return object if order was found', async () => {
      const order = await getOrder(input);
      expect(order).toStrictEqual({});
    });
  });
});
