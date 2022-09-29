import {
  GetProductsFactory,
  getProducts
} from './get-published-products-with-count';
import { PERMISSIONS } from '../../../constants';

describe('get-products', () => {
  let dependencies: any;
  let getProducts: getProducts;
  let input: any;

  beforeEach(() => {
    dependencies = {
      checkPermissions: jest.fn(),
      find: jest.fn(() => []),
      ProductFactory: jest.fn(() => ({}))
    };

    getProducts = GetProductsFactory(dependencies);

    input = {
      context: {
        storeId: 'store-id',
        user: {}
      }
    };
  });

  it('should export GetProductsFactory function', () => {
    expect(typeof GetProductsFactory).toBe('function');
  });

  it('GetProductsFactory should return getProducts function', () => {
    expect(typeof getProducts).toBe('function');
  });

  describe('getProducts', () => {
    it('should check user permissions for reading products', async () => {
      await getProducts(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.productsRead
      );
    });

    it('should call find', async () => {
      await getProducts(input);

      const productsQuery = { storeId: input.context.storeId };
      const options = {};

      expect(dependencies.find).toHaveBeenCalledWith(productsQuery, options);
    });

    it('should return empty array if no products were found', async () => {
      const products = await getProducts(input);
      expect(products).toStrictEqual([]);
    });

    it('should return objects array if products were found', async () => {
      dependencies = {
        ...dependencies,
        find: jest.fn(() => [{}])
      };

      getProducts = GetProductsFactory(dependencies);
      const products = await getProducts(input);
      expect(products).toStrictEqual([{}]);
    });
  });
});
