import { Component } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';
import { PawnedLogItem } from 'src/app/models/pawned-logs.model';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  constructor(private  apiService:RestApiService ) {}


  testGetNLogs(): void{
    this.apiService.getNLogs(5).subscribe((response : PawnedLogItem[]) =>{
      console.log(response);
      

    }
    , error=>{
      
    }
    )
  }


}
