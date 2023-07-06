import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { ArticlesComponent } from './articles/articles.component';
import { DetailComponent } from './detail/detail.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    ArticlesComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
  ]
})
export class BlogModule { }
