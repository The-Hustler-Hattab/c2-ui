import { TestBed } from '@angular/core/testing';

import { EmailCarriersLogService } from './email-carriers-log.service';

describe('EmailCarriersLogService', () => {
  let service: EmailCarriersLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailCarriersLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
