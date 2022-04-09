import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapDetailService } from './map-detail.service';
import { Observable } from 'rxjs';
import MapDoc from './map-doc';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-map-detail',
  templateUrl: './map-detail.component.html',
  styleUrls: ['./map-detail.component.css'],
  animations: [
    trigger('fadeOut', [
      transition(':leave', animate(
        1000,
        keyframes([style({opacity: 1, easing: 'ease', offset: 0}), style({opacity: 0, easing: 'ease', offset: 1})])
      ))
    ])
  ]
})
export class MapDetailComponent {

  route: Observable<MapDoc>;

  constructor(private webRoute: ActivatedRoute, private service: MapDetailService) {
    this.webRoute.url.subscribe((urlSegments) => {
      this.route = service.getRouteInfo(urlSegments[1].path);
    });
  }

}
