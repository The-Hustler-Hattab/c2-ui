import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {  Terminal, TerminalModule, TerminalService } from 'primeng/terminal';
import { WebsocketServiceService } from 'src/app/services/websocket-service.service';
import { Subscription } from 'rxjs';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css'],
  providers: [TerminalService, MessageService] 
})
export class ConsoleComponent implements AfterViewInit, OnDestroy   {
  @ViewChild('terminalComponent') terminalComponent: Terminal;
  
  isConnected = false;
  messageSubscription: Subscription;
  proccessCommandsQueue: string[] = [];

  private functionMap: { [key: string]: () => void } = {};
  private commandIndex = -1;

  constructor(private terminalService: TerminalService, private websocketService: WebsocketServiceService,
    private messageService: MessageService) { 
    this.registerFunctions()
    
    this.terminalService.commandHandler.subscribe(command => { 
      



      const func = this.getFunction(command);
      if (func) {
        func();
        return
      }
      console.log(this.terminalComponent.command);
      
      
      
      if (this.isConnected) {
        this.proccessCommandsQueue.push(command)
        this.websocketService.sendMessage(command)
      }
    
      }); 


  }
  ngOnDestroy(): void {
  
  }


  ngAfterViewInit(): void {
    this.connect()

    this.messageSubscription = this.websocketService.listen().subscribe((event: MessageEvent) => {
      const eventData: string = event.data
      console.log(eventData.length);
      
      
      if (eventData.toUpperCase().includes("RECEIVED_NEW_CONNECTION") ) {
        this.recivedNewConnection();
      } else if (eventData.toUpperCase().includes("LOST_CONNECTION")) {
        this.LostConnection();
      }
//  the below will check if the json sent is comming in as command response and it will beuatify it and send it.
      if (this.checkJsonMessageToBeCommand(eventData)) {
        return
        
      }


      this.terminalService.sendResponse(this.beautifyJson(eventData))


      
      this.terminalComponent.cd.detectChanges()

      if (!this.deque()) {
        this.terminalComponent.commands.push(
          {
            text:"[+] ServerMsg",
            response: this.beautifyJson( eventData)
          }
  
        )
        this.terminalComponent.cd.detectChanges()

      }
    
    });
        
  }
  private bulkRespond(eventData: string):void{
    let commands = this.terminalComponent.commands
    console.log(commands);
    

    if (commands.length!=0) {


      
      this.terminalComponent.commands.push(
        {
          text:"[+] BULK-MSG",
          response: eventData
        }

      )


      this.terminalComponent.cd.detectChanges()

      
    }

  }

  private deque(): boolean{
    console.log("proccessed Queue: "+this.proccessCommandsQueue);
    
    if (this.proccessCommandsQueue.length != 0) {
      this.proccessCommandsQueue.shift()
      return true
    }
    return false;
  }

  private formatCommandData(data: string): string {
    // Split the string by the escaped new line char then add the new line char and finally remove starting and ending "
    return data.split('\\n').join("\n");
  }

  checkJsonMessageToBeCommand(receivedData :string): boolean{
    try {
      const jsonData = JSON.parse(receivedData);
    
      // Check if the JSON structure matches the expected format
      if (jsonData.slaveSessionId && jsonData.msg) {
        //  if it cant deque the command than thats means the server is sending multiple messages
        if (!this.deque()) {
          console.log("[+] triggered");
          
          this.bulkRespond(this.formatCommandData(jsonData.msg))
          return true
        }
        
        this.terminalService.sendResponse(this.formatCommandData(jsonData.msg))
        this.terminalComponent.cd.detectChanges()
        return true;
        
      } else {
        console.log("Received JSON does not match the expected structure.");
        return false;
      }
    } catch (error) {
      console.log("Received data is not valid JSON.");
      return false;

    }
  }



  registerFunctions(){
    this.functionMap['clear'] = () => {
      this.terminalComponent.commands = []
      this.terminalComponent.cd.detectChanges()
      this.terminalComponent.cd.markForCheck()
    };

  }

  getFunction(key: string): (() => void) {
    return this.functionMap[key];
  }

  connect() {
    this.websocketService.connect();
    this.isConnected = true;
  }

  disconnect() {
    this.websocketService.disconnect();
    this.isConnected = false;
  }

 
  onKeyDown(event: KeyboardEvent) {
    this.arrowsEvent(event)
    this.controlCEvent(event)
    

  }

  private controlCEvent(event: KeyboardEvent){
        // Check for Ctrl key (or Control key on Mac)
        const isCtrlPressed = event.ctrlKey || event.metaKey;

        // Check if the key pressed is 'c' (or 'C')
        const isCPressed = event.key === 'c' || event.key === 'C';
    
        if (isCtrlPressed && isCPressed) {
          this.terminalComponent.command = '';
        }
  }
  private arrowsEvent(event: KeyboardEvent){
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      const commandsLength = this.terminalComponent.commands.length;

      if (commandsLength === 0) {
        return;
      }

      if (event.key === 'ArrowUp' && this.commandIndex < commandsLength - 1) {
        this.commandIndex++;
      }

      if (event.key === 'ArrowDown' && this.commandIndex > 0) {
        this.commandIndex--;
      }

      if (this.commandIndex >= 0 && this.commandIndex < commandsLength) {
        this.terminalComponent.command = this.terminalComponent.commands[commandsLength - 1 - this.commandIndex].text;
      }
    }

  }






  beautifyJson(value: string, spaces: number = 2): string {
    try {
      const parsedValue = JSON.parse(value);
      return JSON.stringify(parsedValue, null, spaces);
    } catch (error) {
      // Return the original value if it's not valid JSON
      return value;
    }
  }


  recivedNewConnection() {
    this.messageService.add({severity:'info', summary: 'CONNECTION ESTABLISHED', detail: 'RECIVED NEW CONNECTION'});
}

  LostConnection() {
    this.messageService.add({severity:'warn', summary: 'LOST', detail: 'LOST CONNECTION'});
  }

  reconnect(){
    console.log("disconnect");
    
    if (this.isConnected) {
      this.disconnect()
      this.connect()
    }


  }




}
