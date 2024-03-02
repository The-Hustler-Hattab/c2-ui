import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject, map } from 'rxjs';
import { PawnedLogItem } from '../models/pawned-logs.model';
import { S3Folder } from '../models/s3-folder.model';

export const  ApiConstants = {
  LOGS_API_PATH: "/v1/api/logs",
  GET_N_LOGS : "/getNLogs",
  GET_LOGS_BETWEEN_2_DATES : "/getLogsBetween2Dates",

  
  S3_API_PATH: "/v1/api/s3",
  GET_S3_FILE : "/getS3File",
  GET_JSON_FILES_IN_DIR : "/getJsonListFilesInDirectory",
  GET_JSON_FILES : "/getJsonListFiles",

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
  

    return this.getLogs(url)
  }

  getLogsBetween2Dates(start:string, end:string ): Observable<PawnedLogItem[]> {

    const url: string = `${this.apiUrl}${ApiConstants.LOGS_API_PATH}${ApiConstants.GET_LOGS_BETWEEN_2_DATES}?start=${start}&finish=${end}`;
    console.log(url);
  

    return this.getLogs(url)
  }

  private getLogs(url: string): Observable<PawnedLogItem[]> {

    return this.http.get<{ msg: string; statusCode: number; sessionLogEntities: PawnedLogItem[] }>
    (url)
      .pipe(
        map(
          response => response.sessionLogEntities
        )
      )
  }

  getS3File(file: string) {
    const url: string = `${this.apiUrl}${ApiConstants.S3_API_PATH}${ApiConstants.GET_S3_FILE}?file=${file}`;

    this.http.get(url, {responseType: 'blob'}).subscribe((data: Blob) => {
      this.saveFile(data,file)
    
    }
    
    
    )

  }

  public saveFile(blobData: Blob, fileName: string) {
    const downloadLink = document.createElement('a');
    const url = window.URL.createObjectURL(blobData);
    downloadLink.href = url;
    downloadLink.download = this.getFileNameFromPath(fileName); 
    downloadLink.click();
    window.URL.revokeObjectURL(url); 
  }

  private getFileNameFromPath(fullPath: string): string {
    const parts = fullPath.split('/');
    if (parts.length > 0) {
      return parts[parts.length - 1];
    }
    return fullPath; // Return the original string if no '/' is found
  }


  listS3Files(): Observable<S3Folder[]>{
    const url: string = `${this.apiUrl}${ApiConstants.S3_API_PATH}${ApiConstants.GET_JSON_FILES}`;
    
    
    return this.http.get<{ msg: string; statusCode: number; s3FileStructureJsonModels: S3Folder[] }>
    (url).pipe(map(
      response => response.s3FileStructureJsonModels
    ))
  }

  deleteS3File(filePath: string): Observable<{ msg: string; statusCode: number;  }>{
    const url: string = `${this.apiUrl}${ApiConstants.S3_API_PATH}${ApiConstants.DELETE_FILE}?file=${filePath}`;
    console.log(url);
    
    return this.http.delete<{ msg: string; statusCode: number;  }> (url)

  }












}
