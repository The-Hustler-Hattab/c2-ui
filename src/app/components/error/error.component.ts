import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit{

  errorMsg: string | null;

  constructor(private router: ActivatedRoute){}
  
  ngOnInit(): void {
    this.assginErrorMsg()

    this.router.queryParams.subscribe(event =>{
      this.assginErrorMsg()
    })

  }
  private assginErrorMsg():void{
    this.errorMsg = this.router.snapshot.queryParamMap.get("error") 
  }

}
