import { validate } from '../../../helpers/validate';
import { orderNoteValidationSchema } from './order-note-validation-schema';

export interface OrderNoteProps {
  content: string;
  orderId: string;
  storeId: string;
  createdAt: Date;
  id: string;
  updatedAt: Date;
}

export type OrderNote = Readonly<OrderNoteProps>;

type OrderNoteFactoryInjectable = (dependencies: {
  validate: validate;
}) => OrderNoteFactory;

export type OrderNoteFactory = (orderNoteProps: OrderNoteProps) => OrderNote;

export const OrderNoteFactoryInjectable: OrderNoteFactoryInjectable = ({
  validate
}) => (orderNoteProps) => {
  validate(
    orderNoteValidationSchema,
    orderNoteProps,
    'Order note is not valid.'
  );

  const orderNote: OrderNote = Object.freeze(orderNoteProps);

  return orderNote;
};
