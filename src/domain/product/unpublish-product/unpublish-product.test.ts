import { UnpublishProductFactory, unpublishProduct } from './unpublish-product';
import { PERMISSIONS } from '../../../constants';

describe('unpublish-product', () => {
  let dependencies: any;
  let unpublishProduct: unpublishProduct;
  let input: any;
  let product: any;

  beforeEach(() => {
    product = {
      unpublish: jest.fn(() => product),
      serialize: jest.fn(() => ({}))
    };

    dependencies = {
      checkPermissions: jest.fn(),
      getProduct: jest.fn(() => product),
      saveProduct: jest.fn(() => true),
      throwNotFoundError: jest.fn()
    };

    unpublishProduct = UnpublishProductFactory(dependencies);

    input = {
      context: {
        storeId: 'store-id',
        user: {}
      },
      productId: 'product-id'
    };
  });

  it('should export UnpublishProductFactory function', () => {
    expect(typeof UnpublishProductFactory).toBe('function');
  });

  it('UnpublishProductFactory should return unpublishProduct function', () => {
    expect(typeof unpublishProduct).toBe('function');
  });

  describe('unpublishProduct', () => {
    it('should check user permissions for reading products', async () => {
      await unpublishProduct(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.productsWrite
      );
    });

    it('should call getProduct', async () => {
      await unpublishProduct(input);
      expect(dependencies.getProduct).toHaveBeenCalledWith(input);
    });

    it('should call product.unpublish', async () => {
      await unpublishProduct(input);
      expect(product.unpublish).toHaveBeenCalled();
    });

    it('should call saveProduct', async () => {
      await unpublishProduct(input);

      const query = { storeId: input.context.storeId, id: input.productId };
      expect(dependencies.saveProduct).toHaveBeenCalledWith(query, {});
    });

    it('should call throwNotFoundError if product was not found', async () => {
      dependencies = {
        ...dependencies,
        saveProduct: jest.fn()
      };

      unpublishProduct = UnpublishProductFactory(dependencies);

      await unpublishProduct(input);

      expect(
        dependencies.throwNotFoundError
      ).toBeCalledWith('Product not found', { storeId: input.context.storeId });
    });

    it('should return object if product was unpublished', async () => {
      const unpublishedStore = await unpublishProduct(input);
      expect(unpublishedStore).toStrictEqual(product);
    });
  });
});
