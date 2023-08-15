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
import {AuthService} from "../../../core/auth/auth.service";

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
  isLogged: boolean = false;


  constructor(private commentsService: CommentsService,
              private authService: AuthService,
              private router: Router,
              private location: Location,
              private _snackBar: MatSnackBar,
  ) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnChanges(changes: SimpleChanges) {
    const articleChange = changes['article'];
    if (articleChange) {
      const currentArticle: ArticleType = articleChange.currentValue;
      this.commentsParams = {
        article: currentArticle.id
      }
      this.commentsService.defaultCommentCount();
      this.getComments()
    }
  }

  ngOnInit() {
    this.commentsParams = {
      article: this.article.id
    }

  }

  getComments() {
    this.loading = true;
    this.commentsService.getComments(this.commentsParams).subscribe((commentsData: CommentsType) => {
      if(this.isLogged){
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
              });
              return item;
            });
            this.showLoadMoreButton = commentsData.allCount > this.comments.length;
          });
      }else {
        this.comments = commentsData.comments.map(item => {
          item.isUserLiked = false;
          item.isUserDisliked = false;
          return item;
        });
        this.showLoadMoreButton = commentsData.allCount > this.comments.length;
      }

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

  navigate(path: string) {
    const url = path === 'login' ? 'login' : 'signup';
    this.router.navigate([`${url}/back`], { queryParams: { articleUrl: this.article.url } });
  }

}
