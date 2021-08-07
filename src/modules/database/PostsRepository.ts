import { Knex } from 'knex'
import { isEmpty, isNil, omit } from 'lodash'

import { PostDto } from 'dtos/PostDto'
import { PostFilters } from '@typings/PostFilters'
import { Pagination } from '@typings/Pagination'

type DehydratedPost = {
  id: string
  title: string
  content: string
  author: string
  created_at: Date
  published: boolean
  updated_at: Date
}

export class PostsRepository {
  private _limit = 20
  private _maxLimit = 100

  constructor(
    private _db: Knex,
    private _table: string
  ) {

  }

  async findById(id: string): Promise<PostDto | null> {
    const queryBuilder = this._db
      .select()
      .from(this._table)
      .where({ id: id })
    const data = await queryBuilder

    if (isEmpty(data)) {
      return null
    }

    return this.hydrate(data[0])
  }

  async find(filters?: PostFilters, pagination?: Pagination): Promise<PostDto[] | null> {
    const queryBuilder = this._db(this._table).select()

    if (!isNil(filters)) {
      for (const key of Object.keys(filters)) {
        queryBuilder.andWhere({ [key]: filters[key] })
      }
    }

    const paginate = this.paginate(pagination)

    queryBuilder.limit(paginate.limit)
    queryBuilder.offset(paginate.offset)

    const results = await queryBuilder

    if (isEmpty(results)) {
      return null
    }

    const posts = results.map(row => this.hydrate(row))

    return posts
  }

  async save(post: PostDto): Promise<void> {
    const dehydratedPost = this.dehydrate(post)

    const queryBuilder = this._db(this._table)
      .insert(dehydratedPost)
      .onConflict('id')
      .merge(omit(dehydratedPost, ['id']))

    await queryBuilder
  }

  async delete(id: string): Promise<void> {
    const queryBuilder = this._db
      .delete()
      .from(this._table)
      .where({ id: id })

    await queryBuilder
  }

  private paginate(pagination?: Pagination): NonNullable<Pagination> {
    let limit = pagination?.limit || this._limit
    let offset = pagination?.offset || 0

    if (limit < 0) {
      limit = this._limit
    }

    if (limit > this._maxLimit) {
      limit = this._maxLimit
    }

    if (offset < 0) {
      offset = 0
    }

    return {
      limit,
      offset
    }
  }

  private hydrate(data: DehydratedPost): PostDto {
    return new PostDto(
      data.id,
      data.title,
      data.content,
      data.author,
      data.created_at,
      data.published,
      data.updated_at
    )
  }

  private dehydrate(post: PostDto): DehydratedPost {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      author: post.author,
      created_at: post.createdAt,
      published: post.published,
      updated_at: post.updateAt
    }
  }
}
