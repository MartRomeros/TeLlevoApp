import { TestBed } from '@angular/core/testing';

import { CambiarThemaService } from './cambiar-thema.service';

describe('CambiarThemaService', () => {
  let service: CambiarThemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CambiarThemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
