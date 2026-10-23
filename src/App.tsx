import React, { useState, useEffect } from 'react';
import { Signal, LedgerBlock, OperatorRole, LedgerVerificationResult } from './types';
import {
  fetchSignals,
  refreshSignals,
  searchSignals,
  fetchLedger,
  verifyLedgerChain,
  triggerTamperDemo,
  triggerRepairDemo,
  executeDecision,
  reevaluateWithConstraint,
  triggerRadarRefresh
} from './services/api';
import { Header } from './components/Header';
import { RoleModal } from './components/RoleModal';
import { TourModal } from './components/TourModal';
import { ShareModal } from './components/ShareModal';
import { CustomDetailModal } from './components/CustomDetailModal';
import { DecisionModal } from './components/DecisionModal';
import { OverviewView } from './views/OverviewView';
import { CommandCentreView } from './views/CommandCentreView';
import { MomentQueueView } from './views/MomentQueueView';
import { ScorecardView } from './views/ScorecardView';
import { DecisionRecordView } from './views/DecisionRecordView';
import { WarRoomView } from './views/WarRoomView';

type ViewMode = 'overview' | 'command-centre' | 'moment-queue' | 'scorecard' | 'decision-record' | 'war-room';

export const App: React.FC = () => {
  // Navigation State
  const [currentView, setCurrentView] = useState<ViewMode>(() => {
    const path = window.location.pathname.replace(/^\/|\/$/g, '');
    if (path === 'command-centre') return 'command-centre';
    if (path === 'moment-queue' || path === 'queue') return 'moment-queue';
    if (path === 'scorecard') return 'scorecard';
    if (path === 'decision-record' || path === 'decision') return 'decision-record';
    if (path === 'war-room') return 'war-room';
    return 'overview';
  });

  // Global App State
  const [signals, setSignals] = useState<Signal[]>([]);
  const [activeSignalIndex, setActiveSignalIndex] = useState(0);
  const [ledger, setLedger] = useState<LedgerBlock[]>([]);
  const [genesisHash, setGenesisHash] = useState('0000000000000000000000000000000000000000000000000000000000000000');
  const [latestHash, setLatestHash] = useState('0000000000000000000000000000000000000000000000000000000000000000');
  const [currentRole, setCurrentRole] = useState<OperatorRole>('Brand Director');
  const [isScanning, setIsScanning] = useState(false);
  const [liveClock, setLiveClock] = useState('00:00:00 IST');

  // Modals State
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCustomDetailOpen, setIsCustomDetailOpen] = useState(false);
  const [isDecisionOpen, setIsDecisionOpen] = useState(false);
  const [decisionChoice, setDecisionChoice] = useState<'APPROVE_DISPATCH' | 'STAND_DOWN'>('APPROVE_DISPATCH');

  // Real-time Clock effect
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setLiveClock(
        now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }) + ' IST'
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync browser URL with view state
  const handleNavigate = (view: ViewMode) => {
    setCurrentView(view);
    const path = view === 'overview' ? '/' : `/${view}/`;
    window.history.pushState(null, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const onPopState = () => {
      const path = window.location.pathname.replace(/^\/|\/$/g, '');
      if (path === 'command-centre') setCurrentView('command-centre');
      else if (path === 'moment-queue' || path === 'queue') setCurrentView('moment-queue');
      else if (path === 'scorecard') setCurrentView('scorecard');
      else if (path === 'decision-record' || path === 'decision') setCurrentView('decision-record');
      else if (path === 'war-room') setCurrentView('war-room');
      else setCurrentView('overview');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Initial Data Fetch
  const loadData = async () => {
    try {
      const [fetchedSignals, fetchedLedger] = await Promise.all([
        fetchSignals().catch(() => []),
        fetchLedger().catch(() => ({ ledger: [], genesisHash: '', latestHash: '' }))
      ]);

      if (fetchedSignals && fetchedSignals.length > 0) {
        setSignals(fetchedSignals);
      }
      if (fetchedLedger && fetchedLedger.ledger) {
        setLedger(fetchedLedger.ledger);
        if (fetchedLedger.genesisHash) setGenesisHash(fetchedLedger.genesisHash);
        if (fetchedLedger.latestHash) setLatestHash(fetchedLedger.latestHash);
      }
    } catch (err) {
      console.warn('Initial data load notice:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const activeSignal = signals[activeSignalIndex] || signals[0] || {
    id: 'SIG-8821',
    brand: 'Dove',
    category: 'Personal Care',
    headline: 'Trending Beauty Filter on Social Media Sparks Backlash on Unrealistic Standards',
    summary: 'Viral AI distortion filter reaches 42M impressions with Indian Gen-Z discussing algorithmic self-esteem pressures and authentic skin textures.',
    source: 'Instagram Reels & X Trends · 18m ago',
    seenTime: '18m ago',
    opportunityScore: 91,
    windowClose: '2h 40m',
    verdict: 'ACT FAST',
    verdictColor: '#0E9F6E',
    verdictBg: '#E8F8F0',
    decisionRights: 'Brand Director Level (Policy #41 · Budget > ₹5,00,000)',
    ask: 'Launch counter-campaign "#RealBeautyFiltered" featuring 25 authentic Indian micro-creators with ₹25,00,000 targeted amplification.',
    note: 'Dove Brand Twin Rule 4.2 strictly commands active opposition to artificial beauty distortion. ASCI disclaimer pre-cleared.',
    bullets: [
      { bg: '#E8F8F0', color: '#0E9F6E', mark: '✓', text: 'Brand Fit: 98% alignment with HUL Real Beauty Charter.' },
      { bg: '#E8F8F0', color: '#0E9F6E', mark: '✓', text: 'Regulatory: ASCI & CCPA guidelines verified. Zero misleading claim risk.' },
      { bg: '#FEF3C7', color: '#B8770A', mark: '!', text: 'Media Clock: Peak conversation window closes in 2h 40m before trend decays.' }
    ],
    agentDebate: [
      { name: 'Culture & Trend', score: '89/100', verdict: 'VIRAL CREST', color: '#0E9F6E', bg: '#E8F8F0', line: 'Discussion velocity peak in 3 hours.' },
      { name: 'Brand Constitution', score: '98/100', verdict: 'CORE IDENTITY', color: '#0E9F6E', bg: '#E8F8F0', line: 'Matches Core Rule 4.2.' },
      { name: 'ASCI & Legal Gate', score: '95/100', verdict: 'CLEAR TO PROCEED', color: '#0E9F6E', bg: '#E8F8F0', line: 'Positive representation standards met.' },
      { name: 'Commercial & ROI', score: '82/100', verdict: 'HIGH ROAS', color: '#0E9F6E', bg: '#E8F8F0', line: 'Estimated Earned Media Value: ₹1.8 Cr.' },
      { name: 'Channel & Creative', score: '90/100', verdict: 'ASSETS READY', color: '#0E9F6E', bg: '#E8F8F0', line: 'Pre-cleared UGC audio hooks in DAM.' },
      { name: 'PR & Community', score: '88/100', verdict: 'SAFE SENTIMENT', color: '#0E9F6E', bg: '#E8F8F0', line: 'Community defense playbook ready.' },
      { name: "Devil's Advocate", score: '74/100', verdict: 'WATCH CYNICISM', color: '#B8770A', bg: '#FEF4E4', line: 'Risk of competitor accusing HUL of moral posturing.' }
    ]
  };

  const handleSelectSignal = (sig: Signal) => {
    const idx = signals.findIndex(s => s.id === sig.id);
    if (idx !== -1) setActiveSignalIndex(idx);
  };

  // Execution Handler
  const handleExecuteDecision = async (params: {
    budget: number;
    notes: string;
    isOverride?: boolean;
    overrideJustification?: string;
  }) => {
    const res = await executeDecision({
      signalId: activeSignal.id,
      choice: decisionChoice,
      brand: activeSignal.brand,
      notes: params.notes,
      operator: currentRole,
      budget: params.budget,
      isOverride: params.isOverride,
      overrideJustification: params.overrideJustification
    });

    if (res.success) {
      // Update signal state locally
      setSignals(prev =>
        prev.map(s => {
          if (s.id === activeSignal.id) {
            return {
              ...s,
              executed: true,
              verdict: decisionChoice === 'STAND_DOWN' ? 'STOOD DOWN' : 'EXECUTED',
              verdictColor: decisionChoice === 'STAND_DOWN' ? '#6B7280' : '#0E9F6E',
              verdictBg: decisionChoice === 'STAND_DOWN' ? '#F3F4F6' : '#E8F8F0'
            };
          }
          return s;
        })
      );
      // Refresh ledger
      loadData();
    }
  };

  // Radar Scan Handler
  const handleScanNow = async () => {
    try {
      setIsScanning(true);
      await triggerRadarRefresh();
      await loadData();
    } catch (err) {
      console.warn('Scan trigger note:', err);
    } finally {
      setIsScanning(false);
    }
  };

  // Search Grounding Handler
  const handleSearch = async (query: string) => {
    try {
      setIsScanning(true);
      const res = await searchSignals(query);
      if (res.results && res.results.length > 0) {
        setSignals(prev => {
          const newSigs = [...res.results, ...prev];
          const seen = new Set();
          return newSigs.filter(s => {
            if (seen.has(s.id)) return false;
            seen.add(s.id);
            return true;
          });
        });
        setActiveSignalIndex(0);
      }
    } catch (err) {
      console.warn('Search note:', err);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FB] text-[#0E1B33] font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Universal Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        role={currentRole}
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
        onOpenTour={() => setIsTourModalOpen(true)}
        pendingCount={signals.filter(s => !s.executed).length}
        liveClock={liveClock}
        isScanning={isScanning}
        onScanNow={handleScanNow}
      />

      {/* Main View Router */}
      <div className="flex-1 flex flex-col">
        {currentView === 'overview' && (
          <OverviewView
            signals={signals}
            onNavigate={handleNavigate}
            onSelectSignal={handleSelectSignal}
            onSearch={handleSearch}
          />
        )}

        {currentView === 'command-centre' && (
          <CommandCentreView
            signals={signals}
            activeSignal={activeSignal}
            onSelectSignal={handleSelectSignal}
            role={currentRole}
            onApprove={() => {
              setDecisionChoice('APPROVE_DISPATCH');
              setIsDecisionOpen(true);
            }}
            onDecline={() => {
              setDecisionChoice('STAND_DOWN');
              setIsDecisionOpen(true);
            }}
            onEditDetail={() => setIsCustomDetailOpen(true)}
            onShare={() => setIsShareModalOpen(true)}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'moment-queue' && (
          <MomentQueueView
            signals={signals}
            onSelectSignal={handleSelectSignal}
            role={currentRole}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'scorecard' && (
          <ScorecardView
            signals={signals}
            activeSignal={activeSignal}
            onSelectSignal={handleSelectSignal}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'decision-record' && (
          <DecisionRecordView
            ledger={ledger}
            genesisHash={genesisHash}
            latestHash={latestHash}
            onVerify={verifyLedgerChain}
            onTamper={triggerTamperDemo}
            onRepair={triggerRepairDemo}
          />
        )}

        {currentView === 'war-room' && (
          <WarRoomView
            signals={signals}
            activeSignal={activeSignal}
            onSelectSignal={handleSelectSignal}
            role={currentRole}
            onOpenDecision={choice => {
              setDecisionChoice(choice);
              setIsDecisionOpen(true);
            }}
            onWhatIfSimulate={constraint =>
              reevaluateWithConstraint({
                signalId: activeSignal.id,
                constraint,
                brand: activeSignal.brand
              })
            }
            onTriggerRadar={handleScanNow}
            isScanning={isScanning}
          />
        )}
      </div>

      {/* Modals */}
      <RoleModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        currentRole={currentRole}
        onSelectRole={setCurrentRole}
      />

      <TourModal
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
        onNavigate={handleNavigate}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        signal={activeSignal}
      />

      {isCustomDetailOpen && (
        <CustomDetailModal
          isOpen={isCustomDetailOpen}
          onClose={() => setIsCustomDetailOpen(false)}
          signal={activeSignal}
          onSave={custom => {
            setSignals(prev =>
              prev.map(s => {
                if (s.id === activeSignal.id) {
                  return {
                    ...s,
                    customBudget: custom.budget,
                    customChannels: custom.channels,
                    customNote: custom.note
                  };
                }
                return s;
              })
            );
          }}
        />
      )}

      {isDecisionOpen && (
        <DecisionModal
          isOpen={isDecisionOpen}
          onClose={() => setIsDecisionOpen(false)}
          signal={activeSignal}
          role={currentRole}
          choice={decisionChoice}
          onExecute={handleExecuteDecision}
        />
      )}
    </div>
  );
};
