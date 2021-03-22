import { Request, Response } from 'express'

class PostListHandler {
  static async handle(req: Request, res: Response): Promise<void> {
    res.send({
      data: [],
    })
  }
}

export { PostListHandler }
