import express from 'express'
import helmet from 'helmet'
import pinoExpress from 'express-pino-logger'

// Middlewares
import { GlobalMiddlewares } from '@middlewares/global'
import { ErrorHandler } from '@middlewares/ErrorHandler'
import { NotFoundHandler } from '@middlewares/NotFoundHandler'
// API Modules
import api from '@modules/api'

import config from './config'
import { LoggerFactory } from '@utils/LoggerFactory'

const logger = LoggerFactory.create()

// Express APP
const app = express()

// Set App settings
for (const [option, value] of Object.entries(config.app)) {
  app.set(option, value)
}

// Set utilities to handle payloads
app.use(express.json())
// Uncomment below line if you intend to receive payloads with "application/x-www-form-urlencoded"
// app.use(express.urlencoded({ extended: true }))

// Guard API against some harmful headers
app.use(helmet())

// Set API Logger
app.use(pinoExpress({ ...config.logger }))

// Set Global Middlewares
app.use('/*', GlobalMiddlewares)

// Load API Modules
api(app)

// Set Global Error Handler Middleware
app.use(ErrorHandler)
// Set Global Not Found Handler Middleware
app.use(NotFoundHandler)

// Start App
app.listen(config.server.port, config.server.host, () => {
  logger.info(`${app.get('name')} ${app.get('version')} listening on ${config.server.host}:${config.server.port}`)
})
