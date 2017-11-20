import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class OrganizationsService {
  private _organizations: Observable<any[]>;

  constructor(private _fbDB: AngularFireDatabase) {
    this._organizations = this._fbDB.list('organizations', ref => ref.orderByChild('name'))
      .snapshotChanges().map(changes => changes.map((c) => ({ $key: c.payload.key, ...c.payload.val() })));
  }

  get organizations(): Observable<any[]> {
    return this._organizations;
  }
}
