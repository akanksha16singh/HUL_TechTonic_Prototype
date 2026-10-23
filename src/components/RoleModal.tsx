import React from 'react';
import { OperatorRole } from '../types';

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: OperatorRole;
  onSelectRole: (role: OperatorRole) => void;
}

const ROLES_LIST: Array<{
  role: OperatorRole;
  level: string;
  maxBudget: string;
  badgeBg: string;
  badgeColor: string;
  description: string;
  reversibility: string;
  requiresLegal: boolean;
}> = [
  {
    role: 'Social Lead',
    level: 'LEVEL 0',
    maxBudget: 'Up to ₹50,000',
    badgeBg: '#F0FDF4',
    badgeColor: '#166534',
    description: 'Reversible organic community replies, boosting organic creator posts.',
    reversibility: '< 30 seconds',
    requiresLegal: false
  },
  {
    role: 'Brand Manager',
    level: 'LEVEL 1',
    maxBudget: 'Up to ₹5,00,000',
    badgeBg: '#EFF6FF',
    badgeColor: '#1E40AF',
    description: 'Tactical creator engagements, single-channel paid amplification, vernacular variants.',
    reversibility: '< 15 minutes',
    requiresLegal: false
  },
  {
    role: 'Category Lead',
    level: 'LEVEL 1',
    maxBudget: 'Up to ₹5,00,000',
    badgeBg: '#F5F3FF',
    badgeColor: '#5B21B6',
    description: 'Category portfolio alignment, cross-brand syndication in personal care & home care.',
    reversibility: '< 15 minutes',
    requiresLegal: false
  },
  {
    role: 'Brand Director',
    level: 'LEVEL 2',
    maxBudget: 'Up to ₹25,00,000',
    badgeBg: '#FEF3C7',
    badgeColor: '#92400E',
    description: 'National reactive campaigns, cross-channel paid pushes, quick-commerce dark store blitz.',
    reversibility: '< 45 minutes',
    requiresLegal: true
  },
  {
    role: 'Marketing VP',
    level: 'LEVEL 3',
    maxBudget: 'Unlimited (> ₹25,00,000)',
    badgeBg: '#FCE7F3',
    badgeColor: '#9D174D',
    description: 'Corporate reputation response, brand constitution policy updates, sensitive social issues.',
    reversibility: 'Requires Executive Signoff',
    requiresLegal: true
  },
  {
    role: 'Executive Committee / MD',
    level: 'LEVEL 3',
    maxBudget: 'Unlimited (> ₹25,00,000)',
    badgeBg: '#EDE9FE',
    badgeColor: '#4C1D95',
    description: 'Highest statutory and enterprise authority for Hindustan Unilever.',
    reversibility: 'Board Signoff',
    requiresLegal: true
  },
  {
    role: 'Viewing Only',
    level: 'AUDITOR',
    maxBudget: '₹0 (Read Only)',
    badgeBg: '#F1F5F9',
    badgeColor: '#475569',
    description: 'Read-only observer mode for external audits, media agencies, or brand legal counsel.',
    reversibility: 'N/A',
    requiresLegal: false
  }
];

export const RoleModal: React.FC<RoleModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onSelectRole
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#DCE3F0] animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-[#E3E8F2] flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-lg text-[#0E1B33]">Switch Governance Role</h3>
            <p className="text-xs text-[#5A6884]">
              Simulate authority tiers defined in HUL Decision Rights Matrix (Policy #41).
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-3">
          {ROLES_LIST.map(r => {
            const isSelected = currentRole === r.role;
            return (
              <div
                key={r.role}
                onClick={() => {
                  onSelectRole(r.role);
                  onClose();
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-1.5 ${
                  isSelected
                    ? 'border-[#1F44D6] bg-[#F0F5FF] shadow-sm'
                    : 'border-[#E2E8F0] hover:border-[#CBD5E1] bg-white hover:bg-[#F8FAFC]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-extrabold px-2 py-0.5 rounded-md"
                      style={{ backgroundColor: r.badgeBg, color: r.badgeColor }}
                    >
                      {r.level}
                    </span>
                    <span className="font-extrabold text-sm text-[#0E1B33]">{r.role}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#1F44D6]">
                    {r.maxBudget}
                  </span>
                </div>

                <p className="text-xs text-[#5A6884] leading-relaxed">{r.description}</p>

                <div className="flex items-center gap-4 text-[10.5px] text-[#64748B] pt-1 border-t border-[#F1F5F9]">
                  <span>
                    <b>Reversibility SLA:</b> {r.reversibility}
                  </span>
                  <span>
                    <b>Legal Required:</b> {r.requiresLegal ? 'Yes (ASCI Audit)' : 'Pre-cleared'}
                  </span>
                  {isSelected && (
                    <span className="ml-auto font-bold text-[#0E9F6E]">✓ Currently Active</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-6 py-3 border-t border-[#E3E8F2] bg-[#F8FAFF] rounded-b-2xl flex justify-between items-center text-xs text-[#5A6884]">
          <span>Changes take effect immediately across all screens.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1F44D6] text-white font-bold rounded-lg hover:bg-[#163398] transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
