import React, { useState } from 'react';

interface TourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: 'overview' | 'command-centre' | 'moment-queue' | 'scorecard' | 'decision-record' | 'war-room') => void;
}

const TOUR_STEPS = [
  {
    step: 1,
    title: 'Welcome to NEXT Cultural Decision Infrastructure',
    targetView: 'overview' as const,
    subtitle: 'The Speed of Culture Meets the Scale of Unilever',
    body: 'Legacy corporate response times take 11 days. NEXT compresses this into 41 minutes using 7 Specialist AI Agents, an Arbiter, a Governance Matrix, and a Tamper-Proof Cryptographic Ledger.',
    tag: 'ARCHITECTURE OVERVIEW',
    bullets: [
      'Real-time FMCG signal ingestion from Indian digital & retail channels',
      'Living Brand Twins enforcing brand purpose rules and tone guardrails',
      'ASCI, CCPA, and DPDP 2023 pre-clearance with zero hallucinated claims'
    ]
  },
  {
    step: 2,
    title: 'The Command Centre: Category Intelligence Desk',
    targetView: 'command-centre' as const,
    subtitle: '5 Categories, 41 FMCG Brands, Zero Noise',
    body: 'Signals arrive already scored, debated, and priced. Human executives only see actionable decisions with estimated earned media value, reversibility SLAs, and risk audits.',
    tag: 'EXECUTION DESK',
    bullets: [
      'Switch between Personal Care, Beauty, Home Care, Foods, and Quick Commerce',
      'Change a detail (budget, channels, delivery notes) or trigger immediate dispatch',
      'Inspect the full 6-phase arrival timeline and Living Brand Twin charter'
    ]
  },
  {
    step: 3,
    title: 'The War Room Cockpit & Specialist Mesh',
    targetView: 'war-room' as const,
    subtitle: '7 Specialists Argue in Parallel — Never Averaged',
    body: 'Our 7 specialist agents evaluate culture, brand alignment, ASCI legal safety, commercial ROAS, channel assets, community sentiment, and the Devil’s Advocate counter-threat.',
    tag: 'AI MESH & SIMULATION',
    bullets: [
      'Devil’s Advocate aggressively challenges brand opportunism and competitor ambush',
      'Arbiter must neutralize the Devil’s objection before returning "ACT FAST"',
      'Interactive What-If Simulator: inject counterfactual constraints and see live score adjustments'
    ]
  },
  {
    step: 4,
    title: 'Cross-Functional Scorecard & Disagreement Plot',
    targetView: 'scorecard' as const,
    subtitle: 'Transparent Multi-Agent Friction',
    body: 'Instead of hiding internal dissent, NEXT visualizes the disagreement spread. See why legal and commercial agents clash and how the Arbiter negotiates high-stakes trade-offs.',
    tag: 'SCORECARD & RADAR',
    bullets: [
      'Disagreement Plot exposes score variances across disciplines',
      'Channel readiness breakdown for Reels, Shorts, and Blinkit dark stores',
      'Devil’s Advocate objection card with detailed mitigation protocols'
    ]
  },
  {
    step: 5,
    title: 'Cryptographic SHA-256 Ledger & Tamper Proofing',
    targetView: 'decision-record' as const,
    subtitle: 'Immutable Audit Trail with Simulated Multi-Adapter Receipts',
    body: 'Every executive decision produces an append-only block chained to the previous block’s SHA-256 hash. Test the live tamper demo to see the cryptographic alarm trigger instantly.',
    tag: 'IMMUTABLE AUDIT',
    bullets: [
      'Tamper Demo: alter a record in SQLite to break the cryptographic chain',
      'Verify Chain: recomputes SHA-256 signatures to confirm zero unauthorized changes',
      'Simulated multi-adapter receipts for Meta Ads API, Instagram Creators, and Blinkit'
    ]
  }
];

export const TourModal: React.FC<TourModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const stepData = TOUR_STEPS[currentStep];

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      onNavigate(TOUR_STEPS[nextStep].targetView);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      onNavigate(TOUR_STEPS[prevStep].targetView);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-[#DCE3F0] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Step Indicator Header */}
        <div className="bg-[#0E1B33] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-all text-sm w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
          >
            ✕
          </button>
          <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider bg-[#1F44D6] text-white uppercase mb-2">
            {stepData.tag} · STEP {stepData.step} OF {TOUR_STEPS.length}
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">{stepData.title}</h2>
          <p className="text-sm text-gray-300 mt-1">{stepData.subtitle}</p>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-[#0E1B33] leading-relaxed">{stepData.body}</p>

          <div className="space-y-2 bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl">
            <span className="text-[11px] font-bold text-[#5A6884] uppercase tracking-wider block mb-1">
              Key Architecture Highlights:
            </span>
            {stepData.bullets.map((b, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-[#1E293B]">
                <span className="text-[#0E9F6E] font-bold">✓</span>
                <span>{b}</span>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 pt-2">
            {TOUR_STEPS.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentStep ? 'w-6 bg-[#1F44D6]' : 'w-1.5 bg-[#CBD5E1]'
                }`}
              ></span>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 bg-[#F8FAFF] border-t border-[#E3E8F2] flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#5A6884] hover:text-[#0E1B33] transition-all"
          >
            Skip Tour
          </button>

          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="px-3 py-1.5 border border-[#DCE3F0] rounded-lg text-xs font-bold text-[#5A6884] hover:bg-white transition-all cursor-pointer"
              >
                Previous
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-4 py-1.5 bg-[#1F44D6] text-white rounded-lg text-xs font-bold hover:bg-[#163398] transition-all cursor-pointer shadow-sm"
            >
              {currentStep === TOUR_STEPS.length - 1 ? 'Finish Tour' : 'Next Screen →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
