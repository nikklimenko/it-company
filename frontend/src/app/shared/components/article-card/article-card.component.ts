import {Component, Input} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {ArticleType} from "../../../../types/article.type";

@Component({
  selector: 'article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {

  serverStaticPath: string = environment.serverStaticPath;
  @Input() article!: ArticleType;

  constructor() {
  }

}
