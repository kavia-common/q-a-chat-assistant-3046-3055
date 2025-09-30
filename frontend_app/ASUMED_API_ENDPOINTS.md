# Assumed API Endpoints and Integration Plan

The frontend now calls real HTTP endpoints via ApiService (no mocks for LLM). Ensure your backend exposes these:

Base URL: relative to the frontend origin (default /api). You can proxy to your backend or serve under the same domain.

Endpoints:
- GET /api/questions?query=... -> Question[]
- POST /api/questions -> { title, body, tags: string[] } -> Question
- GET /api/questions/:id/answers -> Answer[]
- POST /api/questions/:id/answers -> { body } -> Answer
- POST /api/ask -> { prompt: string, context?: any } -> { answer: string }

LLM endpoint:
- ApiService.askLLM POSTs to /api/ask with { prompt, context? }.
- The backend should integrate with your LLM provider (OpenAI, Azure OpenAI, etc.) and return { answer: string }.
- Do NOT store API keys in the frontend. Keep provider credentials on the server.

Frontend configuration:
- ApiService uses a base of /api by default. If needed, update reverse proxy or add an HttpInterceptor to prepend your base.
- A .env.example is included to document variables; Angular does not automatically inject .env at build time.

Backend requirements (example):
- OPENAI_API_KEY or Azure equivalents must be configured on the server.
- CORS: If using a different domain, configure CORS or prefer same-origin via reverse proxy.
- Rate limiting and validation recommended to prevent abuse.

Security:
- Use an HttpInterceptor for auth tokens when backend auth is implemented.
- Sanitize/escape any rich content if added in the future.

Accessibility:
- Modals are labelled and use aria-modal roles.
- Buttons include aria-labels where icons are used.
