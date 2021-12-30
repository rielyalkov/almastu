import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Observable, of} from 'rxjs';
import {PlaceModel} from '../map-editor-component/map-editor.component';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {

  places: PlaceModel[];

  constructor(
    private db: AngularFirestore
  ) { }

  getPlaces(): Observable<any> {
    return this.db.collection('/places').valueChanges().pipe(
      tap((q) => console.log(q)),
      tap((q) => this.places = q)
    );
  }

  createNewPlace(newPlaceData): Observable<any> {

    // this.db.collection('/places').add(newPlaceData);
    return of(this.db.collection('/places').doc(String(this.places.length)).set(newPlaceData));
  }
}
