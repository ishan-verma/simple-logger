const {
    createLogger,
    format,
    transports
} = require("winston");
transports.DailyRotateFile = require('winston-daily-rotate-file');

module.exports = createLogger({
    format: format.combine(
        format.timestamp({
            format: "MMM-DD-YYYY HH:mm:ss"
        }),
        format.align(),
        format.printf((i) => `${i.level}: ${[i.timestamp]}: ${i.message}`)
    ),
    transports: [
        new transports.DailyRotateFile({
            name: "text",
            filename: "logs/info/info-%DATE%.log",
            datePattern: "YYYY-MM-DD-HH",
            zippedArchive: false,
            maxSize: "1m",
            maxFiles: "31d",
            level: "info",
        }),
        new transports.DailyRotateFile({
            name: "text",
            filename: "logs/error/error-%DATE%.log",
            datePattern: "YYYY-MM-DD-HH",
            zippedArchive: false,
            maxSize: "1m",
            maxFiles: "31d",
            level: "error",
        })
    ],
}).add(new transports.Console());