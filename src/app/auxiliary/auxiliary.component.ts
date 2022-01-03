import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-auxiliary',
  templateUrl: './auxiliary.component.html',
  styleUrls: ['./auxiliary.component.css']
})
export class AuxiliaryComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  navigateToAbout(): void {
    this.router.navigateByUrl('/about');
  }

  navigateToMain(): void {
    this.router.navigateByUrl('');
  }

}
