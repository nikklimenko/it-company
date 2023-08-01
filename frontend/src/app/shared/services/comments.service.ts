import { Injectable } from '@angular/core';
import { Observable, switchMap} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CommentsType} from "../../../types/comments.type";
import {CommentsParamsType} from "../../../types/comments-params.type";

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
          // Если количество комментариев меньше или равно, устанавливаем offset в 0
          params.offset = 0;
          // console.log(`${commentsData.allCount} <= ${this.loadedCommentsCount} : ${commentsData.allCount <= this.loadedCommentsCount} allCount: ${commentsData.allCount} offset: ${params.offset}`)
          return this.http.get<CommentsType>(environment.api + 'comments', { params });
        } else {
          // Если количество комментариев больше, устанавливаем offset, чтобы получить последние loadedCommentsCount комментариев

          params.offset = commentsData.allCount - this.loadedCommentsCount;
          // console.log(`${commentsData.allCount} > ${this.loadedCommentsCount} : ${commentsData.allCount > this.loadedCommentsCount} allCount: ${commentsData.allCount} offset: ${params.offset}`)
          return this.http.get<CommentsType>(environment.api + 'comments', { params });
        }
      })
    );
  }

  loadMoreComments(){
    this.loadedCommentsCount += 10;
  }

}
