import { RequestHandler } from 'express';

import { getStore } from '../../../../../domain/store/get-store/get-store';
import { ManagementStoresGetOneResponseFactory } from './management-stores-get-one-response';

import { STATUS_OK } from '../../../../../constants';
import { Store } from '../../../../../domain/store/store/store';
import { RequestQueryOne } from '../../../../../helpers/query';

export type ManagementStoresGetOne = RequestHandler<
  {},
  ReturnType<typeof ManagementStoresGetOneResponseFactory>,
  any,
  RequestQueryOne<Store>
>;

type ManagementStoresGetOneFactory = (dependencies: {
  getStore: getStore;
}) => ManagementStoresGetOne;

export const ManagementStoresGetOneFactory: ManagementStoresGetOneFactory = ({
  getStore
}) => async (req, res) => {
  const { context } = res.locals;
  const { fields } = req.query;

  const store = await getStore({ context });

  const response = ManagementStoresGetOneResponseFactory({ fields, store });

  res.status(STATUS_OK).json(response);
};
