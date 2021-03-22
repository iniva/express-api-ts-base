import { Router } from 'express'

import { AsyncHandler } from '@middlewares/AsyncHandler'
import { PostCreateHandler } from './PostCreateHandler'
import { PostListHandler } from './PostListHandler'

const routes = Router()

routes
  .get('/', AsyncHandler.wrap(PostListHandler.handle))
  .post('/', AsyncHandler.wrap(PostCreateHandler.handle))

export default {
  prefix: '/posts',
  routes
}
