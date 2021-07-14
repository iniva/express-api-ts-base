import { NextFunction, Request, Response } from 'express'
import { merge } from 'lodash'

import { PostHandler } from './PostHandler'
import { PostValidator } from './PostValidator'
import { PostNotFoundException } from '@modules/services/posts/PostNotFoundException'
import { PostDto } from 'dtos/PostDto'

export class PostUpdateHandler extends PostHandler {
  async handle(req: Request, res: Response, _next: NextFunction): Promise<void> {
    try {
      const post = await this._postsService.findById(req.params.id)
      const validation = PostValidator.update(req.body)

      if (validation.errors.length !== 0) {
        throw PostValidator.toResponse(validation.errors)
      }

      const data = <PostDto>validation.value
      const postUpdateDto = merge(post, data)

      postUpdateDto.updateAt = new Date()

      await this._postsService.update(postUpdateDto)

      res.send({
        data: postUpdateDto
      })
    } catch (error) {
      if (error instanceof PostNotFoundException) {
        res.status(404).send()

        return
      }

      throw error
    }
  }
}
