import { Request, Response } from 'express'

import { PostValidator } from './PostValidator'

class PostCreateHandler {
  static async handle(req: Request, res: Response): Promise<void> {
    const validation = PostValidator.create(req.body)
    console.log({ validation })

    if (validation.errors) {
      throw PostValidator.asResponse(validation)
    }

    res.send({
      data: validation.value
    })
  }
}

export { PostCreateHandler }
