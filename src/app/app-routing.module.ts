import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { AppComponent } from './app.component';
import { AboutComponent } from './pages/about/about.component';
import { MainPageComponent } from './main-page/main-page.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { AuxiliaryComponent } from './auxiliary/auxiliary.component';
import { LoginComponent } from './login/login.component';
import { PanelComponent } from './panel/panel.component';
import { Page404Component } from './page404/page404.component';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';
import { NewsEditorComponent } from './panel/news-editor/news-editor.component';
import { PanelMainComponent } from './panel/panel-main/panel-main.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToPanel = () => redirectLoggedInTo(['panel']);


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
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectLoggedInToPanel}
  },
  {
    path: 'panel',
    component: PanelMainComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin},
  },
  {
    path: 'panel',
    component: PanelComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin},
    children: [
      {
        path: 'editor',
        component: NewsEditorComponent
      },
      {
        path: 'map-editor',
        loadChildren: () => import('./panel/map-editor/map-editor.module').then(m => m.MapEditorModule)
      }
    ]
  },
  {
    path: 'news/:id',
    component: NewsDetailComponent
  },
  {
    path: '**',
    component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppRoutingModule {
}
