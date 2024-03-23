import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmailSpammerPyService, SendSMSModel } from 'src/app/services/email-spammer-py.service';

@Component({
  selector: 'app-send-sms',
  templateUrl: './send-sms.component.html',
  styleUrls: ['./send-sms.component.css']
})
export class SendSmsComponent {
  formData: any = {};
  @ViewChild('configForm', { static: false }) configForm: NgForm;
  submitStatus: string = null;
  isSubmissionSuccessful: boolean = null;
  
  constructor(private emailService: EmailSpammerPyService) {}
  
  submitForm() {
    // Handle form submission here
    console.log("Form submitted!");
    console.log("Subject:", this.formData.subject);
    console.log("Message Body:", this.formData.body);
    console.log("From Email:", this.formData.from_email);
    console.log("Phone Number:", this.formData.phone_number);
    console.log("Is MMS:", this.formData.is_mms);
    console.log("Message Count:", this.formData.message_count);
    console.log("Send From All Emails:", this.formData.send_from_all_emails);

    const smsModel: SendSMSModel = {} as SendSMSModel;
    smsModel.body = this.formData.body;
    smsModel.subject = this.formData.subject;
    smsModel.phone_number = this.formData.phone_number;
    smsModel.message_count = this.formData.message_count;
    smsModel.is_mms = this.formData.is_mms;
    

    if (this.formData.send_from_all_emails==null || this.formData.send_from_all_emails==false) {
      smsModel.from_email = this.formData.from_email;
      
      this.emailService.sendSMS(smsModel).subscribe(
        (output) => {
          this.submitStatus = output.msg;
          this.isSubmissionSuccessful = true;
        },
        (error) => {
          console.log("Error: ", error);
          this.submitStatus = error.error.msg;
          this.isSubmissionSuccessful = false;
        }

      );

    }else{
      this.emailService.sendSMSAll(smsModel).subscribe(
        (output) => {
          this.submitStatus = output.msg;
          this.isSubmissionSuccessful = true;
        },
        (error) => {
          this.submitStatus = error.error.msg;
          this.isSubmissionSuccessful = false;
        }

      );
    }

    // this.resetForm();
  }





  resetForm() {
    this.formData = {};
    if (this.configForm) {
      this.configForm.resetForm();
    }
  }

  clearSubmitStatus() {
    this.submitStatus = null;
    this.isSubmissionSuccessful = null;
  }







}
