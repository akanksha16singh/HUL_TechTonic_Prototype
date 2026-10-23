import { Signal, LedgerBlock, LedgerVerificationResult } from '../types';

export async function fetchSignals(): Promise<Signal[]> {
  const res = await fetch('/api/signals');
  if (!res.ok) throw new Error('Failed to fetch signals');
  const data = await res.json();
  return data.signals || [];
}

export async function refreshSignals(brandQuery?: string): Promise<{ success: boolean; newSignal?: Signal; error?: string }> {
  const res = await fetch('/api/signals/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ brandQuery: brandQuery || 'Hindustan Unilever HUL Brands India' })
  });
  return res.json();
}

export async function searchSignals(query: string, limit = 8): Promise<any> {
  const res = await fetch('/api/signals/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, limit })
  });
  return res.json();
}

export async function fetchLedger(): Promise<{ count: number; ledger: LedgerBlock[]; genesisHash: string; latestHash: string }> {
  const res = await fetch('/api/ledger');
  if (!res.ok) throw new Error('Failed to fetch ledger');
  return res.json();
}

export async function verifyLedgerChain(): Promise<LedgerVerificationResult> {
  const res = await fetch('/api/ledger/verify');
  if (!res.ok) throw new Error('Failed to verify ledger');
  return res.json();
}

export async function triggerTamperDemo(): Promise<{ success: boolean; tamperedBlockId?: string; message?: string }> {
  const res = await fetch('/api/ledger/tamper-demo', { method: 'POST' });
  return res.json();
}

export async function triggerRepairDemo(): Promise<{ success: boolean; message?: string }> {
  const res = await fetch('/api/ledger/repair-demo', { method: 'POST' });
  return res.json();
}

export async function executeDecision(payload: {
  signalId: string;
  choice: 'APPROVE_DISPATCH' | 'STAND_DOWN';
  brand: string;
  notes?: string;
  operator: string;
  budget?: number;
  isOverride?: boolean;
  overrideJustification?: string;
}): Promise<any> {
  const res = await fetch('/api/decision/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function reevaluateWithConstraint(payload: {
  signalId: string;
  constraint: string;
  brand: string;
}): Promise<any> {
  const res = await fetch('/api/agents/re-evaluate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function fetchRadarStatus(): Promise<any> {
  const res = await fetch('/api/news/radar-status');
  return res.json();
}

export async function triggerRadarRefresh(): Promise<any> {
  const res = await fetch('/api/news/refresh-now', { method: 'POST' });
  return res.json();
}

export async function fetchSelfTestDiagnostics(): Promise<any> {
  const res = await fetch('/api/selftest');
  return res.json();
}
