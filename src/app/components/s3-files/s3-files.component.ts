import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export interface Section {
  name: string;
  updated: Date;
  type: 'folder' | 'file'; // Indicate whether it's a folder or a file
  subfolders?: Section[];
  path?: string; // Add the path property

}

@Component({
  selector: 'app-s3-files',
  templateUrl: './s3-files.component.html',
  styleUrls: ['./s3-files.component.css']
})
export class S3FilesComponent {
  filteredFolders: Section[] = [];
  searchTerm = '';




constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer,){
  this.matIconRegistry.addSvgIcon(
    'filter',
    this.domSanitizer.bypassSecurityTrustResourceUrl('assets/search.svg')
  );
}




  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
      type: 'folder',
      subfolders: [
        {
          name: 'Vacation',
          updated: new Date('2/2/16'),
          type: 'folder',
          subfolders: [
            {
              name: 'Beach',
              updated: new Date('2/5/16'),
              type: 'folder',
            },
            {
              name: 'Mountain',
              updated: new Date('2/10/16'),
              type: 'folder',
            },
            {
              name: 'Sample.txt',
              updated: new Date('3/15/16'),
              type: 'file',
              path: 'path'
            }
          ],
        },
      ],
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
      type: 'folder',
    },
    {
      name: 'Sample.txt',
      updated: new Date('3/15/16'),
      type: 'file',
      path: 'Sample.txt'
    },
  ];



  searchFolders() {
    const searchTerm = this.searchTerm.toLowerCase();
    if (searchTerm) {
      this.filteredFolders = this.filterFolders(this.folders, searchTerm);
    } else {
      this.filteredFolders = []; // Set the array to empty when the search term is removed
    }
  }
  
  filterFolders(folders: Section[], searchTerm: string): Section[] {
    return folders.reduce((result: Section[], folder: Section) => { // Specify types for result and folder
      if (folder.name.toLowerCase().includes(searchTerm)) {
        result.push(folder);
      }
      if (folder.subfolders) {
        const filteredSubfolders = this.filterFolders(folder.subfolders, searchTerm);
        if (filteredSubfolders.length > 0) {
          result.push({ ...folder, subfolders: filteredSubfolders });
        }
      }
      return result;
    }, []);
  }




}
