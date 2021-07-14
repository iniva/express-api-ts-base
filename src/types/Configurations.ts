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

  database: {
    host: string
    port: number
    user: string
    password: string
    name: string
    connectionTimeout: number
    debug: boolean
    tables: {
      posts: string
    }
    migrationsTable: string
  }
}

export { Configurations }
