import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FeedComponent } from './components/feed/feed.component';
import { ChatPanelComponent } from './components/chat-panel/chat-panel.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { QuestionModalComponent } from './components/question-modal/question-modal.component';
import { EventBusService } from './services/event-bus.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    TopNavComponent,
    SidebarComponent,
    FeedComponent,
    ChatPanelComponent,
    LoginModalComponent,
    QuestionModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Q/A Assistant';
  loginOpen = false;
  askOpen = false;
  searchQuery = '';

  constructor(private bus: EventBusService) {}

  // PUBLIC_INTERFACE
  onSearch(query: string) {
    /** This is a public function. Updates the search query for the feed. */
    this.searchQuery = query;
  }

  // PUBLIC_INTERFACE
  openLogin() {
    /** This is a public function. Opens the login modal. */
    this.loginOpen = true;
  }

  // PUBLIC_INTERFACE
  openAskQuestion() {
    /** This is a public function. Opens the question submission modal. */
    this.askOpen = true;
  }

  // PUBLIC_INTERFACE
  handleLogin(payload: { email: string; password: string }) {
    /** This is a public function. Handles login submission - integration TBD (mock). */
    this.loginOpen = false;
    console.log('Login submitted', payload);
  }

  // PUBLIC_INTERFACE
  submitQuestion(payload: { title: string; body: string; tags: string[] }) {
    /** This is a public function. Handles asking new question - forwarded via EventBus. */
    this.askOpen = false;
    this.bus.emit('app:new-question', payload);
  }

  // PUBLIC_INTERFACE
  openQuestionDetail(qid: string) {
    /** This is a public function. Placeholder for future detailed view routing. */
    console.log('Open question detail', qid);
  }

  // PUBLIC_INTERFACE
  onSidebarShortcut(action: string) {
    /** This is a public function. Handles sidebar shortcut actions. */
    if (action === 'new') this.openAskQuestion();
    if (action === 'login') this.openLogin();
    if (action === 'help') console.info('Tip: Ask clear, concise questions. Use tags to improve relevance.');
  }
}
