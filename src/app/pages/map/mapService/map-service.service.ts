import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private db: AngularFirestore) {
  }

  makeArray(): void {
    const route = [];

    // route.map((q, i) => {
    //     this.db.collection('/coordinates').doc('/Karelia').collection('/routes').doc('/1').update({[i]: q});
    // });
  }

  getCoord(PathNumber: number): Observable<any> {

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
      case 2: {
        const coord = this.db.collection('/coordinates')
          .doc('/Elbrus')
          .collection('/routes')
          .valueChanges();
        return coord.pipe();
      }
      case 6: {
        const coord = this.db.collection('/coordinates')
          .doc('/Karelia')
          .collection('/routes')
          .valueChanges();
        return coord.pipe();
      }
    }
  }

}
