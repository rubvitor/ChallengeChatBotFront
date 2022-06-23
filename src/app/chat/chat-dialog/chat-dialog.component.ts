import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})
export class ChatDialogComponent implements OnInit {

  messages: Message[];
  formValue: string;
  user: string;

  constructor(public chat: ChatService,
              private authenticationService: AuthenticationService) {
      this.user = authenticationService.currentUserValue.userName;
  }

  ngOnInit() {
    this.messages = [];
    this.chat.messages.subscribe(msg => {
      this.messages.push(msg);
    });

    this.chat.getMessages().subscribe(messages => {
      messages.forEach(msg => {
        this.messages.push(msg);
      });
    });
  }

  sendMessage() {
    this.messages.push({
      message: this.formValue,
      actor: this.user,
      username: this.user
    })
    this.chat.messages.next({ message: this.formValue, username: this.user });
    this.formValue = '';
  }

  top() {
    document.getElementById('top').scrollIntoView();    
  }

  bottom() {
    document.getElementById('bottom').scrollIntoView();
    window.setTimeout( function () { this.top(); }, 2000 );
  }
}
