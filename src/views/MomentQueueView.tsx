import React, { useState } from 'react';
import { Signal, OperatorRole } from '../types';

interface MomentQueueViewProps {
  signals: Signal[];
  onSelectSignal: (sig: Signal) => void;
  role: OperatorRole;
  onNavigate: (view: 'overview' | 'command-centre' | 'moment-queue' | 'scorecard' | 'decision-record' | 'war-room') => void;
}

export const MomentQueueView: React.FC<MomentQueueViewProps> = ({
  signals,
  onSelectSignal,
  role,
  onNavigate
}) => {
  const [filterBrand, setFilterBrand] = useState<string>('All');

  const filteredSignals = filterBrand === 'All'
    ? signals
    : signals.filter(s => s.brand.toLowerCase() === filterBrand.toLowerCase());

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      {/* Authority Banner */}
      <div className="bg-[#EFF6FF] border border-[#BFDBFE] border-l-4 border-l-[#1F44D6] rounded-xl p-3.5 flex items-center justify-between gap-4 flex-wrap">
        <div className="text-xs text-[#1E3A8A] leading-relaxed">
          Active Authority: <b>{role}</b>. All incoming signals pre-routed according to{' '}
          <b>HUL Decision Rights Matrix (Policy #41)</b>.
        </div>
        <button
          onClick={() => onNavigate('war-room')}
          className="px-3 py-1.5 bg-[#1F44D6] text-white text-xs font-bold rounded-lg hover:bg-[#163398] transition-all"
        >
          Open Tactical Cockpit →
        </button>
      </div>

      {/* Funnel Stats Hero */}
      <div className="bg-white border border-[#DCE3F0] rounded-2xl p-6 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border-r border-[#E2E8F0] pr-4">
            <span className="text-[10.5px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
              Ingestion Rate
            </span>
            <div className="font-mono text-2xl font-extrabold text-[#0E1B33]">48 / hr</div>
            <span className="text-[11px] text-[#64748B]">Live RSS & Grounding</span>
          </div>

          <div className="border-r border-[#E2E8F0] pr-4">
            <span className="text-[10.5px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
              Pre-Vetted by Mesh
            </span>
            <div className="font-mono text-2xl font-extrabold text-[#0E9F6E]">100%</div>
            <span className="text-[11px] text-[#0E9F6E] font-medium">7 Specialist Agents</span>
          </div>

          <div className="border-r border-[#E2E8F0] pr-4">
            <span className="text-[10.5px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
              Awaiting Action
            </span>
            <div className="font-mono text-2xl font-extrabold text-[#B8770A]">
              {signals.filter(s => !s.executed).length}
            </div>
            <span className="text-[11px] text-[#B8770A] font-medium">In Human Window</span>
          </div>

          <div>
            <span className="text-[10.5px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
              Mean Time to Action
            </span>
            <div className="font-mono text-2xl font-extrabold text-[#0E9F6E]">41 min</div>
            <span className="text-[11px] text-[#64748B]">Industry bench: 11 days</span>
          </div>
        </div>
      </div>

      {/* Filters & Brand Selector */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['All', 'Dove', 'Surf Excel', 'Rexona', 'Pond’s', 'Lux', 'Brooke Bond'].map(b => (
            <button
              key={b}
              onClick={() => setFilterBrand(b)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterBrand === b
                  ? 'bg-[#1F44D6] text-white shadow-xs'
                  : 'bg-white border border-[#DCE3F0] text-[#5A6884] hover:bg-gray-50'
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        <span className="text-xs text-[#5A6884] font-medium">
          Showing {filteredSignals.length} moments
        </span>
      </div>

      {/* Moment Queue List */}
      <div className="space-y-3.5">
        {filteredSignals.map(sig => (
          <div
            key={sig.id}
            className={`bg-white border rounded-2xl p-5 transition-all shadow-xs flex flex-col gap-3 ${
              sig.executed ? 'border-l-4 border-l-[#64748B] opacity-85' : 'border-l-4 border-l-[#1F44D6]'
            }`}
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10.5px] font-extrabold bg-[#EAF0FF] text-[#1F44D6]">
                  {sig.brand}
                </span>
                <span
                  className="px-2 py-0.5 rounded text-[10.5px] font-extrabold"
                  style={{ backgroundColor: sig.verdictBg, color: sig.verdictColor }}
                >
                  {sig.verdict}
                </span>
                <span className="text-xs text-[#64748B]">{sig.category}</span>
                <span className="text-xs text-gray-400">·</span>
                <span className="text-xs text-[#64748B]">{sig.source}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#B8770A] bg-[#FEF3C7] px-2.5 py-0.5 rounded-full">
                  ⏱ Closes in {sig.windowClose}
                </span>
                <span className="font-mono text-sm font-extrabold text-[#0E9F6E]">
                  Score: {sig.opportunityScore}/100
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-[#0E1B33]">{sig.headline}</h3>
              <p className="text-xs text-[#5A6884] leading-relaxed mt-1">{sig.summary}</p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#F1F5F9] flex-wrap gap-2">
              <div className="text-xs text-[#475569]">
                <b>Recommendation:</b> {sig.ask}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onSelectSignal(sig);
                    onNavigate('scorecard');
                  }}
                  className="px-3 py-1.5 border border-[#DCE3F0] rounded-lg text-xs font-bold text-[#5A6884] hover:bg-gray-50"
                >
                  Scorecard
                </button>
                <button
                  onClick={() => {
                    onSelectSignal(sig);
                    onNavigate('war-room');
                  }}
                  className="px-3 py-1.5 bg-[#0F172A] text-white rounded-lg text-xs font-bold hover:bg-black"
                >
                  War Room →
                </button>
                <button
                  onClick={() => {
                    onSelectSignal(sig);
                    onNavigate('command-centre');
                  }}
                  className="px-3 py-1.5 bg-[#1F44D6] text-white rounded-lg text-xs font-bold hover:bg-[#163398]"
                >
                  Review Call →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
