import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SMSCarrierModel } from '../models/sms-carrier-model';
import { SMTPEmailModel } from '../models/smtp-email-model';


export const  ApiConstants = {
  ADD_EMAIL_ACCOUNT: "/create-email",
  INITIALIZE_EMAIL_SPAMMER: "/initialize-email-connections",
  SEND_EMAIL_FROM_ALL: "/send-email-from-all",
  SEND_EMAIL: "/send-email",
  SEND_SMS: "/send-sms",
  SEND_SMS_FROM_ALL: "/send_sms_from_all",
  GET_EMAIL_CARRIERS: "/get-email-carriers",
  GET_EMAIL_SMTP: "/get-emails",

}

export interface EmailModel {
  email: string;
  email_host: string;
  email_pass: string;
  port: number;
}

export interface SendEmailModel {
  email_body: string;
  email_subject: string;
  to_email: string;
  email: string;
  message_count: number;

}
export interface SendSMSModel {
  body: string;
  subject: string;
  phone_number: string;
  from_email: string;
  message_count: number;
  is_mms: boolean;

}


@Injectable({
  providedIn: 'root'
})
export class EmailSpammerPyService {
  private apiUrl = environment.emailSpammerPython;

  constructor(private http: HttpClient) { }

  addEmailInTheDb(newEmail:EmailModel ): Observable<string> {
    const url = `${this.apiUrl}${ApiConstants.ADD_EMAIL_ACCOUNT}`;
    console.log(url);
    console.log(newEmail);
    return this.http.post<string>(url, newEmail).pipe(
      map((response: any) => response.msg),
      catchError((error: any) => {
        let errorMessage = 'An error occurred while adding email in the database';
        if (error.error && error.error.msg) {
          errorMessage = error.error.msg; // Extract error message from JSON response
        }
        console.error(errorMessage);
        return throwError(errorMessage); // Return the error message as part of the observable
      })
    );
  }

  initializeEmailSpammer(): Observable<string> {
    const url = `${this.apiUrl}${ApiConstants.INITIALIZE_EMAIL_SPAMMER}`;
    console.log(url);
    
    // Add a return statement here
    return this.http.get<string>(url).pipe(
      map((response: any) => response.msg) // Extract the 'msg' property from the response
    );
  }


  sendEmailFromAll(sendEmailModel: SendEmailModel): Observable<{msg:string}> {
    const url = `${this.apiUrl}${ApiConstants.SEND_EMAIL_FROM_ALL}`;
    return this.http.post<{msg:string}>(url, sendEmailModel);
  }
  sendEmail(sendEmailModel: SendEmailModel): Observable<{msg:string}> {
    const url = `${this.apiUrl}${ApiConstants.SEND_EMAIL}`;
    return this.http.post<{msg:string}>(url, sendEmailModel);
  }
  sendSMS(sendSmsModel: SendSMSModel): Observable<{msg:string}> {
    const url = `${this.apiUrl}${ApiConstants.SEND_SMS}`;
    return this.http.post<{msg:string}>(url, sendSmsModel);
  }
  sendSMSAll(sendSmsModel: SendSMSModel): Observable<{msg:string}> {
    const url = `${this.apiUrl}${ApiConstants.SEND_SMS_FROM_ALL}`;
    return this.http.post<{msg:string}>(url, sendSmsModel);
  }


  getEmailCarriers(): Observable<{email_carriers: SMSCarrierModel[]}> {
    const url = `${this.apiUrl}${ApiConstants.GET_EMAIL_CARRIERS}`;
    return this.http.get<{email_carriers: SMSCarrierModel[]}>(url);
  }
  getEmailSMTP(): Observable<{emails: SMTPEmailModel[]}> {
    const url = `${this.apiUrl}${ApiConstants.GET_EMAIL_SMTP}`;
    return this.http.get<{emails: SMTPEmailModel[]}>(url);
  }



}
