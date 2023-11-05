export interface S3Folder {
    name: string;
    updated?: string;
    type: 'FOLDER' | 'FILE'; 
    subFolders?: S3Folder[];
    path?: string; 
  
}