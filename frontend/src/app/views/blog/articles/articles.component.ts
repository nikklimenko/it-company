import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ArticleType} from "../../../../types/article.type";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit{
  articles: ArticleType[] = [];

  constructor(private articleService: ArticleService) {
  }

  ngOnInit() {

    this.articleService.getArticles()
      .subscribe(data => {
        this.articles = data.items;
      })
  }
}
