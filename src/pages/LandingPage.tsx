import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Bot, CheckCircle2, Shield, Sparkles, Terminal, TrendingUp, Layers, Zap } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
        {/* Subtle Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-400/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[300px] h-[200px] bg-emerald-400/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-6 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>Next-Gen Technical Mock Interview Platform</span>
          </div>

          {/* Large Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Ace Your Next Tech Interview with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              AI
            </span>
            .
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Practice role-specific technical questions and get instant, objective feedback. Calibrated for real-world engineering standards.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base transition-all shadow-xs cursor-pointer"
            >
              View Sample Sessions
            </button>
          </div>

          {/* Highlights ribbon */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Multi-Factor 10-Point Rubric</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Senior & Staff Level Scenarios</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Instant Architectural Feedback</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section (3 Cards) */}
      <section className="py-16 bg-slate-50/70 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Engineered for Serious Career Growth
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Three seamless steps to simulate actual technical hiring bar-raiser rounds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Select Role */}
            <div className="bg-white/80 backdrop-blur-xs border border-slate-200/80 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-xl bg-blue-50 border border-blue-200/60 text-blue-600 flex items-center justify-center font-bold text-lg mb-5 shadow-xs">
                  <Layers className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                  <span>Step 01</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Select Your Target Role</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Choose from Software Engineer, Data Scientist, or DevOps across Junior, Mid, or Senior levels with domain-calibrated question sets.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-medium text-slate-500">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>Calibrated to current 2026 hiring standards</span>
              </div>
            </div>

            {/* Card 2: Talk to AI */}
            <div className="bg-white/80 backdrop-blur-xs border border-slate-200/80 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-xl bg-emerald-50 border border-emerald-200/60 text-emerald-600 flex items-center justify-center font-bold text-lg mb-5 shadow-xs">
                  <Terminal className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
                  <span>Step 02</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Talk & Solve with AI</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Engage in a focused, distraction-free interview session. Articulate code architecture, concurrency, scale trade-offs, or system design.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-medium text-slate-500">
                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                <span>Distraction-free answering workstation</span>
              </div>
            </div>

            {/* Card 3: Get Feedback */}
            <div className="bg-white/80 backdrop-blur-xs border border-slate-200/80 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-600 flex items-center justify-center font-bold text-lg mb-5 shadow-xs">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
                  <span>Step 03</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Get Instant Feedback</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Receive an objective score (out of 10) with detailed evaluation cards highlighting strengths, missing key concepts, and actionable steps.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-medium text-slate-500">
                <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                <span>Specific rubric breakdowns & hire status</span>
              </div>
            </div>
          </div>

          {/* Interactive CTA Banner */}
          <div className="mt-14 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-bold">Ready to test your technical depth?</h3>
              <p className="text-blue-100 text-sm">Start a tailored 3-question mock session in under 30 seconds.</p>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 rounded-xl bg-white text-blue-700 font-bold hover:bg-blue-50 shadow-md transition-all hover:scale-105 active:scale-95 text-sm shrink-0 cursor-pointer"
            >
              Start Practice Session
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
