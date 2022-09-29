import {
  GetOrderNotesFactory,
  getOrderNotes
} from './get-order-notes-with-count';
import { PERMISSIONS } from '../../../constants';

describe('get-order-notes', () => {
  let dependencies: any;
  let getOrderNotes: getOrderNotes;
  let input: any;

  beforeEach(() => {
    dependencies = {
      checkPermissions: jest.fn(),
      findOrderNotes: jest.fn(() => [{}]),
      OrderNoteFactory: jest.fn(() => ({}))
    };

    getOrderNotes = GetOrderNotesFactory(dependencies);

    input = {
      context: {
        storeId: 'store-id',
        user: {}
      },
      orderId: 'order-id'
    };
  });

  it('should export GetOrderNotesFactory function', () => {
    expect(typeof GetOrderNotesFactory).toBe('function');
  });

  it('GetOrderNotesFactory should return getOrderNotes function', () => {
    expect(typeof getOrderNotes).toBe('function');
  });

  describe('getOrderNotes', () => {
    it('should check user permissions for reading orders notes', async () => {
      await getOrderNotes(input);

      expect(dependencies.checkPermissions).toHaveBeenCalledWith(
        input.context,
        PERMISSIONS.ordersNotesRead
      );
    });

    it('should call findOrderNotes', async () => {
      await getOrderNotes(input);

      const query = {
        storeId: input.context.storeId,
        orderId: input.orderId
      };

      const options = {};

      expect(dependencies.findOrderNotes).toHaveBeenCalledWith(query, options);
    });

    it('should call OrderNoteFactory', async () => {
      await getOrderNotes(input);
      expect(dependencies.OrderNoteFactory).toHaveBeenCalledWith({});
    });

    it('should return empty array if no order notes were found', async () => {
      dependencies = {
        ...dependencies,
        findOrderNotes: jest.fn(() => [])
      };

      getOrderNotes = GetOrderNotesFactory(dependencies);

      const orderNotes = await getOrderNotes(input);
      expect(orderNotes).toStrictEqual([]);
    });

    it('should return objects array if order notes were found', async () => {
      const orderNotes = await getOrderNotes(input);
      expect(orderNotes).toStrictEqual([{}]);
    });
  });
});
