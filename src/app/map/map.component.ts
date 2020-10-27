import {AfterViewInit, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-draw';
import {MatRadioButton, MatRadioChange} from '@angular/material/radio';
import {MapService} from './mapService/map-service.service';
import {map, tap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import 'leaflet.polyline.snakeanim/L.Polyline.SnakeAnim.js';


export interface CoordModel {
  route: string;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, OnDestroy, AfterViewInit{

  // tslint:disable-next-line:variable-name
  constructor(private _mapService: MapService,
              private db: AngularFirestore,
) {
  }
  private Map;

  favoriteSeason = 'Географическая карта';
  seasons: string[] = ['Географическая карта', 'Топографическая карта'];

  OpenTopoMap = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
  OpenStreetMap = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  MarkerArray;
  markers;
  arrayOfAddedRoutes = [];

  layerIsCreated = false;

  routeColors = ['#D2691E', '#366578', '#B22222', '#006400'];






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
    this.MarkerArray = [
      [L.marker([67.734720, 33.726110], {icon: lIcon}).addTo(this.Map).bindPopup('<b>Хибины</b>')],
      [L.marker([55.259720, 59.792500], {icon: lIcon}).addTo(this.Map).bindPopup('<b>Таганай</b>')],
      [L.marker([43.345830, 42.448610], {icon: lIcon}).addTo(this.Map).bindPopup('<b>Эльбрус</b>')],
      [L.marker([56.949400, 32.838600], {icon: lIcon}).addTo(this.Map).bindPopup('<b>Верхневолжские озера</b>')],
      [L.marker([56.427395, 28.820091], {icon: lIcon}).addTo(this.Map).bindPopup('<b>Великая</b>')],
      [L.marker([67.500000, 66.000000], {icon: lIcon}).addTo(this.Map).bindPopup('<b>Полярный Урал</b>')],
      [L.marker([64.838539, 33.693727], {icon: lIcon}).addTo(this.Map).bindPopup('<b>Карелия</b>')],
      [L.marker([44.263300, 40.171900], {icon: lIcon}).addTo(this.Map).bindPopup('<b>Адыгея</b>')],
    ];

    // @ts-ignore
    L.polyline([[67.734720, 33.726110], [55.259720, 59.792500]], {color: '#B22222', snakingSpeed: 200}).addTo(this.Map).snakeIn();

    let line;
    let mark1;
    let mark2;
    const that = this;

    for (const aaa of this.MarkerArray) {
      aaa[0].on('click', (e) => {
        const Zoom = that.Map.getZoom();
        console.log(e);
        // @ts-ignore
        that.Map.setView(e.latlng, 9);
      });
    }



    this.Map.on('zoom', function(): void {
      const Zoom = this.getZoom();
      for (let i = 0; i < that.MarkerArray.length; i++) {
        if (Zoom >= 9 && this.getBounds().contains(that.MarkerArray[i][0].getLatLng()) && that.layerIsCreated === false) {
          let routesArrays = [];
          let coordinatesArray = [];
          that._mapService.getCoord(i).pipe(
            map(q => routesArrays = q),
            tap(() => {
              for (let j = 0; j < routesArrays.length; j++) {
                coordinatesArray = Object.values(routesArrays[j]);

                // @ts-ignore
                line = L.polyline(coordinatesArray, {color: that.routeColors[j], snakingSpeed: 200});
                line.bindPopup('<b>Маршрут</b>');

                mark1 = L.marker(coordinatesArray[0], {icon: startIcon});
                if (coordinatesArray[0][2]) {
                  mark1.bindPopup(`${coordinatesArray[0][2]}`);
                } else {
                  mark1.bindPopup('<b>Начало Маршрута</b>');
                }

                mark2 = L.marker(coordinatesArray[coordinatesArray.length - 1], {icon: endIcon})
                  .bindPopup('<b>Конец Маршрута</b>');

                console.log(this.getBounds().contains(mark1.getLatLng()));

                that.markers = L.layerGroup([line, mark1, mark2]);

                for (let k = 1; k < coordinatesArray.length; k++) {
                  if (coordinatesArray[k][2]) {
                    const point = L.marker(coordinatesArray[k], {icon: lIcon}).bindPopup(`<b>${coordinatesArray[k][2]}</b>`);
                    that.markers.addLayer(point);
                    console.log(coordinatesArray[k][2]);
                  }
                }

                that.arrayOfAddedRoutes.push(that.markers);

                this.addLayer(that.markers).snakeIn();
              }
              that.layerIsCreated = true;
            })
          ).subscribe();
        } else if (Zoom < 8 && that.layerIsCreated === true) {
          for (const addedRoute of that.arrayOfAddedRoutes) {
            addedRoute.remove();
          }
          that.layerIsCreated = false;
        }
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
