import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './pages/about/about.component';
import { MainPageComponent } from './main-page/main-page.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { AuxiliaryComponent } from './auxiliary/auxiliary.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: '',
    component: AuxiliaryComponent,
    children: [
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'map',
        loadChildren: () => import('./pages/map/map.module').then(m => m.MapModule)
      },
      {
        path: 'gallery',
        component: GalleryComponent
      },
      {
        path: 'contacts',
        component: ContactsComponent
      },
      ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap:    [ AppComponent ]
})
export class AppRoutingModule { }
