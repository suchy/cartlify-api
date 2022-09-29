import config from 'config';

const authorizationUrl: string = config.get('auth.authorizationUrl');
const audience: string = config.get('auth.audience');

export const securitySchemes = {
  OAuth2: {
    type: 'oauth2',
    description:
      'This API uses OAuth 2 with the implicit grant flow. [More info](https://api.example.com/docs/auth)',
    flows: {
      implicit: {
        authorizationUrl:
          authorizationUrl + '?audience=' + audience + '&response=token',
        scopes: {}
      }
    }
  }
};
