import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {latLng, tileLayer, Layer} from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, OnDestroy, AfterViewInit{
  private Map;

  constructor(
  ) {
  }


  ngOnInit(): void {
    document.getElementById('mapHTML').innerHTML = "<div id='map' style='height: 500px;' leaflet></div>"
    const lIcon = L.icon({
      iconUrl: 'assets/images/location.svg',
      iconSize:     [24, 24],
      shadowSize:   [0, 26],
      iconAnchor:   [12, 24],
      shadowAnchor: [4, 62],
      popupAnchor:  [0, -24]
    });

    this.Map = L.map('map').setView([60.000, 100.000], 3);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.Map);
    const marker = L.marker([67.44, 33.43 ], {icon: lIcon}).addTo(this.Map);
    marker.bindPopup('<b>Хибины</b>');
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }


}
