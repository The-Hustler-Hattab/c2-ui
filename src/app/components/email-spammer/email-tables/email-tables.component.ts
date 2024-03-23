import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { EmailSpammerPyService } from 'src/app/services/email-spammer-py.service';
import { EmailSmtpTableComponent } from './email-smtp-table/email-smtp-table.component';
import { SmsCarrierTableComponent } from './sms-carrier-table/sms-carrier-table.component';

@Component({
  selector: 'app-email-tables',
  templateUrl: './email-tables.component.html',
  styleUrls: ['./email-tables.component.css']
})
export class EmailTablesComponent {

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private emailService: EmailSpammerPyService) {}
  ngAfterViewInit(): void {
    this.loadComponent('sms-carrier-table');
    console.log('log component');
    
    }
  

    loadComponent(componentName: string): void {
      this.dynamicComponentContainer.clear();
      let componentType: any;
      if (componentName === 'email-smtp-table') {
        componentType = EmailSmtpTableComponent;
      } else if (componentName === 'sms-carrier-table') {
        componentType = SmsCarrierTableComponent;
      }
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
      this.dynamicComponentContainer.createComponent(componentFactory);
    }
  






}
