import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapService {


  constructor(private db: AngularFirestore) {
  }

  getCoord(PathNumber: number): Observable<any> {

    console.log(PathNumber);
    const route = [

    ];
    // route.map((q, i) => {
    //     this.db.collection('/coordinates').doc('/Taganay').collection('/routes').doc('/1').update({[i]: q});
    // });


    switch (PathNumber) {
      case 0: {
        const coord = this.db.collection('/coordinates')
          .doc('/Khibiny')
          .collection('/routes')
          .valueChanges();
        return coord.pipe();
      }
      case 1: {
        const coord = this.db.collection('/coordinates')
          .doc('/Taganay')
          .collection('/routes')
          .valueChanges();
        return coord.pipe();
      }
    }


  }

}
