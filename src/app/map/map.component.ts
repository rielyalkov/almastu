import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-draw';
import {MatRadioButton, MatRadioChange} from '@angular/material/radio';
import {MapService} from './mapService/map-service.service';
import {map, tap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';

export interface CoordModel {
  route: string;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, OnDestroy, AfterViewInit{

  constructor(private _mapService: MapService,
              private db: AngularFirestore
) {
  }
  private Map;

  favoriteSeason = 'Географическая карта';
  seasons: string[] = ['Географическая карта', 'Топографическая карта'];

  OpenTopoMap = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
  OpenStreetMap = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  MarkerArray;

  Coordinates: CoordModel;

  ngOnInit(): void {

    document.getElementById('mapHTML').innerHTML = '<div id=\'map\' style=\'height: 500px;\' leaflet></div>';
    const lIcon = L.icon({
      iconUrl: 'assets/images/location.svg',
      iconSize:     [24, 24],
      shadowSize:   [0, 26],
      iconAnchor:   [12, 24],
      shadowAnchor: [4, 62],
      popupAnchor:  [0, -26]
    });
    const startIcon = L.icon({
      iconUrl: 'assets/images/office.svg',
      iconSize:     [24, 24],
      shadowSize:   [0, 26],
      iconAnchor:   [12, 24],
      shadowAnchor: [4, 62],
      popupAnchor:  [0, -26]
    });
    const endIcon = L.icon({
      iconUrl: 'assets/images/arrived.svg',
      iconSize:     [24, 24],
      shadowSize:   [0, 26],
      iconAnchor:   [12, 24],
      shadowAnchor: [4, 62],
      popupAnchor:  [0, -26]
    });



    // @ts-ignore
    this.Map = L.map('map', {drawControl: false}).setView([60.000, 100.000], 3);
    this.mapStyleDefine(this.OpenStreetMap);
    const markerKh = L.marker([67.734720, 33.726110], {icon: lIcon}).addTo(this.Map).bindPopup('<b>Хибины</b>');
    this.MarkerArray = [
      [L.marker([55.259720, 59.792500], {icon: lIcon}).addTo(this.Map).bindPopup('<b>Таганай</b>')],
      [L.marker([43.345830, 42.448610], {icon: lIcon}).addTo(this.Map).bindPopup('<b>Эльбрус</b>')],
    ];
    L.marker([56.949400, 32.838600], {icon: lIcon}).addTo(this.Map).bindPopup('<b>Верхневолжские озера</b>');
    L.marker([56.427395, 28.820091], {icon: lIcon}).addTo(this.Map).bindPopup('<b>Великая</b>');
    L.marker([67.500000, 66.000000], {icon: lIcon}).addTo(this.Map).bindPopup('<b>Полярный Урал</b>');
    L.marker([64.838539, 33.693727], {icon: lIcon}).addTo(this.Map).bindPopup('<b>Карелия</b>');
    L.marker([44.263300, 40.171900], {icon: lIcon}).addTo(this.Map).bindPopup('<b>Адыгея</b>');


    let line;
    let mark1;
    let mark2;
    const that = this;

    this.Map.on('zoom', function(): void {
      const Zoom = this.getZoom();

      if (Zoom > 7 && this.getBounds().contains(markerKh.getLatLng()) === true ) {
        mark1 = L.marker([67.8514528445585, 33.2602500994107], {icon: startIcon}).addTo(this).bindPopup('<b>Начало Маршрута</b>');
        mark2 = L.marker([67.8457310789751, 33.6799106592661], {icon: endIcon}).addTo(this).bindPopup('<b>Конец Маршрута</b>');
        console.log(this.getBounds().contains(mark1.getLatLng()));
        let coordinate = [];
        let coordinatesArray = [];
        that._mapService.getCoord().pipe(
            map(q => coordinate = q),
            tap(() => {
              coordinatesArray = Object.values(coordinate);
            }),
            tap(() => {
              line = L.polyline(coordinatesArray, {color: '#366578'});
              line.addTo(this);
            })
        ).subscribe();
      }

      if (Zoom < 7 && line !== undefined) {
        console.log('log');
        this.removeLayer(line);
        this.removeLayer(mark1);
        this.removeLayer(mark2);
      }
    });
  }


  change(event: MatRadioChange): void {
    switch (event.value) {
      case ('Топографическая карта'):
        this.mapStyleDefine(this.OpenTopoMap);
        break;
      case ('Географическая карта'):
        this.mapStyleDefine(this.OpenStreetMap);
        break;
    }
  }

  mapStyleDefine(mapStyle): void {
    L.tileLayer(mapStyle, {
      maxZoom: 19,
      attribution: 'Map data: &copy; <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | <br>Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }).addTo(this.Map);
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

}
