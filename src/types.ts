export type Role = 'Software Engineer' | 'Data Scientist' | 'DevOps';
export type Level = 'Junior' | 'Mid' | 'Senior';

export interface Question {
  id: number;
  role: Role;
  level: Level;
  category: string;
  questionText: string;
  context?: string;
  expectedKeywords: string[];
}

export interface QuestionEvaluation {
  questionId: number;
  questionText: string;
  userAnswer: string;
  score: number; // 1.0 - 10.0
  recommendation: 'STRONG_HIRE' | 'HIRE' | 'LEANING_HIRE' | 'LEANING_NO_HIRE' | 'NO_HIRE';
  strengths: string[];
  growthAreas: string[];
  expectedKeyPoints: string[];
  feedbackSummary: string;
}

export interface InterviewSession {
  sessionId: string;
  role: Role;
  level: Level;
  createdAt: string;
  questions: Question[];
  currentQuestionIndex: number;
  evaluations: Record<number, QuestionEvaluation>;
  isCompleted: boolean;
}

export interface PastInterviewSummary {
  id: string;
  date: string;
  role: Role;
  level: Level;
  score: number;
  questionsCount: number;
  status: 'Completed' | 'In Progress';
}

export interface SessionResults {
  sessionId: string;
  role: Role;
  level: Level;
  completedAt: string;
  overallScore: number;
  evaluations: QuestionEvaluation[];
}
