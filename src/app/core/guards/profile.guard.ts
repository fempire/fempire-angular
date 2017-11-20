import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/map';

import { ProfilesService, IProfile, UserService, IUser } from '../services';


@Injectable()
export class ProfileGuard implements CanActivate {
  constructor(private _ps: ProfilesService, private _router: Router, private _us: UserService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._ps.findById(next.params.id).concatMap((profile: IProfile) => {
      if (profile.$key) {
        return Observable.of(true);
      } else if (!next.params.id) {
        return this._us.user.map((user: IUser) => {
          if (!user) {
            this._router.navigate(['/']);
            return false;
          }
          return true;
        });
      } else {
        this._router.navigate(['/']);
        return Observable.of(false);
      }
    }).catch((error: any) => {
      this._router.navigate(['/']);
      return Observable.of(false);
    });
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(next, state);
  }
}
