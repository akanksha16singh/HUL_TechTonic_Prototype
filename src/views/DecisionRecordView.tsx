import React, { useState } from 'react';
import { LedgerBlock, LedgerVerificationResult } from '../types';

interface DecisionRecordViewProps {
  ledger: LedgerBlock[];
  genesisHash: string;
  latestHash: string;
  onVerify: () => Promise<LedgerVerificationResult>;
  onTamper: () => Promise<any>;
  onRepair: () => Promise<any>;
}

export const DecisionRecordView: React.FC<DecisionRecordViewProps> = ({
  ledger,
  genesisHash,
  latestHash,
  onVerify,
  onTamper,
  onRepair
}) => {
  const [verification, setVerification] = useState<LedgerVerificationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleVerify = async () => {
    try {
      setLoading(true);
      const res = await onVerify();
      setVerification(res);
      setStatusMessage(
        res.verified
          ? '✓ Cryptographic Audit Passed: All SHA-256 block signatures match unalterable chain.'
          : `⚠️ Tamper Detected at Block ${res.failedBlockId}! Cryptographic chain broken.`
      );
    } catch (err: any) {
      setStatusMessage(`Audit error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTamper = async () => {
    try {
      setLoading(true);
      const res = await onTamper();
      setStatusMessage(
        `[TAMPER INJECTED] Modified Block ${res.tamperedBlockId} spend without recalculating SHA-256 hash. Run "Verify Full Chain" to test alarm.`
      );
      setVerification(null);
    } catch (err: any) {
      setStatusMessage(`Tamper error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRepair = async () => {
    try {
      setLoading(true);
      await onRepair();
      setStatusMessage('✓ Ledger restored and all block signatures resynchronized.');
      setVerification(null);
    } catch (err: any) {
      setStatusMessage(`Repair error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h2 className="text-2xl font-extrabold text-[#0E1B33]">
            Decision Record & Cryptographic Ledger
          </h2>
          <p className="text-xs text-[#5A6884]">
            Immutable SHA-256 append-only ledger sealing all autonomous & executive HUL campaign actions.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleVerify}
            disabled={loading}
            className="px-4 py-2 bg-[#0E9F6E] text-white rounded-lg text-xs font-bold hover:bg-[#0B8659] transition-all cursor-pointer shadow-xs disabled:opacity-50 flex items-center gap-1.5"
          >
            <span>🛡️</span>
            <span>Verify Full Chain</span>
          </button>
          <button
            onClick={handleTamper}
            disabled={loading}
            className="px-3.5 py-2 bg-white border border-[#F6DDE1] text-[#C13A4C] rounded-lg text-xs font-bold hover:bg-[#FDF2F4] transition-all cursor-pointer disabled:opacity-50"
            title="Simulate unauthorized budget alteration in database"
          >
            Tamper Block (Demo)
          </button>
          <button
            onClick={handleRepair}
            disabled={loading}
            className="px-3.5 py-2 bg-white border border-[#DCE3F0] text-[#5A6884] rounded-lg text-xs font-bold hover:bg-gray-50 transition-all cursor-pointer disabled:opacity-50"
          >
            Repair & Resync
          </button>
        </div>
      </div>

      {/* Audit Feedback Banner */}
      {statusMessage && (
        <div
          className={`p-4 rounded-xl text-xs font-bold flex items-center justify-between gap-3 ${
            statusMessage.includes('Passed') || statusMessage.includes('restored')
              ? 'bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534]'
              : 'bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B]'
          }`}
        >
          <span>{statusMessage}</span>
          <button
            onClick={() => setStatusMessage(null)}
            className="text-gray-400 hover:text-gray-700 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Cryptographic Ledger Summary Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-[#DCE3F0] rounded-xl p-4 shadow-xs">
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
            Total Sealed Blocks
          </span>
          <div className="font-mono text-2xl font-extrabold text-[#0E1B33]">
            {ledger.length}
          </div>
          <span className="text-[11px] text-[#0E9F6E] font-semibold">100% SHA-256 Chained</span>
        </div>

        <div className="bg-white border border-[#DCE3F0] rounded-xl p-4 shadow-xs">
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
            Genesis Hash
          </span>
          <div className="font-mono text-xs font-bold text-[#64748B] truncate">
            {genesisHash}
          </div>
          <span className="text-[11px] text-gray-400">Fixed Baseline</span>
        </div>

        <div className="bg-white border border-[#DCE3F0] rounded-xl p-4 shadow-xs">
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
            Latest Block Signature
          </span>
          <div className="font-mono text-xs font-bold text-[#1F44D6] truncate">
            {latestHash}
          </div>
          <span className="text-[11px] text-[#1F44D6] font-semibold">Top of Chain</span>
        </div>
      </div>

      {/* Ledger Block List */}
      <div className="space-y-4">
        <h3 className="text-base font-extrabold text-[#0E1B33]">Block Explorer (Chronological)</h3>

        {ledger.map((block, idx) => {
          const isStoodDown = block.choice === 'STAND_DOWN';
          const auditStatus = verification?.chainAudit?.find(a => a.blockId === block.id);

          return (
            <div
              key={block.id}
              className={`bg-white border rounded-2xl p-5 shadow-xs transition-all ${
                auditStatus && !auditStatus.valid
                  ? 'border-red-500 bg-red-50/40'
                  : 'border-[#DCE3F0]'
              }`}
            >
              {/* Top Meta Line */}
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-extrabold px-2 py-0.5 rounded bg-gray-100 text-gray-800">
                    BLOCK #{ledger.length - idx}
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs font-extrabold bg-[#EAF0FF] text-[#1F44D6]">
                    {block.brand}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-extrabold ${
                      isStoodDown ? 'bg-gray-100 text-gray-700' : 'bg-[#E8F8F0] text-[#0E9F6E]'
                    }`}
                  >
                    {block.choice}
                  </span>
                  <span className="text-xs text-[#64748B]">{block.humanDate || block.timestamp}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-extrabold text-[#0E1B33]">
                    {block.formattedBudget || (block.budget ? `₹${block.budget.toLocaleString('en-IN')}` : '₹0')}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      auditStatus
                        ? auditStatus.valid
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700 animate-pulse'
                        : 'bg-blue-50 text-blue-700'
                    }`}
                  >
                    {auditStatus ? (auditStatus.valid ? '✓ Verified Hash' : '❌ HASH CORRUPTED') : '✓ Sealed'}
                  </span>
                </div>
              </div>

              {/* Directive */}
              <div className="text-xs text-[#0E1B33] font-medium leading-relaxed mb-3">
                {block.directive}
              </div>

              {/* Cryptographic Hashes Bar */}
              <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl font-mono text-[11px] space-y-1">
                <div className="flex items-baseline justify-between text-gray-500 flex-wrap gap-1">
                  <span>Prev Hash:</span>
                  <span className="text-gray-700 truncate max-w-md">{block.prevHash}</span>
                </div>
                <div className="flex items-baseline justify-between text-[#1F44D6] flex-wrap gap-1">
                  <span className="font-bold">SHA-256 Hash:</span>
                  <span className="font-extrabold truncate max-w-md">{block.hash}</span>
                </div>
              </div>

              {/* Actor & Adapters */}
              <div className="flex items-center justify-between text-xs text-[#64748B] pt-3 mt-3 border-t border-gray-100 flex-wrap gap-2">
                <div>
                  Authorized by: <b>{block.actor}</b> · Sealed in <b>{block.latency}</b>
                </div>
                <div className="text-[11px] text-gray-400">
                  Simulated Dispatch: Meta Ads · Instagram Creators · Blinkit Dark Stores
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
