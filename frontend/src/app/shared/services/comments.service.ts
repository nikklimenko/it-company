import { Injectable } from '@angular/core';
import { Observable, switchMap} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CommentsType} from "../../../types/comments.type";
import {CommentsParamsType} from "../../../types/comments-params.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {CommentActionForUserType} from "../../../types/comment-action-for-user.type";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private loading = false;
  private loadedCommentsCount = 3; // Изначально отображаем 3 комментария
  constructor(private http: HttpClient) { }

  getComments(params: CommentsParamsType): Observable<CommentsType> {
    return this.http.get<CommentsType>(environment.api + 'comments', { params }).pipe(
      switchMap((commentsData: CommentsType) => {
        if (commentsData.allCount <= this.loadedCommentsCount) {
          params.offset = 0;
          return this.http.get<CommentsType>(environment.api + 'comments', { params });
        } else {
          params.offset = commentsData.allCount - this.loadedCommentsCount;
          return this.http.get<CommentsType>(environment.api + 'comments', { params });
        }
      })
    );
  }

  addComment(text: string, article: string): Observable<DefaultResponseType>{
    return this.http.post<DefaultResponseType>(environment.api + 'comments', { text, article });
  }

  getArticleCommentsActionsForUser(articleId: string):Observable<CommentActionForUserType[]>{
    let params = new HttpParams().set('articleId', articleId);
    return this.http.get<CommentActionForUserType[]>(environment.api + 'comments/article-comment-actions', {params: params});
  }

  applyAction(action: string, commentId: string): Observable<DefaultResponseType>{
    return this.http.post<DefaultResponseType>(environment.api + 'comments/' + commentId + '/apply-action', { action });
  }

  loadMoreComments(){
    this.loadedCommentsCount += 10;
  }

}
