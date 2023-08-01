import {Component, Input, OnInit} from '@angular/core';
import {ArticleType} from "../../../../types/article.type";

@Component({
  selector: 'comment-reaction',
  templateUrl: './comment-reaction.component.html',
  styleUrls: ['./comment-reaction.component.scss']
})
export class CommentReactionComponent implements OnInit{

  @Input() article!: ArticleType;


  constructor() {
  }

  ngOnInit() {
    // console.log(this.article);
  }

}
