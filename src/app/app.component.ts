import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {environment} from '../environments/environment.prod';

firebase.initializeApp(environment.firebase);

@Component({
  selector: 'root',
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
