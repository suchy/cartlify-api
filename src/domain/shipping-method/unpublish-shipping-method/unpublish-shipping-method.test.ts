import {
  UnpublishShippingMethodFactory,
  unpublishShippingMethod
} from './unpublish-shipping-method';
import { PERMISSIONS } from '../../../constants';

describe('unpublish-shipping-method', () => {
  let dependencies: any;
  let unpublishShippingMethod: unpublishShippingMethod;
  let input: any;
  let shippingMethod: any;

  beforeEach(() => {
    shippingMethod = {
      unpublish: jest.fn(() => shippingMethod),
      serialize: jest.fn(() => ({}))
    };

    dependencies = {
      checkPermissions: jest.fn(),
      getShippingMethod: jest.fn(() => shippingMethod),
      saveShippingMethod: jest.fn(() => true),
      throwNotFoundError: jest.fn()
    };

    unpublishShippingMethod = UnpublishShippingMethodFactory(dependencies);

    input = {
      context: {
        storeId: 'store-id',
        user: {}
      },
      shippingMethodId: 'shipping-method-id'
    };
  });

  it('should export UnpublishShippingMethodFactory function', () => {
    expect(typeof UnpublishShippingMethodFactory).toBe('function');
  });

  it('UnpublishShippingMethodFactory should return unpublishShippingMethod function', () => {
    expect(typeof unpublishShippingMethod).toBe('function');
  });

  describe('unpublishShippingMethod', () => {
    it('should check user permissions for writing shipping methods', async () => {
      await unpublishShippingMethod(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.shippingMethodsWrite
      );
    });

    it('should call getShippingMethod', async () => {
      await unpublishShippingMethod(input);
      expect(dependencies.getShippingMethod).toHaveBeenCalledWith(input);
    });

    it('should call shippingMethod.unpublish', async () => {
      await unpublishShippingMethod(input);
      expect(shippingMethod.unpublish).toHaveBeenCalled();
    });

    it('should call saveShippingMethod', async () => {
      await unpublishShippingMethod(input);

      const query = {
        storeId: input.context.storeId,
        id: input.shippingMethodId
      };
      expect(dependencies.saveShippingMethod).toHaveBeenCalledWith(query, {});
    });

    it('should call throwNotFoundError if shipping method was not found', async () => {
      dependencies = {
        ...dependencies,
        saveShippingMethod: jest.fn()
      };

      unpublishShippingMethod = UnpublishShippingMethodFactory(dependencies);

      await unpublishShippingMethod(input);

      expect(dependencies.throwNotFoundError).toBeCalledWith(
        'Shipping method not found',
        {
          storeId: input.context.storeId
        }
      );
    });

    it('should return object if shipping method was unpublished', async () => {
      const unpublishedShippingMethod = await unpublishShippingMethod(input);
      expect(unpublishedShippingMethod).toStrictEqual(shippingMethod);
    });
  });
});
