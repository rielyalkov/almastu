import { Component, OnInit } from '@angular/core';
import { NewsService } from '../service/news.service';
import { News, fd } from '../service/news.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['../news.component.css']
})
export class NewsDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private newsService: NewsService) { }

  id: string;
  doc: Observable<News>;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params.get('id'));
      this.id = params.get('id');
    });
    this.doc = this.newsService.docData(this.route.snapshot.params.id);
  }
  fd(date: any): string { return fd(date); }
}
