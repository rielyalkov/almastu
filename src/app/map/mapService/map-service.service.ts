import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

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
    //     this.db.collection('/coordinates').doc('/Khibiny').update({[i]: q});
    // });


    switch (PathNumber) {
      case 0:
        const coord0 = this.db.collection('/coordinates').doc('/Khibiny').valueChanges();
        return coord0.pipe();
      case 2:

    }


  }

}
