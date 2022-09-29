import { Product, ProductFactory, ProductFactoryInjectable } from './product';
import { MOCKED_DATE } from '../../../constants';

const RealDate = Date;

describe('product', () => {
  let dependencies: any;
  let ProductFactory: ProductFactory;
  let input: any;
  let product: Product;

  beforeAll(() => {
    // @ts-ignore
    global.Date = jest.fn(() => MOCKED_DATE);
  });

  afterAll(() => {
    global.Date = RealDate;
  });

  beforeEach(() => {
    dependencies = { validate: jest.fn() };

    ProductFactory = ProductFactoryInjectable(dependencies);

    input = {
      id: 'product-id',
      name: 'Super amazing product',
      description: 'Lorem ipsum dolor sit amet',
      price: 100,
      stock: 50,
      storeId: 'store-id',
      published: true,
      createdAt: MOCKED_DATE,
      updatedAt: MOCKED_DATE
    };

    product = ProductFactory(input);
  });

  it('should export ProductFactoryInjectable function', () => {
    expect(typeof ProductFactoryInjectable).toBe('function');
  });

  it('ProductFactoryInjectable should return ProductFactory function', () => {
    expect(typeof ProductFactoryInjectable).toBe('function');
  });

  xit('ProductFactory should throw validation error if input is not valid', () => {});

  it('ProductFactory should return product object', () => {
    const expectedResult = {
      ...input,
      changeStock: () => {},
      decreaseStock: () => {},
      increaseStock: () => {},
      publish: () => {},
      serialize: () => {},
      unpublish: () => {},
      update: () => {}
    };

    expect(JSON.stringify(product)).toBe(JSON.stringify(expectedResult));
  });

  describe('product', () => {
    it('should have only methods and read-only properties', () => {
      Object.keys(product).forEach((key) => {
        // @ts-ignore
        const isWritable = Object.getOwnPropertyDescriptor(product, key)
          .writable;
        // @ts-ignore
        const isFunction = typeof product[key] === 'function';
        const isWritableOrFunction =
          (!isWritable && !isFunction) || (isWritable && isFunction);

        expect(isWritableOrFunction).toBeTruthy();
      });
    });

    it('changeStock method should return product with updated stock', () => {
      const updatedProduct = product.changeStock(666);
      expect(updatedProduct.stock).toBe(666);
    });

    it('decreaseStock method should return product with updated stock', () => {
      const updatedProduct = product.decreaseStock(10);
      expect(updatedProduct.stock).toBe(40);
    });

    it('increaseStock method should return product with updated stock', () => {
      const updatedProduct = product.increaseStock(10);
      expect(updatedProduct.stock).toBe(60);
    });

    it('publish method should return published product', () => {
      input = {
        ...input,
        published: false
      };

      product = ProductFactory(input);

      const publishedProduct = product.publish();
      expect(publishedProduct.published).toBe(true);
    });

    it('serialize method should return product data', () => {
      const productData = product.serialize();
      expect(productData).toStrictEqual(input);
    });

    it('unpublish method should return unpublished product', () => {
      const unpublishedStore = product.unpublish();
      expect(unpublishedStore.published).toBe(false);
    });

    it('update method should return updated product', () => {
      // @ts-ignore
      global.Date = jest.fn(() => new RealDate());

      const productProps = {
        name: 'Super amazing updated product',
        description: 'Sit amet lorem ipsum',
        price: 99,
        stock: 49,
        published: false
      };

      const updatedProduct = product.update(productProps);

      expect(updatedProduct.published).toBe(false);
      expect(updatedProduct.name).toBe(productProps.name);
      expect(updatedProduct.description).toBe(productProps.description);
      expect(updatedProduct.price).toBe(productProps.price);
      expect(updatedProduct.stock).toBe(productProps.stock);
      expect(updatedProduct.updatedAt).not.toBe(product.updatedAt);
    });
  });
});

// describe('it should throw validation error if', () => {
//   fit('name is missing', async () => {
//     const create = createProduct({ ...input, product: {} });
//     const errors = await getFieldValidationErros(create, 'name');
//     expect(errors.length).toBe(1);
//   });

//   it('name is not a string', async () => {
//     const create = createProduct({
//       ...input,
//       product: { name: 1 }
//     });
//     const errors = await getFieldValidationErros(create, 'name');
//     expect(errors.length).toBe(1);
//   });

//   it('description is present and is not a string', async () => {
//     const create = createProduct({
//       ...input,
//       product: { description: 1 }
//     });
//     const errors = await getFieldValidationErros(create, 'description');
//     expect(errors.length).toBe(1);
//   });

//   it('price is missing', async () => {
//     const create = createProduct({ ...input, product: {} });
//     const errors = await getFieldValidationErros(create, 'price');
//     expect(errors.length).toBe(1);
//   });

//   it('price is not a number', async () => {
//     const create = createProduct({
//       ...input,
//       product: { price: 'not-a-number' }
//     });
//     const errors = await getFieldValidationErros(create, 'price');
//     expect(errors.length).toBe(1);
//   });

//   it('price is lower than a  0', async () => {
//     const create = createProduct({
//       ...input,
//       product: { price: -1 }
//     });
//     const errors = await getFieldValidationErros(create, 'price');
//     expect(errors.length).toBe(1);
//   });

//   it('quantity is missing', async () => {
//     const create = createProduct({ ...input, product: {} });
//     const errors = await getFieldValidationErros(create, 'quantity');
//     expect(errors.length).toBe(1);
//   });

//   it('quantity is not a number', async () => {
//     const create = createProduct({
//       ...input,
//       product: { quantity: 'not-a-number' }
//     });
//     const errors = await getFieldValidationErros(create, 'quantity');
//     expect(errors.length).toBe(1);
//   });

//   it('quantity is lower than a  0', async () => {
//     const create = createProduct({
//       ...input,
//       product: { quantity: -1 }
//     });
//     const errors = await getFieldValidationErros(create, 'quantity');
//     expect(errors.length).toBe(1);
//   });
// });
