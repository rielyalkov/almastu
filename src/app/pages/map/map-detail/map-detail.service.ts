import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import MapDoc from './map-doc';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapDetailService {

  constructor(private afs: AngularFirestore) {
  }

  public getRouteInfo(id: string): Observable<MapDoc> {
    return this.afs.doc<MapDoc>('places/' + id).valueChanges();
  }
}
