import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';

import { UserService } from '../../core/services';

@Component({
  selector: 'fem-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<any>, private _snackBar: MatSnackBar, private _us: UserService) { }

  ngOnInit() {
  }

  public close(result?: any): void {
    this._dialogRef.close(result);
  }

  public signIn(account: string): void {
    switch (account) {
      case 'github':
        this._us.signInGitHub((error: Error, success: any) => this._result(error, success));
        break;
      case 'twitter':
        this._us.signInTwitter((error: Error, success: any) => this._result(error, success));
        break;
      default:
        this._us.signInGoogle((error: Error, success: any) => this._result(error, success));
        break;
    }
  }

  private _result(error: Error, success: any): void {
    if (error) {
      this._snackBar.open(error.message, null, { duration: 3000 });
    } else {
      this._snackBar.open('Welcome ' + success.user.displayName, null, { duration: 3000 });
      this.close();
    }
  }
}
