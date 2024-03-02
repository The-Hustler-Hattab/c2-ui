import { TestBed } from '@angular/core/testing';

import { CSharpRestApiService } from './c-sharp-rest-api.service';

describe('CSharpRestApiService', () => {
  let service: CSharpRestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CSharpRestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
