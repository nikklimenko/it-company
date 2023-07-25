import {Component, Input, OnInit} from '@angular/core';
import {ArticleType} from "../../../../types/article.type";
import {CommentsService} from "../../services/comments.service";
import {CommentsParamsType} from "../../../../types/comments-params.type";
import {CommentsToArticleType} from "../../../../types/comments-to-article.type";
import {CommentsType} from "../../../../types/comments.type";

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit{

  @Input() article!: ArticleType;
  commentsParams: CommentsParamsType = { offset: 0, article: '' };
  comments: CommentsToArticleType[] = [];

  constructor(private commentsService: CommentsService) {
  }

  ngOnInit() {
    this.commentsParams.offset = 0;
    this.commentsParams.article = this.article.id;

    this.commentsService.getComments(this.commentsParams)
      .subscribe((commentsData: CommentsType) => {
        this.comments = commentsData.comments;
        console.log(commentsData);
      })

  }

}
