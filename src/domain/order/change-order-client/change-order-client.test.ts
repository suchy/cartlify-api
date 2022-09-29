import {
  ChangeOrderClientFactory,
  changeOrderClient
} from './change-order-client';
import { PERMISSIONS } from '../../../constants';

describe('change-order-client', () => {
  let dependencies: any;
  let changeOrderClient: changeOrderClient;
  let input: any;
  let order: any;

  beforeEach(() => {
    order = {
      changeClient: jest.fn(() => order),
      serialize: jest.fn(() => ({}))
    };

    dependencies = {
      checkPermissions: jest.fn(),
      getOrder: jest.fn(() => order),
      saveOrder: jest.fn(() => true),
      throwNotFoundError: jest.fn()
    };

    changeOrderClient = ChangeOrderClientFactory(dependencies);

    input = {
      context: { user: {}, storeId: 'store-id' },
      orderId: 'order-id',
      client: {
        address: 'address',
        city: 'city',
        country: 'country',
        name: 'name',
        postal: 'postal',
        phone: 'phone',
        email: 'email@email.com'
      }
    };
  });

  it('should export ChangeOrderClientFactory function', () => {
    expect(typeof ChangeOrderClientFactory).toBe('function');
  });

  it('ChangeOrderClientFactory should return changeOrderClient function', () => {
    expect(typeof changeOrderClient).toBe('function');
  });

  describe('changeOrderClient', () => {
    it('should check user permissions for updating order', async () => {
      await changeOrderClient(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.ordersWrite
      );
    });

    it('should call getOrder', async () => {
      await changeOrderClient(input);
      const query = { context: input.context, orderId: input.orderId };
      expect(dependencies.getOrder).toHaveBeenCalledWith(query);
    });

    it('should call order.changeClient', async () => {
      await changeOrderClient(input);
      expect(order.changeClient).toHaveBeenCalledWith(input.client);
    });

    it('should call saveOrder', async () => {
      await changeOrderClient(input);
      const query = { storeId: input.context.storeId, id: input.orderId };
      expect(dependencies.saveOrder).toHaveBeenCalledWith(query, {});
    });

    it('should call throwNotFoundError if order was not found', async () => {
      dependencies = {
        ...dependencies,
        saveOrder: jest.fn()
      };

      changeOrderClient = ChangeOrderClientFactory(dependencies);

      await changeOrderClient(input);

      expect(
        dependencies.throwNotFoundError
      ).toHaveBeenCalledWith('Order not found', { orderId: input.orderId });
    });

    it('should return object if order client was changed', async () => {
      const changedOrder = await changeOrderClient(input);
      expect(changedOrder).toStrictEqual(order);
    });
  });
});
