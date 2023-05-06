import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, DestroyRef, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, combineLatest, forkJoin, mergeMap, of, switchMap } from 'rxjs';

import { NewsListItemComponent } from '@app/components/news-list-item/news-list-item.component';
import { NewsItem } from '@app/interfaces/news-item.typing';
import { HackerNewsService } from '@app/services/hacker-news.service';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule, NewsListItemComponent, FormsModule],
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hackerNewsService: HackerNewsService,
    private destroyRef: DestroyRef
  ) {}

  private defaultCategory = 'topstories';
  loading = signal(false);
  category = signal(this.defaultCategory);
  pageNum = signal(1);
  pageSize = signal(20);
  newsItemIds = signal<string[]>([]);
  newsItemsDisplayed = signal<NewsItem[]>([]);
  totalPage = computed(() => Math.ceil(this.newsItemIds().length / this.pageSize()));

  readonly trackByNewsItemId = (_: number, item: NewsItem): string => item.id;

  ngOnInit(): void {
    combineLatest([this.route.paramMap, this.route.queryParamMap])
      .pipe(
        switchMap(([paramMap, queryParamMap]) => {
          this.loading.set(true);
          const category = paramMap.get('category') || this.defaultCategory;
          this.category.set(category);
          this.pageNum.set(Number(queryParamMap.get('page')) || 1);
          return this.hackerNewsService.getNewsByCategory(category).pipe(
            mergeMap(ids => {
              this.newsItemIds.set(ids);
              return forkJoin(
                ids
                  .slice((this.pageNum() - 1) * this.pageSize() + 1, this.pageNum() * this.pageSize() + 1)
                  .map(id => this.hackerNewsService.getNewsItemById(String(id)))
              );
            }),
            catchError(() => of([] as NewsItem[]))
          );
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: items => {
          this.loading.set(false);
          this.newsItemsDisplayed.set(items);
        },
        error: () => {
          this.loading.set(false);
          this.newsItemsDisplayed.set([]);
        }
      });
  }

  nextPage(): Promise<boolean> {
    return this.navigateTo(this.category(), this.pageNum() + 1);
  }

  prevPage(): Promise<boolean> {
    return this.navigateTo(this.category(), Math.max(this.pageNum() - 1, 1));
  }

  navigateTo(newCategory: string, newPageNum: number): Promise<boolean> {
    return this.router.navigate(['/news', newCategory], {
      queryParams: { page: newPageNum }
    });
  }
}
