const { createLogger, format, transports } = require('winston');

const isVercel = process.env.VERCEL === '1';

const loggerTransports = [
  new transports.Console()
];

// only add file logging if NOT running on Vercel
if (!isVercel) {
  loggerTransports.push(
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' })
  );
}

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'whatsapp-api' },
  transports: loggerTransports,
});

module.exports = logger;