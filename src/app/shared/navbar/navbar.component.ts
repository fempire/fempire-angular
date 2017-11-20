import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MatSidenav, MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
declare var window: any;

import { UserService, IUser } from '../../core/services';
import { SignInComponent } from '../sign-in/sign-in.component';
import { ApplyComponent } from '../apply/apply.component';

@Component({
  selector: 'fem-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(private _dialog: MatDialog, private _router: Router, private _snackBar: MatSnackBar, private _us: UserService) { }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => {
        if (window.innerWidth < 601) { this.navClose(); }
      });
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') { window.removeEventListener('resize'); }
  }

  get user(): Observable<IUser> {
    return this._us.user;
  }

  public apply(): void {
    this.navClose();
    this._dialog.open(ApplyComponent);
  }

  public navClose(): void {
    this.sidenav.close();
  }

  public navOpen(): void {
    if (window.innerWidth < 601) { this.sidenav.open(); }
  }

  public navToggle(): void {
    if (window.innerWidth < 601) { this.sidenav.toggle(); }
  }

  public signIn(): void {
    this.navClose();
    this._dialog.open(SignInComponent);
  }

  public signOut(): void {
    this.navClose();
    this._us.signOut((error: any, success: any) => {
      if (error) {
        this._snackBar.open(error.message, null, { duration: 3000 });
      } else {
        this._snackBar.open('See you next time!', null, { duration: 3000 });
        this._router.navigate(['/']);
      }
    });
  }
}
