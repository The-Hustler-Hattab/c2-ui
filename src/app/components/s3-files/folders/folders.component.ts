import { Component, Input } from '@angular/core';
import { S3Folder } from 'src/app/models/s3-folder.model';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent {
  @Input() folders: S3Folder[];
  
  folderName: string = "S3 C2 Folder"

  onFileClicked(item: S3Folder) {
    console.log(item);
    
  }
}
