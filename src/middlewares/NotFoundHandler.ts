import { Request, Response } from 'express'

const notFoundHandler = (req: Request, res: Response): Response => {
  const response = {
    errorCode: 404,
    message: 'Resource not found',
  }

  return res.status(404).json(response)
}

export { notFoundHandler as NotFoundHandler }
