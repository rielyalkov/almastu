import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {latLng, tileLayer, Layer} from 'leaflet';
import * as L from 'leaflet';
import {MatRadioButton, MatRadioChange} from '@angular/material/radio';

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

  favoriteSeason = 'Географическая карта';
  seasons: string[] = ['Географическая карта', 'Топографическая карта'];

  OpenTopoMap = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
  OpenStreetMap = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';


  ngOnInit(): void {
    document.getElementById('mapHTML').innerHTML = "<div id='map' style='height: 500px;' leaflet></div>"
    const lIcon = L.icon({
      iconUrl: 'assets/images/location.svg',
      iconSize:     [24, 24],
      shadowSize:   [0, 26],
      iconAnchor:   [12, 24],
      shadowAnchor: [4, 62],
      popupAnchor:  [0, -26]
    });

    this.Map = L.map('map').setView([60.000, 100.000], 3);
    this.mapStyleDefine(this.OpenStreetMap);
    const markerKh = L.marker([67.734720, 33.726110], {icon: lIcon}).addTo(this.Map).bindPopup('<b>Хибины</b>');
    L.marker([55.259720, 59.792500], {icon: lIcon}).addTo(this.Map).bindPopup('<b>Таганай</b>');
    L.marker([43.345830, 42.448610], {icon: lIcon}).addTo(this.Map).bindPopup('<b>Эльбрус</b>');
    L.marker([56.949400, 32.838600], {icon: lIcon}).addTo(this.Map).bindPopup('<b>Верхневолжские озера</b>');
    L.marker([56.427395, 28.820091], {icon: lIcon}).addTo(this.Map).bindPopup('<b>Великая</b>');
    L.marker([67.500000, 66.000000], {icon: lIcon}).addTo(this.Map).bindPopup('<b>Полярный Урал</b>');
    L.marker([64.838539, 33.693727], {icon: lIcon}).addTo(this.Map).bindPopup('<b>Карелия</b>');
    L.marker([44.263300, 40.171900], {icon: lIcon}).addTo(this.Map).bindPopup('<b>Адыгея</b>');
  }

  change(event: MatRadioChange): void {
    console.log(event);
    switch (event.value) {
      case ('Топографическая карта'):
        console.log('1');
        this.mapStyleDefine(this.OpenTopoMap);
        break;
      case ('Географическая карта'):
        console.log('2');
        this.mapStyleDefine(this.OpenStreetMap);
        break;
    }
  }

  mapStyleDefine(mapStyle): void {
    L.tileLayer(mapStyle, {
      maxZoom: 19,
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }).addTo(this.Map);
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

}
