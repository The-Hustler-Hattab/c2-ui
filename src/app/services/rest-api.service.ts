import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, Subject, map } from 'rxjs';
import { PawnedLogItem } from '../models/pawned-logs.model';

export const  ApiConstants = {
  LOGS_API_PATH: "/v1/api/logs",
  GET_N_LOGS : "/getNLogs",
  GET_LOGS_BETWEEN_2_DATES : "/getLogsBetween2Dates",

  
  S3_API_PATH: "/v1/api/s3",
  GET_S3_FILE : "/getS3File",
  GET_JSON_FILES_IN_DIR : "/getJsonListFilesInDirectory",
  DELETE_FILE : "/deleteFile",

  ACTUATOR_API_PATH: "/actuator",
  GET_HEALTH: "/health",

}


@Injectable({
  providedIn: 'root'
})
export class RestApiService {




  private apiUrl = environment.rooturl;

  constructor(private http: HttpClient) { }

  getNLogs(count:number ): Observable<PawnedLogItem[]> {

    const url = `${this.apiUrl}${ApiConstants.LOGS_API_PATH}${ApiConstants.GET_N_LOGS}?count=${count}`;
    console.log(url);
  
    const output: Observable<PawnedLogItem[]> = this.http.get<{ msg: string; statusCode: number; sessionLogEntities: PawnedLogItem[] }>
    (url)
      .pipe(
        map(
          response => response.sessionLogEntities
        )
      )
    return output
  }


}
