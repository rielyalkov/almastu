import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(
    private db: AngularFirestore
  ) { }

  getPlace(id: string): Observable<any> {
    return this.db.collection('/places').doc(`/${id}`).valueChanges();
  }

  getPlaceCoordinatesData(id: string): Observable<any> {
    return this.db.collection('/coordinates')
      .doc(`/${id}`).collection('/routes').valueChanges();
  }
 }
