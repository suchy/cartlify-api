import {
  CreateShippingMethodFactory,
  createShippingMethod
} from './create-shipping-method';
import { MOCKED_DATE, PERMISSIONS } from '../../../constants';

const RealDate = Date;

describe('create-shipping-method', () => {
  let dependencies: any;
  let createShippingMethod: createShippingMethod;
  let input: any;
  let shippingMethod: any;

  beforeAll(() => {
    // @ts-ignore
    global.Date = jest.fn(() => MOCKED_DATE);
  });

  afterAll(() => {
    global.Date = RealDate;
  });

  beforeEach(() => {
    shippingMethod = { serialize: jest.fn() };

    dependencies = {
      checkPermissions: jest.fn(),
      insert: jest.fn(() => ({})),
      createId: jest.fn(() => 'shipping-method-id'),
      ShippingMethodFactory: jest.fn(() => shippingMethod),
      getStore: jest.fn(() => ({}))
    };

    createShippingMethod = CreateShippingMethodFactory(dependencies);

    input = {
      context: { user: {}, storeId: 'store-id' },
      shippingMethodProps: {
        name: 'name',
        description: 'description',
        price: 1,
        status: true
      }
    };
  });

  it('should export CreateShippingMethodFactory function', () => {
    expect(typeof CreateShippingMethodFactory).toBe('function');
  });

  it('CreateShippingMethodFactory should return createShippingMethod function', () => {
    expect(typeof createShippingMethod).toBe('function');
  });

  describe('createShippingMethod', () => {
    it('should check user permissions for creating shipping method', async () => {
      await createShippingMethod(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.shippingMethodsCreate
      );
    });

    it('should call getStore', async () => {
      await createShippingMethod(input);
      expect(dependencies.getStore).toHaveBeenCalledWith({
        context: input.context
      });
    });

    it('should call createId', async () => {
      await createShippingMethod(input);
      expect(dependencies.createId).toHaveBeenCalled();
    });

    it('should call ShippingMethodFactory', async () => {
      await createShippingMethod(input);

      const shippingMethodProps = {
        ...input.shippingMethodProps,
        id: 'shipping-method-id',
        storeId: input.context.storeId,
        createdAt: MOCKED_DATE,
        updatedAt: MOCKED_DATE
      };

      expect(dependencies.ShippingMethodFactory).toHaveBeenCalledWith(
        shippingMethodProps
      );
    });

    it('should call insert', async () => {
      dependencies = {
        ...dependencies,
        ShippingMethodFactory: jest.fn(() => ({
          serialize: jest.fn(() => input.shippingMethod)
        }))
      };

      createShippingMethod = CreateShippingMethodFactory(dependencies);

      await createShippingMethod(input);

      expect(dependencies.insert).toHaveBeenCalledWith(input.shippingMethod);
    });

    it('should return a shipping method', async () => {
      const createdShippingMethod = await createShippingMethod(input);
      expect(createdShippingMethod).toStrictEqual(shippingMethod);
    });
  });
});
