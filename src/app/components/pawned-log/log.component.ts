import { AfterViewInit, Component,  ViewChild } from '@angular/core';
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



export interface LogItem {
  name: string;
  id: number;
  weight: number;
  symbol: string;

}


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


export class LogComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // @ViewChild(MatTable) table!: MatTable<LogItem>;
  @ViewChild(MatTable) table!: MatTable<PawnedLogItem>;


  // dataSource: MatTableDataSource<LogItem>;
  dataSource: MatTableDataSource<PawnedLogItem>;

  // displayedColumns: string[] = ['id', 'name', 'weight','symbol'];
  displayedColumns: string[] = [ 'id','sessionId', 'hasFiles', 'sessionRemoteAddress'
  , 'osName', 'osVersion', 'osArch', 'userName', 'userHome', 'userCurrentWorkingDir', 'userLanguage'
  , 'sessionCreatedAt', 'sessionClosedAt'];

  // columnsToDisplayWithExpand = [...this.displayedColumns];
  // expandedElement: LogItem | null;
  expandedElement: PawnedLogItem | null;



  count = new FormControl<string>('', [Validators.required]);




  EXAMPLE_DATA2: PawnedLogItem[] = [
    {
      id: 28,
      sessionId: "c5b9703b-0944-43ff-51ad-27a81c548405",
      sessionRemoteAddress: "/127.0.0.1:62592",
      sessionLocalAddress: "/127.0.0.1:8070",
      sessionCreatedAt: "2023-10-28 23:35:39",
      sessionClosedAt: "2023-10-28 23:47:40",
      osName: "Windows 11",
      osVersion: "10.0",
      osArch: "amd64",
      userName: "moham",
      userHome: "C:\\Users\\moham",
      userCurrentWorkingDir: "F:\\github\\Websocket-ReverseShell-Agent",
      userLanguage: "en",
      hasFiles: "Y",
      sessionFiles: [
        {
          id: 19,
          file: "c5b9703b-0944-43ff-51ad-27a81c548405/2023-10-28_19-36-pom.xml",
          fileStatus: "FILE_DELETED",
          createdAt: "2023-10-28 23:36:34",
          updatedAt: "2023-10-29 01:24:56"
        }
      ]
    },
    {
      id: 27,
      sessionId: "9cf43eb4-03d0-1de2-c49c-601afbddbc4d",
      sessionRemoteAddress: "/127.0.0.1:53623",
      sessionLocalAddress: "/127.0.0.1:8070",
      sessionCreatedAt: "2023-10-24 23:13:55",
      sessionClosedAt: null,
      osName: "Windows 11",
      osVersion: "10.0",
      osArch: "amd64",
      userName: "moham",
      userHome: "C:\\Users\\moham",
      userCurrentWorkingDir: "F:\\github\\Websocket-ReverseShell-Agent\\target",
      userLanguage: "en",
      hasFiles: null,
      sessionFiles: []
    },
    {
      id: 26,
      sessionId: "c7607391-ebeb-0dd6-1572-1bc3d3b7c780",
      sessionRemoteAddress: "/127.0.0.1:53264",
      sessionLocalAddress: "/127.0.0.1:8070",
      sessionCreatedAt: "2023-10-24 23:03:53",
      sessionClosedAt: "2023-10-24 23:12:34",
      osName: "Windows 11",
      osVersion: "10.0",
      osArch: "amd64",
      userName: "moham",
      userHome: "C:\\Users\\moham",
      userCurrentWorkingDir: "F:\\github\\Websocket-ReverseShell-Agent",
      userLanguage: "en",
      hasFiles: null,
      sessionFiles: [
        {
          id: 17,
          file: "c7607391-ebeb-0dd6-1572-1bc3d3b7c780/2023-10-24_19-06-pom.xml",
          fileStatus: "FILE_CREATED",
          createdAt: "2023-10-24 23:06:53",
          updatedAt: null
        },
        {
          id: 18,
          file: "c7607391-ebeb-0dd6-1572-1bc3d3b7c780/2023-10-24_19-11-screenshot.png",
          fileStatus: "FILE_CREATED",
          createdAt: "2023-10-24 23:11:19",
          updatedAt: null
        }
      ]
    },
    {
      id: 25,
      sessionId: "e3df0f4b-20ee-130b-3fe9-4feff2b4e5a0",
      sessionRemoteAddress: "/127.0.0.1:61961",
      sessionLocalAddress: "/127.0.0.1:8070",
      sessionCreatedAt: "2023-10-24 22:39:50",
      sessionClosedAt: "2023-10-24 22:39:51",
      osName: "Windows 11",
      osVersion: "10.0",
      osArch: "amd64",
      userName: "moham",
      userHome: "C:\\Users\\moham",
      userCurrentWorkingDir: "F:\\github\\Websocket-ReverseShell-Agent",
      userLanguage: "en",
      hasFiles: null,
      sessionFiles: []
    },
    {
      id: 24,
      sessionId: "97f44c02-a7b4-ad7d-014e-4e7520483f43",
      sessionRemoteAddress: "/127.0.0.1:58804",
      sessionLocalAddress: "/127.0.0.1:8070",
      sessionCreatedAt: "2023-10-24 21:56:46",
      sessionClosedAt: "2023-10-24 22:39:47",
      osName: "Windows 11",
      osVersion: "10.0",
      osArch: "amd64",
      userName: "moham",
      userHome: "C:\\Users\\moham",
      userCurrentWorkingDir: "F:\\github\\Websocket-ReverseShell-Agent",
      userLanguage: "en",
      hasFiles: null,
      sessionFiles: [
        {
          id: 15,
          file: "97f44c02-a7b4-ad7d-014e-4e7520483f43/2023-10-24_17-58-pom.xml",
          fileStatus: "FILE_CREATED",
          createdAt: "2023-10-24 21:58:43",
          updatedAt: null
        },
        {
          id: 16,
          file: "97f44c02-a7b4-ad7d-014e-4e7520483f43/2023-10-24_17-59-screenshot.png",
          fileStatus: "FILE_CREATED",
          createdAt: "2023-10-24 21:59:06",
          updatedAt: null
        }
      ]
    }
  ];

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


  EXAMPLE_DATA: LogItem[] = [
  {id: 1, name: 'Hydrogen', weight:10.51, symbol: 'H'},
  {id: 2, name: 'Helium', weight:10, symbol: 'He'},
  {id: 3, name: 'Lithium', weight:10, symbol: 'Li'},
  {id: 4, name: 'Beryllium', weight:10, symbol: 'Be'},
  {id: 5, name: 'Boron', weight:10, symbol: 'Bo'},
  {id: 6, name: 'Carbon', weight:10, symbol: 'C'},
  {id: 7, name: 'Nitrogen', weight:10, symbol: 'N'},
  {id: 8, name: 'Oxygen', weight:10, symbol: 'O'},
  {id: 9, name: 'Fluorine', weight:10, symbol: 'Fl'},
  {id: 10, name: 'Neon', weight:10, symbol: 'Ne'},

];

  // columns: any[] = [
  //   { name: 'id', title: 'ID' },
  //   { name: 'name', title: 'Name' },
  //   { name: 'weight', title: 'Weight' },
  //   { name: 'symbol', title: 'Symbol' },


  // ];

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private snackBar: MatSnackBar) {
    // this.dataSource = new MatTableDataSource<LogItem>(this.EXAMPLE_DATA);
    this.dataSource = new MatTableDataSource<PawnedLogItem>(this.EXAMPLE_DATA2);

    this.matIconRegistry.addSvgIcon(
      'filter',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/search.svg')
    );
  }

  openSnackBar() {
    if (this.count.value !== null && this.count.value !== undefined) {
      this.snackBar.open( "Retriving data from database", this.count.value
      , {
        duration: 2000, // 2 seconds in milliseconds
      }
      );
    
    } else {
      // Handle the case where the value is null
      console.log('The value is null');
    }


  }
  getErrorMessage() {
    if (this.count.hasError('required')) {
      return 'You must enter a value';
    }
    return this.count.hasError('count') ? 'Not a valid count' : '';
  }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  tableDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }


  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });





}