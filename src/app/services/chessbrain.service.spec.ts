import { TestBed } from '@angular/core/testing';

import { ChessbrainService } from './chessbrain.service';

describe('ChessbrainService', () => {
  let service: ChessbrainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChessbrainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
