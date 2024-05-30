import { TestBed } from '@angular/core/testing';

import { NarudzbeniceService } from './narudzbenice.service';

describe('NarudzbeniceService', () => {
  let service: NarudzbeniceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NarudzbeniceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
