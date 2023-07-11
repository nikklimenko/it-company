import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ArticleType} from "../../../../types/article.type";
import {CategoryType} from "../../../../types/category.type";
import {ActiveParamsType} from "../../../../types/active-params.type";
import {ActivatedRoute, Router} from "@angular/router";
import {AppliedFilterType} from "../../../../types/applied-filter.type";
import {debounceTime} from "rxjs";

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
  pages: number[] = [];

  @ViewChild('blogFilters') blogFilters!: ElementRef;

  constructor(private articleService: ArticleService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const blogFilterElem = this.blogFilters.nativeElement as HTMLElement;
    console.log()
    if (!blogFilterElem.contains(target)) {
      this.filtersOpen = false;
    }
  }

  ngOnInit() {
    this.articleService.getCategories()
      .subscribe(data => {
        this.categories = data.map(item => {
          item.isSearching = false;
          return item;
        });

        this.activatedRoute.queryParams
          .pipe(
            debounceTime(500)
          )
          .subscribe(params => {
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

          this.articleService.getArticles(this.activeParams)
            .subscribe(data => {
              this.pages = [];
              for (let i = 1; i <= data.pages; i++) {
                this.pages.push(i);
              }
              this.articles = data.items;
            });
        });
      });
  }

  toggleFilters() {
    this.filtersOpen = !this.filtersOpen;
  }

  updateFilterParam(url: string, isSearching: boolean) {
    this.filtersOpen = false;
    this.activeParams.page = 1;

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
    this.activeParams.page = 1;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    });
  }

  openPage(page: number) {
    this.activeParams.page = page;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    });
  }

  openPrevPage(){
    if(this.activeParams.page && this.activeParams.page > 1){
      this.activeParams.page--;
      this.router.navigate(['/blog'], {
        queryParams: this.activeParams
      });
    }

  }
  openNextPage(){
    if(!this.activeParams.page){
      this.activeParams.page = 1;
    }
    if(this.activeParams.page && this.activeParams.page < this.pages.length){
      this.activeParams.page++;
      this.router.navigate(['/blog'], {
        queryParams: this.activeParams
      });
    }
  }

}
