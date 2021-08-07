import { Router } from 'express'

export type ApiModule = {
  prefix: string
  routes: Router
}
