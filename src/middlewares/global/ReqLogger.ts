import { Request, Response, NextFunction } from 'express'

const reqLogger = (req: Request, res: Response, next: NextFunction): void => {
  // logic to decide when/what to log during requests
  // ...

  next()
}

export { reqLogger as ReqLogger }
