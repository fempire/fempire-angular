import { TestBed, inject } from '@angular/core/testing';

import { GeofireService } from './geofire.service';

describe('GeofireService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeofireService]
    });
  });

  it('should be created', inject([GeofireService], (service: GeofireService) => {
    expect(service).toBeTruthy();
  }));
});
