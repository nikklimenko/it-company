import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ArticleType} from "../../../../types/article.type";
import {CommentsService} from "../../services/comments.service";
import {CommentsParamsType} from "../../../../types/comments-params.type";
import {CommentsToArticleType} from "../../../../types/comments-to-article.type";
import {CommentsType} from "../../../../types/comments.type";
import {Router} from "@angular/router";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Location} from "@angular/common";
import {CommentActionForUserType} from "../../../../types/comment-action-for-user.type";

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnChanges {

  @Input() article!: ArticleType;
  comments: CommentsToArticleType[] = [];
  showLoadMoreButton = false;
  loading = false;
  commentText: string = '';
  commentsParams!: CommentsParamsType;

  constructor(private commentsService: CommentsService,
              private router: Router,
              private location: Location,
              private _snackBar: MatSnackBar,
              ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    const articleChange = changes['article'];
    if (articleChange) {
      console.log(articleChange.currentValue)
      const currentArticle: ArticleType = articleChange.currentValue;

      this.commentsParams = {
        article: currentArticle.id
      }

      this.getComments()
    }
  }

  ngOnInit() {
    this.commentsParams = {
      article: this.article.id
    }

    // this.comments = this.articleComments;
    // this.showLoadMoreButton = this.article.commentsCount > this.article.comments.length;

    // this.getComments();

  }

  getComments() {
    this.loading = true;
    this.commentsService.getComments(this.commentsParams).subscribe((commentsData: CommentsType) => {

      this.commentsService.getArticleCommentsActionsForUser(this.article.id)
        .subscribe((data: CommentActionForUserType[]) => {
          this.comments = commentsData.comments.map(item => {
            item.isUserLiked = false;
            item.isUserDisliked = false;
            data.forEach(commentAction => {
              if (commentAction.comment === item.id) {
                item.isUserLiked = commentAction.action === 'like';
                item.isUserDisliked = commentAction.action === 'dislike';
              }
            })
            return item;
          });
        });

      this.showLoadMoreButton = commentsData.allCount > this.comments.length;
      this.loading = false;
    });
  }

  loadMoreComments() {
    this.commentsService.loadMoreComments();
    this.getComments();
  }


  addComment() {
    this.commentsService.addComment(this.commentText, this.article.id)
      .subscribe({
        next: (data: DefaultResponseType) => {
          this.commentText = '';
          this._snackBar.open('Comment added successfully');
          this.getComments();
          this.router.navigate([this.router.url]);
        },
        error: (errorResponse: HttpErrorResponse) => {
          if (errorResponse.error && errorResponse.error.message) {
            this._snackBar.open('Error adding comment, please try again');
          } else {
            this._snackBar.open('Error adding comment, please try again');
          }
        }
      })
  }

}
