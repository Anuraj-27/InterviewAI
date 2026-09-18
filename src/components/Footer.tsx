import React from 'react';
import { Bot, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white/70 backdrop-blur-xs py-6 text-slate-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-blue-600" />
          <span className="font-semibold text-slate-700">AI-Based Mock Interview Platform</span>
          <span className="text-slate-300">•</span>
          <span>Powered by Google Gemini & Spring Boot Architecture</span>
        </div>

        <div className="flex items-center gap-6 text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            Objective Rubric Scoring
          </span>
          <span>© {new Date().getFullYear()} MockAI Platform. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};
