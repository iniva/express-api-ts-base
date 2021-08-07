import { Application } from 'express'

import { Dependencies } from '@typings/Dependencies'
import health from './health'
import posts from './posts'

const api = (app: Application, dependencies: Dependencies): void => {
  const healthModule = health()
  const postsModule = posts(dependencies)

  app.use(healthModule.prefix, healthModule.routes)
  app.use(postsModule.prefix, postsModule.routes)
}

export default api
