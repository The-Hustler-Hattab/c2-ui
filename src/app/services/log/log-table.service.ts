import { Injectable } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { PawnedLogItem } from 'src/app/models/pawned-logs.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LogTableService  {

  logDataSubject: Subject<PawnedLogItem[]> = new Subject<PawnedLogItem[]>();
  logData: PawnedLogItem[] = []
  public intialDataCount: number=50;

  constructor(private api: RestApiService) {
    this.getNDataForTable(this.intialDataCount);
   }

   public getNDataForTable(count: number) {
    this.api.getNLogs(count).subscribe((response: PawnedLogItem[]) => {

      this.publishLogs(response)
      
    }

    )

  
  }
  private publishLogs(response: PawnedLogItem[] ): void{
    this.logData= response;
      
    this.logDataSubject.next(this.logData);

    console.log(response);
  }

  public getDataForTableBetween2Dates(start:string, end:string) {
    this.api.getLogsBetween2Dates(start,end).subscribe((response: PawnedLogItem[]) => {
      this.publishLogs(response)

    }

    )

  
  }


  getData(): PawnedLogItem[] {
    return this.logData;
  }


}
