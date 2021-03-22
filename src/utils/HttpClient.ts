import got, {
  AfterResponseHook,
  BeforeErrorHook,
  BeforeRedirectHook,
  BeforeRequestHook,
  BeforeRetryHook,
  Got,
  Hooks,
  InitHook,
  NormalizedOptions,
  Options,
  RequestError,
  Response
} from 'got'

import pino from 'pino'

import config from '../config'
import { LoggerFactory } from './LoggerFactory'

class HttpClient {
  private _logger: pino.Logger
  private _instance: Got

  constructor(options: Options = {}) {
    this._logger = LoggerFactory.create('utils:http')

    const internalOptions: Options = {
      headers: {
        'user-agent': config.userAgent,
      },
      responseType: 'json',
      hooks: this.getHooks()
    }

    const fullOptions = got.mergeOptions(internalOptions, options)

    this._instance = got.extend(fullOptions)
  }

  get instance(): Got {
    return this._instance
  }

  private getHooks(): Hooks {
    return {
      beforeError: this.beforeErrorHook(),
      init: this.initHook(),
      beforeRequest: this.beforeRequestHook(),
      beforeRedirect: this.beforeRedirectHook(),
      beforeRetry: this.beforeRetryHook(),
      afterResponse: this.afterResponseHook(),
    }
  }

  private beforeErrorHook(): BeforeErrorHook[] {
    const logError = (error: RequestError) => {
      if (config.debug.error) {
        this._logger.debug(error, 'HTTP error')
      }

      return error
    }

    return [
      logError
    ]
  }

  private initHook(): InitHook[] {
    return []
  }

  private beforeRequestHook(): BeforeRequestHook[] {
    const logRequest = (options: NormalizedOptions) => {
      if (config.debug.request) {
        this._logger.debug(options, 'HTTP Request Options')
      }
    }

    return [
      logRequest
    ]
  }

  private beforeRedirectHook(): BeforeRedirectHook[] {
    return []
  }

  private beforeRetryHook(): BeforeRetryHook[] {
    const logRetry = (options: NormalizedOptions, error?: RequestError, retryCount?: number) => {
      this._logger.info(`Retrying request [${retryCount} time]`)
    }

    return [
      logRetry
    ]
  }

  private afterResponseHook(): AfterResponseHook[] {
    const logAfterResponse = (response: Response) => {
      if (config.debug.response) {
        this._logger.debug(response, 'HTTP Response')
      }

      return response
    }

    return [
      logAfterResponse
    ]
  }
}

export { HttpClient }
