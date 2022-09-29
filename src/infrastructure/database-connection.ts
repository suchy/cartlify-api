import mongodb from 'mongodb';
import { Logger } from './logger';

interface MongoConnectionFactoryDependencies {
  logger: Logger;
  url: string;
  dbname: string;
}

let client: { connection: mongodb.MongoClient; db: mongodb.Db };

export const MongoConnectionFactory = async ({
  logger,
  url,
  dbname
}: MongoConnectionFactoryDependencies) => {
  if (client) return client;

  const connection = await mongodb.MongoClient.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

  logger.info('MongoDB connected');

  client = {
    connection,
    db: connection.db(dbname)
  };

  return client;
};
