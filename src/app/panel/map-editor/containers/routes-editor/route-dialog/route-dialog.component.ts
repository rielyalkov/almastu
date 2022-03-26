import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PlaceModel} from '../../edit-places-table/edit-places-table.component';
import * as L from 'leaflet';
import 'leaflet-draw';
import './../../../../../pages/map/Leaflet.Fullscreen.js';
import {OSM_CONFIG, OsmConfig} from '../../../../../osm-config/osm.config';
import {RouteModel} from '../routes-editor-table/routes-editor-table.component';

@Component({
  selector: 'app-route-dialog',
  templateUrl: './route-dialog.component.html',
  styleUrls: ['./route-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteDialogComponent implements OnInit {

  private map: L.Map;

  constructor(
    @Inject(MAT_DIALOG_DATA) public placeData: [RouteModel[], PlaceModel],
    @Inject(OSM_CONFIG) public osmConfig: OsmConfig,
  ) { }

  ngOnInit(): void {
    // @ts-ignore
    this.map = L.map('editRoute', {drawControl: true, fullscreenControl: true}).setView(
      [
        this.placeData[1].latlng.latitude,
        this.placeData[1].latlng.longitude,
      ], this.placeData[1].scale);

    L.tileLayer(this.osmConfig.urlTemplate, {
      maxZoom: this.osmConfig.maxZoom,
      attribution: this.osmConfig.attribution
    }).addTo(this.map);

    const drawnItems = L.featureGroup().addTo(this.map);

    // @ts-ignore
    this.map.on(L.Draw.Event.CREATED, (e) => {
      const layer = e.layer;
      drawnItems.addLayer(layer);
      console.log(layer.getLatLngs());
    });

    // @ts-ignore
    // console.log(this.map.getToolbars());

    // setTimeout(() => console.log(beingDrawn), 5000);
  }

}
