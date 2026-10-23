# NEXT — Cultural Decision Infrastructure for Hindustan Unilever

NEXT is an operational decision infrastructure for Hindustan Unilever (HUL). Built as a high-performance React application powered by Vite, Express, SQLite, and Google Gemini models with Google Search Grounding.

When a cultural signal arrives, seven specialist agents evaluate it in parallel from distinct domain perspectives, an Arbiter synthesizes the multi-agent consensus, a decision-rights engine determines authorization, a human executive approves, and a cryptographically chained SHA-256 ledger records the immutable outcome.

## Key Capabilities

1. **7+1 Specialist Agent Mesh**: Concurrent domain evaluations (Cultural Trend, Brand Voice & Living Brand Twin, ASCI/CCPA Legal Gate, Commercial ROAS, Channel & Creative Fit, PR Safety, Devil's Advocate Counter-Risk) synthesized by an Arbiter agent without mathematical averaging.
2. **Cryptographic SHA-256 Ledger**: Every decision produces an append-only block chained to the previous block's SHA-256 hash. Real-time integrity validation and interactive tamper demonstration.
3. **Live FMCG Grounding**: Real-time market signals across Indian social and commercial platforms (Instagram Reels, YouTube Shorts, Blinkit, Zepto, Swiggy Instamart).
4. **Interactive "What-If" Counterfactual Simulation**: Inject dynamic market shocks into the tactical cockpit and observe real-time score adjustments and counter-pivot directives.
5. **DECISION_MATRIX Governance**: Four delegation levels enforcing budget thresholds, reversibility SLAs, and legal signoffs across executive roles.

## Application Surfaces

- **Executive Overview** (`/`): Portfolio overview, latency line visualizer, live metric strip, active agent mesh.
- **Command Centre** (`/command-centre`): Multi-role decision desk, 5 FMCG categories, signal queue, and detail customization.
- **Moment Queue** (`/moment-queue`): Triage intake pipeline sorting opportunities by velocity, brand fit, and execution clocks.
- **Cross-Functional Scorecard** (`/scorecard`): Disagreement Plot exposing score variances, Devil's Advocate spotlight, and channel feasibility.
- **Decision Record & Impact Ledger** (`/decision-record`): Unalterable append-only ledger with live cryptographic chain audit and tamper simulation.
- **Cultural War Room** (`/war-room`): High-pressure single-moment cockpit with radar sweep HUD, 6 specialist agent grid, Devil's Advocate band, and What-If simulator.

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, TypeScript
- **Backend**: Node.js, Express, tsx
- **Persistence**: SQLite (sql.js) with append-only ledger
- **AI & Grounding**: Google Gemini (`@google/genai`) with Google Search Grounding and native RSS ingestion
