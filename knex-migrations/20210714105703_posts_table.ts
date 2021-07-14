import { Knex } from "knex"

import config from '../src/config'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(config.database.tables.posts, (table: Knex.TableBuilder) => {
    table.text('id').notNullable()
    table.text('title').notNullable()
    table.text('content').notNullable()
    table.text('author').notNullable()
    table.boolean('published').notNullable()
    table.timestamp('created_at', { useTz: false }).notNullable()
    table.timestamp('updated_at', { useTz: false })

    table.primary(['id'])
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(config.database.tables.posts)
}

