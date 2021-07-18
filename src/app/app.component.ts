import { Component, OnInit } from '@angular/core';
import { initializeApp as fireInit, analytics as fireAnalytics } from 'firebase';
import {environment} from '../environments/environment.prod';

fireInit(environment.firebase);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(
    ) { }

    ngOnInit(): void {
      fireAnalytics();
    }
}
