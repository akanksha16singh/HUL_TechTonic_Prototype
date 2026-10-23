import React from 'react';
import { OperatorRole } from '../types';

interface HeaderProps {
  currentView: 'overview' | 'command-centre' | 'moment-queue' | 'scorecard' | 'decision-record' | 'war-room';
  onNavigate: (view: 'overview' | 'command-centre' | 'moment-queue' | 'scorecard' | 'decision-record' | 'war-room') => void;
  role: OperatorRole;
  onOpenRoleModal: () => void;
  onOpenTour: () => void;
  pendingCount: number;
  liveClock: string;
  isScanning: boolean;
  onScanNow: () => void;
}

const ROLE_CONFIG: Record<OperatorRole, { tint: string; color: string; initials: string; title: string }> = {
  'Social Lead': { tint: '#F0FDF4', color: '#15803D', initials: 'SL', title: 'Level 0 · Reversible organic' },
  'Brand Manager': { tint: '#EFF6FF', color: '#1D4ED8', initials: 'BM', title: 'Level 1 · Tactical paid < ₹5L' },
  'Category Lead': { tint: '#F5F3FF', color: '#6D28D9', initials: 'CL', title: 'Level 1 · Category wide' },
  'Brand Director': { tint: '#FEF3C7', color: '#B45309', initials: 'BD', title: 'Level 2 · National < ₹25L' },
  'Marketing VP': { tint: '#FCE7F3', color: '#BE185D', initials: 'VP', title: 'Level 3 · Unlimited / Board' },
  'Executive Committee / MD': { tint: '#EDE9FE', color: '#5B21B6', initials: 'MD', title: 'Level 3 · Corporate governance' },
  'Viewing Only': { tint: '#F1F5F9', color: '#475569', initials: 'VO', title: 'Auditor · Read only' }
};

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  role,
  onOpenRoleModal,
  onOpenTour,
  pendingCount,
  liveClock,
  isScanning,
  onScanNow
}) => {
  const roleInfo = ROLE_CONFIG[role] || ROLE_CONFIG['Brand Director'];

  const navItems = [
    { id: 'overview', label: 'Overview', path: '/' },
    { id: 'command-centre', label: 'Command Centre', path: '/command-centre' },
    { id: 'moment-queue', label: 'Queue', path: '/moment-queue' },
    { id: 'scorecard', label: 'Scorecard', path: '/scorecard' },
    { id: 'decision-record', label: 'Decision', path: '/decision-record' },
    { id: 'war-room', label: 'War Room →', path: '/war-room', highlight: true }
  ] as const;

  return (
    <header className="h-14 flex-shrink-0 bg-white border-b border-[#E3E8F2] flex items-center justify-between px-5 gap-3 z-30 sticky top-0 shadow-sm">
      {/* Left: Navigation & Branding */}
      <div className="flex items-center gap-2.5 flex-shrink-0">
        <div className="flex items-center gap-2 mr-2">
          <div className="w-7 h-7 rounded-lg bg-[#1F44D6] flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
            N
          </div>
          <span className="font-extrabold text-[15px] tracking-tight text-[#0E1B33]">NEXT</span>
        </div>

        <nav className="flex items-center gap-1.5">
          {navItems.map(item => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                  item.highlight
                    ? isActive
                      ? 'bg-[#0E9F6E] text-white'
                      : 'bg-[#0F172A] text-white hover:bg-[#1E293B]'
                    : isActive
                    ? 'bg-[#F0F5FF] text-[#1F44D6] border border-[#C7D6FF]'
                    : 'bg-white text-[#5A6884] border border-[#DCE3F0] hover:bg-[#F8FAFC] hover:text-[#0E1B33]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="w-px h-5 bg-[#E3E8F2] mx-1"></div>

        {/* Live Surveillance Status */}
        <div className="flex items-center gap-1.5 h-6 px-2 border border-[#DCE7F6] rounded-md bg-[#F0F5FF]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0E9F6E] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0E9F6E]"></span>
          </span>
          <span className="font-bold text-[10px] text-[#1F44D6] whitespace-nowrap">
            7-AGENT MESH ACTIVE
          </span>
        </div>
      </div>

      {/* Right: Metrics, Scan Action, Tour, and Role Selector */}
      <div className="flex items-center gap-2.5 flex-shrink-0">
        {/* Concise Metrics Strip */}
        <div className="hidden lg:flex items-center gap-2.5 px-3 py-1 bg-[#F8FAFF] border border-[#E3E8F2] rounded-lg">
          <div className="flex items-baseline gap-1.5">
            <span className="font-semibold text-[10px] text-[#5A6884]">Pending:</span>
            <span className="font-extrabold text-xs text-[#B8770A]">{pendingCount}</span>
          </div>
          <div className="w-px h-3.5 bg-[#DCE3F0]"></div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-semibold text-[10px] text-[#5A6884]">Avg TTA:</span>
            <span className="font-extrabold text-xs text-[#0E9F6E]">41 min</span>
          </div>
          <div className="w-px h-3.5 bg-[#DCE3F0]"></div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-semibold text-[10px] text-[#5A6884]">Live Clock:</span>
            <span className="font-extrabold text-xs text-[#1F44D6] font-mono">{liveClock}</span>
          </div>
        </div>

        {/* Scan Now Trigger */}
        <button
          onClick={onScanNow}
          disabled={isScanning}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1F44D6] text-white text-[11px] font-bold rounded-md hover:bg-[#163398] transition-all cursor-pointer disabled:opacity-60 whitespace-nowrap"
          title="Trigger live Google Grounded Search & RSS scan"
        >
          {isScanning ? (
            <>
              <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Scanning...</span>
            </>
          ) : (
            <>
              <span>⚡</span>
              <span>Scan Radar</span>
            </>
          )}
        </button>

        {/* Tour Button */}
        <button
          onClick={onOpenTour}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-[#DCE3F0] rounded-md bg-white text-[#5A6884] text-[11px] font-bold hover:bg-[#F8FAFF] hover:text-[#0E1B33] transition-all cursor-pointer"
          title="Start Guided Architecture Tour"
        >
          <span>💡</span> Tour
        </button>

        {/* Executive Role Switcher Pill */}
        <button
          onClick={onOpenRoleModal}
          className="flex items-center gap-2 px-2.5 py-1 rounded-md border border-[#DCE3F0] bg-white hover:border-[#1F44D6] hover:bg-[#F8FAFF] transition-all cursor-pointer"
          title={`Active Role: ${role} (${roleInfo.title}). Click to switch.`}
        >
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center font-extrabold text-[10px]"
            style={{ backgroundColor: roleInfo.tint, color: roleInfo.color }}
          >
            {roleInfo.initials}
          </div>
          <div className="text-[11px] font-bold text-[#0E1B33] whitespace-nowrap flex items-center gap-1">
            <span>{role}</span>
            <span className="text-[9px] text-[#1F44D6]">▾</span>
          </div>
        </button>
      </div>
    </header>
  );
};
