import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MapService} from './map/mapService/map-service.service';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'almastu';


    constructor(
      private router: Router,
      private service: MapService
    ) { }

    ngOnInit(): void {
    }

    navigateToAbout(): void {
      this.router.navigateByUrl('/about');
      this.service.makeArray();
    }

    navigateToMain(): void {
      this.router.navigateByUrl('');
    }

}
