import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArticleCardComponent} from "./components/article-card/article-card.component";
import {FormatCurrencyPipe} from "./pipes/format-currency.pipe";
import {RouterModule} from "@angular/router";
import { CommentsComponent } from './components/comments/comments.component';
import { CommentReactionComponent } from './components/comment-reaction/comment-reaction.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ArticleCardComponent,
    FormatCurrencyPipe,
    CommentsComponent,
    CommentReactionComponent,
    DateFormatPipe,

  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
    exports: [ArticleCardComponent, FormatCurrencyPipe, CommentsComponent]
})
export class SharedModule { }
