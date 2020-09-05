import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { MainPageComponent } from './main-page/main-page.component';


const routes: Routes = [
  { 
    path: '',
    component: MainPageComponent
  },
  { 
    path: 'about',
    component: AboutComponent
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap:    [ AppComponent ]
})
export class AppRoutingModule { }
