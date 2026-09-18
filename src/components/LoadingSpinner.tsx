import React from 'react';
import { Sparkles } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  subMessage?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Analyzing response...',
  subMessage = 'Gemini AI is evaluating against the rubric criteria',
  size = 'md',
}) => {
  const spinnerSizeClass = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-3',
    lg: 'h-14 w-14 border-4',
  }[size];

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
      <div className="relative flex items-center justify-center">
        <div
          className={`${spinnerSizeClass} rounded-full border-blue-200 border-t-blue-600 animate-spin`}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center text-blue-600 animate-pulse">
          <Sparkles className={size === 'lg' ? 'h-5 w-5' : 'h-3.5 w-3.5'} />
        </div>
      </div>

      {message && (
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-800 tracking-tight">{message}</p>
          {subMessage && <p className="text-xs text-slate-500 max-w-xs mx-auto">{subMessage}</p>}
        </div>
      )}
    </div>
  );
};
