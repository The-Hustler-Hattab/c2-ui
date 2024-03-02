import { TestBed } from '@angular/core/testing';

import { CredFilesLogService } from './cred-files-log.service';

describe('CredFilesLogService', () => {
  let service: CredFilesLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CredFilesLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
