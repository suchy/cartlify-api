import { validate } from '../../../helpers/validate';
import { storeValidationSchema } from './store-validation-schema';

export interface StoreProps {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  published: boolean;
}

export type Store = Readonly<StoreProps>;

type StoreFactoryInjectable = (dependencies: {
  validate: validate;
}) => StoreFactory;

export type StoreFactory = (storeProps: StoreProps) => Store;

export const StoreFactoryInjectable: StoreFactoryInjectable = ({
  validate
}) => (storeProps) => {
  validate(storeValidationSchema, storeProps, 'Store is not valid.');

  const store: Store = Object.freeze(storeProps);

  return store;
};
