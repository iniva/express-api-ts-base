import { Router } from 'express'
import { isNil } from 'lodash'

import { Dependencies } from '@typings/Dependencies'
import { ApiModule } from '@typings/ApiModule'
import { AsyncHandler } from '@middlewares/AsyncHandler'
import { PostListHandler } from './PostListHandler'
import { PostDetailsHandler } from './PostDetailsHandler'
import { PostCreateHandler } from './PostCreateHandler'
import { PostUpdateHandler } from './PostUpdateHandler'
import { PostDeleteHandler } from './PostDeleteHandler'

const posts = (dependencies: Dependencies): ApiModule => {
  if (isNil(dependencies) || isNil(dependencies.posts)) {
    throw new TypeError('Missing dependencies for Posts API domain')
  }

  const routes = Router()

  const postList = new PostListHandler(dependencies.posts.postsService)
  const postDetails = new PostDetailsHandler(dependencies.posts.postsService)
  const postCreate = new PostCreateHandler(dependencies.posts.postsService)
  const postUpdate = new PostUpdateHandler(dependencies.posts.postsService)
  const postDelete = new PostDeleteHandler(dependencies.posts.postsService)

  routes
    .get('/', AsyncHandler.wrap(async (req, res, next) => postList.handle(req, res, next)))
    .get('/:id', AsyncHandler.wrap(async (req, res, next) => postDetails.handle(req, res, next)))
    .post('/', AsyncHandler.wrap(async (req, res, next) => postCreate.handle(req, res, next)))
    .put('/:id', AsyncHandler.wrap(async (req, res, next) => postUpdate.handle(req, res, next)))
    .delete('/:id', AsyncHandler.wrap(async (req, res, next) => postDelete.handle(req, res, next)))

  return {
    prefix: '/posts',
    routes
  }
}

export default posts
