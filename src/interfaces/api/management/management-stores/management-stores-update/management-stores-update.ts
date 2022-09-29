import { RequestHandler } from 'express';

import { changeStore } from '../../../../../domain/store/change-store/change-store';
import { ManagementStoresUpdateResponseFactory } from './management-stores-update-response';

import { STATUS_OK } from '../../../../../constants';
import { Store } from '../../../../../domain/store/store/store';
import { RequestQueryOne } from '../../../../../helpers/query';

export type ManagementStoresUpdate = RequestHandler<
  {},
  ReturnType<typeof ManagementStoresUpdateResponseFactory>,
  any,
  RequestQueryOne<Store>
>;

type ManagementStoresUpdateFactory = (dependencies: {
  changeStore: changeStore;
}) => ManagementStoresUpdate;

export const ManagementStoresUpdateFactory: ManagementStoresUpdateFactory = ({
  changeStore
}) => async (req, res) => {
  const { context } = res.locals;
  const storeProps = req.body;
  const { fields } = req.query;

  const store = await changeStore({
    context,
    storeProps
  });

  const response = ManagementStoresUpdateResponseFactory({ fields, store });

  res.status(STATUS_OK).json(response);
};
