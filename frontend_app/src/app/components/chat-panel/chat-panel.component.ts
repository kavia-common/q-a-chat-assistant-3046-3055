import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-panel',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './chat-panel.component.html',
  styleUrl: './chat-panel.component.css'
})
export class ChatPanelComponent {
  input = '';

  constructor(public chat: ChatService) {}

  // PUBLIC_INTERFACE
  send() {
    /** This is a public function. Sends the current input to the chat service. */
    const v = this.input.trim();
    if (!v) return;
    this.chat.send(v);
    this.input = '';
  }
}
