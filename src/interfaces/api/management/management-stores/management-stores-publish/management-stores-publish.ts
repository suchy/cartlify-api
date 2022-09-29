import { RequestHandler } from 'express';

import { publishStore } from '../../../../../domain/store/publish-store/publish-store';
import { ManagementStoresPublishResponseFactory } from './management-stores-publish-response';

import { STATUS_OK } from '../../../../../constants';
import { Store } from '../../../../../domain/store/store/store';
import { RequestQueryOne } from '../../../../../helpers/query';

export type ManagementStoresPublish = RequestHandler<
  {},
  ReturnType<typeof ManagementStoresPublishResponseFactory>,
  any,
  RequestQueryOne<Store>
>;

type ManagementStoresPublishFactory = (dependencies: {
  publishStore: publishStore;
}) => ManagementStoresPublish;

export const ManagementStoresPublishFactory: ManagementStoresPublishFactory = ({
  publishStore
}) => async (req, res) => {
  const { context } = res.locals;
  const { fields } = req.query;

  const store = await publishStore({ context });

  const response = ManagementStoresPublishResponseFactory({
    fields,
    store
  });

  res.status(STATUS_OK).json(response);
};
