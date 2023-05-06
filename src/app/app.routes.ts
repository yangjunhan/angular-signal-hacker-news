import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'news',
    children: [
      {
        path: ':category',
        loadComponent: () => import('@app/routers/news-list/news-list.component').then(m => m.NewsListComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'news/topstories',
    pathMatch: 'full'
  }
];
