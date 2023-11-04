import { Component, Input } from '@angular/core';
import { Section } from '../s3-files.component';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent {
  @Input() folders: Section[];
  
  folderName: string = "S3 C2 Folder"

  onFileClicked(item: Section) {
    console.log(item);
    
  }
}
