export interface AgentDebateItem {
  name: string;
  score: string | number;
  verdict: string;
  color?: string;
  bg?: string;
  bd?: string;
  line: string;
  diff?: string;
  status?: string;
  confidence?: number;
}

export interface BulletPoint {
  bg: string;
  color: string;
  mark: string;
  text: string;
}

export interface TwinDetails {
  source: string;
  matchAssessment: string;
}

export interface LedgerPrecedent {
  thenTitle: string;
  thenOutcome: string;
}

export interface Citation {
  title?: string;
  uri?: string;
}

export interface Signal {
  id: string;
  brand: string;
  category: string;
  headline: string;
  summary: string;
  source: string;
  seenTime: string;
  opportunityScore: number;
  windowClose: string;
  verdict: string;
  verdictColor: string;
  verdictBg: string;
  decisionRights: string;
  ask: string;
  note: string;
  twinDetails?: TwinDetails;
  ledgerPrecedent?: LedgerPrecedent;
  bullets: BulletPoint[];
  agentDebate: AgentDebateItem[];
  provenance?: string;
  executed?: boolean;
  executionRecord?: any;
  citations?: Citation[];
  customBudget?: number;
  customChannels?: string[];
  customNote?: string;
}

export interface AdapterReceipt {
  simulated: boolean;
  mode: string;
  status: string;
  endpoint?: string;
  targetAudience?: string;
  budgetDeployedINR?: string;
  cpmEstimateINR?: string;
  reversibilitySLA?: string;
  auditTrail?: string;
  creatorsTargeted?: number;
  audioHook?: string | null;
  skuBoost?: string;
  metroCoverage?: string;
  bannerPlacement?: string;
}

export interface LedgerBlock {
  id: string;
  prevHash: string;
  hash: string;
  timestamp: string;
  brand: string;
  choice: string;
  status: string;
  directive: string;
  budget: number;
  latency: string;
  actor: string;
  adapters?: Record<string, AdapterReceipt>;
  blockIndex?: number;
  formattedBudget?: string;
  humanDate?: string;
  simpleStatus?: string;
  shieldStatus?: string;
}

export interface LedgerVerificationResult {
  success: boolean;
  verified: boolean;
  totalBlocks: number;
  genesisHash: string;
  latestHash: string;
  failedBlockId: string | null;
  verifiedAt: string;
  chainAudit: Array<{
    blockIndex: number;
    blockId: string;
    brand: string;
    timestamp: string;
    humanDate: string;
    formattedBudget: string;
    actor: string;
    directive: string;
    status: string;
    prevHash: string;
    recordedHash: string;
    computedHash: string;
    valid: boolean;
  }>;
}

export interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  brands: string[];
  description: string;
  query?: string;
  live?: string;
  metric?: string;
  headline?: string;
  trend?: string;
  spark?: number[];
}

export interface DecisionMatrixTier {
  name: string;
  code: string;
  maxBudgetINR: number;
  roles: string[];
  description: string;
  reversibilitySLA: string;
  requiresLegalApproval: boolean;
}

export type OperatorRole =
  | 'Social Lead'
  | 'Brand Manager'
  | 'Category Lead'
  | 'Brand Director'
  | 'Marketing VP'
  | 'Executive Committee / MD'
  | 'Viewing Only';

export interface DecisionRightsCheck {
  authorized: boolean;
  isObserver: boolean;
  requiredLevel: string;
  requiredLevelName: string;
  allowedRoles: string[];
  maxAllowedBudgetINR: number;
  reversibilitySLA: string;
}
