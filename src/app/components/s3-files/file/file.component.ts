import { Component, Input } from '@angular/core';
import { Section } from '../s3-files.component';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent {

  @Input()
  file: Section;

  onFileClicked(item: Section) {
    console.log(item);
    
  }

}
