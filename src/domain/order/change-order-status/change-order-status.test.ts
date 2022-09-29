import {
  ChangeOrderStatusFactory,
  changeOrderStatus
} from './change-order-status';
import { PERMISSIONS } from '../../../constants';

describe('change-order-status', () => {
  let dependencies: any;
  let changeOrderStatus: changeOrderStatus;
  let input: any;
  let order: any;

  beforeEach(() => {
    order = {
      changeStatus: jest.fn(() => order),
      serialize: jest.fn(() => ({}))
    };

    dependencies = {
      checkPermissions: jest.fn(),
      getOrder: jest.fn(() => order),
      saveOrder: jest.fn(() => true),
      throwNotFoundError: jest.fn()
    };

    changeOrderStatus = ChangeOrderStatusFactory(dependencies);

    input = {
      context: { user: {}, storeId: 'store-id' },
      orderId: 'order-id',
      status: 'NEW'
    };
  });

  it('should export ChangeOrderStatusFactory function', () => {
    expect(typeof ChangeOrderStatusFactory).toBe('function');
  });

  it('ChangeOrderStatusFactory should return changeOrderStatus function', () => {
    expect(typeof changeOrderStatus).toBe('function');
  });

  describe('changeOrderStatus', () => {
    it('should check user permissions for updating order', async () => {
      await changeOrderStatus(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.ordersWrite
      );
    });

    it('should call getOrder', async () => {
      await changeOrderStatus(input);
      expect(dependencies.getOrder).toHaveBeenCalledWith({
        context: input.context,
        orderId: input.orderId
      });
    });

    it('should call order.changeStatus', async () => {
      await changeOrderStatus(input);
      expect(order.changeStatus).toHaveBeenCalledWith(input.status);
    });

    it('should call saveOrder', async () => {
      await changeOrderStatus(input);
      const query = { storeId: input.context.storeId, id: input.orderId };
      expect(dependencies.saveOrder).toHaveBeenCalledWith(query, {});
    });

    it('should call throwNotFoundError if order was not updated', async () => {
      dependencies = {
        ...dependencies,
        saveOrder: jest.fn()
      };

      changeOrderStatus = ChangeOrderStatusFactory(dependencies);

      await changeOrderStatus(input);

      expect(
        dependencies.throwNotFoundError
      ).toHaveBeenCalledWith('Order not found', { orderId: input.orderId });
    });

    it('should return object if order status was changed', async () => {
      const updatedOrder = await changeOrderStatus(input);
      expect(updatedOrder).toStrictEqual(order);
    });
  });
});
