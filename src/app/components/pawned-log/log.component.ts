import { AfterViewInit, Component,  ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import {  MatIconRegistry } from '@angular/material/icon';
import { animate, state, style, transition, trigger } from '@angular/animations';



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
  @ViewChild(MatTable) table!: MatTable<LogItem>;

  dataSource: MatTableDataSource<LogItem>;
  displayedColumns: string[] = ['id', 'name', 'weight','symbol'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: LogItem | null;

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

  columns: any[] = [
    { name: 'id', title: 'ID' },
    { name: 'name', title: 'Name' },
    { name: 'weight', title: 'Weight' },
    { name: 'symbol', title: 'Symbol' },


  ];

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.dataSource = new MatTableDataSource<LogItem>(this.EXAMPLE_DATA);
    this.matIconRegistry.addSvgIcon(
      'filter',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/search.svg')
    );
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