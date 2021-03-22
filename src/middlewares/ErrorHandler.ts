import { Boom, boomify, Payload } from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'

const defaultStatusCode = 500
const defaultErrorMessage = 'Internal Server Error'
const loggableErrors = (process.env.LOG_ERRORS || '400,500').split(',')

type ErrorResponse = {
  statusCode: number
  message: string
  details?: Payload
}

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (res.headersSent) {
    return next(err)
  }

  const error: Boom = !(err instanceof Boom) ? boomify(err) : err
  const statusCode = error.output.statusCode
  const response: ErrorResponse = {
    statusCode: statusCode || defaultStatusCode,
    message: error.message || defaultErrorMessage
  }

  if (loggableErrors.includes(String(statusCode))) {
    req.log.error(error)
  }

  if (statusCode < 500) {
    response['details'] = error.output.payload
  }

  return res.status(statusCode).json(response)
}

export { errorHandler as ErrorHandler }
