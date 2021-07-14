import { Application } from 'express'

import health from './health'
import posts from './posts'

const api = (app: Application, dependencies: any): void => {
  const postsDomain = posts(dependencies)

  app.use(health.prefix, health.routes)
  app.use(postsDomain.prefix, postsDomain.routes)
}

export default api
