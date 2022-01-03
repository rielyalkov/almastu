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

  getRouteMap(): Observable<any> {
    return this.db.collection('/coordinates')
      .doc('/Karelia')
      .collection('/routes')
      .valueChanges();
  }
 }
