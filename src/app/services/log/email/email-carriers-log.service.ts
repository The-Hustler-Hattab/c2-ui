import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SMSCarrierModel } from 'src/app/models/sms-carrier-model';
import { EmailSpammerPyService } from '../../email-spammer-py.service';

@Injectable({
  providedIn: 'root'
})
export class EmailCarriersLogService {
  logSubject: Subject<SMSCarrierModel[]> = new Subject<SMSCarrierModel[]>();
  logData: SMSCarrierModel[] = []

  constructor(private emailService: EmailSpammerPyService) { 
    this.getLogs();
  }

  public getLogs() {
    this.emailService.getEmailCarriers().subscribe((data: {email_carriers: SMSCarrierModel[]}) => { // Fix: Change the type to SMSCarrierModel[]
      this.logData = data.email_carriers;
      this.logSubject.next(this.logData); 
    });
  }


}
