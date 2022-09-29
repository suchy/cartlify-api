export const CONSOLE_COLORS: { [index: string]: string } = {
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  dim: '\x1b[2m',
  reset: '\x1b[0m'
};

declare type levelsConstType = {
  colors: { [index: string]: string };
  levels: { [index: string]: number };
};

export const LEVELS: levelsConstType = {
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    debug: 'magenta'
  },
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
  }
};
