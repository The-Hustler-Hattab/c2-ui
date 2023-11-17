import { Inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, Subject } from 'rxjs';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { Client, IStompSocket, Message } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';


@Injectable({
  providedIn: 'root'
})
export class WebsocketServiceService {
  private socket: WebSocket | null = null;
  private wsUrl = environment.wssurl;


  private messageSubject = new Subject<MessageEvent>();

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth){}
  
  
  connect() {
    const token = 'Bearer '+ this.oktaAuth.getAccessToken()
   
    
    if (!this.socket && token) {
      console.log("[+] Connecting to web socket");
      
      this.socket = new WebSocket(this.wsUrl);




      this.socket.addEventListener('message', (event) => {
        this.messageSubject.next(event);
      });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  sendMessage(message: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    }
  }

  listen(): Observable<MessageEvent> {
    return this.messageSubject.asObservable();
  }

  // private stompClient: Client | null = null;
  // private wsUrl = environment.wssurl;

  // private messageSubject = new Subject<Message>();

  // constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {}

  // connect() {
  //   const token = 'Bearer ' + this.oktaAuth.getAccessToken();

  //   if (!this.stompClient && token) {
  //     console.log('[+] Connecting to WebSocket');

  //     // Create a SockJS WebSocket connection
  //     const socket = new SockJS(this.wsUrl);
  //     this.stompClient = new Client();

  //     // Add the authentication token as a header
  //     const headers = { Authorization: token };

  //     // Connect to the WebSocket using Stomp
  //     this.stompClient.webSocketFactory =  new SockJS('your_sockjs_url') ;
  //     this.stompClient.activate();
  //     this.stompClient.onConnect = () => {
  //       // Subscribe to your desired destination with custom headers
  //       this.stompClient.subscribe(
  //         '/topic/example',
  //         (message: Message) => {
  //           this.messageSubject.next(message);
  //         },
  //         { headers }
  //       );
  //     };
  //   }
  // }

  // disconnect() {
  //   if (this.stompClient) {
  //     this.stompClient.deactivate();
  //     this.stompClient = null;
  //   }
  // }

  // sendMessage(destination: string, message: string) {
  //   if (this.stompClient && this.stompClient.connected) {
  //     // Send a message with custom headers
  //     this.stompClient.publish({ destination, body: message }, { headers: { Authorization: token } });
  //   }
  // }

  // listen(): Observable<Message> {
  //   return this.messageSubject.asObservable();
  // }


}
