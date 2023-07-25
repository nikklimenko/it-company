import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CommentsType} from "../../../types/comments.type";
import {CommentsParamsType} from "../../../types/comments-params.type";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  getComments(params: CommentsParamsType): Observable<CommentsType>{
    return this.http.get<CommentsType>(environment.api + 'comments', {params});
  }
}
