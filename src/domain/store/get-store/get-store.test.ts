import { GetStoreFactory, getStore } from './get-store';
import { PERMISSIONS } from '../../../constants';

describe('getStore', () => {
  let dependencies: any;
  let getStore: getStore;
  let context: any;

  beforeEach(() => {
    dependencies = {
      checkPermissions: jest.fn(),
      findStore: jest.fn(() => ({})),
      throwNotFoundError: jest.fn(),
      StoreFactory: jest.fn(() => ({}))
    };

    getStore = GetStoreFactory(dependencies);

    context = {
      storeId: 'store-id',
      user: {}
    };
  });

  it('should export GetStoreFactory function', () => {
    expect(typeof GetStoreFactory).toBe('function');
  });

  it('GetStoreFactory should return getStore function', () => {
    expect(typeof getStore).toBe('function');
  });

  describe('getStore', () => {
    it('should check user permissions for reading stores', async () => {
      await getStore({ context });

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        context,
        PERMISSIONS.storesRead
      );
    });

    it('should call findStore', async () => {
      await getStore({ context });
      expect(dependencies.findStore).toHaveBeenCalledWith({
        id: 'store-id'
      });
    });

    it('should return object if store was found', async () => {
      const store = await getStore({ context });
      expect(store).toStrictEqual({});
    });

    it('should call throwNotFoundError if store was not found', async () => {
      dependencies = {
        ...dependencies,
        findStore: jest.fn()
      };

      getStore = GetStoreFactory(dependencies);

      await getStore({ context });

      expect(dependencies.throwNotFoundError).toBeCalledWith(
        'Store not found',
        {
          storeId: context.storeId
        }
      );
    });
  });
});
