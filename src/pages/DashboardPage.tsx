import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Role, Level, PastInterviewSummary } from '../types';
import { interviewService } from '../services/interviewService';
import { Play, Calendar, Award, ChevronRight, Briefcase, Zap, ShieldCheck, ArrowUpRight, BarChart3 } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<Role>('Software Engineer');
  const [selectedLevel, setSelectedLevel] = useState<Level>('Senior');
  const [isStarting, setIsStarting] = useState(false);
  const [pastInterviews, setPastInterviews] = useState<PastInterviewSummary[]>([]);

  useEffect(() => {
    setPastInterviews(interviewService.getPastInterviews());
  }, []);

  const handleStartInterview = (e: React.FormEvent) => {
    e.preventDefault();
    setIsStarting(true);

    // Initialize session via service
    const session = interviewService.startSession(selectedRole, selectedLevel);

    setTimeout(() => {
      setIsStarting(false);
      navigate('/interview');
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back, Alex
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track your mock interview progress, benchmark your technical articulation, and prepare for top-tier rounds.
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 bg-white border border-slate-200/80 px-4 py-2.5 rounded-xl shadow-xs">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            <span>Sessions Completed: {pastInterviews.length}</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5 text-blue-600">
            <Award className="h-4 w-4" />
            <span>Avg Score: 8.4/10</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Start New Session Form + Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Card: "Start a New Session" */}
        <div className="lg:col-span-7 bg-white/90 backdrop-blur-xs border border-slate-200/90 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-200/60 text-blue-600 flex items-center justify-center font-bold shadow-xs">
                <Play className="h-5 w-5 fill-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Start a New Session</h2>
                <p className="text-xs text-slate-500">Configure your target role and difficulty level</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              3 Questions
            </span>
          </div>

          <form onSubmit={handleStartInterview} className="space-y-6">
            {/* Role Dropdown */}
            <div className="space-y-2">
              <label htmlFor="role-select" className="block text-sm font-semibold text-slate-800">
                Target Job Role
              </label>
              <div className="relative">
                <select
                  id="role-select"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as Role)}
                  className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl px-4 py-3 text-slate-800 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer"
                >
                  <option value="Software Engineer">Software Engineer (Backend, Concurrency, Architecture)</option>
                  <option value="Data Scientist">Data Scientist (Machine Learning, Algorithms, MLOps)</option>
                  <option value="DevOps">DevOps (Kubernetes, CI/CD, Observability, IaC)</option>
                </select>
              </div>
              <p className="text-[11px] text-slate-500">
                Tailored question banks dynamically generated for your specialized discipline.
              </p>
            </div>

            {/* Level Dropdown */}
            <div className="space-y-2">
              <label htmlFor="level-select" className="block text-sm font-semibold text-slate-800">
                Experience Level
              </label>
              <div className="relative">
                <select
                  id="level-select"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value as Level)}
                  className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl px-4 py-3 text-slate-800 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer"
                >
                  <option value="Junior">Junior (0-2 Years - Language fundamentals, basic algorithms)</option>
                  <option value="Mid">Mid-Level (3-5 Years - Production troubleshooting, design patterns)</option>
                  <option value="Senior">Senior (5+ Years - Distributed systems, scale, trade-offs)</option>
                </select>
              </div>
            </div>

            {/* Session Preview Info */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                <Zap className="h-4 w-4 text-amber-500" />
                <span>What to Expect in this Session:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 pl-1 text-slate-600 text-[11px]">
                <li>Detailed technical scenarios reflecting real-world senior engineering interviews</li>
                <li>Full control to articulate in text with optional mic transcript dictation</li>
                <li>Comprehensive 10-point rubric breakdown with hire recommendation upon completion</li>
              </ul>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              disabled={isStarting}
              className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-sm shadow-md shadow-blue-600/25 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isStarting ? (
                <>
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Preparing Your Questions...</span>
                </>
              ) : (
                <>
                  <span>Start Interview</span>
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Start Tip */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/70 border border-blue-200/70 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center gap-2 text-blue-700 font-bold text-sm mb-2">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
              <span>Interviewer Evaluation Rubric</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Gemini AI evaluates answers using a standardized 4-pillar enterprise framework:
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-semibold">
              <div className="p-2.5 rounded-lg bg-white border border-blue-100 shadow-2xs text-slate-700">
                1. Technical Accuracy
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-blue-100 shadow-2xs text-slate-700">
                2. Depth & Mechanics
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-blue-100 shadow-2xs text-slate-700">
                3. Trade-off Awareness
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-blue-100 shadow-2xs text-slate-700">
                4. Communication Clarity
              </div>
            </div>
          </div>

          {/* Quick Action Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                <BarChart3 className="h-4 w-4 text-emerald-600" />
                <span>Performance Benchmark</span>
              </h3>
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                Top 15%
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Candidates who practice 3 or more mock sessions show an average 2.4 point improvement in their overall technical score.
            </p>
          </div>
        </div>
      </div>

      {/* History Table: Recent Past Interviews */}
      <div className="bg-white/90 backdrop-blur-xs border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recent Past Interviews</h2>
            <p className="text-xs text-slate-500">Review your past scores, evaluations, and progress</p>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Showing {pastInterviews.length} sessions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/80 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200/60">
              <tr>
                <th scope="col" className="px-6 py-3.5">Date</th>
                <th scope="col" className="px-6 py-3.5">Target Role</th>
                <th scope="col" className="px-6 py-3.5">Seniority</th>
                <th scope="col" className="px-6 py-3.5">Score</th>
                <th scope="col" className="px-6 py-3.5">Status</th>
                <th scope="col" className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pastInterviews.map((session) => {
                const isPassing = session.score >= 8.0;
                return (
                  <tr key={session.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span>{session.date}</span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {session.role}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/60">
                        {session.level}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-bold text-sm ${
                            isPassing ? 'text-emerald-600' : 'text-amber-600'
                          }`}
                        >
                          {session.score}/10
                        </span>
                        <div className="w-16 bg-slate-200 rounded-full h-1.5 overflow-hidden hidden sm:block">
                          <div
                            className={`h-1.5 rounded-full ${
                              isPassing ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                            style={{ width: `${session.score * 10}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/70">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                        {session.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => navigate(`/feedback/${session.id}`)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                      >
                        <span>View Results</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
