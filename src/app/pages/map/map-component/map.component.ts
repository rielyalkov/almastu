import { Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-draw';
import { MatRadioChange } from '@angular/material/radio';
import { MapService } from '../mapService/map-service.service';
import { map, takeUntil, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'leaflet.polyline.snakeanim/L.Polyline.SnakeAnim.js';
import '../Leaflet.Fullscreen.js';
import { Subject } from 'rxjs';
import * as values from '../MapDefinedValues';
import {LayerGroup} from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line:variable-name
  constructor(private _mapService: MapService) {
  }

  private Map;

  selectedMap = 'Географическая карта';
  seasons: string[] = ['Географическая карта', 'Топографическая карта'];

  OpenTopoMap = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
  OpenStreetMap = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  MarkerArray;
  markers: LayerGroup;
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

    this._mapService.getPlaces()
      .pipe(takeUntil(this.$destroy))
      .subscribe((places) => this.putPlaceMarkers(places));
  }

  buildRoutesMarkers(i): void {
    let routesArrays = [];
    let coordinatesArray = [];
    try {
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
            // @ts-ignore
            this.markers.addTo(this.Map).snakeIn();
          }
          this.layerIsCreated = true;
        })
      ).subscribe();
    } catch (e) {
    }
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
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | <br>Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }).addTo(this.Map);
  }

  ngOnDestroy(): void {
    this.$destroy.next(true);
  }

  putPlaceMarkers(places): void {
    this.MarkerArray = [];
    places.forEach((place) => {
      this.MarkerArray.push({
        scale: place.scale,
        marker: L.marker([place.latlng._lat, place.latlng._long], {icon: values.lIcon})
            .addTo(this.Map)
            .bindPopup(`<b>${place.name}</b>`)
            .on('click',
              (event) => {
                // @ts-ignore
                this.Map.setView(event.latlng, place.scale);
              })
      });
    });

    this.setZoomSettings();
  }

  setZoomSettings(): void {
    const that = this;
    this.Map.on('zoom', function(): void {
      const Zoom = this.getZoom();
      for (let i = 0; i < that.MarkerArray.length; i++) {
        if (
          Zoom >= that.MarkerArray[i].scale &&
          this.getBounds().contains(that.MarkerArray[i].marker.getLatLng()) &&
          that.layerIsCreated === false
        ) {
          that.buildRoutesMarkers(i);

        } else if (Zoom < that.MarkerArray[i].scale - 1 && that.layerIsCreated === true) {
          for (const addedRoute of that.arrayOfAddedRoutes) {
            addedRoute.remove();
          }
          that.layerIsCreated = false;
        }
      }
    });
  }
}
