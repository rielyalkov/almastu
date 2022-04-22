import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HikeDoc } from './hike-doc';
import { HikeService } from './hike.service';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-hike',
  templateUrl: './hike.component.html',
  styleUrls: ['./hike.component.scss'],
  animations: [
    trigger('fadeOut', [
      transition(':leave', animate(
        1000,
        keyframes([style({opacity: 1, easing: 'ease', offset: 0}), style({opacity: 0, easing: 'ease', offset: 1})])
      ))
    ])
  ]
})
export class HikeComponent {

  doc?: HikeDoc;
  notFound = false;

  constructor(private route: ActivatedRoute, private service: HikeService, private router: Router) {
    route.url.subscribe(value => {
      service.getHikeInfo(value[1].path).subscribe({
        next: doc => {
          if (doc !== undefined) {
            this.doc = doc;
          } else {
            this.notFound = true;
          }
        }
      });
    });
  }

}
