import React, { useState } from 'react';
import { Signal } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  signal?: Signal | null;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, signal }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !signal) return null;

  const summaryText = `[NEXT HUL Intelligence Brief]
Brand: ${signal.brand} (${signal.category})
Moment: ${signal.headline}
Opportunity Score: ${signal.opportunityScore}/100 · Verdict: ${signal.verdict}
Directive: ${signal.ask}
Audit: ${signal.note}
Governance: ${signal.decisionRights}
Verified on NEXT Decision Infrastructure`;

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-[#DCE3F0] p-6 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-[#E3E8F2] mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">📤</span>
            <div>
              <h3 className="font-extrabold text-base text-[#0E1B33]">Share Executive Brief</h3>
              <p className="text-xs text-[#5A6884]">Export standardized decision brief for leadership & agencies</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5 mb-4 font-mono text-[11px] text-[#1E293B] whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto select-all">
          {summaryText}
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <span className="text-xs text-[#0E9F6E] font-bold">
            {copied ? '✓ Copied to clipboard!' : 'Formats for Slack, Teams, and Email'}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 border border-[#DCE3F0] rounded-lg text-xs font-bold text-[#5A6884] hover:bg-gray-50"
            >
              Close
            </button>
            <button
              onClick={handleCopy}
              className="px-4 py-1.5 bg-[#1F44D6] text-white rounded-lg text-xs font-bold hover:bg-[#163398] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
