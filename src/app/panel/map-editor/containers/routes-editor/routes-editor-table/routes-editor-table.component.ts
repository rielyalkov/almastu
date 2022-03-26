import {ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {PlaceModel} from '../../edit-places-table/edit-places-table.component';
import * as L from 'leaflet';
import 'leaflet-draw';
import {OSM_CONFIG, OsmConfig} from '../../../../../osm-config/osm.config';
import {MatTableDataSource} from '@angular/material/table';

export interface RouteModel {
  polylineArray: {};
  color: string;
}

@Component({
  selector: 'app-routes-editor-table',
  templateUrl: './routes-editor-table.component.html',
  styleUrls: ['./routes-editor-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutesEditorTableComponent implements OnInit {

  @Input() public placeData: [RouteModel[], PlaceModel];

  @Output() public addRoute: EventEmitter<[RouteModel[], PlaceModel]>
    = new EventEmitter<[RouteModel[], PlaceModel]>();

  public routes = new MatTableDataSource<RouteModel>();
  public displayedColumns: string[] = ['number', 'year', 'color', 'firstLatLng', 'edit'];

  constructor() { }

  ngOnInit(): void {
    this.routes = new MatTableDataSource(this.placeData[0]);
  }

  // TODO
  editRoute(element: any): void {

  }

  // TODO
  deleteRoute(element: any): void {

  }
}
