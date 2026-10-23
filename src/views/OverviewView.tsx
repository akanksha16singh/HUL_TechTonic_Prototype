import React, { useState } from 'react';
import { Signal } from '../types';

interface OverviewViewProps {
  signals: Signal[];
  onNavigate: (view: 'overview' | 'command-centre' | 'moment-queue' | 'scorecard' | 'decision-record' | 'war-room') => void;
  onSelectSignal: (sig: Signal) => void;
  onSearch: (q: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  signals,
  onNavigate,
  onSelectSignal,
  onSearch
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      onNavigate('command-centre');
    }
  };

  const agentsList = [
    { name: 'Culture & Trend', role: 'Cultural crest, vernacular resonance, Gen-Z audio trends', score: '92/100', dot: '#0E9F6E' },
    { name: 'Brand Constitution', role: 'Living Brand Twin v4.2 alignment, rule violations', score: '98/100', dot: '#0E9F6E' },
    { name: 'ASCI & Legal Gate', role: 'Misleading claim audit, DPDP 2023, disclaimers', score: '95/100', dot: '#0E9F6E' },
    { name: 'Commercial & ROI', role: 'Quick commerce conversions, incremental margin, ROAS', score: '85/100', dot: '#1F44D6' },
    { name: 'Channel & Creative', role: 'Reels / Shorts 9:16 format, DAM asset speed (< 20m)', score: '90/100', dot: '#0E9F6E' },
    { name: 'PR & Community', role: 'Troll protection, bad-faith quote tweets, holding lines', score: '88/100', dot: '#0E9F6E' },
    { name: "Devil's Advocate", role: 'Ambush risks, brand opportunism critique, competitor moves', score: '74/100', dot: '#B8770A' },
    { name: 'The Arbiter', role: 'Synthesizes non-averaging consensus & neutralizes objections', score: 'Consensus', dot: '#1F44D6' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Signature Latency Line */}
      <div className="mb-6 relative h-9">
        <div className="absolute top-[17px] left-0 right-0 h-0.5 bg-[#DCE3F0]"></div>
        <div className="absolute top-[17px] left-0 h-0.5 w-3/4 bg-[#1F44D6] transition-all"></div>
        <div className="absolute top-[11px] left-[74%] w-3.5 h-3.5 rounded-full bg-[#1F44D6] shadow-[0_0_0_6px_rgba(31,68,214,0.14)]"></div>
        <div className="absolute top-[26px] left-0 text-[11px] font-semibold text-[#5A6884]">
          0m: Scout Radar ingest
        </div>
        <div className="absolute top-[26px] right-0 text-[11px] font-bold text-[#1F44D6]">
          41m: Human executive call (Was 11 days)
        </div>
      </div>

      {/* Hero Headline */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#0E1B33] leading-tight max-w-2xl mb-3">
          When culture moves in India, HUL moves in <span className="text-[#1F44D6]">41 minutes</span>.
        </h1>
        <p className="text-base text-[#5A6884] max-w-3xl leading-relaxed">
          NEXT is the Cultural Decision Infrastructure for Hindustan Unilever. Seven specialist agents evaluate every cultural signal, an Arbiter synthesizes trade-offs, a governance matrix enforces authority, and an immutable SHA-256 ledger seals the call.
        </p>
      </div>

      {/* Live Metrics Counter Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-8">
        <div className="bg-white border border-[#DCE3F0] rounded-xl p-4 flex flex-col gap-1 shadow-xs">
          <span className="font-mono text-[10px] text-[#5A6884] uppercase tracking-wider">
            Time to Action
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl font-bold text-[#0E9F6E]">41 min</span>
            <span className="text-[11px] text-gray-400">was 11 days</span>
          </div>
        </div>

        <div className="bg-white border border-[#DCE3F0] rounded-xl p-4 flex flex-col gap-1 shadow-xs">
          <span className="font-mono text-[10px] text-[#5A6884] uppercase tracking-wider">
            Signals Synthesized
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl font-bold text-[#0E1B33]">1,284</span>
            <span className="text-[11px] text-[#1F44D6] font-semibold">+37 joined</span>
          </div>
        </div>

        <div className="bg-white border border-[#DCE3F0] rounded-xl p-4 flex flex-col gap-1 shadow-xs">
          <span className="font-mono text-[10px] text-[#5A6884] uppercase tracking-wider">
            Deliberately Passed
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl font-bold text-[#B8770A]">58%</span>
            <span className="text-[11px] text-gray-400">on purpose</span>
          </div>
        </div>

        <div className="bg-white border border-[#DCE3F0] rounded-xl p-4 flex flex-col gap-1 shadow-xs">
          <span className="font-mono text-[10px] text-[#5A6884] uppercase tracking-wider">
            ASCI / Legal Slips
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl font-bold text-[#0E9F6E]">0</span>
            <span className="text-[11px] text-[#0E9F6E] font-semibold">100% compliant</span>
          </div>
        </div>
      </div>

      {/* Real-time AI News & Signal Trigger Box */}
      <div className="bg-white border border-[#C7D6FF] border-l-4 border-l-[#1F44D6] rounded-2xl p-5 mb-8 shadow-sm flex items-center gap-4 flex-wrap">
        <div className="flex-1 min-w-[280px]">
          <span className="text-[10px] font-bold text-[#1F44D6] uppercase tracking-wider block mb-1">
            Real-Time Search Grounding & FMCG Signal Scanner
          </span>
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="Search Indian cultural trends or HUL brands (e.g. Dove, Monsoon mud, Rexona humidity)..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              className="flex-1 h-11 px-4 border border-[#DCE3F0] rounded-lg text-sm text-[#0E1B33] focus:border-[#1F44D6] focus:ring-1 focus:ring-[#1F44D6] outline-none"
            />
            <button
              type="submit"
              className="h-11 px-5 bg-[#1F44D6] text-white font-bold text-xs rounded-lg hover:bg-[#163398] transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>🔍</span>
              <span>Scan Radar</span>
            </button>
          </form>
        </div>
      </div>

      {/* Navigation Surfaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {/* Command Centre */}
        <div
          onClick={() => onNavigate('command-centre')}
          className="bg-white border border-[#DCE3F0] rounded-2xl p-6 hover:shadow-lg hover:border-[#C3CFE8] transition-all cursor-pointer flex flex-col gap-3 group"
        >
          <div className="font-mono text-[11px] font-bold text-[#5A6884] uppercase tracking-wider">
            Category Decision Desk
          </div>
          <h2 className="text-xl font-extrabold text-[#0E1B33] group-hover:text-[#1F44D6] transition-colors">
            Command Centre
          </h2>
          <p className="text-sm text-[#5A6884] leading-relaxed">
            Five core categories, 41 FMCG brands. Every live signal arrives pre-priced, vetted by 7 specialist agents, and mapped to brand constitution guidelines.
          </p>
          <div className="mt-auto pt-3 font-bold text-sm text-[#1F44D6] flex items-center gap-1">
            Open Decision Desk →
          </div>
        </div>

        {/* War Room (Dark) */}
        <div
          onClick={() => onNavigate('war-room')}
          className="bg-[#08090b] border border-[#1f2329] text-white rounded-2xl p-6 hover:shadow-xl hover:border-[#3b82f6] transition-all cursor-pointer flex flex-col gap-3 group"
        >
          <div className="font-mono text-[11px] font-bold text-[#4fbf85] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#4fbf85] animate-pulse"></span>
            Real-Time Tactical Cockpit
          </div>
          <h2 className="text-xl font-extrabold text-white group-hover:text-[#4fbf85] transition-colors">
            Cultural War Room
          </h2>
          <p className="text-sm text-[#9aa1ab] leading-relaxed">
            High-pressure single-moment cockpit. Live 7-agent mesh, Devil’s Advocate counter-threat challenge, and interactive What-If counterfactual simulation.
          </p>
          <div className="mt-auto pt-3 font-bold text-sm text-[#4fbf85] flex items-center gap-1">
            Enter Tactical War Room →
          </div>
        </div>

        {/* Moment Queue */}
        <div
          onClick={() => onNavigate('moment-queue')}
          className="bg-white border border-[#DCE3F0] rounded-2xl p-6 hover:shadow-lg hover:border-[#C3CFE8] transition-all cursor-pointer flex flex-col gap-3 group"
        >
          <div className="font-mono text-[11px] font-bold text-[#5A6884] uppercase tracking-wider">
            Triage Intake Pipeline
          </div>
          <h2 className="text-xl font-extrabold text-[#0E1B33] group-hover:text-[#1F44D6] transition-colors">
            Moment Queue
          </h2>
          <p className="text-sm text-[#5A6884] leading-relaxed">
            Prioritized intake funnel sorting opportunities by velocity, brand fit, and decaying execution clocks before cultural trends expire.
          </p>
          <div className="mt-auto pt-3 font-bold text-sm text-[#1F44D6] flex items-center gap-1">
            Inspect Queue →
          </div>
        </div>

        {/* Decision Record & Ledger */}
        <div
          onClick={() => onNavigate('decision-record')}
          className="bg-white border border-[#DCE3F0] rounded-2xl p-6 hover:shadow-lg hover:border-[#C3CFE8] transition-all cursor-pointer flex flex-col gap-3 group"
        >
          <div className="font-mono text-[11px] font-bold text-[#0E9F6E] uppercase tracking-wider">
            Cryptographic SHA-256 Ledger
          </div>
          <h2 className="text-xl font-extrabold text-[#0E1B33] group-hover:text-[#1F44D6] transition-colors">
            Decision Record & Impact Ledger
          </h2>
          <p className="text-sm text-[#5A6884] leading-relaxed">
            Unalterable append-only ledger chained to genesis hash. Test the live tamper demo and inspect simulated dispatch receipts across Meta and Blinkit.
          </p>
          <div className="mt-auto pt-3 font-bold text-sm text-[#1F44D6] flex items-center gap-1">
            Explore Tamper-Proof Ledger →
          </div>
        </div>
      </div>

      {/* 7 Specialist Agents Interactive Grid */}
      <div className="bg-white border border-[#DCE3F0] rounded-2xl p-6 mb-10 shadow-xs">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <h3 className="text-lg font-extrabold text-[#0E1B33]">7-Agent Specialist Mesh</h3>
            <p className="text-xs text-[#5A6884]">
              Independent domain perspectives evaluated concurrently — never averaged mathematically.
            </p>
          </div>
          <button
            onClick={() => onNavigate('scorecard')}
            className="text-xs font-bold text-[#1F44D6] hover:underline"
          >
            View Disagreement Plot on Scorecard →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {agentsList.map(a => (
            <div
              key={a.name}
              className="p-3.5 border border-[#E2E8F0] rounded-xl bg-[#F8FAFC] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: a.dot }}></span>
                    <span className="font-extrabold text-xs text-[#0E1B33]">{a.name}</span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-[#5A6884]">{a.score}</span>
                </div>
                <p className="text-[11px] text-[#64748B] leading-relaxed">{a.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Live Moments List */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-extrabold text-[#0E1B33]">Current High-Priority Moments</h3>
          <span className="text-xs text-[#5A6884]">Auto-ranked by Opportunity Score</span>
        </div>

        <div className="space-y-3">
          {signals.slice(0, 3).map(sig => (
            <div
              key={sig.id}
              onClick={() => {
                onSelectSignal(sig);
                onNavigate('command-centre');
              }}
              className="bg-white border border-[#DCE3F0] rounded-xl p-4 hover:border-[#1F44D6] transition-all cursor-pointer flex items-center justify-between gap-4 flex-wrap shadow-xs"
            >
              <div className="flex-1 min-w-[280px]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#EAF0FF] text-[#1F44D6]">
                    {sig.brand}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-extrabold"
                    style={{ backgroundColor: sig.verdictBg, color: sig.verdictColor }}
                  >
                    {sig.verdict}
                  </span>
                  <span className="text-xs text-[#5A6884]">{sig.source}</span>
                </div>
                <h4 className="font-extrabold text-sm text-[#0E1B33]">{sig.headline}</h4>
                <p className="text-xs text-[#64748B] line-clamp-1 mt-0.5">{sig.summary}</p>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block font-mono">OPPORTUNITY</span>
                  <span className="font-mono text-base font-extrabold text-[#0E9F6E]">
                    {sig.opportunityScore}/100
                  </span>
                </div>
                <span className="text-[#1F44D6] font-bold text-xs">Review Call →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
