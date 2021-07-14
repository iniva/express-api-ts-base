import { NextFunction, Request, Response } from 'express'

import { PostHandler } from './PostHandler'
import { PostNotFoundException } from '@modules/services/posts/PostNotFoundException'

export class PostDeleteHandler extends PostHandler {
  async handle(req: Request, res: Response, _next: NextFunction): Promise<void> {
    try {
      await this._postsService.findById(req.params.id)

      await this._postsService.delete(req.params.id)

      res
        .status(204)
        .send()
    } catch (error) {
      if (error instanceof PostNotFoundException) {
        res.status(404).send()
      }
    }
  }
}
