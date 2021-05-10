import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import {environment} from '../environments/environment.prod';

firebase.initializeApp(environment.firebase);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(
    ) { }

    ngOnInit(): void {
      firebase.analytics();
    }
}
