import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject, Subscription } from 'rxjs';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';





@Injectable({
  providedIn: 'root'
})
export class WebsocketServiceService {
  private socket: WebSocket | null = null;
  private wsUrl = environment.wssurl;


  private messageSubject = new Subject<MessageEvent>();


  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth){}
  
  
  connect() {
    const token = this.oktaAuth.getAccessToken()
   
    
    if (!this.socket && token) {
      console.log("[+] Connecting to web socket");
      
      this.socket = new WebSocket(this.wsUrl+'?auth='+token);

      this.keepAlive(this.socket);

      this.socket.addEventListener('message', (event) => {
        this.messageSubject.next(event);
      });
    }
  }
  private keepAlive( socket: WebSocket | null ): void{
      // Send a keep-alive message every 50 seconds
      const keepAliveInterval = 50 * 1000; // 50 seconds in milliseconds
      setInterval(() => {
        if (this.socket !=null && this.socket.readyState === WebSocket.OPEN) {
          this.socket.send('KEEP_ALIVE');
        }
      }, keepAliveInterval);
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










  // private stompClient: any;

  // private token: any;



  // initializeWebSocketConnection() {
  //   this.token = { 'Authorization': 'Bearer ' + this.oktaAuth.getAccessToken() };

  //   const socket = new SockJS('');
  //   this.stompClient = Stomp.over(socket);

  //   this.stompClient.connect(this.token, (frame: any) => {
  //     console.log('Connected: ' + frame);

  //     // Subscribe to a destination
  //     this.stompClient.subscribe('/topic/messages', (message: any) => {
  //       console.log('Received message: ' + message.body);
  //       // Handle the received message
  //     });
  //   });
  // }

}
