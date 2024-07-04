/**
 * Imports the configuration settings from the 'config' file and the 'winston' logging library.
 */
import config from './config';
import winston from 'winston';

/**
 * Custom Winston format function that formats error messages.
 * If the info object is an instance of Error, it assigns the stack trace to the message property.
 * @param {any} info - The log information object to be formatted.
 * @returns The formatted log information object.
 */
const enumerateErrorFormat = winston.format((info: any) => {

  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});


/**
 * Creates a logger using Winston with the specified configuration.
 * @param {Object} config - The configuration object containing environment details.
 * @returns A Winston logger instance configured based on the environment.
 */
const logger = winston.createLogger({

  level: config.env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

export default logger;
