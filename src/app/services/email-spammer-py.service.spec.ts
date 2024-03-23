import { TestBed } from '@angular/core/testing';

import { EmailSpammerPyService } from './email-spammer-py.service';

describe('EmailSpammerPyService', () => {
  let service: EmailSpammerPyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailSpammerPyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
