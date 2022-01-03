import {ChangeDetectionStrategy, Component, Inject, Input, OnInit} from '@angular/core';
import {PlaceModel} from '../../map-editor-component/map-editor.component';
import * as L from 'leaflet';
import 'leaflet-draw';
import {OSM_CONFIG, OsmConfig} from '../../../../osm-config/osm.config';
import {MatTableDataSource} from '@angular/material/table';

export interface RouteModel {
  polylineArray: {};
  color: string;
}

@Component({
  selector: 'app-place-routes-editor-component',
  templateUrl: './place-routes-editor.component.html',
  styleUrls: ['./place-routes-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceRoutesEditorComponent implements OnInit {

  @Input() public placeData: [RouteModel[], PlaceModel];

  private map: L.Map;

  public routes = new MatTableDataSource<RouteModel>();
  public displayedColumns: string[] = ['number', 'year', 'color', 'firstLatLng', 'edit'];

  constructor(
    @Inject(OSM_CONFIG) public osmConfig: OsmConfig,
  ) { }

  ngOnInit(): void {
    this.routes = new MatTableDataSource(this.placeData[0]);
    this.map = L.map('mapPlaceEditor').setView(
      [
        this.placeData[1].latlng.latitude,
        this.placeData[1].latlng.longitude,
      ], this.placeData[1].scale);

    L.tileLayer(this.osmConfig.urlTemplate, {
      maxZoom: this.osmConfig.maxZoom,
      attribution: this.osmConfig.attribution
    }).addTo(this.map);

    this.placeData[0].forEach((route: RouteModel) => {
      const routePolylineCoordinates = Object.values(route.polylineArray);
      // @ts-ignore
      L.polyline(routePolylineCoordinates, {color: '#000000'}).addTo(this.map);
    });
  }

  // TODO
  editRoute(element: any): void {

  }

  // TODO
  deleteRoute(element: any): void {

  }
}
