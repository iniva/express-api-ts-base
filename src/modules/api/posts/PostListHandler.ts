import { NextFunction, Request, Response } from 'express'

import { PostHandler } from './PostHandler'

export class PostListHandler extends PostHandler {
  async handle(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const posts = await this._postsService.find(req.query)

    res.send({
      data: posts,
    })
  }
}
