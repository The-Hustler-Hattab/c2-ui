import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { CreateEmailComponent } from './create-email/create-email.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { SendSmsComponent } from './send-sms/send-sms.component';
import { EmailSpammerPyService } from 'src/app/services/email-spammer-py.service';

@Component({
  selector: 'app-email-forms',
  templateUrl: './email-forms.component.html',
  styleUrls: ['./email-forms.component.css']
})
export class EmailFormsComponent {

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;


  submitStatus: string = null;
  isSubmissionSuccessful: boolean = null;




  constructor(private componentFactoryResolver: ComponentFactoryResolver, private emailService: EmailSpammerPyService) {}
  ngAfterViewInit(): void {
    this.loadComponent('send-email');
    // this.loadComponent('create-email');
    // this.loadComponent('send-sms');


    }
  




  loadComponent(componentName: string): void {
    this.dynamicComponentContainer.clear();
    let componentType: any;
    if (componentName === 'create-email') {
      componentType = CreateEmailComponent;
    } else if (componentName === 'send-email') {
      componentType = SendEmailComponent;
    } else if (componentName === 'send-sms') {
      componentType = SendSmsComponent;
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    this.dynamicComponentContainer.createComponent(componentFactory);
  }

  intializeEmailSpammer() {
    this.emailService.initializeEmailSpammer().subscribe(
      (output: string) => {
        console.log(output);
        this.submitStatus = output;
        this.isSubmissionSuccessful = true;
      },
      (error: string) => {
        console.log(error);
        this.submitStatus = error;
        this.isSubmissionSuccessful = false;
      }
    )
  }
  clearSubmitStatus() {
    this.submitStatus = null;
    this.isSubmissionSuccessful = null;
  }


}
