import React, { useState } from 'react';
import { Signal, OperatorRole } from '../types';

interface DecisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  signal: Signal;
  role: OperatorRole;
  choice: 'APPROVE_DISPATCH' | 'STAND_DOWN';
  onExecute: (params: {
    budget: number;
    notes: string;
    isOverride?: boolean;
    overrideJustification?: string;
  }) => Promise<void>;
}

export const DecisionModal: React.FC<DecisionModalProps> = ({
  isOpen,
  onClose,
  signal,
  role,
  choice,
  onExecute
}) => {
  const [budget, setBudget] = useState<number>(
    signal.customBudget || (choice === 'STAND_DOWN' ? 0 : 2500000)
  );
  const [notes, setNotes] = useState<string>(
    choice === 'STAND_DOWN'
      ? 'Strategic Stand Down: Preserved brand equity and capital following Devil’s Advocate challenge.'
      : (signal.customNote || signal.ask)
  );
  const [isOverride, setIsOverride] = useState(false);
  const [overrideJustification, setOverrideJustification] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Decision Rights evaluation
  const isStandDown = choice === 'STAND_DOWN';
  let requiredLevel = 'LEVEL_0';
  let requiredRole = 'Social Lead';
  let allowedRoles = ['Social Lead', 'Brand Manager', 'Category Lead', 'Brand Director', 'Marketing VP', 'Executive Committee / MD'];

  if (!isStandDown) {
    if (budget > 2500000) {
      requiredLevel = 'LEVEL_3';
      requiredRole = 'Marketing VP / Executive Committee';
      allowedRoles = ['Marketing VP', 'Executive Committee / MD'];
    } else if (budget > 500000) {
      requiredLevel = 'LEVEL_2';
      requiredRole = 'Brand Director';
      allowedRoles = ['Brand Director', 'Marketing VP', 'Executive Committee / MD'];
    } else if (budget > 50000) {
      requiredLevel = 'LEVEL_1';
      requiredRole = 'Brand Manager / Category Lead';
      allowedRoles = ['Brand Manager', 'Category Lead', 'Brand Director', 'Marketing VP', 'Executive Committee / MD'];
    }
  }

  const isObserver = role === 'Viewing Only';
  const isAuthorized = !isObserver && allowedRoles.includes(role);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthorized && !isOverride) {
      setError(`Unauthorized for role "${role}". Requires ${requiredRole} signoff.`);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      await onExecute({
        budget,
        notes,
        isOverride,
        overrideJustification: isOverride ? overrideJustification : undefined
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Execution failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-[#DCE3F0] p-6 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-[#E3E8F2] mb-4">
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${
                isStandDown ? 'bg-[#64748B]' : 'bg-[#0E9F6E]'
              }`}
            ></span>
            <div>
              <h3 className="font-extrabold text-base text-[#0E1B33]">
                {isStandDown ? 'Authorize Strategic Stand Down' : 'Authorize & Seal Campaign Dispatch'}
              </h3>
              <p className="text-xs text-[#5A6884]">
                Brand: <b className="text-[#0E1B33]">{signal.brand}</b> · SLA: &lt; 45s Reversibility
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Governance Matrix Check Banner */}
          <div
            className={`p-3 rounded-xl border text-xs flex flex-col gap-1 ${
              isAuthorized
                ? 'bg-[#F0FDF4] border-[#BBF7D0] text-[#166534]'
                : 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]'
            }`}
          >
            <div className="flex items-center justify-between font-bold">
              <span>{isAuthorized ? '✓ Governance Authority Cleared' : '⚠️ Escalation Signoff Required'}</span>
              <span className="font-mono text-[10.5px]">
                {requiredLevel} (Min Role: {requiredRole})
              </span>
            </div>
            <p className="text-[11px] opacity-90">
              Active Role: <b>{role}</b>. Allocated spend: <b>₹{budget.toLocaleString('en-IN')}</b>.
              {isAuthorized
                ? ' Within predefined delegation limits for this operational tier.'
                : ' Exceeds autonomous limits for current role.'}
            </p>
          </div>

          {!isStandDown && (
            <div>
              <label className="text-xs font-bold text-[#0E1B33] block mb-1">
                Approved Budget (INR)
              </label>
              <input
                type="number"
                value={budget}
                onChange={e => setBudget(Number(e.target.value))}
                className="w-full text-xs font-mono font-bold p-2.5 border border-[#DCE3F0] rounded-xl focus:border-[#1F44D6] outline-none"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-[#0E1B33] block mb-1">
              Directive & Execution Notes (Sealed into SHA-256 Block)
            </label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
              className="w-full text-xs p-2.5 border border-[#DCE3F0] rounded-xl focus:border-[#1F44D6] outline-none"
              required
            />
          </div>

          {/* Emergency Override Option if role is unauthorized */}
          {!isAuthorized && (
            <div className="bg-[#FFFBEB] border border-[#FDE68A] p-3 rounded-xl space-y-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#92400E]">
                <input
                  type="checkbox"
                  checked={isOverride}
                  onChange={e => setIsOverride(e.target.checked)}
                  className="rounded text-[#D97706]"
                />
                Executive Emergency Override Protocol (Audit Logged)
              </label>
              {isOverride && (
                <input
                  type="text"
                  placeholder="Mandatory justification (e.g. CEO verbal approval at 21:15 IST)..."
                  value={overrideJustification}
                  onChange={e => setOverrideJustification(e.target.value)}
                  className="w-full text-xs p-2 border border-[#FCD34D] rounded-lg bg-white"
                  required
                />
              )}
            </div>
          )}

          {error && (
            <div className="text-xs text-red-600 font-semibold bg-red-50 p-2.5 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-[#E3E8F2]">
            <span className="text-[10px] text-gray-500 font-mono">
              Creates block chained to hash: {signal.id}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 border border-[#DCE3F0] rounded-lg text-xs font-bold text-[#5A6884] hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || (!isAuthorized && !isOverride)}
                className={`px-4 py-2 rounded-lg text-xs font-bold text-white transition-all shadow-sm flex items-center gap-1.5 ${
                  isStandDown
                    ? 'bg-[#475569] hover:bg-[#334155]'
                    : 'bg-[#0E9F6E] hover:bg-[#0B8659]'
                } disabled:opacity-50 cursor-pointer`}
              >
                {loading ? (
                  <span>Sealing Block...</span>
                ) : (
                  <>
                    <span>⚡</span>
                    <span>{isStandDown ? 'Confirm Stand Down' : 'Sign & Seal Block'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
