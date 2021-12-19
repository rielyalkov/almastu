import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsService } from './service/news.service';
import { News, fd } from './service/news.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news: Observable<News[]>;
  isEmpty = true;

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
  }
}
