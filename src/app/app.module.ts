import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AboutComponent } from './pages/about/about.component';
import { MainPageComponent } from './main-page/main-page.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { SongComponent } from './pages/about/song/song.component';
import { LogotypeComponent } from './pages/about/logotype/logotype.component';
import { DevizComponent } from './pages/about/deviz/deviz.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AuxiliaryComponent } from './auxiliary/auxiliary.component';
import { LoginComponent } from './login/login.component';
import { PanelComponent } from './panel/panel.component';
import { Page404Component } from './page404/page404.component';
import { EditorInsertDialogComponent, EditorSheetComponent, NewsEditorComponent } from './panel/news-editor/news-editor.component';
import { NewsComponent } from './news/news.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';
import { MatRippleModule } from '@angular/material/core';
import { PanelMainComponent } from './panel/panel-main/panel-main.component';

const config = {
  apiKey: 'AIzaSyBwqVV9pM18yGSNPULLYsJjqI-tnkMxAb0',
  authDomain: 'almastu-dmd.firebaseapp.com',
  databaseURL: 'https://almastu-dmd.firebaseio.com',
  projectId: 'almastu-dmd',
  storageBucket: 'almastu-dmd.appspot.com',
  messagingSenderId: '772128718738',
  appId: '1:772128718738:web:e7b649388f01b2a6f14b4b',
  measurementId: 'G-S87ZV7E6S7'
};

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    MainPageComponent,
    GalleryComponent,
    ContactsComponent,
    SongComponent,
    LogotypeComponent,
    DevizComponent,
    AuxiliaryComponent,
    LoginComponent,
    PanelComponent,
    Page404Component,
    NewsEditorComponent,
    NewsComponent,
    EditorSheetComponent,
    EditorInsertDialogComponent,
    NewsDetailComponent,
    PanelMainComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSliderModule,
        CommonModule,
        BrowserAnimationsModule,
        MatCheckboxModule,
        MatCheckboxModule,
        MatButtonModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatRadioModule,
        MatSelectModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatMenuModule,
        MatSidenavModule,
        MatBadgeModule,
        MatToolbarModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatStepperModule,
        MatTabsModule,
        MatExpansionModule,
        MatButtonToggleModule,
        MatChipsModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatDialogModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        FormsModule,
        AngularFireModule.initializeApp(config),
        AngularFirestoreModule, // firestore,
        AngularFireAnalyticsModule, // analytics
        AngularFireAuthModule, // auth
        AngularFireStorageModule,
        MatRippleModule
    ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatBadgeModule,
    MatListModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatChipsModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule
],
  providers: [
    MatDatepickerModule,
    MatBottomSheet,
    // {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
