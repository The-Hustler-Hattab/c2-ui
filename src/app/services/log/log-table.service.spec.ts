import { TestBed } from '@angular/core/testing';

import { LogTableService } from './log-table.service';

describe('LogTableService', () => {
  let service: LogTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
