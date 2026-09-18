import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { SessionResults, QuestionEvaluation } from '../types';
import { interviewService } from '../services/interviewService';
import { LoadingSpinner } from '../components/LoadingSpinner';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowLeft,
  RotateCcw,
  BookOpen,
  Share2,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const FeedbackPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();

  const [results, setResults] = useState<SessionResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!sessionId) {
      navigate('/dashboard');
      return;
    }

    const fetched = interviewService.getSessionResults(sessionId);
    if (fetched) {
      setResults(fetched);
      // Auto expand all cards
      const initialExpanded: Record<number, boolean> = {};
      fetched.evaluations.forEach((ev) => {
        initialExpanded[ev.questionId] = true;
      });
      setExpandedCards(initialExpanded);
    }
    setLoading(false);
  }, [sessionId, navigate]);

  const toggleCard = (qId: number) => {
    setExpandedCards((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <LoadingSpinner message="Generating your comprehensive session feedback..." />
      </div>
    );
  }

  if (!results || results.evaluations.length === 0) {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 bg-white border border-slate-200 rounded-2xl text-center space-y-4 shadow-sm">
        <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Session Results Not Found</h2>
        <p className="text-sm text-slate-500">
          We couldn't retrieve results for session ID: <span className="font-mono">{sessionId}</span>. This may happen if the session was not finalized or was cleared.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-all cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    );
  }

  const scoreColor =
    results.overallScore >= 8.5
      ? 'text-emerald-600'
      : results.overallScore >= 7.0
      ? 'text-blue-600'
      : 'text-amber-600';

  const scoreBg =
    results.overallScore >= 8.5
      ? 'bg-emerald-50 border-emerald-200'
      : results.overallScore >= 7.0
      ? 'bg-blue-50 border-blue-200'
      : 'bg-amber-50 border-amber-200';

  const recommendationTitle =
    results.overallScore >= 8.5
      ? 'Strong Pass / Fast-Track Hire'
      : results.overallScore >= 7.0
      ? 'Pass / Recommend Hire'
      : results.overallScore >= 6.0
      ? 'Leaning Hire / Further Verification'
      : 'Needs Improvement';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Breadcrumb & Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200/80 px-3.5 py-2 rounded-xl shadow-xs transition-all w-fit cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200/80 px-3.5 py-2 rounded-xl shadow-xs transition-all cursor-pointer"
          >
            {copiedLink ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-600">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5 text-slate-500" />
                <span>Share Results</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              interviewService.startSession(results.role, results.level);
              navigate('/interview');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Retake Interview</span>
          </button>
        </div>
      </div>

      {/* Header & Overall Score Hero Banner */}
      <div className="bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Title Info */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                {results.role}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                {results.level} Level
              </span>
              <span className="text-xs text-slate-400">
                • {new Date(results.completedAt).toLocaleDateString()}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Session Results for {results.role}
            </h1>
            <p className="text-sm text-slate-500 max-w-xl">
              Objective AI assessment based on Google's technical hiring rubric covering algorithmic rigor, edge cases, and design trade-offs.
            </p>
          </div>

          {/* Right: Large Prominent Circular Progress Badge */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shrink-0">
            <div className="relative flex items-center justify-center">
              {/* Circular SVG ring */}
              <svg className="w-28 h-28 transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  className="stroke-slate-200"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  className={results.overallScore >= 8.0 ? 'stroke-emerald-500' : 'stroke-blue-600'}
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 48}
                  strokeDashoffset={2 * Math.PI * 48 * (1 - results.overallScore / 10)}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className={`text-3xl font-black ${scoreColor} tracking-tight`}>
                  {results.overallScore}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">out of 10</span>
              </div>
            </div>

            <span className={`mt-3 text-xs font-bold px-3 py-1 rounded-full border ${scoreBg} ${scoreColor}`}>
              {recommendationTitle}
            </span>
          </div>
        </div>
      </div>

      {/* Detailed Feedback Section: One Card for Each Question */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Question-by-Question Evaluation</h2>
            <p className="text-xs text-slate-500">
              Review how your answers scored against expected key points and core criteria
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
            {results.evaluations.length} Questions Evaluated
          </span>
        </div>

        {results.evaluations.map((item: QuestionEvaluation, idx: number) => {
          const isExpanded = expandedCards[item.questionId] ?? true;
          const isHigh = item.score >= 8.0;

          return (
            <div
              key={item.questionId}
              className="bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden transition-all"
            >
              {/* Card Header Accordion Trigger */}
              <div
                onClick={() => toggleCard(item.questionId)}
                className="p-5 sm:p-6 bg-slate-50/50 hover:bg-slate-50 cursor-pointer flex items-start justify-between gap-4 border-b border-slate-100 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    Q{idx + 1}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {item.questionText}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                      {item.feedbackSummary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span
                      className={`text-base font-black ${
                        isHigh ? 'text-emerald-600' : 'text-blue-600'
                      }`}
                    >
                      {item.score}
                    </span>
                    <span className="text-xs text-slate-400 font-normal">/10</span>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600">
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Card Collapsible Body */}
              {isExpanded && (
                <div className="p-6 space-y-6">
                  {/* User Answer Review */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Your Submitted Answer
                    </span>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans">
                      {item.userAnswer || 'No response provided.'}
                    </p>
                  </div>

                  {/* AI Evaluation: Strengths, Areas for Improvement, Expected Key Points */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Strengths (Green) */}
                    <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/70 space-y-2.5">
                      <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span>Key Strengths & Articulation</span>
                      </div>
                      <ul className="space-y-2">
                        {item.strengths.map((str, sIdx) => (
                          <li key={sIdx} className="text-xs text-emerald-950 flex items-start gap-2 leading-relaxed">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{str}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Areas for Improvement (Amber/Red) */}
                    <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/70 space-y-2.5">
                      <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        <span>Areas for Improvement & Edge Cases</span>
                      </div>
                      <ul className="space-y-2">
                        {item.growthAreas.map((area, aIdx) => (
                          <li key={aIdx} className="text-xs text-amber-950 flex items-start gap-2 leading-relaxed">
                            <span className="text-amber-600 font-bold">•</span>
                            <span>{area}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Expected Key Points (Styled clearly with tags) */}
                  <div className="pt-4 border-t border-slate-100 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                      <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                      <span>Expected Architecture & Concepts to Cover</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.expectedKeyPoints.map((point, pIdx) => (
                        <span
                          key={pIdx}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200/80"
                        >
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
