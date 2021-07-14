import { PostsService } from '@modules/services/posts/PostsService'

export abstract class PostHandler {
  constructor(protected _postsService: PostsService) {

  }
}
