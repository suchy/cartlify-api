import { ChangeStoreFactory, changeStore } from './change-store';
import { PERMISSIONS } from '../../../constants';

describe('change-store', () => {
  let dependencies: any;
  let changeStore: changeStore;
  let input: any;
  let store: any;

  beforeEach(() => {
    store = {
      update: jest.fn(() => store),
      serialize: jest.fn(() => ({}))
    };

    dependencies = {
      checkPermissions: jest.fn(),
      getStore: jest.fn(() => store),
      saveStore: jest.fn(() => true),
      throwNotFoundError: jest.fn()
    };

    changeStore = ChangeStoreFactory(dependencies);

    input = {
      context: { user: {}, storeId: 'store-id' },
      storeProps: {
        name: 'name',
        published: true
      }
    };
  });

  it('should export ChangeStoreFactory function', () => {
    expect(typeof ChangeStoreFactory).toBe('function');
  });

  it('ChangeStoreFactory should return changeStore function', () => {
    expect(typeof changeStore).toBe('function');
  });

  describe('changeStore', () => {
    it('should check user permissions for updating stores', async () => {
      await changeStore(input);
      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.storesWrite
      );
    });

    it('should call getStore', async () => {
      await changeStore(input);

      expect(dependencies.getStore).toHaveBeenLastCalledWith({
        context: input.context
      });
    });

    it('should call store.update', async () => {
      await changeStore(input);
      expect(store.update).toHaveBeenLastCalledWith(input.storeProps);
    });

    it('should call saveStore', async () => {
      await changeStore(input);
      expect(dependencies.saveStore).toHaveBeenCalledWith(
        { id: input.context.storeId },
        {}
      );
    });

    it('should return object if store was changed', async () => {
      const updatedStore = await changeStore(input);
      expect(updatedStore).toStrictEqual(store);
    });

    it('should call throwNotFoundError if store was not updated', async () => {
      dependencies = {
        ...dependencies,
        saveStore: jest.fn()
      };

      changeStore = ChangeStoreFactory(dependencies);

      await changeStore(input);
      expect(dependencies.throwNotFoundError).toHaveBeenCalledWith(
        'Store not found',
        {
          storeId: input.context.storeId
        }
      );
    });
  });
});
