import {
  ChangeShippingMethodFactory,
  changeShippingMethod
} from './change-shipping-method';
import { PERMISSIONS } from '../../../constants';

describe('change-shipping-method', () => {
  let dependencies: any;
  let changeShippingMethod: changeShippingMethod;
  let input: any;
  let shippingMethod: any;

  beforeEach(() => {
    shippingMethod = {
      update: jest.fn(() => shippingMethod),
      serialize: jest.fn(() => ({}))
    };

    dependencies = {
      checkPermissions: jest.fn(),
      getShippingMethod: jest.fn(() => shippingMethod),
      saveShippingMethod: jest.fn(() => true),
      throwNotFoundError: jest.fn()
    };

    changeShippingMethod = ChangeShippingMethodFactory(dependencies);

    input = {
      context: { user: {}, storeId: 'store-id' },
      shippingMethodId: 'shipping-method-id',
      shippingMethodProps: {
        name: 'name',
        description: 'description',
        price: 1,
        status: true
      }
    };
  });

  it('should export ChangeShippingMethodFactory function', () => {
    expect(typeof ChangeShippingMethodFactory).toBe('function');
  });

  it('ChangeShippingMethodFactory should return changeShippingMethod function', () => {
    expect(typeof changeShippingMethod).toBe('function');
  });

  describe('changeShippingMethod', () => {
    it('should check user permissions for updating shipping methods', async () => {
      await changeShippingMethod(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.shippingMethodsWrite
      );
    });

    it('should call getShippingMethod', async () => {
      await changeShippingMethod(input);
      expect(dependencies.getShippingMethod).toHaveBeenCalledWith({
        context: input.context,
        shippingMethodId: input.shippingMethodId
      });
    });

    it('should call shippingMethod.update', async () => {
      await changeShippingMethod(input);
      expect(shippingMethod.update).toHaveBeenCalledWith(
        input.shippingMethodProps
      );
    });

    it('should call saveShippingMethod', async () => {
      await changeShippingMethod(input);
      const query = {
        storeId: input.context.storeId,
        id: input.shippingMethodId
      };
      expect(dependencies.saveShippingMethod).toHaveBeenCalledWith(query, {});
    });

    it('should call throwNotFoundError if shipping method was not saved', async () => {
      dependencies = {
        ...dependencies,
        saveShippingMethod: jest.fn()
      };

      changeShippingMethod = ChangeShippingMethodFactory(dependencies);

      await changeShippingMethod(input);

      expect(dependencies.throwNotFoundError).toHaveBeenCalledWith(
        'Shipping method not found',
        {
          shippingMethodId: input.shippingMethodId
        }
      );
    });

    it('should return object if shipping method was changed', async () => {
      const updatedShippingMethod = await changeShippingMethod(input);
      expect(updatedShippingMethod).toStrictEqual(shippingMethod);
    });
  });
});
