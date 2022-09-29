import {
  ShippingMethod,
  ShippingMethodFactory,
  ShippingMethodFactoryInjectable
} from './shipping-method';

import { MOCKED_DATE } from '../../../constants';

const RealDate = Date;

describe('shipping-method', () => {
  let dependencies: any;
  let ShippingMethodFactory: ShippingMethodFactory;
  let input: any;
  let shippingMethod: ShippingMethod;

  beforeAll(() => {
    // @ts-ignore
    global.Date = jest.fn(() => MOCKED_DATE);
  });

  afterAll(() => {
    global.Date = RealDate;
  });

  beforeEach(() => {
    dependencies = { validate: jest.fn() };

    ShippingMethodFactory = ShippingMethodFactoryInjectable(dependencies);

    input = {
      id: 'shipping-method-id',
      name: 'Shipping method name',
      description: 'Shipping method description',
      price: 100,
      published: true,
      storeId: 'store-id',
      createdAt: MOCKED_DATE,
      updatedAt: MOCKED_DATE
    };

    shippingMethod = ShippingMethodFactory(input);
  });

  it('should export ShippingMethodFactoryInjectable function', () => {
    expect(typeof ShippingMethodFactoryInjectable).toBe('function');
  });

  it('ShippingMethodFactoryInjectable should return ShippingMethodFactory function', () => {
    expect(typeof ShippingMethodFactoryInjectable).toBe('function');
  });

  xit('ShippingMethodFactory should throw validation error if input is not valid', () => {});

  it('ShippingMethodFactory should return shippingMethod object', () => {
    const expectedResult = {
      ...input,
      publish: () => {},
      serialize: () => {},
      unpublish: () => {},
      update: () => {}
    };

    expect(JSON.stringify(shippingMethod)).toBe(JSON.stringify(expectedResult));
  });

  describe('shippingMethod', () => {
    it('should have only methods and read-only properties', () => {
      Object.keys(shippingMethod).forEach((key) => {
        // @ts-ignore
        const isWritable = Object.getOwnPropertyDescriptor(shippingMethod, key)
          .writable;
        // @ts-ignore
        const isFunction = typeof shippingMethod[key] === 'function';
        const isWritableOrFunction =
          (!isWritable && !isFunction) || (isWritable && isFunction);

        expect(isWritableOrFunction).toBeTruthy();
      });
    });

    it('publish method should return published shippingMethod', () => {
      input = {
        ...input,
        published: false
      };

      shippingMethod = ShippingMethodFactory(input);

      const publishedShippingMethod = shippingMethod.publish();
      expect(publishedShippingMethod.published).toBe(true);
    });

    it('serialize method should return shipping method data', () => {
      const shippingMethodData = shippingMethod.serialize();
      expect(shippingMethodData).toStrictEqual(input);
    });

    it('unpublish method should return unpublished shippingMethod', () => {
      shippingMethod = ShippingMethodFactory(input);

      const unpublishedShippingMethod = shippingMethod.unpublish();
      expect(unpublishedShippingMethod.published).toBe(false);
    });

    it('update method should return updated shippingMethod', () => {
      // @ts-ignore
      global.Date = jest.fn(() => new RealDate());

      const shippingMethodProps = {
        name: 'Shipping method new name',
        description: 'Shipping method new description',
        price: 80,
        published: false
      };

      const updatedShippingMethod = shippingMethod.update(shippingMethodProps);

      expect(updatedShippingMethod.name).toBe(shippingMethodProps.name);
      expect(updatedShippingMethod.description).toBe(
        shippingMethodProps.description
      );
      expect(updatedShippingMethod.price).toBe(shippingMethodProps.price);
      expect(updatedShippingMethod.published).toBe(
        shippingMethodProps.published
      );
      expect(updatedShippingMethod.updatedAt).not.toBe(
        shippingMethod.updatedAt
      );
    });
  });
});

// describe('it should throw validation error if', () => {
//   it('name is missing', async () => {
//     const update = changeShippingMethod({ ...input, shippingMethod: {} });
//     const errors = await getFieldValidationErros(update, 'name');
//     expect(errors.length).toBe(1);
//   });

//   it('name is not a string', async () => {
//     const update = changeShippingMethod({
//       ...input,
//       shippingMethod: { name: 1 }
//     });
//     const errors = await getFieldValidationErros(update, 'name');
//     expect(errors.length).toBe(1);
//   });

//   it('description is present and is not a string', async () => {
//     const update = changeShippingMethod({
//       ...input,
//       shippingMethod: { description: 1 }
//     });
//     const errors = await getFieldValidationErros(update, 'description');
//     expect(errors.length).toBe(1);
//   });

//   it('price is missing', async () => {
//     const update = changeShippingMethod({ ...input, shippingMethod: {} });
//     const errors = await getFieldValidationErros(update, 'price');
//     expect(errors.length).toBe(1);
//   });

//   it('price is not a number', async () => {
//     const update = changeShippingMethod({
//       ...input,
//       shippingMethod: { price: 'not-a-number' }
//     });
//     const errors = await getFieldValidationErros(update, 'price');
//     expect(errors.length).toBe(1);
//   });

//   it('price is lower than a  0', async () => {
//     const update = changeShippingMethod({
//       ...input,
//       shippingMethod: { price: -1 }
//     });
//     const errors = await getFieldValidationErros(update, 'price');
//     expect(errors.length).toBe(1);
//   });

//   it('status is missing', async () => {
//     const update = changeShippingMethod({
//       ...input,
//       shippingMethod: { status: undefined }
//     });
//     const errors = await getFieldValidationErros(update, 'status');
//     expect(errors.length).toBe(1);
//   });

//   it('status is not a boolean', async () => {
//     const update = changeShippingMethod({
//       ...input,
//       shippingMethod: { status: 'invalid-status' }
//     });
//     const errors = await getFieldValidationErros(update, 'status');
//     expect(errors.length).toBe(1);
//   });
// });

// describe('it should throw validation error if', () => {
//   it('name is missing', async () => {
//     const create = createShippingMethod({ ...input, shippingMethod: {} });
//     const errors = await getFieldValidationErros(create, 'name');
//     expect(errors.length).toBe(1);
//   });

//   it('name is not a string', async () => {
//     const create = createShippingMethod({
//       ...input,
//       shippingMethod: { name: 1 }
//     });
//     const errors = await getFieldValidationErros(create, 'name');
//     expect(errors.length).toBe(1);
//   });

//   it('description is present and is not a string', async () => {
//     const create = createShippingMethod({
//       ...input,
//       shippingMethod: { description: 1 }
//     });
//     const errors = await getFieldValidationErros(create, 'description');
//     expect(errors.length).toBe(1);
//   });

//   it('price is missing', async () => {
//     const create = createShippingMethod({ ...input, shippingMethod: {} });
//     const errors = await getFieldValidationErros(create, 'price');
//     expect(errors.length).toBe(1);
//   });

//   it('price is not a number', async () => {
//     const create = createShippingMethod({
//       ...input,
//       shippingMethod: { price: 'not-a-number' }
//     });
//     const errors = await getFieldValidationErros(create, 'price');
//     expect(errors.length).toBe(1);
//   });

//   it('price is lower than a  0', async () => {
//     const create = createShippingMethod({
//       ...input,
//       shippingMethod: { price: -1 }
//     });
//     const errors = await getFieldValidationErros(create, 'price');
//     expect(errors.length).toBe(1);
//   });

//   it('status is missing', async () => {
//     const create = createShippingMethod({
//       ...input,
//       shippingMethod: { status: undefined }
//     });
//     const errors = await getFieldValidationErros(create, 'status');
//     expect(errors.length).toBe(1);
//   });

//   it('status is not a boolean', async () => {
//     const create = createShippingMethod({
//       ...input,
//       shippingMethod: { status: 'invalid-status' }
//     });
//     const errors = await getFieldValidationErros(create, 'status');
//     expect(errors.length).toBe(1);
//   });
// });
