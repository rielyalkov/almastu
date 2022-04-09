import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map-component/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MapDetailComponent } from './map-detail/map-detail.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    MapComponent,
    MapDetailComponent,
  ],
  imports: [
    CommonModule,
    LeafletModule,
    MatRadioModule,
    FormsModule,
    MapRoutingModule,
    MatProgressBarModule
  ]
})
export class MapModule {
}
