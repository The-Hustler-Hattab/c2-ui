import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

import * as FileSaver from 'file-saver';
import { NgxCsvParser } from 'ngx-csv-parser';
import { saveAs } from 'file-saver';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CredFilesLogService } from 'src/app/services/log/cred-files-log.service';
import { CredFilesLogsItem } from 'src/app/models/cred-files-logs.model';



@Component({
  selector: 'app-pass-files',
  templateUrl: './pass-files.component.html',
  styleUrls: ['./pass-files.component.css'],
})
export class PassFilesComponent implements OnInit {
  @ViewChild('dt1') dt: Table | undefined;

  logs: CredFilesLogsItem[] = [];
  loading: boolean = false;

  constructor(
    private csvService: NgxCsvParser,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private logService: CredFilesLogService
  ) {
    this.matIconRegistry.addSvgIcon(
      'filter',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/search.svg')
    );
  }
  ngOnInit() {
    this.logs = this.logService.logData;
    this.logService.logCredDataSubject.subscribe((data) => {
      this.loading = true;
      this.logs = data;
      this.loading = false;
    });
  }

  applyFilterGlobal($event: Event, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  refresh() {
    this.logService.getLogs();
  }
  downloadFile(fileName:string) {
    this.logService.downloadBlobFile(fileName);
  }

  convertToCSV(data: any[]): string {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map((product) => Object.values(product).join(','));
    return `${header}\n${rows.join('\n')}`;
  }

  exportCSV() {
    const csvContent = this.convertToCSV(this.logs);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    saveAs(blob, 'products.csv');
  }
  exportPdf(): void {
    const exportColumns = [
      { header: 'ID', field: 'id' },
      { header: 'Code', field: 'code' },
      { header: 'Name', field: 'name' },
      { header: 'Description', field: 'description' },
      { header: 'Price', field: 'price' },
      { header: 'Quantity', field: 'quantity' },
      { header: 'Inventory Status', field: 'inventoryStatus' },
      { header: 'Category', field: 'category' },
      { header: 'Image', field: 'image' },
      { header: 'Rating', field: 'rating' },
    ];

    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
        const doc = new jsPDF.default('p', 'px', 'a4');
        (doc as any).autoTable({
          head: [exportColumns.map((column) => column.header)],
          body: this.logs.map((product) =>
            exportColumns.map((column) => product[column.field])
          ),
        });
        doc.save('products.pdf');
      });
    });
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.logs);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'products');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}



