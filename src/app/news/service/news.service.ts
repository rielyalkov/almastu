import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { format_date } from '../../../scripts/date_formatter';
import { Observable } from 'rxjs';

export function fd(date: any): string {
  return format_date(new Date(date.seconds * 1000));
}

export interface News {
  name: string;
  imageUrl?: string;
  time: Date;
  html: string;
  ID: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private afs: AngularFirestore) {
  }

  getCollection(): Observable<News[]> {
    return this.afs.collection<News>('news', ref => ref.orderBy('time', 'desc')).valueChanges({idField: 'ID'});
  }

  docData(id): Observable<News> {
    return this.afs.doc<News>('news/' + id).valueChanges();
  }

  deleteDoc(id): Promise<void> {
    return this.afs.doc('news/' + id).delete();
  }
}
