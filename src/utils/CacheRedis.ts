import Redis, { RedisOptions, Redis as RedisType, RedisKey, RedisValue } from 'ioredis'
import { Logger } from 'pino'

import redisConfig from '../config/redis'
import { LoggerFactory } from '@utils/LoggerFactory'

class CacheRedis {
  private _logger: Logger
  private _options: RedisOptions
  private _client: RedisType | null = null
  private _retries: number = 0
  private _maxRetries: number = 0

  constructor() {
    this._logger = LoggerFactory.create('utils:cache:redis')
    this._maxRetries = redisConfig.maxRetryAttempts

    const options = {
      ...redisConfig.config,
      retryStrategy: (times: number): number => {
        const maxTime = 2 * 1000
        const timeMultiplier = 500

        this._retries = times

        if (this._retries > this._maxRetries) {
          return 0
        }

        // Return delay for next reconnection
        return Math.min(this._retries * timeMultiplier, maxTime)
      },
    }

    this._options = options
  }

  async start(): Promise<RedisType> {
    return new Promise((resolve, reject) => {
      const client = new Redis(this._options)

      client.on('error', error => {
        this._logger.error(`Redis encountered a problem: ${error.message}`)

        switch (error.code) {
          case 'ENOTFOUND':
            if (this._retries > this._maxRetries) {
              this._logger.error('Max retries to reconnect to Redis exhausted')
              client.disconnect()
              this._client = null

              return reject(error)
            }
            break
          case 'ECONNREFUSED':
          case 'ETIMEDOUT':
            return undefined

          default:
            return undefined
        }

        return undefined
      })

      client.on('reconnecting', () => {
        this._logger.info('Trying to reconnect to Redis')
      })

      client.once('ready', () => {
        this._logger.info('Redis is ready for connections')
        this._client = client

        return resolve(this._client)
      })
    })
  }

  async stop(): Promise<'OK'> {
    if (this._client === null) {
      throw new Error('Redis client is not ready or connection was closed')
    }

    return this._client.quit()
  }

  async has(key: RedisKey): Promise<number> {
    if (this._client === null) {
      throw new Error('Redis client is not ready or connection was closed')
    }

    return this._client.exists(key)
  }

  async get(key: RedisKey): Promise<string | null> {
    if (this._client === null) {
      throw new Error('Redis client is not ready or connection was closed')
    }

    return this._client.get(key)
  }

  async set(
    key: RedisKey,
    value: RedisValue,
    ttl?: string | number
  ): Promise<'OK' | null> {
    if (this._client === null) {
      throw new Error('Redis client is not ready or connection was closed')
    }

    if (!ttl) {
      return this._client.set(key, value)
    }

    return this._client.set(key, value, 'EX', ttl)
  }

  async drop(key: RedisKey): Promise<number> {
    if (this._client === null) {
      throw new Error('Redis client is not ready or connection was closed')
    }

    return this._client.del(key)
  }
}

export { CacheRedis }
