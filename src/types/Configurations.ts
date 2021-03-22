type Configurations = {
  debug: {
    global: boolean
    request: boolean
    response: boolean
    error: boolean
  }

  app: {
    name: string
    version: string
    env: string
    'case sensitive routing': boolean
    'strict routing': boolean
    'x-powered-by': boolean
  }

  server: {
    host: string
    port: number
  }

  userAgent: string

  cache?: {
    driver: 'redis'
    ttl: number
  }

  logger: {
    logLevel: string
    prettyPrint: boolean
    base: {
      hostname: string
    }
  }
}

export { Configurations }
