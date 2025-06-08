import { TestBed } from '@angular/core/testing';

import { ShceduleService } from './shcedule.service';

describe('ShceduleService', () => {
  let service: ShceduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShceduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
