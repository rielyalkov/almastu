import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private db: AngularFirestore) {
  }

  getPlaces(): Observable<any> {
    return this.db.collection('/places').valueChanges();
  }

  getCoord(PathNumber: number): Observable<any> {
    return  this.db.collection('/coordinates')
      .doc(`/${PathNumber}`)
      .collection('/routes')
      .valueChanges();
  }

}
