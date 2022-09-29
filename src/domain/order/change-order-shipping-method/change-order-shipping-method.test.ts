import {
  ChangeOrderShippingMethodFactory,
  changeOrderShippingMethod
} from './change-order-shipping-method';
import { PERMISSIONS } from '../../../constants';

describe('changeOrderShippingMethod', () => {
  let dependencies: any;
  let changeOrderShippingMethod: changeOrderShippingMethod;
  let input: any;
  let order: any;
  let shippingMethod: any;

  beforeEach(() => {
    order = {
      changeShippingMethod: jest.fn(() => order),
      serialize: jest.fn(() => ({}))
    };

    shippingMethod = {
      serialize: jest.fn(() => ({}))
    };

    dependencies = {
      checkPermissions: jest.fn(),
      getShippingMethod: jest.fn(() => shippingMethod),
      getOrder: jest.fn(() => order),
      saveOrder: jest.fn(() => ({})),
      throwNotFoundError: jest.fn()
    };

    changeOrderShippingMethod = ChangeOrderShippingMethodFactory(dependencies);

    input = {
      context: {
        user: {},
        storeId: 'store-id'
      },
      orderId: 'order-id',
      shippingMethodId: 'shipping-method-id'
    };
  });

  it('should export ChangeOrderShippingMethodFactory function', () => {
    expect(typeof ChangeOrderShippingMethodFactory).toBe('function');
  });

  it('ChangeOrderShippingMethodFactory should return changeOrderShippingMethod function', () => {
    expect(typeof changeOrderShippingMethod).toBe('function');
  });

  describe('changeOrderShippingMethod', () => {
    it('should check user permissions for creating order', async () => {
      await changeOrderShippingMethod(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.ordersWrite
      );
    });

    it('should call getOrder', async () => {
      await changeOrderShippingMethod(input);

      expect(dependencies.getOrder).toHaveBeenCalledWith({
        context: input.context,
        orderId: input.orderId
      });
    });

    it('should call getShippingMethod', async () => {
      await changeOrderShippingMethod(input);
      expect(dependencies.getShippingMethod).toHaveBeenCalledWith({
        context: input.context,
        shippingMethodId: input.shippingMethodId
      });
    });

    it('should call order.changeShippingMethod', async () => {
      await changeOrderShippingMethod(input);
      expect(order.changeShippingMethod).toHaveBeenCalledWith({});
    });

    it('should call saveOrder', async () => {
      await changeOrderShippingMethod(input);

      const query = {
        storeId: input.context.storeId,
        id: input.orderId
      };

      expect(dependencies.saveOrder).toHaveBeenCalledWith(query, {});
    });

    it('should call throwNotFoundError if order was not updated', async () => {
      dependencies = { ...dependencies, saveOrder: jest.fn() };
      changeOrderShippingMethod = ChangeOrderShippingMethodFactory(
        dependencies
      );

      await changeOrderShippingMethod(input);

      expect(
        dependencies.throwNotFoundError
      ).toHaveBeenCalledWith('Order not found', { orderId: input.orderId });
    });
  });
});
