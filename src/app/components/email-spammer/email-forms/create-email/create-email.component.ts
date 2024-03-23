import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmailModel, EmailSpammerPyService } from 'src/app/services/email-spammer-py.service';

@Component({
  selector: 'app-create-email',
  templateUrl: './create-email.component.html',
  styleUrls: ['./create-email.component.css']
})
export class CreateEmailComponent {
  formData: any = {};
  @ViewChild('configForm', { static: false }) configForm: NgForm;
  submitStatus: string = null;
  isSubmissionSuccessful: boolean = null;

  constructor(private emailSpammerPyService: EmailSpammerPyService) { }


  submitForm() {
    // Handle form submission here
    console.log("Form submitted!");
    console.log("Email:", this.formData.email);
    console.log("Email Host:", this.formData.email_host);
    console.log("Email Password:", this.formData.email_pass);
    console.log("Port:", this.formData.port);

    
    const newEmail: EmailModel = {} as EmailModel;
    this.convertFormToEmailModel(newEmail);
    
    this.emailSpammerPyService.addEmailInTheDb(newEmail).subscribe(
      (output: string) => {
        this.submitStatus = output;
        this.isSubmissionSuccessful = true;
      },
      (error: string) => {
        this.submitStatus = error;
        this.isSubmissionSuccessful = false;
      }
    )
    
    // Reset form after submission
    this.resetForm();
  }

  private convertFormToEmailModel(newEmail: EmailModel) {
    newEmail.email = this.formData.email;
    newEmail.email_host = this.formData.email_host;
    newEmail.email_pass = this.formData.email_pass;
    newEmail.port = this.formData.port;
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


