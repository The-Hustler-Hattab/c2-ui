import { Component, Input, OnInit } from '@angular/core';
import { LoadingSpinnerService } from 'src/app/services/loading-spinner.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {
  showSpinner: boolean = false;

  constructor(private lodingService: LoadingSpinnerService){}
  ngOnInit(): void {
    
    this.lodingService.isLoading.subscribe((loading: boolean)=>{
      this.showSpinner = loading;
      console.log(loading);
      
    })
  }

}
