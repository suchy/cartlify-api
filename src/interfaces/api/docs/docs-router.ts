import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';
import helmet from 'helmet';

import { schema } from './schema';

interface DocsRouterFactoryDependencies {}

const hemletCSPOptions = {
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", 'data:']
  }
};

export const DocsRouterFactory = ({}: DocsRouterFactoryDependencies) => {
  const docsRouter = Router();

  docsRouter.get('/docs/schema.json', (req, res) => {
    res.status(200).json(schema);
  });

  docsRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(schema));

  docsRouter.get(
    '/oauth2-redirect.html',
    helmet.contentSecurityPolicy(hemletCSPOptions),
    (req, res) => {
      res.status(200).send(`
      <!doctype html>
      <html lang="en-US">
        <title>Swagger UI: OAuth2 Redirect</title>
        <body onload="run()">
        </body>
      </html>
      <script>
          'use strict';
          function run () {
              var oauth2 = window.opener.swaggerUIRedirectOauth2;
              var sentState = oauth2.state;
              var redirectUrl = oauth2.redirectUrl;
              var isValid, qp, arr;
      
              if (/code|token|error/.test(window.location.hash)) {
                  qp = window.location.hash.substring(1);
              } else {
                  qp = location.search.substring(1);
              }
      
              arr = qp.split("&")
              arr.forEach(function (v,i,_arr) { _arr[i] = '"' + v.replace('=', '":"') + '"';})
              qp = qp ? JSON.parse('{' + arr.join() + '}',
                      function (key, value) {
                          return key === "" ? value : decodeURIComponent(value)
                      }
              ) : {}
      
              isValid = qp.state === sentState
      
              if ((
                oauth2.auth.schema.get("flow") === "accessCode"||
                oauth2.auth.schema.get("flow") === "authorizationCode"
              ) && !oauth2.auth.code) {
                  if (!isValid) {
                      oauth2.errCb({
                          authId: oauth2.auth.name,
                          source: "auth",
                          level: "warning",
                          message: "Authorization may be unsafe, passed state was changed in server Passed state wasn't returned from auth server"
                      });
                  }
      
                  if (qp.code) {
                      delete oauth2.state;
                      oauth2.auth.code = qp.code;
                      oauth2.callback({auth: oauth2.auth, redirectUrl: redirectUrl});
                  } else {
                      let oauthErrorMsg
                      if (qp.error) {
                          oauthErrorMsg = "["+qp.error+"]: " +
                              (qp.error_description ? qp.error_description+ ". " : "no accessCode received from the server. ") +
                              (qp.error_uri ? "More info: "+qp.error_uri : "");
                      }
      
                      oauth2.errCb({
                          authId: oauth2.auth.name,
                          source: "auth",
                          level: "error",
                          message: oauthErrorMsg || "[Authorization failed]: no accessCode received from the server"
                      });
                  }
              } else {
                  oauth2.callback({auth: oauth2.auth, token: qp, isValid: isValid, redirectUrl: redirectUrl});
              }
              window.close();
          }
      </script>
    `);
    }
  );

  return docsRouter;
};
