import { Router } from 'express'

import { HealthHandler } from './HealthHandler'

const routes = Router()

routes
  .get('/', HealthHandler.handle)

export default {
  prefix: '/health',
  routes
}
