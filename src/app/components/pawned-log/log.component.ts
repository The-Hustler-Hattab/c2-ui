import { AfterViewInit, Component, ComponentFactoryResolver, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { SessionLogsComponent } from './session-logs/session-logs.component';
import { PassFilesComponent } from './pass-files/pass-files.component';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css'],
})


export class LogComponent implements AfterViewInit{


  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
  ngAfterViewInit(): void {
    console.log('log component');
    this.loadComponent('session-logs');
    // this.loadComponent('cred-files');

    }
  




  loadComponent(componentName: string): void {
    this.dynamicComponentContainer.clear();
    let componentType: any;
    if (componentName === 'session-logs') {
      componentType = SessionLogsComponent;
    } else if (componentName === 'cred-files') {
      componentType = PassFilesComponent;
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    this.dynamicComponentContainer.createComponent(componentFactory);
  }
}