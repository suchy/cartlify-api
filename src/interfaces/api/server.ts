import https from 'https';
import config from 'config';
import { Application } from 'express';

import { handleError } from '../../helpers/errors/handle-error';
import { ContainerFactory } from '../../container';
import { Logger } from '../../infrastructure/logger';
import { AppError } from '../../helpers/errors/app-error';

(async () => {
  process.on('uncaughtException', handleError);
  process.on('unhandledRejection', (error: AppError | Error) =>
    handleError(error)
  );

  const container = await ContainerFactory();

  const logger: Logger = container.resolve('logger');

  const api: Application = await container.resolve('api');

  const credentials = {
    key: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCraQ14Tk5FHHb4
9emjv1wmPhce2aMQQA3wyFv3XFFxh2XItv/wO0GQFqTjoH16xJjpcG0YbeJUjECF
QGs6UBR2uakChsSHnXS116CHxO6xvV6noZdTlS+BPFGT1lvuUJiAPIlrDDZm3Rpf
IxOTXP+VjcF8BPaWt4cEbKNPnTxZvIa6sB4a1GT67WtukqpzlO/BT1ic7Ei/CaWC
PcBqcUWMeZnm3fQIFbm4qDifrHGGijdeKj/zlzjfcfTeeqTiKTQIpWDV0ih5A6kK
wOZaC+Al+XB3q452NKLVNMwE6JOceh6gWMBA/4IvatZa/bzQq0SnaKlN0M8m6cON
21EPJiYFAgMBAAECggEAQAArjV3/j4J/UZnQMNnEeGr6iwRMBEdGbT8CR6vqpO8f
LABYM8SMSFaMHonQEETTq2XU9ighN9xeQuK4pr87xNCxsEXNn61E5JisUcVQMoE4
lHKbZBPx9tkkxIRnMuZY6piv3o5iyamIrTkVmBJDQ/333myj/cZs3VQK7jERVZeY
ShszJz62aoQgItt7IklEZF9JOBAg3W3HABfK2Z8WUDXOng459AHa3zuBSPbD7yKQ
u3anmGxCzQmJlBG/UERMVIlydLkjOkTMY7TLN4Urs4JdiFLkp76FaXEz4VWfsOJb
r8S7VabNiID1lok7S+S/DMBluHUhKJoW+q01zWzHQQKBgQDa1LK/ZIdaFdPD5IlK
hyONcf7HW6h8qjg3iunqgiPWzoCmRb8vAdtDc9F1CMYaHSSqBhoPs3iJxyi3sXg7
WptW/rTiV9w2ejdJyHD8BxzczE2eimWWJI3P+6LRhQYsguiTa1GzZHAGN1BG1ho/
21HpDLwbsKVlVx0+4FEM1twpiQKBgQDIhmUt+fgeBvLrB0SsFn6/QZJANCxqdN8b
7RZqPaaBREzzgVlwcuLzS/2n0acUf8eZ9erJdmsFdC3NPSCsluUr2WYobntFVxMb
m5oEWX/lZsognPwu5uMiXCB/AMIF8kYGTJqiNcb2EMR65MsylY96LcXINkIupIQQ
ddbs64kFnQKBgQC5Mlk0cTe7nc1ic/9c+5GzG06sGX42QzjgiMf+l7UNDicCkPSE
K+YM5+/URGCjqRZmblOQBit1Lv/etmsykDP3JAihpgnQcQ5peyFjqgFbO+xUyHvA
3Z7G7geVmibndMKwQJscX1wPZrChwoDkmhBwUz6/kHfplBhEJkNxwkUBQQKBgChW
4QPexYtE2pltXONBoz3WcxV3aXgBCuETUO8Od/CJTPGvk86LThyjrOOVyYbWLdFL
J3Bf4ie2t4ASTABsWq33jhWUJDhOzAlBxDobxx7fDsqAyjqlOAwxfFgQTvfjRTL/
NhxrtRrLRLt0S2xhqftqOd+NCsNXVTn6esIun+IBAoGAHLp+XCiWgy1RA6B+Yikr
V3b9fQhjJDdpKuC9VQqMBgWAcFFXF/ZgiWx48OCLHebn9r85tqaURsYHjx79auyN
IVSaT83QTUQNKmexnqfd+l1+CZVV5IO9m/FXh2lvN3nBTPL9y58Oe751E8GXeWwK
zz9GJWbzTirRc0sH5IfMnsg=
-----END PRIVATE KEY-----`,
    cert: `-----BEGIN CERTIFICATE-----
MIIDkDCCAngCCQDHUa0BEj9O0zANBgkqhkiG9w0BAQsFADCBiTELMAkGA1UEBhMC
VVMxCzAJBgNVBAgMAk5ZMQswCQYDVQQHDAJOWTERMA8GA1UECgwIQ2FydGxpZnkx
ETAPBgNVBAsMCENhcnRsaWZ5MRUwEwYDVQQDDAxjYXJ0bGlmeS5jb20xIzAhBgkq
hkiG9w0BCQEWFG1hdGV1c3pAY2FydGxpZnkuY29tMB4XDTIwMTAxMTIyMDAwM1oX
DTIxMTAxMTIyMDAwM1owgYkxCzAJBgNVBAYTAlVTMQswCQYDVQQIDAJOWTELMAkG
A1UEBwwCTlkxETAPBgNVBAoMCENhcnRsaWZ5MREwDwYDVQQLDAhDYXJ0bGlmeTEV
MBMGA1UEAwwMY2FydGxpZnkuY29tMSMwIQYJKoZIhvcNAQkBFhRtYXRldXN6QGNh
cnRsaWZ5LmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKtpDXhO
TkUcdvj16aO/XCY+Fx7ZoxBADfDIW/dcUXGHZci2//A7QZAWpOOgfXrEmOlwbRht
4lSMQIVAazpQFHa5qQKGxIeddLXXoIfE7rG9Xqehl1OVL4E8UZPWW+5QmIA8iWsM
NmbdGl8jE5Nc/5WNwXwE9pa3hwRso0+dPFm8hrqwHhrUZPrta26SqnOU78FPWJzs
SL8JpYI9wGpxRYx5mebd9AgVubioOJ+scYaKN14qP/OXON9x9N56pOIpNAilYNXS
KHkDqQrA5loL4CX5cHerjnY0otU0zATok5x6HqBYwED/gi9q1lr9vNCrRKdoqU3Q
zybpw43bUQ8mJgUCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAUPkaoI6qYDnNsNPC
hi2MSpG7y7A9MP3ijSGW+plxQ1zNMQNp148Wn8MUHQSC0/pWdWus59EkmQkKN9z3
dq1vFfHsxk87Pxa/4xO6YMUm/hC0EqP3zIOE/gDomAkxG9RrP53Q12f11sXmNNQE
BKRQoJqn3Y5d0KjuINvw/7s+Lod9fxHlC01wfFsnYRVcXivUUvWBPvApscchaCgu
S76Qpl3eSlwLPWrv1yo1lXHF74ic8IzXBebsYt7Jv1F8YTbFF6tMtwHtJyEG5cD4
W2SPpTVlO2sGcJcjUr3OgYaWcj8awT3wgUkXgd1n1RVvIliOtjqnTIDsC9pMZcPz
lNFaaQ==
-----END CERTIFICATE-----
`
  };

  const server = https.createServer(credentials, api);

  const port: string | number = config.get('server.port');

  server.listen(port, () =>
    logger.info(`Cartlify API started at https://dev-api.cartlify.com:${port}`)
  );
})();
