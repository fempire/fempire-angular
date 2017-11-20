import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import 'rxjs/add/operator/first';

import { IUser, IProfileUpdate } from '../interfaces';

@Injectable()
export class UserService {
  private _user: Observable<IUser>;

  constructor(private _fbAuth: AngularFireAuth, private _fbDB: AngularFireDatabase) {
    this._user = this._fbAuth.authState;
  }

  get user(): Observable<IUser> {
    return this._user;
  }

  private _signIn(provider: any, callback?: any): void {
    this._fbAuth.auth.signInWithPopup(provider).then((result: any) => {
      if (callback) { callback(null, result); }
    }).catch((error: Error) => {
      if (callback) { callback(error, null); }
    });
  }

  public signInGitHub(callback?: any): void {
    const provider = new firebase.auth.GithubAuthProvider();
    this._signIn(provider, (error: Error, result: any) => {
      if (callback) { callback(error, result); }
    });
  }

  public signInGoogle(callback?: any): void {
    const provider = new firebase.auth.GoogleAuthProvider();
    this._signIn(provider, (error: Error, result: any) => {
      if (callback) { callback(error, result); }
    });
  }

  public signInTwitter(callback?: any): void {
    const provider = new firebase.auth.TwitterAuthProvider();
    this._signIn(provider, (error: Error, result: any) => {
      if (callback) { callback(error, result); }
    });
  }

  public signOut(callback?: any): void {
    this._fbAuth.auth.signOut()
      .then((result: any) => {
        callback(null, result);
      }).catch((error: Error) => {
        callback(error, null);
      });
  }

  public updateProfile(update: IProfileUpdate): void {
    this.user.first().subscribe((user: IUser) => {
      if (!user) { return; }
      if (update.social.website && !update.social.website.match(/^[a-zA-Z]+:\/\//)) {
        update.social.website = 'http://' + update.social.website;
      }
      this._fbDB.object('/profiles/' + user.uid).update({
        location: (update.location) ? update.location : '',
        about: (update.about) ? update.about : '',
        social: (update.social) ? update.social : {},
        topics: (Array.isArray(update.topics)) ? update.topics : []
      });
    });
  }
}
