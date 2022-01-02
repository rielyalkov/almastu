import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MapEditorComponent} from './map-editor-component/map-editor.component';
import {MapEditorRoutingModule} from './map-editor-routing.module';
import {PlaceEditorComponent} from './place-editor/place-editor.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { EditPlaceDialogComponent } from './map-editor-component/edit-place-dialog/edit-place-dialog.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import { DeletePlaceDialogComponent } from './map-editor-component/delete-place-dialog/delete-place-dialog.component';

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
    MapEditorComponent,
    PlaceEditorComponent,
    EditPlaceDialogComponent,
    DeletePlaceDialogComponent,
  ]
})
export class MapEditorModule { }
