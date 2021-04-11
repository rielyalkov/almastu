import { Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-draw';
import { MatRadioChange } from '@angular/material/radio';
import { MapService } from '../mapService/map-service.service';
import { map, takeUntil, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import 'leaflet.polyline.snakeanim/L.Polyline.SnakeAnim.js';
import '../Leaflet.Fullscreen.js';
import { Subject } from 'rxjs';
import * as values from '../MapDefinedValues';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, OnDestroy{

  // tslint:disable-next-line:variable-name
  constructor(private _mapService: MapService,
              private db: AngularFirestore,
              ) {}

  private Map;

  selectedMap = 'Географическая карта';
  seasons: string[] = ['Географическая карта', 'Топографическая карта'];

  OpenTopoMap = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
  OpenStreetMap = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  MarkerArray;
  markers;
  arrayOfAddedRoutes = [];

  layerIsCreated = false;

  routeColors = ['#D2691E', '#366578', '#B22222', '#006400'];

  private $destroy = new Subject<boolean>();

  ngOnInit(): void {

    document.getElementById('mapHTML').innerHTML =
      '<div id=\'map\' style=\'height: 500px; border-radius: 4px; position: relative; z-index: 500\' leaflet></div>';

    // @ts-ignore
    this.Map = L.map('map', {drawControl: false, fullscreenControl: true}).setView([60.000, 100.000], 3);

    this.mapStyleDefine(this.OpenStreetMap);
    this.MarkerArray = [
      [L.marker([67.734720, 33.726110], {icon: values.lIcon}).addTo(this.Map).bindPopup('<b>Хибины</b>')], // 0
      [L.marker([55.259720, 59.792500], {icon: values.lIcon}).addTo(this.Map).bindPopup('<b>Таганай</b>')], // 1
      [L.marker([43.345830, 42.448610], {icon: values.lIcon}).addTo(this.Map).bindPopup('<b>Эльбрус</b>')], // 2
      [L.marker([56.949400, 32.838600], {icon: values.lIcon}).addTo(this.Map).bindPopup('<b>Верхневолжские озера</b>')], // 3
      [L.marker([56.427395, 28.820091], {icon: values.lIcon}).addTo(this.Map).bindPopup('<b>Великая</b>')], // 4
      [L.marker([67.500000, 66.000000], {icon: values.lIcon}).addTo(this.Map).bindPopup('<b>Полярный Урал</b>')], // 5
      [L.marker([66.114073, 32.439454], {icon: values.lIcon}).addTo(this.Map).bindPopup('<b>Карелия Север</b>')], // 6
      [L.marker([64.838539, 33.693727], {icon: values.lIcon}).addTo(this.Map).bindPopup('<b>Карелия Центр</b>')], // 7
      [L.marker([62.867714, 33.215538], {icon: values.lIcon}).addTo(this.Map).bindPopup('<b>Карелия Юг</b>')], // 8
      [L.marker([44.263300, 40.171900], {icon: values.lIcon}).addTo(this.Map).bindPopup('<b>Адыгея</b>')], // 9
    ];

    for (const aaa of this.MarkerArray) {
      aaa[0].on('click', (e) => {
        const Zoom = that.Map.getZoom();
        console.log(e);
        // @ts-ignore
        that.Map.setView(e.latlng, 9);
      });
    }

    const that = this;

    this.Map.on('zoom', function(): void {
      const Zoom = this.getZoom();
      for (let i = 0; i < that.MarkerArray.length; i++) {
        if (Zoom >= 9 && this.getBounds().contains(that.MarkerArray[i][0].getLatLng()) && that.layerIsCreated === false) {

          that.buildRoutesMarkers(i);

        } else if (Zoom < 8 && that.layerIsCreated === true) {
          for (const addedRoute of that.arrayOfAddedRoutes) {
            addedRoute.remove();
          }
          that.layerIsCreated = false;
        }
      }
    });
  }

  buildRoutesMarkers(i): void {
    let routesArrays = [];
    let coordinatesArray = [];
    this._mapService.getCoord(i).pipe(
      takeUntil(this.$destroy),
      map(q => routesArrays = q),
      tap(() => {
        for (let j = 0; j < routesArrays.length; j++) {
          coordinatesArray = Object.values(routesArrays[j]);

          // @ts-ignore
          const line = L.polyline(coordinatesArray, {color: this.routeColors[j], snakingSpeed: 200});
          line.bindPopup('<b>Маршрут</b>');

          const markFirst = L.marker(coordinatesArray[0], {icon: values.startIcon});
          if (coordinatesArray[0][2]) {
            markFirst.bindPopup(`${coordinatesArray[0][2]}`);
          } else {
            markFirst.bindPopup('<b>Начало Маршрута</b>');
          }

          const markLast = L.marker(coordinatesArray[coordinatesArray.length - 1], {icon: values.endIcon})
            .bindPopup('<b>Конец Маршрута</b>');

          console.log(this.Map.getBounds().contains(markFirst.getLatLng()));

          this.markers = L.layerGroup([markFirst, line, markLast]);

          for (let k = 1; k < coordinatesArray.length; k++) {
            if (coordinatesArray[k][2]) {
              const point = L.marker(coordinatesArray[k], {icon: values.tentIcon}).bindPopup(`<b>${coordinatesArray[k][2]}</b>`);
              this.markers.addLayer(point);
              console.log(coordinatesArray[k][2]);
            }
          }

          this.arrayOfAddedRoutes.push(this.markers);
          this.markers.addTo(this.Map).snakeIn();
        }
        this.layerIsCreated = true;
      })
    ).subscribe();
  }

  changeMapStyle(event: MatRadioChange): void {
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

  ngOnDestroy(): void {
    this.$destroy.next(true);
  }
}
