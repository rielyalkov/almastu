import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MapEditorComponent} from './map-editor-component/map-editor.component';
import {PlaceEditorComponent} from './place-editor/place-editor.component';

const routes: Routes = [
  {
    path: '',
    component: MapEditorComponent,
  },
  {
    path: '/place/:id',
    component: PlaceEditorComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class MapEditorRoutingModule { }
