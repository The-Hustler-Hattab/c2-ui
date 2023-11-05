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


  // folders: S3Folder[] = [
  //   {
  //     name: "4723c56a-9aca-fc35-6f36-1bb468ee1915",
  //     type: "FOLDER",
  //     subFolders: [
  //       {
  //         name: "2023-10-23_19-12-hacked.txt",
  //         updated: "Oct 23, 2023",
  //         type: "FILE",
  //         path: "4723c56a-9aca-fc35-6f36-1bb468ee1915/2023-10-23_19-12-hacked.txt"
  //       },
  //       {
  //         name: "2023-10-23_19-12-screenshot.png",
  //         updated: "Oct 23, 2023",
  //         type: "FILE",
  //         path: "4723c56a-9aca-fc35-6f36-1bb468ee1915/2023-10-23_19-12-screenshot.png"
  //       },
  //       {
  //         name: "package-lock.json",
  //         updated: "Nov 04, 2023",
  //         type: "FILE",
  //         path: "4723c56a-9aca-fc35-6f36-1bb468ee1915/test/package-lock.json"
  //       }
  //     ],
  //     path: "4723c56a-9aca-fc35-6f36-1bb468ee1915"
  //   },
  //   {
  //     name: "7e6accad-169c-4eb3-953c-82170f8bdcd0",
  //     type: "FOLDER",
  //     subFolders: [
  //       {
  //         name: "2023-10-22_20-55-reverseShell-1.0-SNAPSHOT.jar",
  //         updated: "Oct 23, 2023",
  //         type: "FILE",
  //         path: "7e6accad-169c-4eb3-953c-82170f8bdcd0/2023-10-22_20-55-reverseShell-1.0-SNAPSHOT.jar"
  //       },
  //       {
  //         name: "2023-10-22_21-12-pom.xml",
  //         updated: "Oct 23, 2023",
  //         type: "FILE",
  //         path: "7e6accad-169c-4eb3-953c-82170f8bdcd0/2023-10-22_21-12-pom.xml"
  //       }
  //     ],
  //     path: "7e6accad-169c-4eb3-953c-82170f8bdcd0"
  //   },
  //   {
  //     name: "97f44c02-a7b4-ad7d-014e-4e7520483f43",
  //     type: "FOLDER",
  //     subFolders: [
  //       {
  //         name: "2023-10-24_17-58-pom.xml",
  //         updated: "Oct 24, 2023",
  //         type: "FILE",
  //         path: "97f44c02-a7b4-ad7d-014e-4e7520483f43/2023-10-24_17-58-pom.xml"
  //       },
  //       {
  //         name: "2023-10-24_17-59-screenshot.png",
  //         updated: "Oct 24, 2023",
  //         type: "FILE",
  //         path: "97f44c02-a7b4-ad7d-014e-4e7520483f43/2023-10-24_17-59-screenshot.png"
  //       }
  //     ],
  //     path: "97f44c02-a7b4-ad7d-014e-4e7520483f43"
  //   },
  //   {
  //     name: "b8bc8908-1cb6-e23e-7932-d697c148baa8",
  //     type: "FOLDER",
  //     subFolders: [
  //       {
  //         name: "2023-10-22_19-26-pom.xml",
  //         updated: "Oct 22, 2023",
  //         type: "FILE",
  //         path: "b8bc8908-1cb6-e23e-7932-d697c148baa8/2023-10-22_19-26-pom.xml"
  //       }
  //     ],
  //     path: "b8bc8908-1cb6-e23e-7932-d697c148baa8"
  //   },
  //   {
  //     name: "c7607391-ebeb-0dd6-1572-1bc3d3b7c780",
  //     type: "FOLDER",
  //     subFolders: [
  //       {
  //         name: "2023-10-24_19-06-pom.xml",
  //         updated: "Oct 24, 2023",
  //         type: "FILE",
  //         path: "c7607391-ebeb-0dd6-1572-1bc3d3b7c780/2023-10-24_19-06-pom.xml"
  //       },
  //       {
  //         name: "2023-10-24_19-11-screenshot.png",
  //         updated: "Oct 24, 2023",
  //         type: "FILE",
  //         path: "c7607391-ebeb-0dd6-1572-1bc3d3b7c780/2023-10-24_19-11-screenshot.png"
  //       }
  //     ],
  //     path: "c7607391-ebeb-0dd6-1572-1bc3d3b7c780"
  //   },
  //   {
  //     name: "fb04ed05-c0e8-631c-cde1-9d2b72ad8a0a",
  //     type: "FOLDER",
  //     subFolders: [
  //       {
  //         name: "2023-10-23_19-56-screenshot.png",
  //         updated: "Oct 23, 2023",
  //         type: "FILE",
  //         path: "fb04ed05-c0e8-631c-cde1-9d2b72ad8a0a/2023-10-23_19-56-screenshot.png"
  //       }
  //     ],
  //     path: "fb04ed05-c0e8-631c-cde1-9d2b72ad8a0a"
  //   }
  // ]


  // folders: S3Folder[] = [
  //   {
  //     name: 'Photos',
  //     updated: '1/1/16',
  //     type: 'folder',
  //     subFolders: [
  //       {
  //         name: 'Vacation',
  //         updated: '2/2/16',
  //         type: 'folder',
  //         subFolders: [
  //           {
  //             name: 'Beach',
  //             updated: '2/5/16',
  //             type: 'folder',
  //           },
  //           {
  //             name: 'Mountain',
  //             updated: '2/10/16',
  //             type: 'folder',
  //           },
  //           {
  //             name: 'Sample.txt',
  //             updated: '3/15/16',
  //             type: 'file',
  //             path: 'path'
  //           }
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Recipes',
  //     updated: '1/17/16',
  //     type: 'folder',
  //   },
  //   {
  //     name: 'Sample.txt',
  //     updated: '3/15/16',
  //     type: 'file',
  //     path: 'Sample.txt'
  //   },
  // ];



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
