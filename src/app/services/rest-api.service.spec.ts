import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiConstants, RestApiService } from './rest-api.service';
import { environment } from '../../environments/environment';
import { PawnedLogItem } from '../models/pawned-logs.model';

describe('RestApiService', () => {
  let service: RestApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:  [HttpClientTestingModule],
      providers: [RestApiService]
    });

    service = TestBed.inject(RestApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request with count parameter', () => {
    const count = 10; // Replace with your desired count value
    const expectedUrl = `${environment.rooturl}${ApiConstants.LOGS_API_PATH}${ApiConstants.GET_N_LOGS}?count=${count}`;
    
    service.getNLogs(count).subscribe(response => {
      console.log(response);
    });

    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    
    // Respond to the request (provide a mock response if needed)
    req.flush({
      msg: 'Success',
      statusCode: 200,
      sessionLogEntities: [] as PawnedLogItem[]
    });

    httpTestingController.verify();
  });
});
