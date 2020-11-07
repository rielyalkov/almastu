import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MapService} from '../pages/map/mapService/map-service.service';

@Component({
  selector: 'app-auxiliary',
  templateUrl: './auxiliary.component.html',
  styleUrls: ['./auxiliary.component.css']
})
export class AuxiliaryComponent implements OnInit {

  constructor(
    private router: Router,
    private service: MapService
  ) { }

  title = 'almastu';

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
