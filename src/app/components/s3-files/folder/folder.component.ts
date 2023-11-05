import { Component, Input } from '@angular/core';
import { S3Folder } from 'src/app/models/s3-folder.model';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent {
  @Input() folder: S3Folder;



  onFileClicked(file: S3Folder) {

    console.log('File clicked:', file);
  }

}
