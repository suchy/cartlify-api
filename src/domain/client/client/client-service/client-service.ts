import { Client, ClientFactory } from '../client/client';

export type UpdatableClientProps = Pick<Client, 'name' | 'scopes'>;

export interface ClientService {
  update: (props: Partial<UpdatableClientProps>) => Client;
}

export type ClientServiceFactory = (client: Client) => ClientService;

type ClientServiceFactoryFactory = (dependencies: {
  ClientFactory: ClientFactory;
}) => ClientServiceFactory;

export const ClientServiceFactoryFactory: ClientServiceFactoryFactory = ({
  ClientFactory
}) => (client) => {
  const clientService: ClientService = {
    update(props) {
      const clientData = { ...client, ...props, updatedAt: new Date() };
      return ClientFactory(clientData);
    }
  };

  return clientService;
};
