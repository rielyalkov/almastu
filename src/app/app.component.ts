import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  snowflakesRange = Array(200).fill(0);

  constructor() {
  }

  isWinter(): boolean {
    return [10,11,0,1,2,3].includes((new Date()).getMonth());
  }
}
