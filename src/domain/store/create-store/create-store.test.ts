import { CreateStoreFactory, createStore } from './create-store';
import { MOCKED_DATE, PERMISSIONS } from '../../../constants';

const RealDate = Date;

describe('create-store', () => {
  let dependencies: any;
  let createStore: createStore;
  let input: any;
  let store: any;

  beforeAll(() => {
    // @ts-ignore
    global.Date = jest.fn(() => MOCKED_DATE);
  });

  afterAll(() => {
    global.Date = RealDate;
  });

  beforeEach(() => {
    store = { serialize: jest.fn() };

    dependencies = {
      checkPermissions: jest.fn(),
      insertStore: jest.fn(() => ({})),
      createId: jest.fn(() => 'store-id'),
      StoreFactory: jest.fn(() => store)
    };

    createStore = CreateStoreFactory(dependencies);

    input = {
      context: { user: {} },
      storeProps: {
        name: 'name'
      }
    };
  });

  it('should export CreateStoreFactory function', () => {
    expect(typeof CreateStoreFactory).toBe('function');
  });

  it('CreateStoreFactory should return createStore function', () => {
    expect(typeof createStore).toBe('function');
  });

  describe('createStore', () => {
    it('should check user permissions for creating store', async () => {
      await createStore(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.storesCreate
      );
    });

    it('should call createId', async () => {
      await createStore(input);
      expect(dependencies.createId).toHaveBeenCalled();
    });

    it('should call StoreFactory', async () => {
      await createStore(input);

      const storeProps = {
        ...input.storeProps,
        id: 'store-id',
        createdAt: MOCKED_DATE,
        updatedAt: MOCKED_DATE
      };

      expect(dependencies.StoreFactory).toHaveBeenCalledWith(storeProps);
    });

    it('should call insertStore', async () => {
      dependencies = {
        ...dependencies,
        StoreFactory: jest.fn(() => ({
          serialize: jest.fn(() => input.store)
        }))
      };

      createStore = CreateStoreFactory(dependencies);

      await createStore(input);

      expect(dependencies.insertStore).toHaveBeenCalledWith(input.store);
    });

    it('should return store', async () => {
      const createdStore = await createStore(input);
      expect(createdStore).toStrictEqual(store);
    });
  });
});
