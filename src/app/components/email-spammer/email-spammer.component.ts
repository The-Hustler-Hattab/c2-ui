import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { EmailFormsComponent } from './email-forms/email-forms.component';
import { EmailTablesComponent } from './email-tables/email-tables.component';

@Component({
  selector: 'app-email-spammer',
  templateUrl: './email-spammer.component.html',
  styleUrls: ['./email-spammer.component.css']
})
export class EmailSpammerComponent {

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
  ngAfterViewInit(): void {
    console.log('log component');
    this.loadComponent('email-forms');

    }
  




  loadComponent(componentName: string): void {
    this.dynamicComponentContainer.clear();
    let componentType: any;
    if (componentName === 'email-forms') {
      componentType = EmailFormsComponent;
    } else if (componentName === 'email-tables') {
      componentType = EmailTablesComponent;
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    this.dynamicComponentContainer.createComponent(componentFactory);
  }
}
