import winston from 'winston';
import dotenv from 'dotenv';

// Load dotenv
dotenv.config();

const {
  createLogger,
  format,
  transports,
} = winston;

const { combine, timestamp, printf } = format;

const customFormat = printf(({ level, message, timestamp: time }) => (
  `${time} - [${level.toUpperCase()}]: ${message}`));

const logLevel = process.env.LOG_LEVEL;

const logger = createLogger({
  level: logLevel,
  format: combine(
    timestamp(),
    customFormat,
  ),
  transports: [
    new transports.Console(),
  ],
});

const log = (message, level = logLevel) => logger.log({ level, message });

export default log;
