import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private db: AngularFirestore) {
  }

  getCoord(): Observable<any> {


    const route = [
  ];

    // route.map((q, i) => {
    //     this.db.collection('/coordinates').doc('/Khibiny').update({[i]: q});
    // });


    const coord1 = this.db.collection('/coordinates').doc('/Khibiny').valueChanges();
    return coord1.pipe();

  }

}
