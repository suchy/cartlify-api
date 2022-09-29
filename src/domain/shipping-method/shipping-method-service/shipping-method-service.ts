import {
  ShippingMethod,
  ShippingMethodFactory
} from '../shipping-method/shipping-method';

export type UpdatableShippingMethodProps = Omit<
  ShippingMethod,
  'id' | 'storeId' | 'createdAt' | 'updatedAt'
>;

export interface ShippingMethodService {
  publish: () => ShippingMethod;
  unpublish: () => ShippingMethod;
  update: (props: Partial<UpdatableShippingMethodProps>) => ShippingMethod;
}

export type ShippingMethodServiceFactory = (
  shippingMethod: ShippingMethod
) => ShippingMethodService;

export type ShippingMethodServiceFactoryFactory = (dependencies: {
  ShippingMethodFactory: ShippingMethodFactory;
}) => ShippingMethodServiceFactory;

export const ShippingMethodServiceFactoryFactory: ShippingMethodServiceFactoryFactory = ({
  ShippingMethodFactory
}) => (shippingMethod) => {
  const shippingMethodService: ShippingMethodService = {
    publish() {
      return shippingMethodService.update({ published: true });
    },

    unpublish() {
      return shippingMethodService.update({ published: false });
    },

    update(props) {
      const shippingMethodData = {
        ...shippingMethod,
        ...props,
        updatedAt: new Date()
      };

      return ShippingMethodFactory(shippingMethodData);
    }
  };

  return shippingMethodService;
};
