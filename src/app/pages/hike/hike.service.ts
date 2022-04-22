import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HikeDoc } from './hike-doc';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HikeService {

  constructor(private afs: AngularFirestore) {
  }

  public getHikeInfo(name: string): Observable<HikeDoc> {
    return this.afs.doc<HikeDoc>('hikes/' + name).valueChanges();
  }
}
