import { Component, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { Table } from 'primeng/table';
import { Column } from 'src/app/models/coulmn-model';
import { SMSCarrierModel } from 'src/app/models/sms-carrier-model';
import { EmailCarriersLogService } from 'src/app/services/log/email/email-carriers-log.service';


@Component({
  selector: 'app-sms-carrier-table',
  templateUrl: './sms-carrier-table.component.html',
  styleUrls: ['./sms-carrier-table.component.css']
})
export class SmsCarrierTableComponent {
  @ViewChild('dt1') dt: Table | undefined;

  logs: SMSCarrierModel[] = [];
  loading: boolean = false;
  cols!: Column[];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private logService: EmailCarriersLogService
  ) {
    this.matIconRegistry.addSvgIcon(
      'filter',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/search.svg')
    );
  }


  ngOnInit() {
    this.cols = [
      { header: 'ID', field: 'id' },
      { header: 'Wireless Carrier', field: 'wireless_carrier' },
      { header: 'Domain', field: 'domain' },
      { header: 'Allow MultiMedia', field: 'allow_multimedia' },
      { header: 'Created At', field: 'created_at' },
    ];

    this.logs = this.logService.logData;
    this.logService.logSubject.subscribe((data) => {
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













}
