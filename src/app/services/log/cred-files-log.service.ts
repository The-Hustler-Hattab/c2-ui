import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CredFilesLogsItem } from 'src/app/models/cred-files-logs.model';
import { CSharpRestApiService } from '../c-sharp-rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class CredFilesLogService {
  logCredDataSubject: Subject<CredFilesLogsItem[]> = new Subject<CredFilesLogsItem[]>();
  logData: CredFilesLogsItem[] = []

  constructor(private api: CSharpRestApiService) {
    this.getLogs();
   }

  public getLogs() {
    this.api.getAllCredLogs().subscribe(data => {
      this.logData = data;
      this.logCredDataSubject.next(this.logData);
    });
  }

  public downloadBlobFile(fileName: string) {
    this.api.downloadBlobFile(fileName);
  }

}
