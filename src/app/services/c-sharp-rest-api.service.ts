import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CredFilesLogsItem } from '../models/cred-files-logs.model';
import { RestApiService } from './rest-api.service';
export const  ApiConstantsCSharp = {
  GET_ALL_COSMOS: "/api/getAllCosmosRecords?code=t2wwJn0bki8J_EMuhH7EXIEbSeKi3SqdAr-tCIJP0BilAzFud5ovIA==",
  GET_FILE_FROM_BLOB: "/api/getFileFromBlob?code=4Wtjggv8XvxuJkY5GCHTViVcu_M3UvHjnTIzPuok9OfOAzFu9I-5dQ==",



}

@Injectable({
  providedIn: 'root'
})
export class CSharpRestApiService {
  private apiUrl = environment.cSharpAPI;

  constructor(private http: HttpClient, private restApiService: RestApiService) { }

  getAllCredLogs(): Observable<CredFilesLogsItem[]> {
    const url = `${this.apiUrl}${ApiConstantsCSharp.GET_ALL_COSMOS}`;
    console.log(url);
  
    return this.http.get<CredFilesLogsItem[]>(url)
  }


  downloadBlobFile(file: string) {
    const url: string = `${this.apiUrl}${ApiConstantsCSharp.GET_FILE_FROM_BLOB}&file=${file}`;

    this.http.get(url, {responseType: 'blob'}).subscribe((data: Blob) => {
      this.restApiService.saveFile(data,file);
    
    }

    )

  }



}
