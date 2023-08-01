import {Component, Input, OnInit} from '@angular/core';
import {ArticleType} from "../../../../types/article.type";
import {CommentsService} from "../../services/comments.service";
import {CommentsParamsType} from "../../../../types/comments-params.type";
import {CommentsToArticleType} from "../../../../types/comments-to-article.type";
import {CommentsType} from "../../../../types/comments.type";
import {Router} from "@angular/router";

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit{

  @Input() article!: ArticleType;
  comments: CommentsToArticleType[] = [];
  showLoadMoreButton = false;
  loading = false;

  constructor(private commentsService: CommentsService,
              private router: Router) {
  }

  ngOnInit() {
    this.comments = this.article.comments;
    this.showLoadMoreButton = this.article.commentsCount > this.article.comments.length;


  }

  getComments() {
    const params: CommentsParamsType = {
      article: this.article.id
    };
    this.loading = true;
    this.commentsService.getComments(params).subscribe((commentsData: CommentsType) => {
      this.comments = commentsData.comments;

      this.showLoadMoreButton = commentsData.allCount > this.comments.length;
      this.loading = false;
    });
  }

  loadMoreComments() {
    this.commentsService.loadMoreComments();
    this.getComments();
  }


}
