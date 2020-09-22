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
    const lIcon = L.icon({
      iconUrl: 'assets/images/location.svg'
    });
    this.Map = L.map('map').setView([60.000, 100.000], 3);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.Map);
    const marker = L.marker([67.44, 33.43 ], {icon: lIcon}).addTo(this.Map);
  }

  ngAfterViewInit(): void {
    this.Map = undefined;
  }

  ngOnDestroy(): void {
    this.Map = undefined;
  }


}
