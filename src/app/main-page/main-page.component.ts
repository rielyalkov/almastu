import {AfterContentInit, Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {MapService} from '../pages/map/mapService/map-service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, AfterContentInit {

  movementStrength = 50;
  height = this.movementStrength / window.innerHeight;
  width = this.movementStrength / window.innerWidth;
  bodyElement = null;

  constructor(iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              private router: Router,
              private service: MapService,
  ) {

  }

  ngOnInit(): void {
  }

  scroll_down(): void {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  ngAfterContentInit(): void {
    this.bodyElement = document.getElementById('main-body');
  }

  navigateToAbout(): void {
    this.router.navigateByUrl('/about');
    this.service.makeArray();
  }

  navigateToMain(): void {
    this.router.navigateByUrl('');
  }

  mouseParallax(event): void {
    const pageX = event.pageX - (window.innerWidth / 2);
    const pageY = event.pageY - (window.innerHeight / 2);
    const newValueX = this.width * pageX * -1 - 25;
    const newValueY = this.height * pageY * -1 - 50;
    this.bodyElement.style.backgroundPositionX = newValueX + 'px';
    this.bodyElement.style.backgroundPositionY = newValueY + 'px';
  }
}
