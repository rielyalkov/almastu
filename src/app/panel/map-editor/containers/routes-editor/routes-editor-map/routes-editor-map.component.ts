import {ChangeDetectionStrategy, Component, Inject, Input, OnInit} from '@angular/core';
import {PlaceModel} from '../../edit-places-table/edit-places-table.component';
import {RouteModel} from '../routes-editor-table/routes-editor-table.component';
import {OSM_CONFIG, OsmConfig} from '../../../../../osm-config/osm.config';
import * as L from 'leaflet';

@Component({
  selector: 'app-routes-editor-map',
  templateUrl: './routes-editor-map.component.html',
  styleUrls: ['./routes-editor-map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutesEditorMapComponent implements OnInit {

  @Input() public placeData: [RouteModel[], PlaceModel];

  private map: L.Map;

  constructor(
    @Inject(OSM_CONFIG) public osmConfig: OsmConfig,
  ) { }

  ngOnInit(): void {
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

}
