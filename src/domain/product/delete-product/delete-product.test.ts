import { DeleteProductFactory, deleteProduct } from './delete-product';
import { PERMISSIONS } from '../../../constants';

describe('delete-product', () => {
  let dependencies: any;
  let deleteProduct: deleteProduct;
  let input: any;

  beforeEach(() => {
    dependencies = {
      checkPermissions: jest.fn(),
      remove: jest.fn(() => true),
      throwNotFoundError: jest.fn()
    };

    deleteProduct = DeleteProductFactory(dependencies);

    input = {
      context: {
        storeId: 'store-id',
        user: {}
      },
      productId: 'product-id'
    };
  });

  it('should export DeleteProductFactory function', () => {
    expect(typeof DeleteProductFactory).toBe('function');
  });

  it('DeleteProductFactory should return deleteProduct function', () => {
    expect(typeof deleteProduct).toBe('function');
  });

  describe('deleteProduct', () => {
    it('should check user permissions for deleting products', async () => {
      await deleteProduct(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.productsDelete
      );
    });

    it('should call remove', async () => {
      await deleteProduct(input);

      expect(dependencies.remove).toHaveBeenCalledWith({
        storeId: input.context.storeId,
        id: input.productId
      });
    });

    it('should call throwNotFoundError if product was not deleted', async () => {
      dependencies = {
        ...dependencies,
        remove: jest.fn(() => false)
      };

      deleteProduct = DeleteProductFactory(dependencies);
      await deleteProduct(input);

      expect(dependencies.throwNotFoundError).toHaveBeenCalledWith(
        'Product not found',
        {
          productId: input.productId
        }
      );
    });

    it('should return true if product was deleted', async () => {
      const isDeleted = await deleteProduct(input);
      expect(isDeleted).toBe(true);
    });
  });
});
