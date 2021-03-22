import pino from 'pino'

import { StringHelper } from './StringHelper'
import config from '../config'

class LoggerFactory {
  static create(identifier: string = ''): pino.Logger {
    const namespace: string[] = []

    if (identifier !== '') {
      namespace.push(...[':', identifier])
    }

    const appName = StringHelper.slug(process.env.APP_NAME)

    return pino({
      name: `${appName}${namespace.join('')}`,
      level: config.logger.logLevel,
      prettyPrint: config.logger.prettyPrint
    })
  }


}

export { LoggerFactory }
