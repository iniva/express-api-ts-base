import knex, { Knex } from 'knex'

import { Configurations } from 'types/Configurations'

export class Database {
  private _client: Knex

  constructor(config: Configurations['database']) {
    const {
      user,
      password,
      host,
      port,
      name,
      debug,
      connectionTimeout
    } = config
    const connectionString = `pgsql://${user}:${password}@${host}:${port}/${name}`

    this._client = knex({
      debug,
      client: 'pg',
      connection: connectionString,
      acquireConnectionTimeout: connectionTimeout
    })
  }

  get client(): Knex {
    return this._client
  }
}
