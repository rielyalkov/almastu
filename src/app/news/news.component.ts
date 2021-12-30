import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { fd, News, NewsService } from './service/news.service';
import { tap } from 'rxjs/operators';
import { getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news: Observable<News[]>;
  isEmpty = true;
  authorized: any;

  fd(date: any): string {
    return fd(date);
  }

  constructor(private newsService: NewsService) {
  }

  ngOnInit(): void {
    this.news = this.newsService.getCollection().pipe(tap((q) => {
      if (q.length !== 0) {
        this.isEmpty = false;
      }
    }));
    getAuth().onAuthStateChanged((user) => {
      this.authorized = user;
    });
  }

  delete(id: string): void {
    this.newsService.deleteDoc(id);
  }
}
