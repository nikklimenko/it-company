export type CommentsToArticleType = {
  id: string,
  text: string,
  date: string,
  likesCount: number,
  dislikesCount: number,
  user: {
  id: string,
    name: string
  }
}

