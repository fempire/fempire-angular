import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { OrganizationsService } from '../core/services';

@Component({
  selector: 'fem-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {

  constructor(private _os: OrganizationsService) { }

  ngOnInit() {
  }

  get organizations(): Observable<any[]> {
    return this._os.organizations;
  }
}
