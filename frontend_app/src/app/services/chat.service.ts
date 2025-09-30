import { Injectable, signal } from '@angular/core';
import { ChatMessage } from '../models/qa.models';
import { ApiService } from './api.service';

/**
 * PUBLIC_INTERFACE
 * ChatService manages a simple chat session with the LLM using ApiService.askLLM.
 * This is a public service.
 */
@Injectable({ providedIn: 'root' })
export class ChatService {
  readonly messages = signal<ChatMessage[]>([]);
  readonly busy = signal(false);

  constructor(private api: ApiService) {
    // Seed system welcome
    this.messages.set([
      {
        id: 'sys1',
        role: 'assistant',
        content: 'Welcome! Ask anything about programming, best practices, or Angular.',
        createdAt: new Date().toISOString()
      }
    ]);
  }

  // PUBLIC_INTERFACE
  send(prompt: string) {
    /** This is a public function. Appends user message and fetches assistant response. */
    const userMsg: ChatMessage = {
      id: `m_${Math.random().toString(36).slice(2,9)}`,
      role: 'user',
      content: prompt,
      createdAt: new Date().toISOString()
    };
    this.messages.update(m => [...m, userMsg]);
    this.busy.set(true);
    this.api.askLLM({ prompt }).subscribe(res => {
      const assistant: ChatMessage = {
        id: `m_${Math.random().toString(36).slice(2,9)}`,
        role: 'assistant',
        content: res.answer,
        createdAt: new Date().toISOString()
      };
      this.messages.update(m => [...m, assistant]);
      this.busy.set(false);
    });
  }

  // PUBLIC_INTERFACE
  clear() {
    /** This is a public function. Clears the chat (keeps greeting). */
    this.messages.set([
      {
        id: 'sys1',
        role: 'assistant',
        content: 'Conversation cleared. How can I help next?',
        createdAt: new Date().toISOString()
      }
    ]);
  }
}
