import {Component, OnInit, Renderer2, Inject, ViewEncapsulation} from '@angular/core';
import {latLng, tileLayer, Layer} from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {

  constructor(
    private L: Layer,
  ) {
  }

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 3,
    center: latLng(60.879966, 100.726909)
  };

  ngOnInit(): void {
    // const myMap = L.map('map').setView([51.505, -0.09], 13);
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(myMap);
  }

}
