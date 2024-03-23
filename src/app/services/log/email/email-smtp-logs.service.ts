import { Injectable } from '@angular/core';
import { EmailSpammerPyService } from '../../email-spammer-py.service';
import { SMTPEmailModel } from 'src/app/models/smtp-email-model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailSmtpLogsService {

  logSubject: Subject<SMTPEmailModel[]> = new Subject<SMTPEmailModel[]>();
  logData: SMTPEmailModel[] = []

  constructor(private emailService: EmailSpammerPyService) { 
    this.getLogs();
  }

  public getLogs() {
    this.emailService.getEmailSMTP().subscribe((data: {emails: SMTPEmailModel[]}) => { 
      this.logData = data.emails;
      this.logSubject.next(this.logData); 
    });
  }
}
