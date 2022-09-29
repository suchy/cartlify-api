import { PublishStoreFactory, publishStore } from './publish-store';
import { PERMISSIONS } from '../../../constants';

describe('publish-store', () => {
  let dependencies: any;
  let publishStore: publishStore;
  let input: any;
  let store: any;

  beforeEach(() => {
    store = {
      publish: jest.fn(() => store),
      serialize: jest.fn(() => ({}))
    };

    dependencies = {
      checkPermissions: jest.fn(),
      getStore: jest.fn(() => store),
      saveStore: jest.fn(() => true),
      throwNotFoundError: jest.fn()
    };

    publishStore = PublishStoreFactory(dependencies);

    input = {
      context: {
        storeId: 'store-id',
        user: {}
      }
    };
  });

  it('should export PublishStoreFactory function', () => {
    expect(typeof PublishStoreFactory).toBe('function');
  });

  it('PublishStoreFactory should return publishStore function', () => {
    expect(typeof publishStore).toBe('function');
  });

  describe('publishStore', () => {
    it('should check user permissions for reading stores', async () => {
      await publishStore(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.storesWrite
      );
    });

    it('should call getStore', async () => {
      await publishStore(input);
      expect(dependencies.getStore).toHaveBeenCalledWith(input);
    });

    it('should call store.publish', async () => {
      await publishStore(input);
      expect(store.publish).toHaveBeenCalled();
    });

    it('should call saveStore', async () => {
      await publishStore(input);

      const query = { id: input.context.storeId };
      expect(dependencies.saveStore).toHaveBeenCalledWith(query, {});
    });

    it('should call throwNotFoundError if store was not found', async () => {
      dependencies = {
        ...dependencies,
        saveStore: jest.fn()
      };

      publishStore = PublishStoreFactory(dependencies);

      await publishStore(input);

      expect(dependencies.throwNotFoundError).toBeCalledWith(
        'Store not found',
        {
          storeId: input.context.storeId
        }
      );
    });

    it('should return object if store was published', async () => {
      const publishedStore = await publishStore(input);
      expect(publishedStore).toStrictEqual(store);
    });
  });
});
