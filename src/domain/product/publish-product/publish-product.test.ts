import { PublishProductFactory, publishProduct } from './publish-product';
import { PERMISSIONS } from '../../../constants';

describe('publish-product', () => {
  let dependencies: any;
  let publishProduct: publishProduct;
  let input: any;
  let product: any;

  beforeEach(() => {
    product = {
      publish: jest.fn(() => product),
      serialize: jest.fn(() => ({}))
    };

    dependencies = {
      checkPermissions: jest.fn(),
      getProduct: jest.fn(() => product),
      saveProduct: jest.fn(() => true),
      throwNotFoundError: jest.fn()
    };

    publishProduct = PublishProductFactory(dependencies);

    input = {
      context: {
        storeId: 'store-id',
        user: {}
      },
      productId: 'product-id'
    };
  });

  it('should export PublishProductFactory function', () => {
    expect(typeof PublishProductFactory).toBe('function');
  });

  it('PublishProductFactory should return publishProduct function', () => {
    expect(typeof publishProduct).toBe('function');
  });

  describe('publishProduct', () => {
    it('should check user permissions for reading products', async () => {
      await publishProduct(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.productsWrite
      );
    });

    it('should call getProduct', async () => {
      await publishProduct(input);
      expect(dependencies.getProduct).toHaveBeenCalledWith(input);
    });

    it('should call product.publish', async () => {
      await publishProduct(input);
      expect(product.publish).toHaveBeenCalled();
    });

    it('should call saveProduct', async () => {
      await publishProduct(input);

      const query = { storeId: input.context.storeId, id: input.productId };
      expect(dependencies.saveProduct).toHaveBeenCalledWith(query, {});
    });

    it('should call throwNotFoundError if product was not found', async () => {
      dependencies = {
        ...dependencies,
        saveProduct: jest.fn()
      };

      publishProduct = PublishProductFactory(dependencies);

      await publishProduct(input);

      expect(
        dependencies.throwNotFoundError
      ).toBeCalledWith('Product not found', { storeId: input.context.storeId });
    });

    it('should return object if product was published', async () => {
      const publishedProduct = await publishProduct(input);
      expect(publishedProduct).toStrictEqual(product);
    });
  });
});
