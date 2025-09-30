import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay, map } from 'rxjs';
import { Answer, ChatMessage, Question } from '../models/qa.models';

const MOCK_LATENCY = 250;

/**
 * PUBLIC_INTERFACE
 * ApiService is a façade for backend HTTP calls.
 * This is a public service.
 * Assumed backend endpoints:
 * - GET /api/questions?query=... -> Question[]
 * - POST /api/questions -> {title,body,tags} -> Question
 * - GET /api/questions/:id/answers -> Answer[]
 * - POST /api/questions/:id/answers -> {body} -> Answer
 * - POST /api/ask -> {prompt, context?} -> { answer: string }
 *
 * For now, this uses mock data with rxjs 'of' and 'delay'. Replace with real HttpClient calls later.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  // PUBLIC_INTERFACE
  getQuestions(query = ''): Observable<Question[]> {
    /** This is a public function. Returns questions, optionally filtered. */
    const now = new Date().toISOString();
    const mock: Question[] = [
      {
        id: 'q1',
        title: 'How to structure Angular standalone components?',
        body: 'What are best practices for standalone components and providing services?',
        tags: ['angular', 'architecture'],
        createdAt: now,
        answerCount: 2,
        author: { id: 'u1', displayName: 'Ava' }
      },
      {
        id: 'q2',
        title: 'What is change detection in Angular?',
        body: 'Explain default vs onPush and when to use signals.',
        tags: ['angular', 'performance'],
        createdAt: now,
        answerCount: 1,
        author: { id: 'u2', displayName: 'Max' }
      }
    ];
    const filtered = query
      ? mock.filter(q => (q.title + ' ' + q.body + ' ' + q.tags.join(' ')).toLowerCase().includes(query.toLowerCase()))
      : mock;

    return of(filtered).pipe(delay(MOCK_LATENCY));
  }

  // PUBLIC_INTERFACE
  addQuestion(payload: { title: string; body: string; tags: string[] }): Observable<Question> {
    /** This is a public function. Creates a new question (mock). */
    const q: Question = {
      id: `q_${Math.random().toString(36).slice(2, 9)}`,
      title: payload.title,
      body: payload.body,
      tags: payload.tags,
      createdAt: new Date().toISOString(),
      answerCount: 0,
      author: { id: 'me', displayName: 'You' }
    };
    return of(q).pipe(delay(MOCK_LATENCY));
  }

  // PUBLIC_INTERFACE
  getAnswers(questionId: string): Observable<Answer[]> {
    /** This is a public function. Returns answers for a question (mock). */
    const now = new Date().toISOString();
    const mock: Answer[] = [
      {
        id: 'a1',
        questionId,
        body: 'Use standalone: true and provideIn root or provide in component providers as needed.',
        createdAt: now,
        upvotes: 4,
        author: { id: 'u3', displayName: 'Sam' }
      }
    ];
    return of(mock).pipe(delay(MOCK_LATENCY));
  }

  // PUBLIC_INTERFACE
  addAnswer(questionId: string, payload: { body: string }): Observable<Answer> {
    /** This is a public function. Adds an answer (mock). */
    const a: Answer = {
      id: `a_${Math.random().toString(36).slice(2,9)}`,
      questionId,
      body: payload.body,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      author: { id: 'me', displayName: 'You' }
    };
    return of(a).pipe(delay(MOCK_LATENCY));
  }

  // PUBLIC_INTERFACE
  askLLM(payload: { prompt: string; context?: any }): Observable<{ answer: string }> {
    /** This is a public function. Calls LLM via POST /api/ask (mock). Replace with real endpoint later. */
    // Example real call:
    // return this.http.post<{answer: string}>('/api/ask', payload);
    const canned = `Here's a concise explanation:\n- Angular standalone components are declared with standalone: true.\n- Provide services via providedIn or component providers.\n- Prefer signals and OnPush for performance.\n`;
    return of({ answer: canned }).pipe(delay(MOCK_LATENCY));
  }
}
