import {CommentsToArticleType} from "./comments-to-article.type";

export type CommentsType = {
  allCount: number,
  comments: CommentsToArticleType[],
}
