import { Request, Response, NextFunction } from 'express'

class AsyncHandler {
  static wrap(handler: (req: Request, res: Response, next: NextFunction) => any): any {
    const returnFn = (req: Request, res: Response, next: NextFunction) => {
      handler(req, res, next).catch(next)
    }

    return returnFn
  }
}

export { AsyncHandler }
