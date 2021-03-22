import { Application } from 'express'

import health from './health'
import posts from './posts'

const api = (app: Application): void => {
  app.use(health.prefix, health.routes)
  app.use(posts.prefix, posts.routes)
}

export default api
