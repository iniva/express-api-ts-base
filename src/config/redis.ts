const host = process.env.REDIS_HOST || 'localhost'
const port = Number(process.env.REDIST_PORT) || 6379
const connectTimeout = (Number(process.env.REDIS_CONNECT_TIMEOUT) || 5) * 1000
const maxRetryAttempts = Number(process.env.REDIS_MAX_ATTEMPTS) || 3

export default {
  config: {
    host,
    port,
    connectTimeout,
  },
  maxRetryAttempts
}
