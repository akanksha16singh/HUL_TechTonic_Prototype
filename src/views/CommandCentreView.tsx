import React, { useState } from 'react';
import { Signal, OperatorRole } from '../types';

interface CommandCentreViewProps {
  signals: Signal[];
  activeSignal: Signal;
  onSelectSignal: (sig: Signal) => void;
  role: OperatorRole;
  onApprove: () => void;
  onDecline: () => void;
  onEditDetail: () => void;
  onShare: () => void;
  onNavigate: (view: 'overview' | 'command-centre' | 'moment-queue' | 'scorecard' | 'decision-record' | 'war-room') => void;
}

export const CommandCentreView: React.FC<CommandCentreViewProps> = ({
  signals,
  activeSignal,
  onSelectSignal,
  role,
  onApprove,
  onDecline,
  onEditDetail,
  onShare,
  onNavigate
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('Personal Care');
  const [activeTab, setActiveTab] = useState<'overview' | 'debate' | 'grounding' | 'precedent' | 'twin' | 'asci'>('overview');

  const categories = [
    {
      id: 'personal_care',
      name: 'Personal Care',
      brands: 'Rexona · Lifebuoy · Lux · Axe · Pepsodent',
      dot: '#1F44D6',
      live: '3 live',
      liveColor: '#1F44D6',
      liveBg: '#EAF0FF',
      metric: 'Live Category Delta',
      headline: 'Up 34%',
      trend: '+18% vs last week',
      trendColor: '#0E9F6E',
      spark: [12, 16, 18, 14, 22, 25, 20, 24, 28, 30]
    },
    {
      id: 'beauty_wellbeing',
      name: 'Beauty & Wellbeing',
      brands: 'Dove · Sunsilk · Pond’s · Lakmé · Tresemme',
      dot: '#0E7490',
      live: '2 live',
      liveColor: '#0E7490',
      liveBg: '#ECFEFF',
      metric: 'Quick-Commerce Velocity',
      headline: '2.4x Growth',
      trend: '+42% search volume',
      trendColor: '#0E9F6E',
      spark: [10, 14, 15, 18, 20, 24, 28, 32, 35, 38]
    },
    {
      id: 'home_care',
      name: 'Home Care',
      brands: 'Surf Excel · Rin · Vim · Comfort · Domex',
      dot: '#15803D',
      live: '2 live',
      liveColor: '#15803D',
      liveBg: '#F0FDF4',
      metric: 'Rural Sachet Infiltration',
      headline: 'Surge in Sachets',
      trend: '+12% volume lift',
      trendColor: '#0E9F6E',
      spark: [15, 18, 16, 20, 22, 21, 25, 27, 26, 29]
    },
    {
      id: 'foods_refreshment',
      name: 'Foods & Refreshment',
      brands: 'Brooke Bond · Bru · Knorr · Horlicks · Boost',
      dot: '#B91C1C',
      live: '1 live',
      liveColor: '#B91C1C',
      liveBg: '#FEF2F2',
      metric: 'Tea & Snacking Index',
      headline: 'Up 28%',
      trend: 'Monsoon tea tailwind',
      trendColor: '#0E9F6E',
      spark: [8, 10, 14, 16, 18, 20, 22, 24, 26, 28]
    },
    {
      id: 'supply_chain',
      name: 'Supply Chain & Quick Commerce',
      brands: 'Blinkit · Zepto · Instamart · Dark Stores',
      dot: '#475569',
      live: 'Active',
      liveColor: '#475569',
      liveBg: '#F1F5F9',
      metric: '10-Min SLA Fulfillment',
      headline: '98.4%',
      trend: 'Dark store SLA stable',
      trendColor: '#0E9F6E',
      spark: [25, 26, 25, 27, 28, 26, 29, 28, 29, 30]
    }
  ];

  const categorySignals = signals.filter(
    s => s.category.toLowerCase().includes(activeCategory.toLowerCase()) || activeCategory === 'Personal Care'
  );

  const displayQueue = categorySignals.length > 0 ? categorySignals : signals;

  return (
    <div className="flex flex-1 min-h-[calc(100vh-56px)] bg-[#F5F7FB]">
      {/* Left Sidebar: Categories & Pulse */}
      <aside className="w-72 flex-shrink-0 bg-white border-r border-[#E3E8F2] overflow-y-auto p-4 flex flex-col gap-4">
        <div>
          <div className="px-2 pb-2 text-[10px] font-bold tracking-widest text-[#5A6884] uppercase">
            Your Categories
          </div>
          <div className="space-y-2">
            {categories.map(cat => {
              const isActive = activeCategory === cat.name;
              return (
                <div
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? 'border-[#1F44D6] bg-[#F8FAFF] shadow-xs'
                      : 'border-[#E2E8F0] hover:border-[#CBD5E1] bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.dot }}></span>
                      <span className="font-extrabold text-xs text-[#0E1B33]">{cat.name}</span>
                    </div>
                    <span
                      className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full"
                      style={{ color: cat.liveColor, backgroundColor: cat.liveBg }}
                    >
                      {cat.live}
                    </span>
                  </div>

                  <p className="text-[10px] text-[#64748B] line-clamp-1 mb-2">{cat.brands}</p>

                  <div className="flex items-baseline justify-between mb-1 text-[10.5px]">
                    <span className="text-[#8492AC] font-medium">{cat.metric}</span>
                    <span className="font-extrabold text-[#0E1B33]">{cat.headline}</span>
                  </div>

                  {/* Mini Sparkline Bar Chart */}
                  <div className="flex items-end gap-0.5 h-5 pt-1">
                    {cat.spark.map((h, idx) => (
                      <div
                        key={idx}
                        className="flex-1 rounded-xs bg-[#1F44D6]/20"
                        style={{ height: `${(h / 38) * 100}%` }}
                      ></div>
                    ))}
                  </div>

                  <div className="text-[10px] font-semibold text-[#0E9F6E] mt-1.5">{cat.trend}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pulse Summary Box */}
        <div className="p-3.5 border border-[#E3E8F2] rounded-xl bg-[#F8FAFF]">
          <div className="text-[10px] font-bold text-[#5A6884] uppercase tracking-wider mb-2">
            Surveillance Pulse
          </div>
          <div className="space-y-2 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Real-Time Grounding</span>
                <span className="text-[#0E9F6E] font-bold">100% Verified</span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#0E9F6E] w-full rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>ASCI Pre-Clearance</span>
                <span className="text-[#1F44D6] font-bold">Zero Slips</span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#1F44D6] w-full rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Dark Store SLA</span>
                <span className="text-[#0E9F6E] font-bold">98.4%</span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#0E9F6E] w-[98%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Command Center Stage */}
      <main className="flex-1 min-w-0 overflow-y-auto p-6 space-y-5">
        {/* Scope Banner */}
        <div className="flex items-end justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-xl font-extrabold text-[#0E1B33]">{activeCategory} Command Desk</h2>
            <p className="text-xs text-[#5A6884]">
              Real-time surveillance lane for {activeCategory}. Pre-cleared against Brand Constitution Rules.
            </p>
          </div>
          <div className="text-right text-xs text-[#5A6884]">
            Operator Authority: <b className="text-[#1F44D6]">{role}</b>
          </div>
        </div>

        {/* Horizontal Moment Queue Cards */}
        <div>
          <div className="text-[10px] font-bold tracking-wider text-[#5A6884] uppercase mb-2">
            Category Signals Queue
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {displayQueue.map(sig => {
              const isSelected = activeSignal.id === sig.id;
              return (
                <div
                  key={sig.id}
                  onClick={() => onSelectSignal(sig)}
                  className={`w-64 flex-shrink-0 bg-white border rounded-xl p-3 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#1F44D6] border-t-4 border-t-[#1F44D6] shadow-sm'
                      : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className="text-[9.5px] font-extrabold px-1.5 py-0.5 rounded-full"
                      style={{ backgroundColor: sig.verdictBg, color: sig.verdictColor }}
                    >
                      {sig.verdict}
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-[#5A6884]">
                      ⏱ {sig.windowClose}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-xs text-[#0E1B33] line-clamp-1 mb-1">
                    {sig.headline}
                  </h4>
                  <div className="text-[10.5px] text-[#64748B] flex items-center justify-between">
                    <span>{sig.brand}</span>
                    <span className="font-mono font-bold text-[#0E9F6E]">
                      {sig.opportunityScore}/100
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Moment Hero Card */}
        <div className="bg-white border border-[#E3E8F2] rounded-2xl shadow-xs overflow-hidden">
          <div className="p-6 flex items-start justify-between gap-6 flex-wrap">
            <div className="flex-1 min-w-[320px]">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-md bg-[#EAF0FF] text-[#1F44D6]">
                  {activeSignal.brand}
                </span>
                <span
                  className="text-xs font-extrabold px-2.5 py-1 rounded-md"
                  style={{
                    backgroundColor: activeSignal.verdictBg,
                    color: activeSignal.verdictColor
                  }}
                >
                  {activeSignal.verdict}
                </span>
                <span className="text-xs text-[#5A6884]">{activeSignal.source}</span>
                {activeSignal.executed && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-green-100 text-green-700">
                    ✓ DISPATCHED & SEALED
                  </span>
                )}
              </div>
              <h3 className="text-xl font-extrabold text-[#0E1B33] leading-snug">
                {activeSignal.headline}
              </h3>
              <p className="text-sm text-[#5A6884] mt-2 leading-relaxed">
                {activeSignal.summary}
              </p>
            </div>

            {/* Window & Clock Gauge */}
            <div className="w-56 p-3.5 border border-[#E3E8F2] rounded-xl bg-[#F8FAFF] flex-shrink-0">
              <span className="text-[10px] font-bold text-[#5A6884] uppercase tracking-wider block mb-2">
                Opportunity Window
              </span>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Signal Seen:</span>
                  <span className="font-semibold text-gray-800">{activeSignal.seenTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Ready in:</span>
                  <span className="font-bold text-[#0E9F6E]">41 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Window Closes:</span>
                  <span className="font-bold text-[#B8770A]">{activeSignal.windowClose}</span>
                </div>
              </div>
              <div className="mt-2.5 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#0E9F6E] to-[#B8770A] w-3/4 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* "Your Call" Decision Action Box */}
          <div className="mx-6 mb-6 p-5 border border-[#DCE3F0] rounded-xl bg-[#F8FAFF] flex items-start justify-between gap-6 flex-wrap">
            <div className="flex-1 min-w-[300px]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-extrabold tracking-wider text-[#5A6884] uppercase">
                  Your Call
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#EAF0FF] text-[#1F44D6]">
                  {activeSignal.decisionRights}
                </span>
              </div>
              <h4 className="text-base font-extrabold text-[#0E1B33] mb-1.5">
                {activeSignal.ask}
              </h4>
              <p className="text-xs text-[#5A6884] leading-relaxed mb-3">
                {activeSignal.note}
              </p>

              {/* 3 Audit Bullets */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {activeSignal.bullets.map((b, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2.5 bg-white border border-[#E7EDF9] rounded-lg text-xs"
                  >
                    <span
                      className="w-4 h-4 rounded flex items-center justify-center font-bold text-[10px] flex-shrink-0"
                      style={{ backgroundColor: b.bg, color: b.color }}
                    >
                      {b.mark}
                    </span>
                    <span className="text-[#31456F] leading-tight">{b.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons Column */}
            <div className="w-64 flex flex-col gap-2 flex-shrink-0">
              {activeSignal.customBudget && (
                <div className="p-2.5 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg text-xs text-[#1E40AF]">
                  <div className="flex justify-between font-bold mb-1">
                    <span>✨ Detail Customized</span>
                    <span className="font-mono">₹{activeSignal.customBudget.toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-[11px] text-[#475569] line-clamp-1">
                    Channels: {(activeSignal.customChannels || []).join(', ')}
                  </p>
                </div>
              )}

              {activeSignal.executed ? (
                <div className="p-3 bg-white border border-[#A7F3D0] rounded-xl flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0E9F6E]">
                    <span className="w-5 h-5 rounded-full bg-[#0E9F6E] text-white flex items-center justify-center text-xs">
                      ✓
                    </span>
                    <span>Dispatched & Cryptographically Sealed</span>
                  </div>
                  <button
                    onClick={() => onNavigate('decision-record')}
                    className="w-full py-2 bg-[#1F44D6] text-white font-bold text-xs rounded-lg hover:bg-[#163398] transition-all cursor-pointer"
                  >
                    ⚡ View Decision Record & Ledger →
                  </button>
                  <button
                    onClick={onShare}
                    className="w-full py-1.5 bg-[#F8FAFC] border border-[#CBD5E1] text-[#1E293B] font-bold text-xs rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
                  >
                    📤 Share Insights with Team
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={onApprove}
                    className="w-full py-3 bg-[#0E9F6E] text-white font-extrabold text-xs rounded-xl hover:bg-[#0B8659] transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>⚡</span>
                    <span>ACT FAST (APPROVE)</span>
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={onEditDetail}
                      className="flex-1 py-2 bg-white border border-[#D3DFFF] text-[#1F44D6] font-bold text-xs rounded-lg hover:bg-[#EAF0FF] transition-all cursor-pointer"
                    >
                      Change a detail
                    </button>
                    <button
                      onClick={onDecline}
                      className="flex-1 py-2 bg-white border border-[#F6DDE1] text-[#C13A4C] font-bold text-xs rounded-lg hover:bg-[#FDF2F4] transition-all cursor-pointer"
                    >
                      Decline
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Detailed Inspector Tabs */}
          <div className="border-t border-[#E3E8F2]">
            <div className="flex gap-1 px-6 border-b border-[#E3E8F2] overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview', count: '6 Stats' },
                { id: 'debate', label: '7-Agent Debate', count: '7 Agents' },
                { id: 'grounding', label: 'Live Grounding', count: 'Sources' },
                { id: 'precedent', label: 'Ledger Precedent', count: 'Historical' },
                { id: 'twin', label: 'Living Twin v4.2', count: 'Rules' },
                { id: 'asci', label: 'ASCI & Legal Gate', count: 'Audited' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === t.id
                      ? 'border-[#1F44D6] text-[#1F44D6]'
                      : 'border-transparent text-[#5A6884] hover:text-[#0E1B33]'
                  }`}
                >
                  <span>{t.label}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-gray-100 text-gray-600">
                    {t.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-5">
                  {/* 6 Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                      <span className="text-[10px] text-gray-500 uppercase block font-mono">
                        Cultural Crest
                      </span>
                      <span className="font-extrabold text-sm text-[#0E9F6E]">92/100</span>
                    </div>
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                      <span className="text-[10px] text-gray-500 uppercase block font-mono">
                        Brand Alignment
                      </span>
                      <span className="font-extrabold text-sm text-[#0E9F6E]">98%</span>
                    </div>
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                      <span className="text-[10px] text-gray-500 uppercase block font-mono">
                        ASCI Risk
                      </span>
                      <span className="font-extrabold text-sm text-[#0E9F6E]">Zero</span>
                    </div>
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                      <span className="text-[10px] text-gray-500 uppercase block font-mono">
                        Earned Media
                      </span>
                      <span className="font-extrabold text-sm text-[#1F44D6]">₹1.8 Cr</span>
                    </div>
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                      <span className="text-[10px] text-gray-500 uppercase block font-mono">
                        Reversibility
                      </span>
                      <span className="font-extrabold text-sm text-[#0E9F6E]">&lt; 45s</span>
                    </div>
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                      <span className="text-[10px] text-gray-500 uppercase block font-mono">
                        Time to Action
                      </span>
                      <span className="font-extrabold text-sm text-[#0E9F6E]">41 min</span>
                    </div>
                  </div>

                  {/* Case For vs Case Against */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl">
                      <h5 className="font-extrabold text-xs text-[#166534] uppercase tracking-wider mb-2">
                        Why We Should Move (+)
                      </h5>
                      <ul className="text-xs text-[#166534] space-y-1.5">
                        <li>• Viral trend matches HUL brand constitution with 98% fidelity.</li>
                        <li>• Organic creator audio crests in 3 hours; first-mover advantage.</li>
                        <li>• Quick-commerce basket add-on delivers projected 7.2x ROAS.</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-[#FEF2F2] border border-[#FECACA] rounded-xl">
                      <h5 className="font-extrabold text-xs text-[#991B1B] uppercase tracking-wider mb-2">
                        Why We Might Not (!)
                      </h5>
                      <ul className="text-xs text-[#991B1B] space-y-1.5">
                        <li>• Devil’s Advocate warns of competitor ambush accusing brand of opportunism.</li>
                        <li>• Dark store refill SLAs in West metro clusters must not breach 100%.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'debate' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeSignal.agentDebate.map((a, idx) => (
                    <div key={idx} className="p-3.5 border border-[#E2E8F0] rounded-xl bg-[#F8FAFC]">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-extrabold text-xs text-[#0E1B33]">{a.name}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[10.5px] font-bold text-[#1F44D6]">
                            {a.score}
                          </span>
                          <span
                            className="text-[9.5px] font-extrabold px-1.5 py-0.5 rounded"
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
              )}

              {activeTab === 'grounding' && (
                <div className="space-y-3">
                  <p className="text-xs text-[#5A6884]">
                    Real-time market surveillance data ingested from verified sources:
                  </p>
                  <div className="space-y-2">
                    {(activeSignal.citations && activeSignal.citations.length > 0
                      ? activeSignal.citations
                      : [
                          { title: 'The Economic Times — FMCG & Consumer', uri: 'https://economictimes.indiatimes.com' },
                          { title: 'LiveMint Retail & Quick Commerce', uri: 'https://livemint.com' }
                        ]
                    ).map((c, idx) => (
                      <a
                        key={idx}
                        href={c.uri}
                        target="_blank"
                        rel="noreferrer"
                        className="block p-3 border border-[#E2E8F0] rounded-xl hover:border-[#1F44D6] bg-white transition-all text-xs"
                      >
                        <div className="font-extrabold text-[#1F44D6] mb-0.5">{c.title || c.uri}</div>
                        <div className="text-[11px] text-gray-500 font-mono truncate">{c.uri}</div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'precedent' && (
                <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-2">
                  <span className="text-[10px] font-bold text-[#5A6884] uppercase tracking-wider block">
                    Historical Precedent from Immutable Ledger
                  </span>
                  <h5 className="font-extrabold text-xs text-[#0E1B33]">
                    {activeSignal.ledgerPrecedent?.thenTitle || 'Prior HUL Reactive Execution'}
                  </h5>
                  <p className="text-xs text-[#5A6884]">
                    {activeSignal.ledgerPrecedent?.thenOutcome ||
                      '94% positive sentiment, 1.2B impressions, zero ASCI complaints.'}
                  </p>
                </div>
              )}

              {activeTab === 'twin' && (
                <div className="p-4 bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl space-y-2">
                  <span className="text-[10px] font-bold text-[#1E40AF] uppercase tracking-wider block">
                    Living Brand Twin v4.2 Charter Match
                  </span>
                  <h5 className="font-extrabold text-xs text-[#1E3A8A]">
                    {activeSignal.twinDetails?.source || `${activeSignal.brand} Brand Constitution`}
                  </h5>
                  <p className="text-xs text-[#1E3A8A] leading-relaxed">
                    {activeSignal.twinDetails?.matchAssessment ||
                      'Direct 98% alignment. Strictly adheres to genuine representation rules.'}
                  </p>
                </div>
              )}

              {activeTab === 'asci' && (
                <div className="p-4 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl space-y-2">
                  <span className="text-[10px] font-bold text-[#166534] uppercase tracking-wider block">
                    ASCI, CCPA & DPDP 2023 Regulatory Clearance
                  </span>
                  <div className="text-xs text-[#166534] space-y-1.5">
                    <div>✓ Chapter 1 ASCI Honest Representations: Claims backed by clinical dossier.</div>
                    <div>✓ DPDP 2023: Zero unauthorized personal data harvested.</div>
                    <div>✓ CCPA Dark Patterns Audit: Standard transparent pricing.</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
