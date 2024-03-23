import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmailSpammerPyService, SendEmailModel } from 'src/app/services/email-spammer-py.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent {
  formData: any = {};
  @ViewChild('configForm', { static: false }) configForm: NgForm;
  submitStatus: string = null;
  isSubmissionSuccessful: boolean = null;


  constructor(private emailServiceApi:EmailSpammerPyService) { }
  submitForm() {
    // Handle form submission here
    console.log("Form submitted!");
    console.log("Send from all emails:", this.formData.send_from_all_emails);
    console.log("From Email:", this.formData.from_email);
    console.log("Email Subject:", this.formData.email_subject);
    console.log("To Email:", this.formData.to_email);
    console.log("Email Body:", this.formData.email_body);
    
    const emailModel: SendEmailModel = {} as SendEmailModel;
    emailModel.email_body = this.formData.email_body;
    emailModel.email_subject = this.formData.email_subject;
    emailModel.to_email = this.formData.to_email;

    if (this.formData.send_from_all_emails) {

      console.log("Sending from all emails");
      this.sendEmailAll(emailModel);
    }else{
      emailModel.email = this.formData.from_email;
      emailModel.message_count = 1;
      this.sendEmail(emailModel);

    }
    // this.resetForm();
  }


  private sendEmail(emailModel: SendEmailModel) {
    this.emailServiceApi.sendEmail(emailModel).subscribe(
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

  private sendEmailAll(emailModel: SendEmailModel) {
    this.emailServiceApi.sendEmailFromAll(emailModel).subscribe(
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
