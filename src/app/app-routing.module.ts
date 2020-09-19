import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MapComponent } from './map/map/map.component';
import { GalleryComponent } from './gallery/gallery/gallery.component';
import { ContactsComponent } from './contacts/contacts.component';


const routes: Routes = [
  { 
    path: '',
    component: MainPageComponent
  },
  { 
    path: 'about',
    component: AboutComponent
  },
  { 
    path: 'map',
    component: MapComponent
  },
  { 
    path: 'gallery',
    component: GalleryComponent
  },
  { 
    path: 'contacts',
    component: ContactsComponent
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap:    [ AppComponent ]
})
export class AppRoutingModule { }
