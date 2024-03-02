import { AfterViewInit, Component,  OnInit,  ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import {  MatIconRegistry } from '@angular/material/icon';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PawnedLogItem } from 'src/app/models/pawned-logs.model';
import { LogTableService } from 'src/app/services/log/log-table.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { S3Service } from 'src/app/services/s3/s3.service';

@Component({
  selector: 'app-session-logs',
  templateUrl: './session-logs.component.html',
  styleUrls: ['./session-logs.component.css']
})
export class SessionLogsComponent implements  OnInit, AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<PawnedLogItem>;


  dataSource: MatTableDataSource<PawnedLogItem>;

  displayedColumns: string[] = [ 'id','sessionId', 'hasFiles', 'publicIp'
  , 'osName', 'osVersion', 'osArch', 'userName', 'userHome', 'userCurrentWorkingDir',
   'userLanguage','malwareType', 'aes256HexKey'
  , 'sessionCreatedAt', 'sessionClosedAt'];


  columns: any[] = [
    { name: 'id', title: 'ID' },
    { name: 'sessionId', title: 'Session Id' },
    { name: 'publicIp', title: 'Public IP' },
    { name: 'sessionLocalAddress', title: 'Session Local Address' },
    { name: 'osName', title: 'OS Name' },
    { name: 'osVersion', title: 'OS Version' },
    { name: 'osArch', title: 'OS Arch' },
    { name: 'userName', title: 'User Name' },
    { name: 'userHome', title: 'User Home' },
    { name: 'userCurrentWorkingDir', title: 'User Current Working Dir' },
    { name: 'userLanguage', title: 'User Language' },
    { name: 'hasFiles', title: 'HasFiles?' },
    { name: 'sessionFiles', title: 'Session Files' },
    { name: 'malwareType', title: 'Malware Language' },
    { name: 'aes256HexKey', title: 'AES Encoded Key' },
    { name: 'sessionCreatedAt', title: 'Session Created At' },
    { name: 'sessionClosedAt', title: 'Session Closed At' },


  ];
  
  expandedElement: PawnedLogItem | null;

  count = new FormControl<string>('', [Validators.required]);
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });



  constructor(private matIconRegistry: MatIconRegistry, 
    private domSanitizer: DomSanitizer, private snackBar: MatSnackBar
    , private logService: LogTableService,
    private datePipe: DatePipe,
    private s3Service: S3Service) {
          
    this.matIconRegistry.addSvgIcon(
      'filter',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/search.svg')
    );
      
  }




  ngOnInit() {
    
    this.logService.logDataSubject.subscribe((data) => {   
        // this.tableData = 
        this.dataSource =  new MatTableDataSource<PawnedLogItem>(data);
        this.attachTableMaterialsToDataSource();
        
      });

  }

  ngAfterViewInit() {
    console.log(this.table);
    let pwaned : PawnedLogItem[] = this.logService.getData();

    
    if (this.table) {
      this.dataSource =  new MatTableDataSource<PawnedLogItem>(pwaned);
      this.attachTableMaterialsToDataSource();
    }
  }

  openSnackBar() {
    if (this.count.value !== null && this.count.value !== undefined) {
      this.snackBar.open( "Retriving data from database", this.count.value
      , {
        duration: 2000, 
        }
      );

      this.logService.getNDataForTable(+this.count.value);
      this.attachTableMaterialsToDataSource();

    } else {
      console.log('The value is null');
    }

  }

  refresh(){
    

    this.logService.getNDataForTable(this.logService.intialDataCount);
    this.attachTableMaterialsToDataSource();

  }

  getDataBetween2Dates(start:Date, end: Date): boolean  {
    
    console.log(this.datePipe.transform(start, 'MM/dd/yyyy'));
    console.log(this.datePipe.transform(end, 'MM/dd/yyyy'));


    
    this.logService.getDataForTableBetween2Dates(this.transformToDate(start),
    this.transformToDate(end));

    this.attachTableMaterialsToDataSource();
    
    this.range.reset()
    
    return true
   
  }
  private transformToDate(date:Date): string{
    const retDate = this.datePipe.transform(date, 'MM/dd/yyyy')
    if (retDate != undefined) {
      return retDate.toString()
    }else{
      throw "Invalid date provided"
    }

  }
  
  getErrorMessage() {
    if (this.count.hasError('required')) {
      return 'You must enter a value';
    }
    return this.count.hasError('count') ? 'Not a valid count' : '';
  }



  attachTableMaterialsToDataSource(): void{
    if (this.dataSource!= undefined) {  
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    }

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  tableDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }

  getFile(fileName: string){
    this.s3Service.getFile(fileName);
  }







}