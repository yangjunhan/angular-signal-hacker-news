import { HttpClient } from '@angular/common/http';
import {Injectable, signal} from '@angular/core';
import {from, map, mergeMap, Observable, tap} from 'rxjs';

import { NewsItem } from '@app/interfaces/news-item.typing';

const prefix = 'https://hacker-news.firebaseio.com/v0/';
const newsPrefix = `${prefix}/item/`;
const userPrefix = `${prefix}/user/`;
const suffix = '.json?print=pretty';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {
  constructor(private http: HttpClient) {}

  /**
   * Return an observable object that sends an HTTP GET request to HackerNews API
   * to obtain whole list of data for news items with given category.
   */
  getNewsByCategory(category: string): Observable<string[]> {
    const reqUrl = prefix + category + suffix;
    return this.http.get<string[]>(reqUrl);
  }

  /**
   * Return an observable object that sends a HTTP GET request to HackerNews API
   * to obtain data for news item with given news ID
   */
  getNewsItemById(id: string): Observable<NewsItem> {
    const reqUrl = newsPrefix + id + suffix;
    return this.http.get<NewsItem>(reqUrl);
  }
}
