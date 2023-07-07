import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ArticleType} from "../../../../types/article.type";
import {CategoryType} from "../../../../types/category.type";
import {ActiveParamsType} from "../../../../types/active-params.type";
import {ActivatedRoute, Router} from "@angular/router";
import {AppliedFilterType} from "../../../../types/applied-filter.type";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  articles: ArticleType[] = [];
  categories: CategoryType[] = [];
  filtersOpen: boolean = false;
  activeParams: ActiveParamsType = {categories: []};
  appliedFilters: AppliedFilterType[] = [];

  constructor(private articleService: ArticleService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {

    this.articleService.getArticles()
      .subscribe(data => {
        this.articles = data.items;
      });

    this.articleService.getCategories()
      .subscribe(data => {
        this.categories = data.map(item => {
          item.isSearching = false;
          return item;
        });

        this.activatedRoute.queryParams.subscribe(params => {
          const activeParams: ActiveParamsType = {categories: []};
          if (params.hasOwnProperty('categories')) {
            activeParams.categories = Array.isArray(params['categories']) ? params['categories'] : [params['categories']];
          }
          if (params.hasOwnProperty('page')) {
            activeParams.page = +params['page'];
          }
          this.activeParams = activeParams;

          if (this.activeParams && this.activeParams.categories && this.activeParams.categories.length > 0) {
            this.categories.map(item => {
              const categoryInParams = this.activeParams.categories.find(paramCategory => paramCategory === item.url);
              if (categoryInParams) {
                item.isSearching = true;
              }
            })
          }

          this.appliedFilters = [];
          this.activeParams.categories.forEach(url => {

            const foundCategory = this.categories.find(item => item.url === url);
            if (foundCategory) {
              this.appliedFilters.push({
                name: foundCategory.name,
                urlParam: foundCategory.url
              })
            }
          });


        });
      });
  }

  toggleFilters() {
    this.filtersOpen = !this.filtersOpen;
  }

  updateFilterParam(url: string, isSearching: boolean) {
    this.categories.filter(item => {
      if (item.url === url) {
        item.isSearching = !item.isSearching;
      }
      return item;
    });

    if (this.activeParams.categories && this.activeParams.categories.length > 0) {
      const existingCategoryInParams = this.activeParams.categories.find(item => item === url);
      if (existingCategoryInParams && !isSearching) {
        this.activeParams.categories = this.activeParams.categories.filter(item => item !== url);
      } else if (!existingCategoryInParams && isSearching) {
        this.activeParams.categories = [...this.activeParams.categories, url];
      }
    } else if (isSearching) {
      this.activeParams.categories = [url];
    }

    this.router.navigate(['/blog'], {
      queryParams: this.activeParams,
    })


  }

  removeAppliedFilter(appliedFilter: AppliedFilterType) {
    this.activeParams.categories = this.activeParams.categories.filter(item => item !== appliedFilter.urlParam);
    this.categories.filter(item => {
      if(item.url === appliedFilter.urlParam){
        item.isSearching = false;
      }
    });
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    });
  }
}
