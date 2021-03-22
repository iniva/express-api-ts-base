import os from 'os'
import { version } from '../../package.json'

import { Configurations } from 'types/Configurations'

const API_VERSION = version
const APP_NAME = process.env.APP_NAME || 'Express API'

const config: Configurations = {
  debug: {
    global: false,
    request: false,
    response: false,
    error: false
  },
  app: {
    name: APP_NAME,
    version: API_VERSION,
    env: 'production',
    'case sensitive routing': true,
    'strict routing': false,
    'x-powered-by': false,
  },
  server: {
    host: process.env.SERVER_HOST || '0.0.0.0',
    port: Number(process.env.SERVER_PORT) || 8091
  },
  userAgent: `${APP_NAME}/${API_VERSION}`,
  logger: {
    logLevel: process.env.LOG_LEVEL || 'info',
    prettyPrint: false,
    base: {
      hostname: os.hostname()
    }
  }
}

export default config
