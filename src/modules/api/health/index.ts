import { Router } from 'express'

import { AsyncHandler } from '@middlewares/AsyncHandler'
import { HealthHandler } from './HealthHandler'
import { ApiModule } from '@typings/ApiModule'

const health = (): ApiModule => {
  const routes = Router()

  routes
    .get('/', AsyncHandler.wrap(HealthHandler.handle))

  return {
    prefix: '/health',
    routes
  }
}

export default health
