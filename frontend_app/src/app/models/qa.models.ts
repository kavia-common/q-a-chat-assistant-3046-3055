export interface User {
  id: string;
  displayName: string;
}

export interface Question {
  id: string;
  title: string;
  body: string;
  tags: string[];
  author?: User | null;
  createdAt: string;
  answerCount: number;
}

export interface Answer {
  id: string;
  questionId: string;
  body: string;
  author?: User | null;
  createdAt: string;
  upvotes: number;
}

export type ChatRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
}
