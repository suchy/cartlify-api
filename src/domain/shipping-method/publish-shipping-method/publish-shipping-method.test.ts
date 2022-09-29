import {
  PublishShippingMethodFactory,
  publishShippingMethod
} from './publish-shipping-method';
import { PERMISSIONS } from '../../../constants';

describe('publish-shipping-method', () => {
  let dependencies: any;
  let publishShippingMethod: publishShippingMethod;
  let input: any;
  let shippingMethod: any;

  beforeEach(() => {
    shippingMethod = {
      publish: jest.fn(() => shippingMethod),
      serialize: jest.fn(() => ({}))
    };

    dependencies = {
      checkPermissions: jest.fn(),
      getShippingMethod: jest.fn(() => shippingMethod),
      saveShippingMethod: jest.fn(() => true),
      throwNotFoundError: jest.fn()
    };

    publishShippingMethod = PublishShippingMethodFactory(dependencies);

    input = {
      context: {
        storeId: 'store-id',
        user: {}
      },
      shippingMethodId: 'shipping-method-id'
    };
  });

  it('should export PublishShippingMethodFactory function', () => {
    expect(typeof PublishShippingMethodFactory).toBe('function');
  });

  it('PublishShippingMethodFactory should return publishShippingMethod function', () => {
    expect(typeof publishShippingMethod).toBe('function');
  });

  describe('publishShippingMethod', () => {
    it('should check user permissions for writing shipping methods', async () => {
      await publishShippingMethod(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.shippingMethodsWrite
      );
    });

    it('should call getShippingMethod', async () => {
      await publishShippingMethod(input);
      expect(dependencies.getShippingMethod).toHaveBeenCalledWith(input);
    });

    it('should call shippingMethod.publish', async () => {
      await publishShippingMethod(input);
      expect(shippingMethod.publish).toHaveBeenCalled();
    });

    it('should call saveShippingMethod', async () => {
      await publishShippingMethod(input);

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

      publishShippingMethod = PublishShippingMethodFactory(dependencies);

      await publishShippingMethod(input);

      expect(dependencies.throwNotFoundError).toBeCalledWith(
        'Shipping method not found',
        {
          storeId: input.context.storeId
        }
      );
    });

    it('should return object if shipping method was published', async () => {
      const publishedShippingMethod = await publishShippingMethod(input);
      expect(publishedShippingMethod).toStrictEqual(shippingMethod);
    });
  });
});
