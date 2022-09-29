import { RequestHandler } from 'express';

import { createStore } from '../../../../../domain/store/create-store/create-store';
import { ManagementStoresCreateResponseFactory } from './management-stores-create-response';

import { STATUS_CREATED } from '../../../../../constants';
import { Store } from '../../../../../domain/store/store/store';
import { RequestQueryOne } from '../../../../../helpers/query';

export type ManagementStoresCreate = RequestHandler<
  {},
  ReturnType<typeof ManagementStoresCreateResponseFactory>,
  any,
  RequestQueryOne<Store>
>;

type ManagementStoresCreateFactory = (dependencies: {
  createStore: createStore;
}) => ManagementStoresCreate;

export const ManagementStoresCreateFactory: ManagementStoresCreateFactory = ({
  createStore
}) => async (req, res) => {
  const { context } = res.locals;
  const storeProps = req.body;
  const { fields } = req.query;

  const store = await createStore({
    context,
    storeProps
  });

  const response = ManagementStoresCreateResponseFactory({ fields, store });

  res.status(STATUS_CREATED).json(response);
};
