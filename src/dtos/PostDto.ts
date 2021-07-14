export class PostDto {
  constructor(
    public readonly id: string,
    public title: string,
    public content: string,
    public author: string,
    public createdAt: Date,
    public published: boolean = false,
    public updateAt: Date = new Date()
  ) {

  }
}
