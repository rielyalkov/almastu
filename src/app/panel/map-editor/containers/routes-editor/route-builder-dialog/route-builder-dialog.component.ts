import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PlaceModel} from '../../edit-places-table/edit-places-table.component';
import * as L from 'leaflet';
import 'leaflet-draw';
import './../../../../../pages/map/Leaflet.Fullscreen.js';
import {OSM_CONFIG, OsmConfig} from '../../../../../osm-config/osm.config';
import {RouteModel} from '../routes-editor-table/routes-editor-table.component';

@Component({
  selector: 'app-route-builder-dialog',
  templateUrl: './route-builder-dialog.component.html',
  styleUrls: ['./route-builder-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteBuilderDialogComponent implements OnInit {

  private map: L.Map;

  constructor(
    @Inject(MAT_DIALOG_DATA) public placeData: [RouteModel[], PlaceModel],
    @Inject(OSM_CONFIG) public osmConfig: OsmConfig,
  ) { }

  ngOnInit(): void {
    // @ts-ignore
    this.map = L.map('editRoute', {fullscreenControl: true}).setView(
      [
        this.placeData[1].latlng.latitude,
        this.placeData[1].latlng.longitude,
      ], this.placeData[1].scale);

    L.tileLayer(this.osmConfig.urlTemplate, {
      maxZoom: this.osmConfig.maxZoom,
      attribution: this.osmConfig.attribution
    }).addTo(this.map);

    const drawnItems = L.featureGroup().addTo(this.map);
    this.map.addLayer(drawnItems);

    // @ts-ignore
    const drawControl = new L.Control.Draw({
      draw: {
        polyline: {
          shapeOptions: {
            color: '#000',
            weight: 4
          }
        },
        polygon: false,
        marker: false,
        rectangle: false,
        circle: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: drawnItems,
        remove: true
      },
    });
    this.map.addControl(drawControl);

    // @ts-ignore
    new L.Draw.Polyline(this.map, drawControl.options.draw.polyline).enable();

    // @ts-ignore
    this.map.on(L.Draw.Event.CREATED, (e) => {
      const layer = e.layer;
      drawnItems.addLayer(layer);

      // @ts-ignore
      new L.Draw.Polyline(this.map, drawControl.options.draw.polyline).disable();
    });

    // @ts-ignore
    this.map.on('click', (e) => {
      // @ts-ignore
      this.map.setView(e.latlng, this.map.getZoom());
    });
  }

}
