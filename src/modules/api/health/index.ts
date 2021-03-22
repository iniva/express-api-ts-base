import { Router } from 'express'

import { AsyncHandler } from '@middlewares/AsyncHandler'
import { HealthHandler } from './HealthHandler'

const routes = Router()

routes
  .get('/', AsyncHandler.wrap(HealthHandler.handle))

export default {
  prefix: '/health',
  routes
}
