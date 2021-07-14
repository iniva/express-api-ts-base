import { NextFunction, Request, Response } from 'express'

import { PostHandler } from './PostHandler'
import { PostNotFoundException } from '@modules/services/posts/PostNotFoundException'

export class PostDetailsHandler extends PostHandler {
  async handle(req: Request, res: Response, _next: NextFunction): Promise<void> {
    try {
      const post = await this._postsService.findById(req.params.id)

      res.send({
        data: post,
      })
    } catch (error) {
      if (error instanceof PostNotFoundException) {
        res.status(404).send()
      }
    }
  }
}
