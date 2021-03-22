import { Configurations } from '../types/Configurations'
import devConfig from './dev'
import testConfig from './test'
import prodConfig from './prod'

const env = process.env.NODE_ENV
let config: Configurations

switch (env) {
  default:
    throw new TypeError(`env variable NODE_ENV is invalid. Received [${env}]`)

  case 'development':
    config = devConfig
    break

  case 'test':
    config = testConfig
    break

  case 'production':
    config = prodConfig
    break
}

export default config
