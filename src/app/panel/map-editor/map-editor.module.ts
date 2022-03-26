import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditPlacesTableComponent} from './containers/edit-places-table/edit-places-table.component';
import {MapEditorRoutingModule} from './map-editor-routing.module';
import {RoutesEditorContainerComponent} from './containers/routes-editor/routes-editor-container.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { EditPlaceDialogComponent } from './containers/edit-places-table/edit-place-dialog/edit-place-dialog.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import { DeletePlaceDialogComponent } from './containers/edit-places-table/delete-place-dialog/delete-place-dialog.component';
import { MapEditorRootComponent } from './map-editor-root/map-editor-root.component';
import { RoutesEditorTableComponent } from './containers/routes-editor/routes-editor-table/routes-editor-table.component';
import { RoundCoordinatesPipe } from './shared/round-coordinates.pipe';
import { RoutesEditorMapComponent } from './containers/routes-editor/routes-editor-map/routes-editor-map.component';
import { NewRouteDialogComponent } from './containers/routes-editor/new-route-dialog/new-route-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MapEditorRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    LeafletModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  declarations: [
    EditPlacesTableComponent,
    RoutesEditorContainerComponent,
    EditPlaceDialogComponent,
    DeletePlaceDialogComponent,
    MapEditorRootComponent,
    RoutesEditorTableComponent,
    RoundCoordinatesPipe,
    RoutesEditorMapComponent,
    NewRouteDialogComponent,
  ]
})
export class MapEditorModule { }
