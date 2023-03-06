import { TestBed } from '@angular/core/testing';

import { ErrHandlerService } from './err-handler.service';

describe('ErrHandlerService', () => {
  let service: ErrHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
