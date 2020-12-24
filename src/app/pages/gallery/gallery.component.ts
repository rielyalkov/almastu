import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  constructor() {}

  open_floating(file) {
    document.getElementById('floating').style.display = 'block';
    document.getElementById('fimg').setAttribute('src', file);
  }

  ngOnInit(): void {
  }

}
