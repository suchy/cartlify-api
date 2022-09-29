import rTracer from 'cls-rtracer';
import { format as formatDate, parseISO } from 'date-fns';

import { CONSOLE_COLORS, LEVELS } from './constants';

interface LogMessage {
  level: string;
  message: string;
  timestamp?: number;
  requestId?: string;
  stack?: string;
  trusted?: boolean;
}

const getRequestId = (log: LogMessage) => log.requestId || rTracer.id();

const formatTimestamp = (timestamp: number | undefined) => {
  const date = timestamp || new Date().getTime();
  return formatDate(parseISO(date.toString()), 'HH:mm:ss');
};

const formatJson = (json: string) =>
  json
    .replace(/\:/g, ': ')
    .replace(/\,/g, ', ')
    .replace(/\{"/g, '{ "')
    .replace(/\"}/g, '" }')
    .replace(/\}}/g, '} }');

export const colorJsonFormat = (log: LogMessage) => {
  const { level, message, timestamp, trusted, stack, ...rest } = log;
  const levelColor = CONSOLE_COLORS[LEVELS.colors[level]];
  const { dim, white, reset } = CONSOLE_COLORS;

  const requestId = getRequestId(log);

  const meta = JSON.stringify(rest);

  let logProps = [
    `"level": ${reset}${levelColor}"${level}"${white}`,
    `${dim}"timestamp": "${formatTimestamp(timestamp)}"`
  ];

  if (requestId) {
    logProps = [...logProps, `"requestId": "${getRequestId(log)}"`];
  }

  if (message) {
    let messageString =
      typeof message === 'string' ? `"${message}"` : JSON.stringify(message);
    logProps = [...logProps, `${reset}"message": ${messageString}`];
  }

  if (!trusted && stack) {
    logProps = [...logProps, `${levelColor}"stack": "${stack}"${reset}`];
  }

  if (meta !== '{}') {
    logProps = [...logProps, `${dim}"meta": ${formatJson(meta)}`];
  }

  const logString = logProps.join(', ');

  return `${dim}{ ${logString} ${dim}}${reset} \n`;
};
