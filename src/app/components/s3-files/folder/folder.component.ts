import { Component, Input } from '@angular/core';
import { Section } from '../s3-files.component';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent {
  @Input() folder: Section;



  onFileClicked(file: Section) {

    console.log('File clicked:', file);
  }

}
