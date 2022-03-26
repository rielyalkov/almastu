import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditPlacesTableComponent} from './containers/edit-places-table/edit-places-table.component';
import {RoutesEditorContainerComponent} from './containers/routes-editor/routes-editor-container.component';
import {MapEditorRootComponent} from './map-editor-root/map-editor-root.component';

const routes: Routes = [
  {
    path: '',
    component: MapEditorRootComponent,
    children: [
      {
        path: '',
        component: EditPlacesTableComponent
      },
      {
        path: 'place/:id',
        component: RoutesEditorContainerComponent
      }
    ]
  },
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
