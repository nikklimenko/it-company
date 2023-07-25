import {Component, OnInit} from '@angular/core';
import {ArticleType} from "../../../../types/article.type";
import {ActivatedRoute} from "@angular/router";
import {ArticleService} from "../../../shared/services/article.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  article!: ArticleType;
  serverStaticPath: string = environment.serverStaticPath;
  relatedArticles: ArticleType[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private articleService: ArticleService) {
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {

      this.articleService.getArticle(params['url']).subscribe((data: ArticleType) => {
        this.article = data;
      });

      this.articleService.getRelatedArticles(params['url']).subscribe((dataRelatedArticles: ArticleType[]) => {
        this.relatedArticles = dataRelatedArticles;
      });

    })

  }

}
