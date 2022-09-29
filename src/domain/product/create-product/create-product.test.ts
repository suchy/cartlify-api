import { CreateProductFactory, createProduct } from './create-product';
import { MOCKED_DATE, PERMISSIONS } from '../../../constants';

const RealDate = Date;

describe('create-product', () => {
  let dependencies: any;
  let createProduct: createProduct;
  let input: any;
  let product: any;

  beforeAll(() => {
    // @ts-ignore
    global.Date = jest.fn(() => MOCKED_DATE);
  });

  afterAll(() => {
    global.Date = RealDate;
  });

  beforeEach(() => {
    product = { serialize: jest.fn() };

    dependencies = {
      checkPermissions: jest.fn(),
      insert: jest.fn(() => ({})),
      createId: jest.fn(() => 'product-id'),
      ProductFactory: jest.fn(() => product),
      getStore: jest.fn(() => ({}))
    };

    createProduct = CreateProductFactory(dependencies);

    input = {
      context: { storeId: 'store-id', user: {} },
      productProps: {
        name: 'name',
        description: 'description',
        price: 1,
        quantity: 1
      }
    };
  });

  it('should export CreateProductFactory function', () => {
    expect(typeof CreateProductFactory).toBe('function');
  });

  it('CreateProductFactory should return createProduct function', () => {
    expect(typeof createProduct).toBe('function');
  });

  describe('createProduct', () => {
    it('should check user permissions for creating products', async () => {
      await createProduct(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.productsCreate
      );
    });

    it('should call getStore', async () => {
      await createProduct(input);
      expect(dependencies.getStore).toHaveBeenCalledWith({
        context: input.context
      });
    });

    it('should call createId', async () => {
      await createProduct(input);
      expect(dependencies.createId).toHaveBeenCalled();
    });

    it('should call ProductFactory', async () => {
      await createProduct(input);

      const productProps = {
        ...input.productProps,
        id: 'product-id',
        storeId: input.context.storeId,
        createdAt: MOCKED_DATE,
        updatedAt: MOCKED_DATE
      };

      expect(dependencies.ProductFactory).toHaveBeenCalledWith(productProps);
    });

    it('should call insert', async () => {
      dependencies = {
        ...dependencies,
        ProductFactory: jest.fn(() => ({
          serialize: jest.fn(() => input.product)
        }))
      };

      createProduct = CreateProductFactory(dependencies);

      await createProduct(input);

      expect(dependencies.insert).toHaveBeenCalledWith(input.product);
    });

    it('should return product', async () => {
      const createdProduct = await createProduct(input);
      expect(createdProduct).toStrictEqual(product);
    });
  });
});
