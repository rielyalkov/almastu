import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
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
import {OSM_CONFIG, OsmConfig} from '../../../osm-config/osm.config';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, OnDestroy {

  constructor(
    // tslint:disable-next-line:variable-name
    private _mapService: MapService,
    @Inject(OSM_CONFIG) public osmConfig: OsmConfig
  ) {
  }

  private Map: L.Map;

  selectedMap = 'Географическая карта';
  seasons: string[] = ['Географическая карта', 'Топографическая карта'];

  OpenTopoMap = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
  OpenStreetMap = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  MarkerArray;
  markers: LayerGroup;
  arrayOfAddedRoutes = [];

  currentMarker;

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

            this.markers = L.layerGroup([markFirst, line, markLast]);

            for (let k = 1; k < coordinatesArray.length; k++) {
              if (coordinatesArray[k][2]) {
                const point = L.marker(coordinatesArray[k], {icon: values.tentIcon}).bindPopup(`<b>${coordinatesArray[k][2]}</b>`);
                this.markers.addLayer(point);
              }
            }

            if (this.Map.getZoom() > 8) {
              this.markers.addTo(this.Map)
              // @ts-ignore
              .snakeIn();
            } else {
              this.markers.addTo(this.Map);
            }

            this.arrayOfAddedRoutes.push(this.markers);

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
      maxZoom: this.osmConfig.maxZoom,
      attribution: this.osmConfig.attribution
    }).addTo(this.Map);
  }

  ngOnDestroy(): void {
    this.$destroy.next(true);
  }

  putPlaceMarkers(places): void {
    this.MarkerArray = [];
    places.forEach((place, index) => {
      this.MarkerArray.push({
        // TODO костыль! получать имя документа и класть сюда
        index,
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

      that.MarkerArray.forEach((marker) => {
        if (this.getBounds().contains(marker.marker.getLatLng())) {
          this.currentMarker = marker;
        }
      });

      if (
        Zoom >= this.currentMarker.scale &&
        this.getBounds().contains(this.currentMarker.marker.getLatLng()) &&
        that.layerIsCreated === false
      ) {
        that.buildRoutesMarkers(this.currentMarker.index);
      } else if (Zoom < this.currentMarker.scale && that.layerIsCreated === true) {
        for (const addedRoute of that.arrayOfAddedRoutes) {
          addedRoute.remove();
        }
        that.arrayOfAddedRoutes = [];
        that.layerIsCreated = false;
      }
    });
  }
}
