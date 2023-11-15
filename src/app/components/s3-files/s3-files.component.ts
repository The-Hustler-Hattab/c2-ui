import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { S3Folder } from 'src/app/models/s3-folder.model';
import { S3Service } from 'src/app/services/s3/s3.service';



@Component({
  selector: 'app-s3-files',
  templateUrl: './s3-files.component.html',
  styleUrls: ['./s3-files.component.css']
})
export class S3FilesComponent implements OnInit{
  filteredFolders: S3Folder[] = [];
  searchTerm = '';
  folders: S3Folder[] = []






constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private s3Service: S3Service,
  
  ){
  this.matIconRegistry.addSvgIcon(
    'filter',
    this.domSanitizer.bypassSecurityTrustResourceUrl('assets/search.svg')
  );
}
  


ngOnInit(): void {
  this.folders = this.s3Service.folders  
  
  this.s3Service.foldersSubject.subscribe((s3folders: S3Folder[]) =>{
      this.folders = s3folders
      console.log(this.folders);
    }
    )

    this.s3Service.deleteSubject.subscribe((s3folder: S3Folder) =>{

      this.s3Service.removeFileFromFolders(s3folder, this.filteredFolders)
      this.s3Service.removeFileFromFolders(s3folder, this.folders)

    }
    )



  }

  refresh(){
    this.s3Service.getS3JsonList()
  }








  searchFolders() {
    const searchTerm = this.searchTerm.toLowerCase();
    if (searchTerm) {
      this.filteredFolders = this.filterFolders(this.folders, searchTerm);
    } else {
      this.filteredFolders = []; // Set the array to empty when the search term is removed
    }
  }
  
  filterFolders(folders: S3Folder[], searchTerm: string): S3Folder[] {
    return folders.reduce((result: S3Folder[], folder: S3Folder) => { // Specify types for result and folder
      if (folder.name.toLowerCase().includes(searchTerm)) {
        result.push(folder);
      }
      if (folder.subFolders) {
        const filteredSubfolders = this.filterFolders(folder.subFolders, searchTerm);
        if (filteredSubfolders.length > 0) {
          result.push({ ...folder, subFolders: filteredSubfolders });
        }
      }
      return result;
    }, []);
  }




}
