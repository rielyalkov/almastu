import {AfterContentInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, AfterContentInit {

  movementStrength = 50;
  mouseMoveHeight = this.movementStrength / window.innerHeight;
  mouseMoveWidth = this.movementStrength / window.innerWidth;
  screenWidth = screen.width;
  screenHeight = screen.height;
  screenAspectRatioR = this.gcd(screen.width, screen.height);
  // @ts-ignore
  screenAspectRatioX = screen.width / this.screenAspectRatioR;
  // @ts-ignore
  screenAspectRatioY = screen.height / this.screenAspectRatioR;
  screenAspectRatio = `${this.screenAspectRatioX}:${this.screenAspectRatioY}`;
  bodyElement = null;

  constructor() {}

  ngOnInit(): void {
  }

  gcd(a, b): void {
    if (b === 0) {
      return a;
    }
    return this.gcd(b, a % b);
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
    const scrollDownContainer = document.getElementById('scroll_down_container');
    if (this.screenWidth <= 620) {
      scrollDownContainer.style.pointerEvents = 'none';
    } // only manual scrolling on mobile devices
  }

  mouseParallax(event): void {
    if (this.screenWidth > 1500 && this.screenHeight > 999) {
      if (this.screenAspectRatio === '16:9' || '64:27') {
        const pageX = event.pageX - (window.innerWidth / 2);
        const pageY = event.pageY - (window.innerHeight / 2);
        const newValueX = this.mouseMoveWidth * pageX * -1 - 25;
        const newValueY = this.mouseMoveHeight * pageY * -1 - 50;
        this.bodyElement.style.backgroundPositionX = newValueX + 'px';
        this.bodyElement.style.backgroundPositionY = newValueY + 'px';
      }
    }
  }
}
