import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

import { IProfile } from '../interfaces';

@Injectable()
export class ProfilesService {
  private _mentors: Observable<any[]>;
  private _organizers: Observable<any[]>;
  private _speakers: Observable<any[]>;

  constructor(private _fbDB: AngularFireDatabase) {
    this._mentors = this._fbDB.list('mentors', ref => ref.orderByChild('name'))
      .snapshotChanges().map(changes => changes.map((c) => ({ $key: c.payload.key, ...c.payload.val() })));
    this._organizers = this._fbDB.list('organizers', ref => ref.orderByChild('name'))
      .snapshotChanges().map(changes => changes.map((c) => ({ $key: c.payload.key, ...c.payload.val() })));
    this._speakers = this._fbDB.list('speakers', ref => ref.orderByChild('name'))
      .snapshotChanges().map(changes => changes.map((c) => ({ $key: c.payload.key, ...c.payload.val() })));
  }

  get mentors(): Observable<any[]> {
    return this._mentors;
  }

  get organizers(): Observable<any[]> {
    return this._organizers;
  }

  get topics(): Observable<any[]> {
    return this._fbDB.list('topics')
      .snapshotChanges().map(changes => changes.map((c) => ({ $key: c.payload.key, topic: c.payload.val() })));
  }

  get speakers(): Observable<any[]> {
    return this._speakers;
  }

  public findById(id: string): Observable<IProfile> {
    return this._fbDB.object('/profiles/' + id).valueChanges().map((event: any) => ({ $key: id, ...event }));
  }
}
