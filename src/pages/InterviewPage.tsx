import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InterviewSession, Question } from '../types';
import { interviewService } from '../services/interviewService';
import { LoadingSpinner } from '../components/LoadingSpinner';
import {
  Mic,
  MicOff,
  Send,
  SkipForward,
  Clock,
  Sparkles,
  Bot,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';

export const InterviewPage: React.FC = () => {
  const navigate = useNavigate();

  const [session, setSession] = useState<InterviewSession | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  // Initialize or resume session
  useEffect(() => {
    let active = interviewService.getCurrentSession();
    if (!active) {
      // Create a default senior software engineer session if accessed directly
      active = interviewService.startSession('Software Engineer', 'Senior');
    }
    setSession(active);
    setCurrentQuestionIndex(active.currentQuestionIndex || 0);

    // If answer already exists for this question, load it
    const activeQ = active.questions[active.currentQuestionIndex || 0];
    if (activeQ && active.evaluations[activeQ.id]) {
      setUserAnswer(active.evaluations[activeQ.id].userAnswer);
    }
  }, []);

  // Interview timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!session) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <LoadingSpinner message="Initializing interview session..." />
      </div>
    );
  }

  const currentQuestion: Question | undefined = session.questions[currentQuestionIndex];
  const totalQuestions = session.questions.length;
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Toggle Speech to Text (Dictation Simulation / Web Speech API)
  const toggleSpeechRecognition = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    // Check if browser supports SpeechRecognition
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript;
          }
          setUserAnswer((prev) => (prev ? prev + ' ' + transcript : transcript));
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
      } catch (err) {
        // Fallback simulation
        simulateSpeechInput();
      }
    } else {
      simulateSpeechInput();
    }
  };

  const simulateSpeechInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setUserAnswer((prev) =>
        prev
          ? prev + ' In addition, we must ensure high availability and resilient failure handling across nodes.'
          : 'To solve this architectural challenge, we should decompose the workflow into decoupled components using an asynchronous message bus.'
      );
      setIsListening(false);
    }, 2500);
  };

  const handleSkipQuestion = () => {
    if (currentQuestionIndex + 1 < totalQuestions) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      session.currentQuestionIndex = nextIdx;
      setUserAnswer('');
      setErrorNotice(null);
    } else {
      // Finished all questions
      const results = interviewService.finishSession(session.sessionId);
      navigate(`/feedback/${session.sessionId}`);
    }
  };

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim() || userAnswer.trim().length < 15) {
      setErrorNotice('Please provide a more complete answer (at least 15 characters) before submitting.');
      return;
    }

    if (!currentQuestion) return;

    setErrorNotice(null);
    setIsSubmitting(true);

    try {
      // Evaluate answer via service layer
      await interviewService.evaluateAnswer(
        session.sessionId,
        currentQuestion.id,
        userAnswer.trim()
      );

      // Check if more questions remain
      if (currentQuestionIndex + 1 < totalQuestions) {
        const nextIdx = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIdx);
        session.currentQuestionIndex = nextIdx;
        setUserAnswer('');
      } else {
        // All questions completed! Finalize and redirect to feedback
        interviewService.finishSession(session.sessionId);
        navigate(`/feedback/${session.sessionId}`);
      }
    } catch (err) {
      console.error(err);
      setErrorNotice('Error evaluating answer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Header / Status Bar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left: Role and Progress Info */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
              {session.role}
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              {session.level}
            </span>
          </div>

          <span className="text-slate-300 hidden sm:inline">•</span>

          <div className="text-xs font-medium text-slate-600">
            Question <span className="font-bold text-slate-900">{currentQuestionIndex + 1}</span> of{' '}
            <span className="font-bold text-slate-900">{totalQuestions}</span>
          </div>
        </div>

        {/* Center: Visual Progress Bar */}
        <div className="flex-1 max-w-xs hidden lg:block">
          <div className="flex justify-between text-[11px] text-slate-500 mb-1 font-medium">
            <span>Interview Progress</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/60">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Right: Elapsed Timer & Finish Button */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/80">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span>{formatTime(elapsedSeconds)}</span>
          </div>

          <button
            onClick={() => {
              interviewService.finishSession(session.sessionId);
              navigate(`/feedback/${session.sessionId}`);
            }}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            End Interview
          </button>
        </div>
      </div>

      {/* Main Split Screen Layout (Crucial UI) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[580px]">
        {/* Left Panel: Question Area */}
        <div className="lg:col-span-5 bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            {/* Header / Category */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Technical Prompt
                  </span>
                  <span className="text-xs font-semibold text-blue-600">
                    {currentQuestion?.category || 'System Architecture'}
                  </span>
                </div>
              </div>

              {/* AI Generating Indicator Pulse */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-[11px] text-slate-500 font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>AI Interviewer Active</span>
              </div>
            </div>

            {/* Question Card Content */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 relative">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                {currentQuestion?.questionText}
              </h2>

              {currentQuestion?.context && (
                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-start gap-2 text-xs text-slate-600">
                  <HelpCircle className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                  <p>{currentQuestion.context}</p>
                </div>
              )}
            </div>

            {/* Evaluation Focus Tips */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>Interviewer is looking for:</span>
              </span>
              <ul className="text-xs text-slate-600 space-y-1.5 pl-2 border-l-2 border-blue-200">
                <li>• Clear architectural breakdown & step-by-step logic</li>
                <li>• Real-world edge cases, failure states & concurrency</li>
                <li>• Trade-offs between complexity, latency, and memory</li>
              </ul>
            </div>
          </div>

          {/* Bottom Guidance */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
            <span>Estimated response: 2-4 mins</span>
          </div>
        </div>

        {/* Right Panel: Response Area */}
        <div className="lg:col-span-7 bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <form onSubmit={handleSubmitAnswer} className="flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-3 flex-1 flex flex-col">
              {/* Header with Mic Button */}
              <div className="flex items-center justify-between">
                <label htmlFor="interview-answer" className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>Your Answer</span>
                  <span className="text-xs font-normal text-slate-500">(Be concise & thorough)</span>
                </label>

                {/* Speech to Text Microphone Button */}
                <button
                  type="button"
                  onClick={toggleSpeechRecognition}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isListening
                      ? 'bg-red-50 text-red-600 border border-red-200 animate-pulse'
                      : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200'
                  }`}
                  title="Speech-to-text voice input"
                >
                  {isListening ? (
                    <>
                      <MicOff className="h-3.5 w-3.5 text-red-600" />
                      <span>Listening...</span>
                    </>
                  ) : (
                    <>
                      <Mic className="h-3.5 w-3.5 text-slate-600" />
                      <span>Voice Input</span>
                    </>
                  )}
                </button>
              </div>

              {/* Large Textarea */}
              <div className="relative flex-1 flex flex-col">
                <textarea
                  id="interview-answer"
                  value={userAnswer}
                  onChange={(e) => {
                    setUserAnswer(e.target.value);
                    if (errorNotice) setErrorNotice(null);
                  }}
                  disabled={isSubmitting}
                  placeholder="Type your technical explanation here... Walk through your thought process, data structures, algorithms, failure handling, and production trade-offs..."
                  className="w-full flex-1 min-h-[300px] p-4 bg-slate-50/70 border border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:bg-white rounded-xl text-slate-800 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none font-sans"
                />

                {/* Word & Char Counter */}
                <div className="absolute bottom-3 right-3 text-[11px] font-mono text-slate-400 bg-white/90 px-2 py-0.5 rounded border border-slate-200/60 shadow-2xs">
                  {userAnswer.trim() ? userAnswer.trim().split(/\s+/).length : 0} words • {userAnswer.length} chars
                </div>
              </div>

              {/* Validation error notice */}
              {errorNotice && (
                <div className="flex items-center gap-2 text-xs font-semibold text-red-600 bg-red-50 border border-red-200 p-2.5 rounded-lg">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorNotice}</span>
                </div>
              )}
            </div>

            {/* Action Buttons: Secondary Skip Question + Primary Submit Answer */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Secondary Button: Skip Question */}
              <button
                type="button"
                onClick={handleSkipQuestion}
                disabled={isSubmitting}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
              >
                <SkipForward className="h-3.5 w-3.5 text-slate-500" />
                <span>Skip Question</span>
              </button>

              {/* Primary Button: Submit Answer */}
              <button
                type="submit"
                disabled={isSubmitting || !userAnswer.trim()}
                className="w-full sm:w-auto px-7 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold text-xs shadow-md shadow-blue-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Evaluating with Gemini AI...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Answer</span>
                    <Send className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
