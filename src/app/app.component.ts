import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MapService } from './pages/map/mapService/map-service.service';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(
    ) { }

    ngOnInit(): void {
    }
}
