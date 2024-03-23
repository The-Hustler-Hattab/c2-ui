import { Component, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Table } from 'primeng/table';
import { Column } from 'src/app/models/coulmn-model';
import { SMSCarrierModel } from 'src/app/models/sms-carrier-model';
import { SMTPEmailModel } from 'src/app/models/smtp-email-model';
import { EmailCarriersLogService } from 'src/app/services/log/email/email-carriers-log.service';
import { EmailSmtpLogsService } from 'src/app/services/log/email/email-smtp-logs.service';

@Component({
  selector: 'app-email-smtp-table',
  templateUrl: './email-smtp-table.component.html',
  styleUrls: ['./email-smtp-table.component.css']
})
export class EmailSmtpTableComponent {
  @ViewChild('dt1') dt: Table | undefined;

  logs: SMTPEmailModel[] = [];
  loading: boolean = false;
  cols!: Column[];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private logService: EmailSmtpLogsService
  ) {
    this.matIconRegistry.addSvgIcon(
      'filter',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/search.svg')
    );
  }


  ngOnInit() {
    this.cols = [
      { header: 'Email', field: 'email' },
      { header: 'Domain', field: 'domain' },
      { header: 'Email Host', field: 'email_host' },
      { header: 'Port', field: 'port' },
      { header: 'Created At', field: 'created_at' },
      { header: 'Created By', field: 'created_by' },

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
