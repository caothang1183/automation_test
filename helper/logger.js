const pino = require("pino");
const { join } = require("path");
const moment = require("moment");

const directory = (folder) =>
  `../logger/${process.env.BRAND}/${folder}/${moment().format(
    "YYYY-MM-DD"
  )}.log`;
const logFile = (type) => join(__dirname, type);

const LOG_TYPES = {
  WARNING: directory("warning"),
  INFO: directory("info"),
  DEBUG: directory("debug"),
  ERROR: directory("error"),
};

const transport = pino.transport({
	timestamp: () => {
		return ', "time":' + format('%F %T %z', convert(now(), tz('Asia/Taipei')));
	},
  targets: [
    // {
    //   level: "warn",
    //   target: "pino/file",
    //   options: {
    //     destination: logFile(LOG_TYPES.WARNING),
    //   },
    // },
    {
      level: "info",
      target: "pino/file",
      prettyPrint: {
        colorize: true,
        translateTime: "SYS:standard",
        ignore: "hostname,pid",
        timestamp:`,"time":"${new Date(Date.now())}"`
      },
      options: {
        destination: logFile(LOG_TYPES.INFO),
      },
    },
    // {
    //   level: "debug",
    //   target: "pino/file",
    //   prettyPrint: {
    //     colorize: true,
    //     translateTime: "SYS:standard",
    //     ignore: "hostname,pid",
    //   },
    //   options: {
    //     destination: logFile(LOG_TYPES.DEBUG),
    //   },
    // },
    {
      level: "error",
      target: "pino/file",
      options: {
        destination: logFile(LOG_TYPES.ERROR),
      },
    },
  ],
});

const logger = pino(transport);

const logInfo = (message, data) => {
  if (data) logger.info(data, message);
  logger.info(message);
};

const logError = (message) => {
  logger.error(message);
};

module.exports = {
  logInfo,
  logError,
};
