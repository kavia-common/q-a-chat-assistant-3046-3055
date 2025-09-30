import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, delay, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Answer, Question } from '../models/qa.models';

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
 * Notes:
 * - Base URL: same-origin, prefixed with /api by default. If your deployment uses a different
 *   path or domain, add an HttpInterceptor or a global base href accordingly.
 * - If your backend requires API keys or auth headers (e.g., for OpenAI/Azure OpenAI), configure
 *   them server-side. Do NOT expose secrets in frontend code. See ASUMED_API_ENDPOINTS.md and
 *   .env.example for guidance.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  // You can change this prefix if you deploy the API elsewhere and route via a proxy.
  private readonly base = '/api';

  constructor(private http: HttpClient) {}

  // PUBLIC_INTERFACE
  getQuestions(query = ''): Observable<Question[]> {
    /** This is a public function. Returns questions, optionally filtered, from the backend. */
    const params = query ? new HttpParams().set('query', query) : undefined;
    return this.http
      .get<Question[]>(`${this.base}/questions`, { params })
      .pipe(
        catchError(err => this.handleHttpError(err, 'Failed to load questions'))
      );
  }

  // PUBLIC_INTERFACE
  addQuestion(payload: { title: string; body: string; tags: string[] }): Observable<Question> {
    /** This is a public function. Creates a new question via backend. */
    return this.http
      .post<Question>(`${this.base}/questions`, payload)
      .pipe(
        catchError(err => this.handleHttpError(err, 'Failed to add question'))
      );
  }

  // PUBLIC_INTERFACE
  getAnswers(questionId: string): Observable<Answer[]> {
    /** This is a public function. Returns answers for a question via backend. */
    return this.http
      .get<Answer[]>(`${this.base}/questions/${encodeURIComponent(questionId)}/answers`)
      .pipe(
        catchError(err => this.handleHttpError(err, 'Failed to load answers'))
      );
  }

  // PUBLIC_INTERFACE
  addAnswer(questionId: string, payload: { body: string }): Observable<Answer> {
    /** This is a public function. Adds an answer via backend. */
    return this.http
      .post<Answer>(`${this.base}/questions/${encodeURIComponent(questionId)}/answers`, payload)
      .pipe(
        catchError(err => this.handleHttpError(err, 'Failed to add answer'))
      );
  }

  // PUBLIC_INTERFACE
  askLLM(payload: { prompt: string; context?: any }): Observable<{ answer: string }> {
    /**
     * This is a public function. Calls LLM via POST /api/ask.
     * The backend should forward to the configured LLM provider (OpenAI/Azure/etc.).
     * No API keys should be placed in frontend code.
     */
    return this.http
      .post<{ answer: string }>(`${this.base}/ask`, payload)
      .pipe(
        // Ensure shape is as expected
        map(res => ({ answer: (res && typeof res.answer === 'string') ? res.answer : '' })),
        catchError(err => this.handleHttpError(err, 'LLM request failed'))
      );
  }

  /**
   * Converts Http errors into a clean observable error with user-friendly message.
   * Logs technical details to console for developers.
   */
  private handleHttpError(err: HttpErrorResponse, friendlyMessage: string) {
    // Log the raw error for debugging (do not expose sensitive data to users)
    console.error('[ApiService] HTTP error:', err);
    const message = err?.error?.message || err?.statusText || friendlyMessage;
    return throwError(() => new Error(message));
  }
}
