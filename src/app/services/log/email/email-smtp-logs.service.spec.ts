import { TestBed } from '@angular/core/testing';

import { EmailSmtpLogsService } from './email-smtp-logs.service';

describe('EmailSmtpLogsService', () => {
  let service: EmailSmtpLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailSmtpLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
