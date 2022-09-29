import { validate } from '../../../../helpers/validate';
import { clientValidationSchema } from './client-validation-schema';
import { PERMISSIONS } from '../../../../constants';

export interface ClientProps {
  createdAt: Date;
  firstParty: boolean;
  id: string;
  multiStore: boolean;
  name: string;
  scopes: PERMISSIONS[];
  storeId?: string;
  targetApi: 'exposition' | 'management';
  type: 'spa' | 'machine';
  updatedAt: Date;
}

export type Client = Readonly<ClientProps>;

type ClientFactoryInjectable = (dependencies: {
  validate: validate;
}) => ClientFactory;

export type ClientFactory = (clientProps: ClientProps) => Client;

export const ClientFactoryInjectable: ClientFactoryInjectable = ({
  validate
}) => {
  const ClientFactory: ClientFactory = (clientProps) => {
    validate(clientValidationSchema, clientProps, 'Client is not valid.');

    const client: Client = Object.freeze(clientProps);

    return client;
  };

  return ClientFactory;
};
