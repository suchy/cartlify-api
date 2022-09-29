import { RequestHandler } from 'express';

import { unpublishStore } from '../../../../../domain/store/unpublish-store/unpublish-store';
import { ManagementStoresUnpublishResponseFactory } from './management-stores-unpublish-response';

import { STATUS_OK } from '../../../../../constants';
import { Store } from '../../../../../domain/store/store/store';
import { RequestQueryOne } from '../../../../../helpers/query';

export type ManagementStoresUnpublish = RequestHandler<
  {},
  ReturnType<typeof ManagementStoresUnpublishResponseFactory>,
  any,
  RequestQueryOne<Store>
>;

type ManagementStoresUnpublishFactory = (dependencies: {
  unpublishStore: unpublishStore;
}) => ManagementStoresUnpublish;

export const ManagementStoresUnpublishFactory: ManagementStoresUnpublishFactory = ({
  unpublishStore
}) => async (req, res) => {
  const { context } = res.locals;
  const { fields } = req.query;

  const store = await unpublishStore({ context });

  const response = ManagementStoresUnpublishResponseFactory({
    fields,
    store
  });

  res.status(STATUS_OK).json(response);
};
