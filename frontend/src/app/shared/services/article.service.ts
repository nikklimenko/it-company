import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ArticleType} from "../../../types/article.type";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getPopularArticles(): Observable<ArticleType[]>{
    return this.http.get<ArticleType[]>(environment.api + 'articles/top');
  }
  getArticles(): Observable<{ count: number, pages: number, items: ArticleType[] }>{
    return this.http.get<{ count: number, pages: number, items: ArticleType[] }>(environment.api + 'articles');
  }


}
