import { TestBed, inject } from '@angular/core/testing';

import { FindFalconeService } from './find-falcone.service';

describe('FindFalconeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FindFalconeService]
    });
  });

  it('should be created', inject([FindFalconeService], (service: FindFalconeService) => {
    expect(service).toBeTruthy();
  }));
});
