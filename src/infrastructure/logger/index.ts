import winston, { createLogger, transports, format } from 'winston';
import { colorJsonFormat } from './color-json-format';
import { LEVELS } from './constants';

export type Logger = winston.Logger;

const createConsoleTransport = (colorFormat: any) =>
  new transports.Console({
    format: format.combine(
      format.timestamp(),
      format.splat(),
      format.printf(colorFormat)
    )
  });

export const LoggerFactory = (level: string = 'debug') =>
  createLogger({
    exitOnError: false,
    level: level,
    levels: LEVELS.levels,
    transports: [createConsoleTransport(colorJsonFormat)]
  });
