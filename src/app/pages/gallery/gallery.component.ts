import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  constructor() {}

  // tslint:disable-next-line:typedef
  open_floating(file) {
    document.getElementById('floating').style.opacity = '1';
    document.getElementById('floating').style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    document.getElementById('floating').style.visibility = 'visible';
    document.getElementById('fimg').setAttribute('src', file);
  }

  ngOnInit(): void {
  }

}
