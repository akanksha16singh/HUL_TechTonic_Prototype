import React, { useState } from 'react';
import { Signal, OperatorRole } from '../types';

interface WarRoomViewProps {
  signals: Signal[];
  activeSignal: Signal;
  onSelectSignal: (sig: Signal) => void;
  role: OperatorRole;
  onOpenDecision: (choice: 'APPROVE_DISPATCH' | 'STAND_DOWN') => void;
  onWhatIfSimulate: (constraint: string) => Promise<any>;
  onTriggerRadar: () => Promise<any>;
  isScanning: boolean;
}

export const WarRoomView: React.FC<WarRoomViewProps> = ({
  signals,
  activeSignal,
  onSelectSignal,
  role,
  onOpenDecision,
  onWhatIfSimulate,
  onTriggerRadar,
  isScanning
}) => {
  const [constraintInput, setConstraintInput] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedDebate, setSimulatedDebate] = useState<any[] | null>(null);
  const [simResultNotice, setSimResultNotice] = useState<string | null>(null);

  const handleWhatIfSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!constraintInput.trim()) return;

    try {
      setIsSimulating(true);
      const res = await onWhatIfSimulate(constraintInput.trim());
      if (res && res.agentDebate) {
        setSimulatedDebate(res.agentDebate);
        setSimResultNotice(
          `What-If Applied: "${constraintInput}". Adjusted Opportunity: ${res.updatedOpportunityScore || 78}/100.`
        );
      }
    } catch (err: any) {
      console.error('What-If simulation error:', err);
    } finally {
      setIsSimulating(false);
    }
  };

  const handleResetSimulation = () => {
    setSimulatedDebate(null);
    setSimResultNotice(null);
    setConstraintInput('');
  };

  const displayDebate = simulatedDebate || activeSignal.agentDebate;
  const firstSixAgents = displayDebate.filter(a => !a.name.includes("Devil"));
  const devilsAdvocate = displayDebate.find(a => a.name.includes("Devil"));

  return (
    <div className="flex flex-1 min-h-[calc(100vh-56px)] bg-[#08090b] text-[#e9eaec]">
      {/* Left Sidebar: Live Tactical Queue */}
      <aside className="w-80 flex-shrink-0 bg-[#0b0d10] border-r border-[#1f2329] overflow-y-auto flex flex-col">
        <div className="p-4 border-b border-[#1f2329] flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-[#4fbf85] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#4fbf85] animate-ping"></span>
            Tactical Firehose
          </span>
          <span className="font-mono text-[10px] text-gray-500">{signals.length} ACTIVE</span>
        </div>

        <div className="divide-y divide-[#16191e] overflow-y-auto flex-1">
          {signals.map(sig => {
            const isSelected = activeSignal.id === sig.id;
            return (
              <div
                key={sig.id}
                onClick={() => {
                  onSelectSignal(sig);
                  handleResetSimulation();
                }}
                className={`p-4 cursor-pointer transition-all border-l-3 ${
                  isSelected
                    ? 'bg-[#14171d] border-l-[#4fbf85]'
                    : sig.executed
                    ? 'border-l-[#3b82f6] opacity-80 hover:bg-[#12151b]'
                    : 'border-l-transparent hover:bg-[#12151b]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[10px] font-extrabold text-[#3b82f6] bg-[#3b82f6]/10 px-1.5 py-0.5 rounded">
                    {sig.brand}
                  </span>
                  <span className="font-mono text-[10px] text-[#4fbf85]">
                    ⏱ {sig.windowClose}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-white leading-snug line-clamp-2 mb-1.5">
                  {sig.headline}
                </h4>
                <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
                  <span>Score: {sig.opportunityScore}/100</span>
                  <span className={sig.executed ? 'text-[#3b82f6]' : 'text-[#4fbf85]'}>
                    {sig.executed ? 'SEALED ✓' : sig.verdict}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Center Tactical Cockpit */}
      <main className="flex-1 min-w-0 overflow-y-auto p-6 space-y-5">
        {/* Radar Scanner HUD */}
        <div className="bg-[#0b0d12] border border-[#1d2535] rounded-xl p-4 relative overflow-hidden">
          <div
            className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent ${
              isScanning ? 'animate-pulse' : ''
            }`}
          ></div>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0E9F6E] animate-ping"></span>
              <div>
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider block">
                  AI Surveillance Radar · Live Indian Metros
                </span>
                <span className="text-[11px] text-gray-400">
                  Google Search Grounding + Native RSS across HUL portfolio
                </span>
              </div>
            </div>

            <button
              onClick={onTriggerRadar}
              disabled={isScanning}
              className="px-3.5 py-1.5 bg-[#1F44D6] hover:bg-[#163398] text-white text-xs font-mono font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isScanning ? (
                <>
                  <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <span>⚡</span>
                  <span>Trigger Radar Scan</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Active Signal Header Card */}
        <div className="bg-[#0f1216] border border-[#1f2329] rounded-xl p-5 shadow-lg">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-extrabold px-2 py-0.5 rounded bg-[#3b82f6]/20 text-[#60a5fa]">
                {activeSignal.brand}
              </span>
              <span className="font-mono text-xs font-extrabold px-2 py-0.5 rounded bg-[#0E9F6E]/20 text-[#4fbf85]">
                {activeSignal.verdict}
              </span>
              <span className="text-xs text-gray-400 font-mono">{activeSignal.source}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#f59e0b] bg-[#f59e0b]/10 px-2 py-0.5 rounded">
                ⏱ {activeSignal.windowClose} Left
              </span>
              <span className="font-mono text-sm font-extrabold text-[#4fbf85]">
                Score: {activeSignal.opportunityScore}/100
              </span>
            </div>
          </div>

          <h2 className="text-xl font-extrabold text-white leading-snug">
            {activeSignal.headline}
          </h2>
          <p className="text-xs text-gray-300 mt-2 leading-relaxed">
            {activeSignal.summary}
          </p>
        </div>

        {/* 6 Specialist Agents: 3-Column Fixed Grid */}
        <div className="bg-[#0f1216] border border-[#1f2329] rounded-xl overflow-hidden shadow-lg">
          <div className="p-3.5 bg-[#0b0d10] border-b border-[#1f2329] flex items-center justify-between font-mono text-xs text-gray-400 uppercase tracking-wider">
            <span>Specialist Agent Mesh (Concurrent Evaluation)</span>
            <span>Non-Averaged Consensus</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#181b21]">
            {firstSixAgents.map((agent, idx) => (
              <div key={idx} className="p-4 bg-[#0f1216] hover:bg-[#14171e] transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-extrabold text-white">
                      {agent.name}
                    </span>
                    <div className="flex items-center gap-1.5 font-mono">
                      <span className="text-xs font-bold text-[#60a5fa]">{agent.score}</span>
                      {agent.diff && (
                        <span className="text-[10px] font-bold text-yellow-400">
                          {agent.diff}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{agent.line}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Devil's Advocate Full-Width Band */}
          {devilsAdvocate && (
            <div className="p-4 bg-[#150a0d] border-t border-[#631c23] flex items-start gap-3">
              <span className="text-base flex-shrink-0">⚠️</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-[#f87171] uppercase tracking-wider">
                    {devilsAdvocate.name}: Aggressive Skepticism & Ambush Challenge
                  </span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-xs font-bold text-[#f87171]">{devilsAdvocate.score}</span>
                    {devilsAdvocate.diff && (
                      <span className="text-xs font-bold text-red-400">
                        {devilsAdvocate.diff}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-red-200 leading-relaxed">
                  {devilsAdvocate.line}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Interactive "What-If" Counterfactual Simulator */}
        <div className="bg-[#0f1216] border border-[#1f2329] rounded-xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div>
              <h3 className="font-mono text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span>🧪</span>
                <span>Interactive What-If Counterfactual Simulator</span>
              </h3>
              <p className="text-xs text-gray-400">
                Stress-test the agent mesh with dynamic market shocks and operator constraints.
              </p>
            </div>
            {simulatedDebate && (
              <button
                onClick={handleResetSimulation}
                className="text-xs font-mono text-[#3b82f6] hover:underline"
              >
                Reset to Baseline ↺
              </button>
            )}
          </div>

          <form onSubmit={handleWhatIfSubmit} className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Inject constraint (e.g. 'Competitor launches 40% discount', 'Torrential monsoon floods transit lines')..."
              value={constraintInput}
              onChange={e => setConstraintInput(e.target.value)}
              className="flex-1 px-4 py-2 bg-[#08090b] border border-[#22262c] rounded-lg text-xs text-white focus:border-[#3b82f6] outline-none font-mono"
            />
            <button
              type="submit"
              disabled={isSimulating}
              className="px-4 py-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-mono font-bold text-xs rounded-lg transition-all cursor-pointer disabled:opacity-50 whitespace-nowrap"
            >
              {isSimulating ? 'Simulating...' : 'Simulate Shock'}
            </button>
          </form>

          {simResultNotice && (
            <div className="p-3 bg-[#1e1b4b] border border-[#4338ca] rounded-lg text-xs font-mono text-[#c7d2fe] flex items-center justify-between">
              <span>{simResultNotice}</span>
              <span className="text-[10px] text-gray-400">Specialist scores adjusted live</span>
            </div>
          )}
        </div>

        {/* Operational Dispatch Panel */}
        <div className="bg-[#0b0d10] border border-[#1f2329] rounded-xl p-5 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="font-mono text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Executive Call · Role: <b className="text-white">{role}</b>
            </div>
            <p className="text-xs text-gray-300 max-w-xl">
              {activeSignal.ask}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenDecision('STAND_DOWN')}
              className="px-4 py-2.5 bg-transparent border border-[#ef4444] text-[#f87171] hover:bg-[#ef4444]/10 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer"
            >
              Stand Down
            </button>
            <button
              onClick={() => onOpenDecision('APPROVE_DISPATCH')}
              className="px-5 py-2.5 bg-[#0E9F6E] hover:bg-[#0b8659] text-white rounded-lg text-xs font-mono font-extrabold tracking-wider transition-all cursor-pointer shadow-lg flex items-center gap-1.5"
            >
              <span>⚡</span>
              <span>AUTHORIZE DISPATCH</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
