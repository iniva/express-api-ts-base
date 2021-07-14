import { NextFunction, Request, Response } from 'express'
import { v4 as uuid } from 'uuid'

import { PostHandler } from './PostHandler'
import { PostValidator } from './PostValidator'
import { PostDto } from 'dtos/PostDto'

export class PostCreateHandler extends PostHandler {
  async handle(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const validation = PostValidator.create(req.body)

    if (validation.errors.length !== 0) {
      throw PostValidator.toResponse(validation.errors)
    }

    const data = <PostDto>validation.value

    const postDto = new PostDto(
      uuid(),
      data.title,
      data.content,
      data.author,
      new Date(),
      false
    )

    await this._postsService.save(postDto)

    res
      .status(201)
      .send({
        data: postDto
      })
  }
}
