import { OrderNote, OrderNoteFactory } from '../order-note/order-note';

export type UpdatableOrderNoteProps = Omit<
  OrderNote,
  'id' | 'storeId' | 'createdAt' | 'updatedAt'
>;

export interface OrderNoteService {
  changeContent: (content: string) => OrderNote;
}

export type OrderNoteServiceFactory = (
  orderNote: OrderNote
) => OrderNoteService;

export type OrderNoteServiceFactoryFactory = (dependencies: {
  OrderNoteFactory: OrderNoteFactory;
}) => OrderNoteServiceFactory;

export const OrderNoteServiceFactoryFactory: OrderNoteServiceFactoryFactory = ({
  OrderNoteFactory
}) => (orderNote) => {
  const orderNoteService: OrderNoteService = {
    changeContent(content) {
      const changedOrderNodeData = {
        ...orderNote,
        content,
        updatedAt: new Date()
      };

      return OrderNoteFactory(changedOrderNodeData);
    }
  };

  return orderNoteService;
};
