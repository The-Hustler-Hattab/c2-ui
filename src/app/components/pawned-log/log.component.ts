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





@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})


export class LogComponent implements  OnInit, AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<PawnedLogItem>;


  dataSource: MatTableDataSource<PawnedLogItem>;

  displayedColumns: string[] = [ 'id','sessionId', 'hasFiles', 'sessionRemoteAddress'
  , 'osName', 'osVersion', 'osArch', 'userName', 'userHome', 'userCurrentWorkingDir', 'userLanguage'
  , 'sessionCreatedAt', 'sessionClosedAt'];


  columns: any[] = [
    { name: 'id', title: 'ID' },
    { name: 'sessionId', title: 'Session Id' },
    { name: 'sessionRemoteAddress', title: 'Session Remote Address' },
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
    , private logService: LogTableService) {
          
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







}