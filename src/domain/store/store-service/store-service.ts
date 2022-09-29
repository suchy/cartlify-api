import { Store, StoreFactory } from '../store/store';

export type UpdatableStoreProps = Omit<
  Store,
  'id' | 'storeId' | 'createdAt' | 'updatedAt'
>;

export interface StoreService {
  publish: () => Store;
  unpublish: () => Store;
  update: (props: Partial<UpdatableStoreProps>) => Store;
}

export type StoreServiceFactory = (store: Store) => StoreService;

export type StoreServiceFactoryFactory = (dependencies: {
  StoreFactory: StoreFactory;
}) => StoreServiceFactory;

export const StoreServiceFactoryFactory: StoreServiceFactoryFactory = ({
  StoreFactory: StoreFactory
}) => (store) => {
  const storeService: StoreService = {
    publish() {
      return storeService.update({ published: true });
    },

    unpublish() {
      return storeService.update({ published: false });
    },

    update(props) {
      const storeData = { ...store, ...props, updatedAt: new Date() };
      return StoreFactory(storeData);
    }
  };

  return storeService;
};
