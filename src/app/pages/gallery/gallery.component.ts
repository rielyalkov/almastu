import {Component, Input, NgModule, OnInit} from '@angular/core';
import { open_floating } from '../../../scripts/open_floating.js';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
  }

  openFloating(file, alt): void {
    open_floating(file, alt);
  }


}
