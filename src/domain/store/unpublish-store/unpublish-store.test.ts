import { UnpublishStoreFactory, unpublishStore } from './unpublish-store';
import { PERMISSIONS } from '../../../constants';

describe('unpublish-store', () => {
  let dependencies: any;
  let unpublishStore: unpublishStore;
  let input: any;
  let store: any;

  beforeEach(() => {
    store = {
      unpublish: jest.fn(() => store),
      serialize: jest.fn(() => ({}))
    };

    dependencies = {
      checkPermissions: jest.fn(),
      getStore: jest.fn(() => store),
      saveStore: jest.fn(() => true),
      throwNotFoundError: jest.fn()
    };

    unpublishStore = UnpublishStoreFactory(dependencies);

    input = {
      context: {
        storeId: 'store-id',
        user: {}
      }
    };
  });

  it('should export UnpublishStoreFactory function', () => {
    expect(typeof UnpublishStoreFactory).toBe('function');
  });

  it('UnpublishStoreFactory should return unpublishStore function', () => {
    expect(typeof unpublishStore).toBe('function');
  });

  describe('unpublishStore', () => {
    it('should check user permissions for reading stores', async () => {
      await unpublishStore(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.storesWrite
      );
    });

    it('should call getStore', async () => {
      await unpublishStore(input);
      expect(dependencies.getStore).toHaveBeenCalledWith(input);
    });

    it('should call store.unpublish', async () => {
      await unpublishStore(input);
      expect(store.unpublish).toHaveBeenCalled();
    });

    it('should call saveStore', async () => {
      await unpublishStore(input);

      const query = { id: input.context.storeId };
      expect(dependencies.saveStore).toHaveBeenCalledWith(query, {});
    });

    it('should call throwNotFoundError if store was not found', async () => {
      dependencies = {
        ...dependencies,
        saveStore: jest.fn()
      };

      unpublishStore = UnpublishStoreFactory(dependencies);

      await unpublishStore(input);

      expect(dependencies.throwNotFoundError).toBeCalledWith(
        'Store not found',
        {
          storeId: input.context.storeId
        }
      );
    });

    it('should return object if store was unpublished', async () => {
      const unpublishedStore = await unpublishStore(input);
      expect(unpublishedStore).toStrictEqual(store);
    });
  });
});
