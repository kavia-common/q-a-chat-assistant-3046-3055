import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { Question } from '../models/qa.models';
import { finalize } from 'rxjs';
import { EventBusService } from './event-bus.service';

/**
 * PUBLIC_INTERFACE
 * QuestionDataService holds local state for question feed and exposes methods to refresh and add.
 * This is a public service.
 */
@Injectable({ providedIn: 'root' })
export class QuestionDataService {
  readonly questions = signal<Question[]>([]);
  readonly loading = signal(false);

  private unsubscribeNew?: () => void;

  constructor(private api: ApiService, private bus: EventBusService) {
    // Listen for new questions emitted at app level via EventBus
    this.unsubscribeNew = this.bus.on('app:new-question', (detail: { title: string; body: string; tags: string[] }) => {
      this.addQuestion(detail);
    });
  }

  // PUBLIC_INTERFACE
  refresh(query = '') {
    /** This is a public function. Loads questions using the ApiService. */
    this.loading.set(true);
    this.api.getQuestions(query)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe((qs) => this.questions.set(qs));
  }

  // PUBLIC_INTERFACE
  addQuestion(payload: { title: string; body: string; tags: string[] }) {
    /** This is a public function. Adds a question and prepends to the feed. */
    this.api.addQuestion(payload).subscribe((q) => {
      this.questions.update(list => [q, ...list]);
    });
  }
}
