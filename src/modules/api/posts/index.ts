import { Router } from 'express'

import { PostCreateHandler } from './PostCreateHandler'
import { PostListHandler } from './PostListHandler'

const routes = Router()

routes
  .get('/', PostListHandler.handle)
  .post('/', PostCreateHandler.handle)

export default {
  prefix: '/posts',
  routes
}
