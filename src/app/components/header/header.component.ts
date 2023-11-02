import { Component, Inject } from '@angular/core';
import { PawnedLogItem } from 'src/app/models/pawned-logs.model';
import { RestApiService } from 'src/app/services/rest-api.service';
import { OktaAuth } from '@okta/okta-auth-js';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  constructor(private  apiService:RestApiService,
     @Inject(OKTA_AUTH) public oktaAuth: OktaAuth, public authService: OktaAuthStateService,  ) {}


  testGetNLogs(): void{
    this.apiService.getLogsBetween2Dates('06/01/2023', '11/30/2023').subscribe((response : PawnedLogItem[]) =>{
      console.log(response);
      
    }
    , error=>{
      
    }
    )
  }

  login(){

    this.oktaAuth.signInWithRedirect();
    console.log("logged in");


  }

  logout(){
    this.oktaAuth.signOut();
    console.log("logged out");

    // this.token.emit("")
  }


}
