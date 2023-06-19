import { TestBed } from '@angular/core/testing';

import { TokeninterseptService } from './tokenintersept.service';

describe('TokeninterseptService', () => {
  let service: TokeninterseptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokeninterseptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
