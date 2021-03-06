import { Request, Response } from 'express'

export class HealthHandler {
  static async handle(req: Request, res: Response): Promise<void> {
    res.send({
      data: {
        message: 'All good here, thanks for asking!',
        version: req.app.get('version')
      }
    })
  }
}
