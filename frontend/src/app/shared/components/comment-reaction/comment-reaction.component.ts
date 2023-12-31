import {Component, Input, OnInit} from '@angular/core';
import {ArticleType} from "../../../../types/article.type";
import {CommentsToArticleType} from "../../../../types/comments-to-article.type";
import {CommentsService} from "../../services/comments.service";
import {UserActionType} from "../../../../types/user-action.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
  selector: 'comment-reaction',
  templateUrl: './comment-reaction.component.html',
  styleUrls: ['./comment-reaction.component.scss']
})
export class CommentReactionComponent implements OnInit {

  @Input() article!: ArticleType;
  @Input() comment!: CommentsToArticleType;
  likesCount: number = 0;
  dislikesCount: number = 0;
  userActions = UserActionType;
  isLogged: boolean = false;

  constructor(private commentService: CommentsService,
              private _snackBar: MatSnackBar,
              private authService: AuthService,) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit() {
    this.likesCount = this.comment.likesCount;
    this.dislikesCount = this.comment.dislikesCount;
  }

  like() {
    if(this.isLogged){
      this.commentService.applyAction(this.userActions.like, this.comment.id)
        .subscribe({
          next: (data: DefaultResponseType) => {
            if (data.error) {
              this._snackBar.open(data.message);
              throw new Error(data.message);
            }
            this.comment.isUserDisliked ? this.dislikesCount-- : false;
            this.comment.isUserLiked ? this.likesCount-- : this.likesCount++;
            this.comment.isUserLiked = !this.comment.isUserLiked;
            this.comment.isUserDisliked = false;
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Action not taken, please try again');
            }
          }
        })
    } else {
      this._snackBar.open('For this action you need to login or signup');
    }

  }

  dislike() {
    if(this.isLogged){
      this.commentService.applyAction(this.userActions.dislike, this.comment.id)
        .subscribe({
          next: (data: DefaultResponseType) => {
            if (data.error) {
              this._snackBar.open(data.message);
              throw new Error(data.message);
            }
            this.comment.isUserLiked ? this.likesCount-- : false;
            this.comment.isUserDisliked ? this.dislikesCount-- : this.dislikesCount++;
            this.comment.isUserDisliked = !this.comment.isUserDisliked;
            this.comment.isUserLiked = false;
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Action not taken, please try again');
            }
          }
        })
    } else {
      this._snackBar.open('For this action you need to login or signup');
    }

  }
  violate() {
    if(this.isLogged){
      this.commentService.applyAction(this.userActions.violate, this.comment.id)
        .subscribe({
          next: (data: DefaultResponseType) => {
            if (data.error) {
              this._snackBar.open('This action has already been applied to the comment');
              throw new Error(data.message);
            }

            this._snackBar.open('Complaint sent');
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Error submitting complaint, please try again');
            }
          }
        })
    } else {
      this._snackBar.open('For this action you need to login or signup');
    }
  }
}
