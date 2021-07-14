
import config from './src/config'

module.exports = {
  client: 'pg',
  connection: {
    port: config.database.port,
    host: config.database.host,
    database: config.database.name,
    user: config.database.user,
    password: config.database.password
  },
  migrations: {
    directory: './knex-migrations',
    tableName: config.database.migrationsTable,
  }
}
