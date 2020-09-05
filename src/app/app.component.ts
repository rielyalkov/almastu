import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'almastu';
  showFiller = false;
  

    constructor(
      private router: Router,
    ) { }
  
    ngOnInit(): void {
      this.router.navigateByUrl('');
    }

    navigateToAbout() : void {
      this.router.navigateByUrl('/about');
    }

    navigateToMain() : void {
      this.router.navigateByUrl('');
    }

}
