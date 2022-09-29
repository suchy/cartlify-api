import config from 'config';
import jwt from 'jsonwebtoken';
import jwks from 'jwks-rsa';

interface AuthConfig {
  jwksUri: string;
  audience: string;
  issuer: string;
}
const authConfig: AuthConfig = config.get('auth');

const getPrivateKey = (header: any, callback: any) => {
  jwks({
    jwksUri: authConfig.jwksUri
  }).getSigningKey(header.kid, (err: Error | null, key: any) => {
    const publicKey = err ? null : key.publicKey || key.rsaPublicKey;
    callback(null, publicKey);
  });
};

export const verifyAuthToken = (authToken?: string): Promise<object> =>
  new Promise((resolve, reject) => {
    if (!authToken) return reject('Authorization token is not present.');

    jwt.verify(
      authToken,
      getPrivateKey,
      {
        audience: authConfig.audience,
        issuer: authConfig.issuer,
        algorithms: ['RS256']
      },
      (error, decodedToken) => (error ? reject(error) : resolve(decodedToken))
    );
  });
