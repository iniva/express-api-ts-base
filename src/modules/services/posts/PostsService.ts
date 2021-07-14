import { isNil } from 'lodash'

import { PostsRepository } from '@modules/database/PostsRepository'
import { PostDto } from 'dtos/PostDto'
import { PostFilters } from 'types/PostFilters'
import { Pagination } from 'types/Pagination'
import { PostNotFoundException } from './PostNotFoundException'

type UnknownObject = Record<string, string>

export class PostsService {
  constructor(
    private _postsRepository: PostsRepository
  ) {

  }

  async findById(id: string): Promise<PostDto> {
    const post = await this._postsRepository.findById(id)

    if (post === null) {
      throw new PostNotFoundException()
    }

    return post
  }

  async find(query?: unknown): Promise<PostDto[]> {
    const filters = this.getPostFilters(query)
    const pagination = this.getPagination(query)
    const results = await this._postsRepository.find(filters, pagination)

    if (results === null) {
      return []
    }

    return results
  }

  async save(data: PostDto): Promise<void> {
    return this._postsRepository.save(data)
  }

  async update(updateData: PostDto): Promise<void> {
    await this._postsRepository.save(updateData)
  }

  async delete(id: string): Promise<void> {
    await this._postsRepository.delete(id)
  }

  private getPostFilters(query?: unknown): PostFilters | undefined {
    if (isNil(query)) {
      return
    }

    const queryParams = <UnknownObject>query
    const filterValues: PostFilters = {}

    for(const filter of Object.keys(queryParams)) {
      filterValues[filter] = queryParams[filter]
    }

    return filterValues
  }

  private getPagination(query?: unknown): Pagination | undefined {
    if (isNil(query)) {
      return
    }

    const queryParams = <UnknownObject>query

    let limit = 0
    let offset = 0

    if (!isNil(queryParams.limit)) {
      limit = Number(queryParams.limit)
    }

    if (!isNil(queryParams.offset)) {
      offset = Number(queryParams.offset)
    }

    return {
      limit,
      offset
    }
  }
}
