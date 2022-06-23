import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject, Subject } from 'rxjs/internal/Subject';
import { map } from 'rxjs/operators';
import { environment } from '../../enviroments/environment';
import { AuthenticationService } from '../_services/authentication.service';

export class Message {
  constructor(public message: string, public receiver?: string, public username?: string, public actor?: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public messages = new Subject<Message>();
  private messageEvent: AnonymousSubject<MessageEvent>;

  constructor(private httpClient: HttpClient,
              private authenticationService: AuthenticationService) {
                this.messages = <Subject<Message>>this.connect(environment.webSocket + this.authenticationService.currentUserValue.userName).pipe(
                  map(
                      (response: MessageEvent): Message => {
                        const messageReturn = JSON.parse(response.data);
                        return {
                          message: messageReturn.message || messageReturn.Message,
                          receiver: messageReturn.receiver || messageReturn.Receiver,
                          actor: messageReturn.actor || messageReturn.Actor
                        }
                      }
                  )
              );
  }

  getMessages(): Observable<Message[]> {
      return this.httpClient.get<Message[]>(`${environment.apiUrl}/messages/${this.authenticationService.currentUserValue.userName}`);
  }

  public connect(url): AnonymousSubject<MessageEvent> {
    if (!this.messageEvent) {
        this.messageEvent = this.create(url);
        console.log("Successfully connected: " + this.authenticationService.currentUserValue.userName);
    }

    return this.messageEvent;
}

private create(url): AnonymousSubject<MessageEvent> {
    let ws = new WebSocket(url);
    let observable = new Observable((obs: Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
        return ws.close.bind(ws);
    });
    let observer = {
        error: null,
        complete: null,
        next: (data: Object) => {
            console.log('Message sent to websocket: ', data);
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify(data));
            }
        }
    };

    return new AnonymousSubject<MessageEvent>(observer, observable);
  }
}
