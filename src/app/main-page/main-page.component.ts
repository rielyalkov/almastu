import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {MapService} from '../pages/map/mapService/map-service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              private router: Router,
              private service: MapService
  ) {
  }

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
