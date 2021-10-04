const pino = require('pino')

function buildProdLogger() {
  const prodLogger = pino('debug.log');
  prodLogger.level = 'debug'
  return prodLogger
}

function buildDevLogger() {
  const devLogger = pino({
    prettyPrint: { colorize: true },
  });
  devLogger.level = 'info'
  return devLogger
}

let logger = null

if (process.env.NODE_ENV === 'production') {
  logger = buildProdLogger()
} else {
  logger = buildDevLogger()
}

module.exports = logger