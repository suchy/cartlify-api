import { GetProductFactory, getProduct } from './get-product';
import { PERMISSIONS } from '../../../constants';

describe('get-product', () => {
  let dependencies: any;
  let getProduct: getProduct;
  let input: any;

  beforeEach(() => {
    dependencies = {
      checkPermissions: jest.fn(),
      findOne: jest.fn(() => ({})),
      ProductFactory: jest.fn(() => ({})),
      throwNotFoundError: jest.fn()
    };

    getProduct = GetProductFactory(dependencies);

    input = {
      context: {
        storeId: 'store-id',
        user: {}
      },
      productId: 'product-id'
    };
  });

  it('should export GetProductFactory function', () => {
    expect(typeof GetProductFactory).toBe('function');
  });

  it('GetProductFactory should return getProduct function', () => {
    expect(typeof getProduct).toBe('function');
  });

  describe('getProduct', () => {
    it('should check user permissions for reading products', async () => {
      await getProduct(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.productsRead
      );
    });

    it('should call findOne', async () => {
      await getProduct(input);

      const query = {
        storeId: input.context.storeId,
        id: input.productId
      };

      expect(dependencies.findOne).toHaveBeenCalledWith(query);
    });

    it('should return object if product was found', async () => {
      const product = await getProduct(input);
      expect(product).toStrictEqual({});
    });

    it('should call throwNotFoundError if product was not found', async () => {
      dependencies = {
        ...dependencies,
        findOne: jest.fn()
      };

      getProduct = GetProductFactory(dependencies);

      await getProduct(input);

      expect(dependencies.throwNotFoundError).toHaveBeenCalledWith(
        'Product not found',
        {
          productId: input.productId
        }
      );
    });
  });
});
