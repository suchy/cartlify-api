import {
  ChangeProductFactory,
  ChangeProductFactoryDependencies,
  changeProduct,
  ChangeProductParams
} from './change-product';
// import { PERMISSIONS } from '../../../constants';

describe('change-product', () => {
  let dependencies: ChangeProductFactoryDependencies;
  let changeProduct: changeProduct;
  let input: ChangeProductParams;
  let product: any;

  beforeEach(() => {
    product = {
      update: jest.fn(() => product),
      serialize: jest.fn(() => ({}))
    };

    dependencies = {
      checkPermissions: jest.fn(),
      getProduct: jest.fn(() => product),
      saveProduct: jest.fn(() => true),
      throwNotFoundError: jest.fn()
    };

    changeProduct = ChangeProductFactory(dependencies);

    input = {
      context: { user: { userId: 'user-id' }, storeId: 'store-id' },
      productId: 'product-id',
      productProps: {
        name: 'name',
        description: 'description',
        price: 1,
        published: true,
        stock: 1
      }
    };
  });

  it('should export ChangeProductFactory function', () => {
    expect(typeof ChangeProductFactory).toBe('function');
  });

  it('ChangeProductFactory should return changeProduct function', () => {
    expect(typeof changeProduct).toBe('function');
  });

  describe('changeProduct', () => {
    // it('should check user permissions for updating products', async () => {
    //   await changeProduct(input);

    //   expect(dependencies.checkPermissions).toHaveBeenCalledWith(
    //     input.context,
    //     PERMISSIONS.productsWrite
    //   );
    // });

    // it('should call getProduct', async () => {
    //   await changeProduct(input);

    //   expect(dependencies.getProduct).toHaveBeenCalledWith({
    //     context: input.context,
    //     productId: input.productId
    //   });
    // });

    // it('should call product.update', async () => {
    //   await changeProduct(input);
    //   expect(product.update).toHaveBeenCalledWith(input.productProps);
    // });

    // it('should call saveProduct', async () => {
    //   await changeProduct(input);
    //   const query = { storeId: input.context.storeId, id: input.productId };
    //   expect(dependencies.saveProduct).toHaveBeenCalledWith(query, {});
    // });

    it('should call throwNotFoundError if product was not saved', async () => {
      dependencies = {
        ...dependencies,
        saveProduct: jest.fn()
      };

      changeProduct = ChangeProductFactory(dependencies);

      await changeProduct(input);

      expect(dependencies.throwNotFoundError).toHaveBeenCalledWith(
        'Product not found',
        {
          productId: input.productId
        }
      );
    });

    it('should return object if product was changed', async () => {
      const updatedProduct = await changeProduct(input);
      expect(updatedProduct).toStrictEqual(product);
    });
  });
});
