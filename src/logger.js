const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, prettyPrint } = format;

// console.log(config);
const logger = createLogger({
  format: combine(
    // format.logstash(),
    label({ label: "cron_reporting" }),
    timestamp(),
    // prettyPrint(),
    format.splat(),
    format.simple()
  ),
  transports: [
    new transports.Console({
      level: "info",
      colorize: true
    }),
    new transports.File({
      level: "debug",
      filename: "./cron_reporting.log",
      colorize: true
    })
  ]
});

module.exports = logger;