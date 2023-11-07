import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketServiceService {
  private socket: WebSocket | null = null;
  private wsUrl = environment.wssurl;


  private messageSubject = new Subject<MessageEvent>();

  connect() {
    if (!this.socket) {
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




}
