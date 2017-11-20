import { TestBed, inject } from '@angular/core/testing';

import { ApplicationsService } from './applications.service';

describe('ApplicationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicationsService]
    });
  });

  it('should be created', inject([ApplicationsService], (service: ApplicationsService) => {
    expect(service).toBeTruthy();
  }));
});
