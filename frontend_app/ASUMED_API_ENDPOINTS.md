# Assumed API Endpoints and Integration Plan

This frontend currently uses mock data via ApiService. Replace the mock implementations with real HTTP calls when the backend is available.

Base URL: relative to the frontend origin (e.g., /api)

Endpoints:
- GET /api/questions?query=... -> Question[]
- POST /api/questions -> { title, body, tags: string[] } -> Question
- GET /api/questions/:id/answers -> Answer[]
- POST /api/questions/:id/answers -> { body } -> Answer
- POST /api/ask -> { prompt: string, context?: any } -> { answer: string }

Integration Notes:
- Inject HttpClient into ApiService and replace `of(...).pipe(delay(...))` with `this.http.get/post`.
- Consider adding an environment variable FRONTEND_API_BASE (Angular environment files) to configure base URL; for now we assume same origin with /api prefix.
- For authentication, the Login modal currently only emits credentials. Hook into your auth provider and store tokens in a dedicated AuthService. Do not hardcode secrets in code; use environment configuration.

Security:
- Use HttpInterceptor for auth tokens when backend is ready.
- Sanitize/escape any rich content if added in the future.

Accessibility:
- Modals are labelled and use aria-modal roles.
- Buttons include aria-labels where icons are used.
