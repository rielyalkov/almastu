import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { fd, News, NewsService } from './service/news.service';
import { tap } from 'rxjs/operators';
import { getAuth } from '@angular/fire/auth';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  animations: [
    trigger('fadeOut', [
      transition(':leave', animate(
        1000,
        keyframes([style({opacity: 1, easing: 'ease', offset: 0}), style({opacity: 0, easing: 'ease', offset: 1})])
      ))
    ])
  ]
})
export class NewsComponent implements OnInit {

  news: Observable<News[]>;
  isEmpty = false;
  loaded = false;
  authorized: any;

  fd(date: any): string {
    return fd(date);
  }

  constructor(private newsService: NewsService) {
  }

  getNews(): void {
    this.news = this.newsService.getCollection().pipe(tap((q) => {
      this.loaded = true;
      this.isEmpty = q.length === 0;
    }));
  }

  ngOnInit(): void {
    this.getNews();
    getAuth().onAuthStateChanged((user) => {
      this.authorized = user;
    });
  }

  delete(id: string): void {
    this.newsService.deleteDoc(id);
  }
}
