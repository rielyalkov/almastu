import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {from, Observable, Subject} from 'rxjs';
import {PlaceModel} from '../containers/edit-places-table/edit-places-table.component';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {

  private isCreatingSubject: Subject<boolean> = new Subject<boolean>();
  public isCreating$: Observable<boolean>;

  places: PlaceModel[];


  constructor(
    private db: AngularFirestore
  ) {
    this.isCreatingSubject.next(false);
    this.isCreating$ = this.isCreatingSubject.asObservable();
  }

  getPlaces(): Observable<any> {
    return this.db.collection('/places').valueChanges({idField: 'docId'}).pipe(
      tap((q) => this.places = q)
    );
  }

  createNewPlace(newPlaceData: PlaceModel): Observable<any> {
    this.isCreatingSubject.next(true);
    return from(
      this.db.collection('/places').doc(String(newPlaceData.id)).set(newPlaceData)
    ).pipe(
        tap(() => this.isCreatingSubject.next(false))
      );
  }

  deletePlace(docId: string): Observable<any> {
    return from(
      this.db.collection('/places').doc(docId).delete()
    );
  }
}
