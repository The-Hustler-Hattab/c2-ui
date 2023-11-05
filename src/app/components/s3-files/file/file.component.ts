import { Component, Input } from '@angular/core';
import { S3Folder } from 'src/app/models/s3-folder.model';
import { S3Service } from 'src/app/services/s3/s3.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent {

  @Input()
  file: S3Folder;


  constructor(private s3Service: S3Service){}


  download(item: S3Folder){
    console.log(item);
    if(item.path != undefined ){
      this.s3Service.getFile(item.path)
    }


  }

  delete(item: S3Folder){
    
      this.s3Service.deleteFile(item)

    
  }


}
