import { Injectable } from '@angular/core';
import { RestApiService } from '../rest-api.service';


@Injectable({
  providedIn: 'root'
})
export class S3Service  {



  constructor(private api: RestApiService) {
  }

   
  getFile(fileName:string){
    this.api.getS3File(fileName);

  }


}
