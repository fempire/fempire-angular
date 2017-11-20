import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';

import { ApplicationsService } from '../../core/services';

@Component({
  selector: 'fem-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {

  constructor(private _as: ApplicationsService, private _dialogRef: MatDialogRef<any>, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  public apply(type: string): void {
    this._as.insert(type, ((error: Error, success: string) => this._result(error, success)));
  }

  public close(result?: any): void {
    this._dialogRef.close(result);
  }

  private _result(error: Error, success: any): void {
    if (error) {
      this._snackBar.open(error.message, null, { duration: 3000 });
    } else {
      this._snackBar.open(success, null, { duration: 3000 });
      this.close();
    }
  }
}
