import {
  ClientData,
  ClientFactory,
  ClientFactoryInjectable,
  ClientFactoryDependencies
} from './client';
import { MOCKED_DATE, PERMISSIONS } from '../../../../constants';

const RealDate = Date;

describe('client', () => {
  let dependencies: ClientFactoryDependencies;
  let ClientFactory: ClientFactory;

  let defaultInput: ClientData;

  beforeAll(() => {
    // @ts-ignore
    global.Date = jest.fn(() => MOCKED_DATE);
  });

  afterAll(() => {
    global.Date = RealDate;
  });

  beforeEach(() => {
    dependencies = { validate: jest.fn() };

    ClientFactory = ClientFactoryInjectable(dependencies);

    defaultInput = {
      createdAt: MOCKED_DATE,
      firstParty: true,
      id: 'client-id',
      multiStore: false,
      name: 'Some api client',
      scopes: [PERMISSIONS.productsRead],
      storeId: 'store-id',
      targetApi: 'exposition',
      type: 'spa',
      updatedAt: MOCKED_DATE
    };
  });

  it('should export ClientFactoryInjectable function', () => {
    expect(typeof ClientFactoryInjectable).toBe('function');
  });

  it('ClientFactoryInjectable should return ClientFactory function', () => {
    expect(typeof ClientFactory).toBe('function');
  });

  it('ClientFactory should return client object', () => {
    const input = defaultInput;

    const client = ClientFactory(input);

    const expectedResult = {
      ...input,
      serialize: () => {},
      update: () => {}
    };

    expect(JSON.stringify(client)).toBe(JSON.stringify(expectedResult));
  });

  describe('client', () => {
    it('serialize method should return client data', () => {
      const input = defaultInput;
      const client = ClientFactory(input);
      const clientData = client.serialize();
      expect(clientData).toStrictEqual(input);
    });

    it('update method should return updated client', () => {
      const input = defaultInput;

      const client = ClientFactory(input);

      const updateInput = {
        name: 'Updated api client',
        scopes: [PERMISSIONS.shippingMethodsRead]
      };

      // @ts-ignore
      global.Date = jest.fn(() => new RealDate());

      const updatedClient = client.update(updateInput);

      expect(updatedClient.name).toBe(updateInput.name);
      expect(updatedClient.scopes).toStrictEqual(updateInput.scopes);
      expect(updatedClient.updatedAt).not.toBe(client.updatedAt);
    });

    describe('for exposition api', () => {
      it('should be third party only', () => {
        const thirdPartyInput: ClientData = {
          ...defaultInput,
          targetApi: 'exposition',
          firstParty: false
        };

        expect(() => ClientFactory(thirdPartyInput)).not.toThrow();
        expect(ClientFactory(thirdPartyInput).firstParty).toBe(false);

        const firstPartyInput: ClientData = {
          ...defaultInput,
          targetApi: 'exposition',
          firstParty: true
        };

        expect(() => ClientFactory(firstPartyInput)).toThrow();
      });

      it('should be spa or machine type', () => {
        const spaStoreInput: ClientData = {
          ...defaultInput,
          targetApi: 'exposition',
          type: 'spa'
        };

        const spaClient = ClientFactory(spaStoreInput);
        expect(spaClient.type).toBe('spa');

        const machineStoreInput: ClientData = {
          ...defaultInput,
          targetApi: 'exposition',
          type: 'machine'
        };

        const machineClient = ClientFactory(machineStoreInput);
        expect(machineClient.type).toBe('machine');
      });

      it('should be single store', () => {
        const singleStoreInput: ClientData = {
          ...defaultInput,
          targetApi: 'exposition',
          multiStore: false,
          storeId: 'store-id'
        };

        expect(() => ClientFactory(singleStoreInput)).not.toThrow();
        const singleStoreClient = ClientFactory(singleStoreInput);
        expect(singleStoreClient.storeId).toBe(singleStoreInput.storeId);

        const multiStoreInput: ClientData = {
          ...defaultInput,
          targetApi: 'exposition',
          multiStore: true,
          storeId: undefined
        };

        expect(() => ClientFactory(multiStoreInput)).toThrow();
      });
    });

    describe('for management api', () => {
      it('should be first or third party', () => {
        const thirdPartyInput: ClientData = {
          ...defaultInput,
          targetApi: 'management',
          firstParty: false
        };

        expect(() => ClientFactory(thirdPartyInput)).not.toThrow();
        expect(ClientFactory(thirdPartyInput).firstParty).toBe(false);

        const firstPartyInput: ClientData = {
          ...defaultInput,
          targetApi: 'management',
          firstParty: true
        };

        expect(() => ClientFactory(firstPartyInput)).not.toThrow();
        expect(ClientFactory(firstPartyInput).firstParty).toBe(true);
      });

      it('should be spa or machine type', () => {
        const spaStoreInput: ClientData = {
          ...defaultInput,
          targetApi: 'management',
          type: 'spa'
        };

        const spaClient = ClientFactory(spaStoreInput);
        expect(spaClient.type).toBe('spa');

        const machineStoreInput: ClientData = {
          ...defaultInput,
          targetApi: 'management',
          type: 'machine'
        };

        const machineClient = ClientFactory(machineStoreInput);
        expect(machineClient.type).toBe('machine');
      });

      it('should be multi store only if it is first party', () => {
        const multiStoreFirstPartyInput: ClientData = {
          ...defaultInput,
          targetApi: 'management',
          firstParty: true,
          multiStore: true,
          storeId: undefined
        };

        expect(() => ClientFactory(multiStoreFirstPartyInput)).not.toThrow();

        const multiStoreFirstPartyClient = ClientFactory(
          multiStoreFirstPartyInput
        );
        expect(multiStoreFirstPartyClient.firstParty).toBe(true);
        expect(multiStoreFirstPartyClient.multiStore).toBe(true);
        expect(multiStoreFirstPartyClient.storeId).toBeUndefined();

        const multiStoreThirdPartyInput: ClientData = {
          ...defaultInput,
          targetApi: 'management',
          firstParty: false,
          multiStore: true,
          storeId: undefined
        };

        expect(() => ClientFactory(multiStoreThirdPartyInput)).toThrow();
      });
    });
  });
});
