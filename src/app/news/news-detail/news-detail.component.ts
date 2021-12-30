import { Component, OnInit } from '@angular/core';
import { fd, News, NewsService } from '../service/news.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['../news.component.css', './news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private newsService: NewsService) {
  }

  id: string;
  doc: Observable<News>;
  loaded = false;
  docLoaded: News;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.doc = this.newsService.docData(this.route.snapshot.params.id);
    this.doc.subscribe((v) => {
      this.docLoaded = v;
      this.loaded = true;
    });
  }

  fd(date: any): string {
    return fd(date);
  }
}
