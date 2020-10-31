import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map-component/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MapComponent,
  ],
  imports: [
    CommonModule,
    LeafletModule,
    MatRadioModule,
    FormsModule,
    MapRoutingModule
  ]
})
export class MapModule { }
