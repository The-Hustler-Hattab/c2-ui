import { Injectable } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { S3Folder } from 'src/app/models/s3-folder.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class S3Service  {

  folders: S3Folder[] = []

  foldersSubject: Subject<S3Folder[]> = new Subject<S3Folder[]>();

// this subject will only be triggered when there is delete invoked
  deleteSubject: Subject<S3Folder> = new Subject<S3Folder>();


  
  
  
  
  
  
  
  constructor(private api: RestApiService) {
    this.getS3JsonList();

  }

   

  getS3JsonList(){
    this.api.listS3Files().subscribe((data: S3Folder[] )=>{
      console.log(data);
      this.folders = data;
      this.foldersSubject.next(this.folders)

    })
    


  }












  getFile(fileName:string){
    this.api.getS3File(fileName);

  }

  deleteFile(fileName: S3Folder){
    
    if(fileName.path != undefined ){
      this.api.deleteS3File(fileName.path).subscribe(data => 
        { 
          console.log(data);
          this.folders = this.removeFileFromFolders(fileName, this.folders);
          this.foldersSubject.next(this.folders)
          this.deleteSubject.next(fileName)


        }
      );
    }


  }
  
  removeFileFromFolders(folder: S3Folder, folders: S3Folder[]): S3Folder[] {
    return folders.map(item => {
      if (item.type === 'FOLDER' && item.subFolders) {
        // Recursively process subFolders
        item.subFolders = this.removeFileFromFolders(folder, item.subFolders);
      }
      // Filter out the folder to be deleted
      item.subFolders = (item.subFolders || []).filter(subFolder => subFolder.name !== folder.name);
  
      return item;
    });
  }

}
