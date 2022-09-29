import { Store, StoreFactory, StoreFactoryInjectable } from './store';
import { MOCKED_DATE } from '../../../constants';

const RealDate = Date;

describe('store', () => {
  let dependencies: any;
  let StoreFactory: StoreFactory;
  let input: any;
  let store: Store;

  beforeAll(() => {
    // @ts-ignore
    global.Date = jest.fn(() => MOCKED_DATE);
  });

  afterAll(() => {
    global.Date = RealDate;
  });

  beforeEach(() => {
    dependencies = { validate: jest.fn() };

    StoreFactory = StoreFactoryInjectable(dependencies);

    input = {
      id: 'store-id',
      name: 'Super amazing store',
      published: true,
      createdAt: MOCKED_DATE,
      updatedAt: MOCKED_DATE
    };

    store = StoreFactory(input);
  });

  it('should export StoreFactoryInjectable function', () => {
    expect(typeof StoreFactoryInjectable).toBe('function');
  });

  it('StoreFactoryInjectable should return StoreFactory function', () => {
    expect(typeof StoreFactoryInjectable).toBe('function');
  });

  xit('StoreFactory should throw validation error if input is not valid', () => {});

  it('StoreFactory should return store object', () => {
    const expectedResult = {
      ...input,
      publish: () => {},
      serialize: () => {},
      unpublish: () => {},
      update: () => {}
    };

    expect(JSON.stringify(store)).toBe(JSON.stringify(expectedResult));
  });

  describe('store', () => {
    it('should have only methods and read-only properties', () => {
      Object.keys(store).forEach((key) => {
        // @ts-ignore
        const isWritable = Object.getOwnPropertyDescriptor(store, key).writable;
        // @ts-ignore
        const isFunction = typeof store[key] === 'function';
        const isWritableOrFunction =
          (!isWritable && !isFunction) || (isWritable && isFunction);

        expect(isWritableOrFunction).toBeTruthy();
      });
    });

    it('publish method should return published store', () => {
      input = {
        ...input,
        published: false
      };

      store = StoreFactory(input);

      const publishedStore = store.publish();
      expect(publishedStore.published).toBe(true);
    });

    it('serialize method should return store data', () => {
      const storeData = store.serialize();
      expect(storeData).toStrictEqual(input);
    });

    it('unpublish method should return unpublished store', () => {
      const unpublishedStore = store.unpublish();
      expect(unpublishedStore.published).toBe(false);
    });

    it('update method should return updated store', () => {
      // @ts-ignore
      global.Date = jest.fn(() => new RealDate());

      const updatedStore = store.update({
        name: 'Super amazing updated store',
        published: false
      });

      expect(updatedStore.published).toBe(false);
      expect(updatedStore.name).toBe('Super amazing updated store');
      expect(updatedStore.updatedAt).not.toBe(store.updatedAt);
    });
  });
});

// describe('it should throw validation error if', () => {
//   it('id is missing', async () => {
//     dependencies = {
//       ...dependencies,
//       createId: jest.fn()
//     };
//     createStore = CreateStoreFactory(dependencies);
//     const create = createStore(input);
//     const errors = await getFieldValidationErros(create, 'id');
//     expect(errors.length).toBe(1);
//   });

//   it('id is not a string', async () => {
//     dependencies = {
//       ...dependencies,
//       createId: jest.fn(() => 1)
//     };
//     createStore = CreateStoreFactory(dependencies);
//     const create = createStore(input);
//     const errors = await getFieldValidationErros(create, 'id');
//     expect(errors.length).toBe(1);
//   });

//   it('name is missing', async () => {
//     const create = createStore({ ...input, store: {} });
//     const errors = await getFieldValidationErros(create, 'name');
//     expect(errors.length).toBe(1);
//   });

//   it('name is not a string', async () => {
//     const create = createStore({
//       ...input,
//       store: { name: 1 }
//     });
//     const errors = await getFieldValidationErros(create, 'name');
//     expect(errors.length).toBe(1);
//   });
// });

// describe('it should throw validation error if', () => {
//   it('name is missing', async () => {
//     const update = changeStore({ ...input, store: {} });
//     const errors = await getFieldValidationErros(update, 'name');
//     expect(errors.length).toBe(1);
//   });

//   it('name is not a string', async () => {
//     const update = changeStore({ ...input, store: { name: 1 } });
//     const errors = await getFieldValidationErros(update, 'name');
//     expect(errors.length).toBe(1);
//   });

//   it('status is missing', async () => {
//     const update = changeStore({ ...input, store: {} });
//     const errors = await getFieldValidationErros(update, 'status');
//     expect(errors.length).toBe(1);
//   });

//   it('status is not a boolean', async () => {
//     const update = changeStore({ ...input, store: { status: 1 } });
//     const errors = await getFieldValidationErros(update, 'status');
//     expect(errors.length).toBe(1);
//   });
// });
