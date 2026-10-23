import React from 'react';
import { Signal } from '../types';

interface ScorecardViewProps {
  signals: Signal[];
  activeSignal: Signal;
  onSelectSignal: (sig: Signal) => void;
  onNavigate: (view: 'overview' | 'command-centre' | 'moment-queue' | 'scorecard' | 'decision-record' | 'war-room') => void;
}

export const ScorecardView: React.FC<ScorecardViewProps> = ({
  signals,
  activeSignal,
  onSelectSignal,
  onNavigate
}) => {
  // Compute disagreement spread
  const scores = activeSignal.agentDebate
    .map(a => parseInt(String(a.score).replace(/[^0-9]/g, ''), 10))
    .filter(n => !isNaN(n));
  
  const minScore = scores.length ? Math.min(...scores) : 74;
  const maxScore = scores.length ? Math.max(...scores) : 98;
  const spread = maxScore - minScore;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      {/* Header & Moment Switcher */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h2 className="text-2xl font-extrabold text-[#0E1B33]">Cross-Functional Scorecard</h2>
          <p className="text-xs text-[#5A6884]">
            Multi-agent consensus analysis & Disagreement Plot across all 7 disciplines.
          </p>
        </div>

        {/* Moment Dropdown Switcher */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-[#5A6884]">Evaluated Signal:</label>
          <select
            value={activeSignal.id}
            onChange={e => {
              const sig = signals.find(s => s.id === e.target.value);
              if (sig) onSelectSignal(sig);
            }}
            className="px-3 py-1.5 bg-white border border-[#DCE3F0] rounded-lg text-xs font-bold text-[#0E1B33] focus:border-[#1F44D6] outline-none cursor-pointer"
          >
            {signals.map(s => (
              <option key={s.id} value={s.id}>
                {s.brand}: {s.headline.slice(0, 45)}...
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Moment Header Card */}
      <div className="bg-white border border-[#DCE3F0] rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-md text-xs font-extrabold bg-[#1F44D6] text-white">
            {activeSignal.brand}
          </span>
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-gray-100 text-gray-700">
            {activeSignal.category}
          </span>
          <span className="text-xs font-mono font-bold text-[#B8770A] bg-[#FEF3C7] px-2 py-0.5 rounded-full">
            ⏱ Window: {activeSignal.windowClose}
          </span>
          <span className="text-xs font-mono font-bold text-[#0E9F6E] bg-[#E8F8F0] px-2 py-0.5 rounded-full">
            Opportunity: {activeSignal.opportunityScore}/100
          </span>
        </div>
        <h3 className="text-lg font-extrabold text-[#0E1B33]">{activeSignal.headline}</h3>
        <p className="text-xs text-[#5A6884] mt-1">{activeSignal.summary}</p>
      </div>

      {/* HERO: Disagreement Plot */}
      <div className="bg-white border border-[#DCE3F0] rounded-2xl p-6 shadow-xs">
        <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
          <div>
            <h4 className="text-base font-extrabold text-[#0E1B33]">
              Specialist Disagreement Plot (Spread: {spread} pts)
            </h4>
            <p className="text-xs text-[#5A6884]">
              Horizontal spread shows multi-agent friction. The Arbiter synthesizes trade-offs instead of calculating a simple average.
            </p>
          </div>
          <div className="px-3 py-1 bg-[#FFF1F2] border border-[#FFE4E6] rounded-lg text-xs font-bold text-[#BE123C]">
            Spread: {spread} Points (Max: {maxScore} · Min: {minScore})
          </div>
        </div>

        {/* Visual Spread Plot Line */}
        <div className="relative pt-6 pb-4 px-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] mb-6">
          <div className="h-1 bg-gray-300 rounded-full relative">
            {/* Axis Labels */}
            <span className="absolute -top-5 left-0 text-[10px] font-mono text-gray-400">0</span>
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-mono text-gray-400">50</span>
            <span className="absolute -top-5 right-0 text-[10px] font-mono text-gray-400">100</span>

            {/* Individual Agent Plot Markers */}
            {activeSignal.agentDebate.map((a, idx) => {
              const val = parseInt(String(a.score).replace(/[^0-9]/g, ''), 10) || 75;
              const isDevils = a.name.includes("Devil");
              return (
                <div
                  key={idx}
                  className="absolute -top-2.5 -translate-x-1/2 group cursor-pointer"
                  style={{ left: `${val}%` }}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white shadow-sm ${
                      isDevils ? 'bg-[#DC2626]' : 'bg-[#1F44D6]'
                    }`}
                  >
                    {val}
                  </div>
                  {/* Tooltip on hover */}
                  <div className="hidden group-hover:block absolute bottom-6 -translate-x-1/2 bg-black text-white text-[10px] font-semibold px-2 py-1 rounded shadow-lg whitespace-nowrap z-10">
                    {a.name}: {val}/100 ({a.verdict})
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-[10.5px] text-gray-500 mt-5 pt-2 border-t border-gray-200">
            <span>Critical Caution / Skepticism</span>
            <span className="text-[#1F44D6] font-bold">Consensus Decision Threshold: 85</span>
            <span className="text-[#0E9F6E] font-bold">High Strategic Alignment</span>
          </div>
        </div>

        {/* 7 Agents Detailed Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {activeSignal.agentDebate.map((a, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border flex flex-col justify-between ${
                a.name.includes("Devil")
                  ? 'bg-[#FEF2F2] border-[#FECACA]'
                  : 'bg-[#F8FAFC] border-[#E2E8F0]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      a.name.includes("Devil") ? 'bg-[#DC2626]' : 'bg-[#1F44D6]'
                    }`}
                  ></span>
                  <span className="font-extrabold text-xs text-[#0E1B33]">{a.name}</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono">
                  <span className="text-xs font-extrabold text-[#0E1B33]">{a.score}</span>
                  <span
                    className="text-[9.5px] font-bold px-1.5 py-0.2 rounded"
                    style={{ backgroundColor: a.bg, color: a.color }}
                  >
                    {a.verdict}
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#5A6884] leading-relaxed">{a.line}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Devil's Advocate Spotlight & Arbiter Neutralization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-[#150A0D] border border-[#631C23] text-white rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#F87171] uppercase tracking-wider mb-2">
            <span>⚠️</span>
            <span>Devil’s Advocate Hard Challenge</span>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            {activeSignal.agentDebate.find(a => a.name.includes("Devil"))?.line ||
              'Risk of competitor ambush alleging brand opportunism if deployment appears overly corporate.'}
          </p>
        </div>

        <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#166534] uppercase tracking-wider mb-2">
            <span>✓</span>
            <span>Arbiter Consensus Resolution</span>
          </div>
          <p className="text-xs text-[#166534] leading-relaxed">
            Neutralized counter-argument by commanding authentic UGC creator formats without corporate watermark overlays. ASCI compliance pre-verified.
          </p>
        </div>
      </div>
    </div>
  );
};
