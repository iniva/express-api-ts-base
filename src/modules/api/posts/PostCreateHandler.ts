import { Request, Response } from 'express'

import { PostValidator } from './PostValidator'

class PostCreateHandler {
  static async handle(req: Request, res: Response): Promise<void> {
    const validation = PostValidator.create(req.body)

    if (validation.errors) {
      throw PostValidator.toResponse(validation.errors)
    }

    res.send({
      data: validation.value
    })
  }
}

export { PostCreateHandler }
