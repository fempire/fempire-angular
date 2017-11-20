import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import 'rxjs/add/operator/first';

import { UserService } from './user.service';
import { IUser } from '../interfaces';

@Injectable()
export class ApplicationsService {
  private _applicationsRef: AngularFireList<any>;

  constructor(private _fbDB: AngularFireDatabase, private _us: UserService) {
    this._applicationsRef = this._fbDB.list('/applications');
  }

  public insert(type: string, callback?: any): void {
    this._us.user.first().subscribe((user: IUser) => {
      if (!user) { callback(new Error('No user found'), null); }
      this._applicationsRef.push({
        type: type,
        uid: user.uid,
        approved: false
      }).then(() => callback(null, 'Your application has been submitted!'), (error: any) => callback(new Error(error), null));
    });
  }
}
