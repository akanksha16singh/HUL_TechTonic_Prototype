// /shared/teamShareModal.js
// NEXT Cultural Decision Infrastructure - Comprehensive Cross-Functional Team Sharable Insights

(function() {
  const MOMENT_DATABASE = {
    'sig-mumbai-monsoon-772': {
      brand: 'Surf Excel',
      category: 'Home Care & Fabric Cleaning',
      title: 'Mumbai Heavy Rains: Spontaneous Commuter Rescue Chain on Local Trains Prompts Viral #DaagAccheHain Waterlogging Moments',
      source: 'The Indian Express · Ingested 13:18 IST',
      score: 88,
      spread: 48,
      urgency: '01h 14m',
      budget: '₹2,40,000 (Capped at ₹5.0L)',
      pev: '₹18,60,000 (7.75x ROI)',
      reach: '1.42M Verified Impressions',
      hoursSaved: '18.5 Hours',
      blockHash: '0x7f8a92b3c104e7f129d48b6c00827361a8f94e2b01c74d89aef027',
      disclaimer: 'ASCI Chapter 1.4 Notice: "Simulated depiction of urban commuter assistance. Always obey Central & Western Railway safety guidelines and avoid walking on live railway tracks."',
      undoTime: '120 seconds',
      darkStores: '48 Mumbai MMR locations (Andheri, Dadar, Borivali, Thane)',
      hooks: [
        '"Pani me daag lage to lage, kisi ka haath chhutne na paye. #DaagAccheHain"',
        '"When Mumbai stops, Mumbaikars step up. We handle the monsoon stains."',
        '"Commuter solidarity on Western Line: Real kindness, zero stains left behind."'
      ]
    },
    'sig-delhi-heat-881': {
      brand: "Kwality Wall's",
      category: 'Ice Cream & Frozen Desserts',
      title: 'NCR 43°C Temperature Spike: Afternoon Commute Ice-Lolly Craving Surges 3.2x on Blinkit & Swiggy Instamart',
      source: 'IMD Weather Alert & Quick Commerce Telemetry',
      score: 84,
      spread: 24,
      urgency: '02h 20m',
      budget: '₹3,20,000',
      pev: '₹14,50,000 (4.5x ROI)',
      reach: '980K Impressions',
      hoursSaved: '14.0 Hours',
      blockHash: '0x3a9f018e77c4d81290bb3410fa892cd4451982b13ce8204719ba11',
      disclaimer: 'Standard FSSAI nutritional declarations and quick-commerce delivery terms apply.',
      undoTime: '90 seconds',
      darkStores: '62 NCR hubs (Gurugram Sec 29, Noida Sec 18, South Delhi)',
      hooks: [
        '"43°C outside? Your 10-minute cold blast is already packed. #BeatTheHeat"',
        '"Traffic jam in Cyber Hub? Cool down before you reach home."'
      ]
    },
    'sig-chai-charcha-904': {
      brand: 'Brooke Bond Red Label',
      category: 'Tea & Beverages',
      title: 'Viral Dialogue on "Chai Break Reconnecting Hybrid Work Colleagues" After Monsoon Cloudburst in Bengaluru',
      source: 'X India Trending & LinkedIn News Desk',
      score: 81,
      spread: 13,
      urgency: '04h 45m',
      budget: '₹1,80,000',
      pev: '₹11,20,000 (6.2x ROI)',
      reach: '750K Impressions',
      hoursSaved: '12.0 Hours',
      blockHash: '0x99e0341af7c124808bc44901fdda7638012678bb319c841108ef90',
      disclaimer: 'Responsible workplace dialogue code compliant.',
      undoTime: '180 seconds',
      darkStores: '35 Bengaluru tech corridor hubs',
      hooks: [
        '"Ek cup chai, aur wapas jud gaye purane dost. #SwadApnepanKa"',
        '"Rain outside, warm chai in hand: The best meeting of the workday."'
      ]
    },
    'sig-dove-filter-912': {
      brand: 'Dove',
      category: 'Personal Care & Beauty',
      title: 'Gen-Z Social Backlash Against "Hyper-Real AI Beauty Filters" Gains Momentum on Campus Feeds',
      source: 'Instagram & YouTube Shorts Pulse',
      score: 86,
      spread: 14,
      urgency: '06h 30m',
      budget: '₹2,50,000',
      pev: '₹16,80,000 (6.7x ROI)',
      reach: '1.20M Impressions',
      hoursSaved: '16.0 Hours',
      blockHash: '0x44d189ca00b481977e231bc7892186df0473910c2837f191724ac6',
      disclaimer: 'Dove Real Beauty Pledge: Zero digital distortion of real skin.',
      undoTime: '120 seconds',
      darkStores: 'Nationwide campus geo-fenced delivery',
      hooks: [
        '"Real skin is never a glitch. Keep it 100% unfiltered. #RealBeauty"',
        '"Filter off, confidence on. The world needs the real you."'
      ]
    }
  };

  let activeTab = 'exec';
  let currentMomentKey = 'sig-mumbai-monsoon-772';

  function getMomentData(key) {
    return MOMENT_DATABASE[key] || MOMENT_DATABASE['sig-mumbai-monsoon-772'];
  }

  function renderShareModalHtml() {
    if (document.getElementById('nextUniversalTeamShareModal')) return;

    const modal = document.createElement('div');
    modal.id = 'nextUniversalTeamShareModal';
    modal.style.cssText = `
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(14, 27, 51, 0.78);
      backdrop-filter: blur(6px);
      z-index: 999999;
      align-items: center;
      justify-content: center;
      padding: 16px;
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    `;

    modal.innerHTML = `
      <div style="background:#FFFFFF;border-radius:14px;max-width:880px;width:100%;box-shadow:0 24px 60px rgba(14,27,51,0.3);overflow:hidden;display:flex;flex-direction:column;max-height:90vh;border:1px solid #DCE3F0;animation:pop .2s ease-out">
        
        <!-- Header -->
        <div style="padding:16px 22px;background:#0E1B33;color:#FFFFFF;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.1)">
          <div style="display:flex;align-items:center;gap:12px">
            <span style="background:#1F44D6;color:#FFFFFF;font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:700;padding:3px 8px;border-radius:4px">NEXT SHARED PACK</span>
            <div>
              <div style="font-size:14px;font-weight:800;letter-spacing:-0.01em">Cross-Functional Team Sharable Insights & Briefing</div>
              <div id="tsModalSubHeader" style="font-size:11.5px;color:#94A3B8">Surf Excel · Mumbai Monsoon Commuter Rescue (#DaagAccheHain)</div>
            </div>
          </div>
          <button onclick="window.closeTeamShareModal()" style="background:none;border:none;color:#94A3B8;font-size:20px;cursor:pointer;padding:4px 8px;line-height:1;border-radius:4px" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#94A3B8'">✕</button>
        </div>

        <!-- Role Tabs Bar -->
        <div style="display:flex;background:#F8FAFC;border-bottom:1px solid #E2E8F0;padding:0 16px;overflow-x:auto;gap:4px">
          <button class="ts-tab-btn active" data-tab="exec" onclick="window.switchTeamShareTab('exec')">👔 Executive / Board</button>
          <button class="ts-tab-btn" data-tab="marketing" onclick="window.switchTeamShareTab('marketing')">🎨 Marketing & Creative</button>
          <button class="ts-tab-btn" data-tab="finance" onclick="window.switchTeamShareTab('finance')">💰 Category Finance</button>
          <button class="ts-tab-btn" data-tab="legal" onclick="window.switchTeamShareTab('legal')">⚖️ Legal & Compliance</button>
          <button class="ts-tab-btn" data-tab="supply" onclick="window.switchTeamShareTab('supply')">📦 Supply & Quick-Commerce</button>
          <button class="ts-tab-btn" data-tab="media" onclick="window.switchTeamShareTab('media')">📊 Performance Media</button>
          <button class="ts-tab-btn" data-tab="hr" onclick="window.switchTeamShareTab('hr')">🤝 HR & Internal Comms</button>
        </div>

        <!-- Body Content -->
        <div style="padding:20px 24px;overflow-y:auto;flex:1;background:#FFFFFF">
          <div id="tsTabContentBox" style="font-size:12px;color:#334155;line-height:1.6">
            <!-- Dynamic Content Injected Here -->
          </div>
        </div>

        <!-- Footer Actions Bar -->
        <div style="padding:14px 22px;background:#F8FAFC;border-top:1px solid #E2E8F0;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
          <div style="display:flex;align-items:center;gap:8px">
            <button onclick="window.copyCurrentTeamBrief()" style="display:inline-flex;align-items:center;gap:6px;padding:8px 14px;background:#1F44D6;color:#FFFFFF;border:none;border-radius:6px;font-size:12px;font-weight:700;cursor:pointer;transition:all .15s ease">
              📋 Copy Role Brief
            </button>
            <button onclick="window.copyAllTeamBriefs()" style="display:inline-flex;align-items:center;gap:6px;padding:8px 14px;background:#FFFFFF;border:1px solid #CBD5E1;color:#0E1B33;border-radius:6px;font-size:12px;font-weight:700;cursor:pointer">
              📦 Copy Full Cross-Functional Pack
            </button>
          </div>

          <div style="display:flex;align-items:center;gap:8px">
            <button onclick="window.simulateTeamsDispatch()" style="display:inline-flex;align-items:center;gap:6px;padding:8px 12px;background:#EFF6FF;border:1px solid #BFDBFE;color:#1E40AF;border-radius:6px;font-size:11.5px;font-weight:700;cursor:pointer">
              💬 Dispatch to Slack/Teams Channel
            </button>
            <button onclick="window.closeTeamShareModal()" style="padding:8px 16px;background:#0E1B33;color:#FFFFFF;border:none;border-radius:6px;font-size:12px;font-weight:700;cursor:pointer">
              Done
            </button>
          </div>
        </div>

      </div>
    `;

    // Tab button styles
    const style = document.createElement('style');
    style.innerHTML = `
      .ts-tab-btn {
        padding: 10px 12px;
        background: transparent;
        border: none;
        border-bottom: 2px solid transparent;
        font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        font-size: 11.5px;
        font-weight: 700;
        color: #64748B;
        cursor: pointer;
        white-space: nowrap;
        transition: all .15s ease;
      }
      .ts-tab-btn:hover { color: #0E1B33; }
      .ts-tab-btn.active {
        color: #1F44D6;
        border-bottom-color: #1F44D6;
        background: #FFFFFF;
      }
      .ts-card {
        background: #F8FAFC;
        border: 1px solid #E2E8F0;
        border-radius: 8px;
        padding: 14px 16px;
        margin-bottom: 12px;
      }
      .ts-badge {
        display: inline-block;
        font-family: 'IBM Plex Mono', monospace;
        font-size: 10.5px;
        font-weight: 700;
        padding: 2px 6px;
        border-radius: 4px;
      }
      .ts-badge-go { background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0; }
      .ts-badge-warn { background: #FEF3C7; color: #92400E; border: 1px solid #FDE68A; }
      .ts-badge-info { background: #EFF6FF; color: #1E40AF; border: 1px solid #BFDBFE; }
    `;
    document.head.appendChild(style);
    document.body.appendChild(modal);
  }

  function getBriefText(tab, m) {
    switch(tab) {
      case 'exec':
        return `[NEXT EXECUTIVE BRIEFING] ${m.brand}
• Topic: ${m.title}
• Strategic Verdict: APPROVED WITH LEGAL WAIVER (Score: ${m.score}/100 | Disagreement Spread: ${m.spread} pt)
• Sign-Off Authority: Legal Waiver Cleared (MS) → Finance Budget Approved (RI) → Media Dispatched (AS)
• Spend Cap: ${m.budget} | Realised Earned Media Value: ${m.pev}
• Verified Reach: ${m.reach} | Operational Time Recovered: ${m.hoursSaved}
• Reversibility Protocol: Level 2 | ${m.undoTime} single-click retraction to Meta & Dark Stores
• Immutable Block Hash: ${m.blockHash}`;

      case 'marketing':
        return `[NEXT MARKETING & BRAND BRIEF] ${m.brand}
• Campaign Angle: Spontaneous monsoon solidarity & empathy under #${m.brand.replace(/\s+/g, '')}
• Core Hooks:
  1. ${m.hooks[0] || 'Commuter solidarity in action'}
  2. ${m.hooks[1] || 'Real stains, real kindness'}
• Channels: 9:16 Vertical Reels + Instagram Story Placement + Influencer Whitelist
• Mandatory Compliance Tag: ${m.disclaimer}
• Dark Store Retargeting: Geofenced within 2.5km of active commuter transit hubs`;

      case 'finance':
        return `[NEXT CATEGORY FINANCE MEMO] ${m.brand}
• PO Authorization Code: HUL-HC-2026-MUM-089
• Authorized Spend Cap: ${m.budget}
• Realised Earned Media Value (PEV): ${m.pev}
• Financial Attribution Multiplier: 7.75x PEV ROI
• Calculation Basis: Nielsen FMCG CPM benchmark (₹120/1k impressions) + verified dark store SKU lift
• Cost Guardrail: Daily burn capped with automated shutoff at 90% budget utilization`;

      case 'legal':
        return `[NEXT LEGAL & REGULATORY CLEARANCE] ${m.brand}
• Risk Concurrence Score: 38/100 (Flagged: Public Transit & Railway Safety)
• Governing Clause: ASCI Code Chapter 1.4 (Safety & Non-Hazardous Conduct)
• Stipulated Action: Mandatory 3-second on-screen safety disclaimer attached to creative assets.
• Approved Disclaimer String: "${m.disclaimer}"
• Undo SLA: ${m.undoTime} kill-switch SLA verified across Meta Ads and Q-Commerce search APIs.
• Cryptographic Ledger Reference: Block 00489 | Sealed by Meenakshi Sundaram [Legal Counsel]`;

      case 'supply':
        return `[NEXT SUPPLY CHAIN & QUICK-COMMERCE OPS] ${m.brand}
• Target Geography: Mumbai MMR Transit Corridors
• Active Dark Store Hubs: ${m.darkStores}
• Surge SKU Allocation: +35% inventory buffer on 1kg / 500g hero packs
• Platform Integration: Blinkit & Zepto sponsored search keyword intercept ("monsoon wash", "rain rescue")
• Delivery Promise: Guaranteed 10-minute dark store fulfillment maintained`;

      case 'media':
        return `[NEXT PERFORMANCE MEDIA DESK] ${m.brand}
• Meta Ads Campaign ID: ACT-HUL-MUM-89021
• Geo-Fencing: Greater Mumbai, Thane, Navi Mumbai (5km commuter radius)
• Dayparting: Active during morning/evening commute spikes (08:00–11:00 & 16:30–21:30 IST)
• Max Bid Cap: ₹1.40 CPC / ₹110 CPM
• API Retraction Webhook: Enabled (Auto-pauses if sentiment <80% positive)`;

      case 'hr':
        return `[NEXT INTERNAL COMMS & PURPOSE BRIEF] ${m.brand}
• Theme: Everyday Heroes & Compassion in Urban Crises
• Employee Townhall Soundbite: "Our brands stand with everyday citizens when challenges strike. Real purpose in action."
• Community Impact: Commuter rescue kits distributed across Western Railway volunteer booths.`;

      default:
        return '';
    }
  }

  function renderTabContent(tab, m) {
    const box = document.getElementById('tsTabContentBox');
    if (!box) return;

    if (tab === 'exec') {
      box.innerHTML = `
        <div class="ts-card" style="border-left:4px solid #1F44D6">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <b style="font-size:13px;color:#0E1B33">Executive Decision Summary</b>
            <span class="ts-badge ts-badge-go">LEGAL WAIVER SEALED · LIVE</span>
          </div>
          <div style="margin-bottom:10px">${m.title}</div>
          <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:10px;font-size:11.5px">
            <div><b>Authorized Budget:</b> <span style="font-family:'IBM Plex Mono'">${m.budget}</span></div>
            <div><b>Earned Media Value:</b> <span style="font-family:'IBM Plex Mono';color:#0E9F6E;font-weight:700">${m.pev}</span></div>
            <div><b>Time Recovered:</b> <span style="font-family:'IBM Plex Mono';color:#1F44D6;font-weight:700">${m.hoursSaved}</span></div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
          <div class="ts-card">
            <b style="font-size:12px;color:#0E1B33;display:block;margin-bottom:6px">⛓️ Sign-Off Ledger</b>
            <div style="font-size:11.5px;color:#475569">
              • Legal Counsel: Meenakshi Sundaram [Approved with Waiver]<br>
              • Category Finance: Rajesh Iyer [₹2.40L Authorized]<br>
              • Media Operations: Ananya Sen [Channels Committed]<br>
              • Brand Manager: Rahul Mehta [Triage Completed]
            </div>
          </div>
          <div class="ts-card">
            <b style="font-size:12px;color:#0E1B33;display:block;margin-bottom:6px">🔄 Reversibility & Governance</b>
            <div style="font-size:11.5px;color:#475569">
              • Permission Level: <b>Level 2 (Human Sign-Off)</b><br>
              • Emergency Retraction: <b>${m.undoTime}</b> API kill-switch<br>
              • Audit Hash: <span style="font-family:'IBM Plex Mono';font-size:10px;color:#1F44D6">${m.blockHash.slice(0, 24)}...</span>
            </div>
          </div>
        </div>
      `;
    } else if (tab === 'marketing') {
      box.innerHTML = `
        <div class="ts-card">
          <b style="font-size:12.5px;color:#0E1B33;display:block;margin-bottom:8px">Creative Hooks & Video Concept</b>
          <div style="background:#FFF;padding:10px 12px;border:1px solid #E2E8F0;border-radius:6px;margin-bottom:10px">
            <div style="font-weight:700;color:#1F44D6;margin-bottom:4px">Primary 9:16 Video Reel Hook:</div>
            <div style="font-style:italic;color:#1E293B">"${m.hooks[0]}"</div>
          </div>
          <div style="font-size:11.5px;color:#475569">
            <b>Secondary Story Angle:</b> "${m.hooks[1] || 'Real community solidarity'}"<br>
            <b>Influencer Guidelines:</b> Raw UGC style, vertical framing, no scripted studio setup.
          </div>
        </div>

        <div class="ts-card" style="border-left:4px solid #F59E0B">
          <b style="font-size:12px;color:#92400E;display:block;margin-bottom:4px">⚠️ Mandatory ASCI Compliance Tag (Legal Requirement)</b>
          <div style="font-size:11.5px;color:#78350F;background:#FFFBEB;padding:8px 10px;border-radius:6px">
            ${m.disclaimer}
          </div>
        </div>
      `;
    } else if (tab === 'finance') {
      box.innerHTML = `
        <div class="ts-card" style="border-left:4px solid #0E9F6E">
          <b style="font-size:13px;color:#065F46;display:block;margin-bottom:8px">Financial Attribution & Spend Authorization</b>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:10px;font-size:11.5px">
            <div><b>Authorized Budget:</b> <span style="font-family:'IBM Plex Mono';font-size:14px;font-weight:700">${m.budget}</span></div>
            <div><b>Earned Media Value (PEV):</b> <span style="font-family:'IBM Plex Mono';font-size:14px;color:#0E9F6E;font-weight:700">${m.pev}</span></div>
          </div>
          <div style="font-size:11px;color:#475569;border-top:1px dashed #CBD5E1;padding-top:8px">
            <b>ROI Multiplier:</b> 7.75x on direct spend · <b>PO Billing Code:</b> HUL-HC-2026-MUM-089<br>
            <b>Calculation Basis:</b> Nielsen FMCG CPM benchmark (₹120/1k impressions) + verified dark store SKU uplift.
          </div>
        </div>
      `;
    } else if (tab === 'legal') {
      box.innerHTML = `
        <div class="ts-card" style="border-left:4px solid #DC2626">
          <b style="font-size:12.5px;color:#991B1B;display:block;margin-bottom:6px">ASCI & Regulatory Clearance Memorandum</b>
          <div style="font-size:11.5px;color:#475569;margin-bottom:10px">
            <b>Concurrence Score:</b> 38/100 · <b>Status:</b> Cleared with Mandatory On-Screen Disclaimer<br>
            <b>Governing Clause:</b> ASCI Chapter 1.4 (Public Transit Safety)
          </div>
          <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:6px;padding:10px;font-size:11.5px;color:#7F1D1D">
            <b>Mandatory Disclaimer String:</b><br>
            "${m.disclaimer}"
          </div>
          <div style="font-size:11px;color:#64748B;margin-top:8px">
            Cleared by: Meenakshi Sundaram (Senior Legal Counsel) · Ledger Block 00489
          </div>
        </div>
      `;
    } else if (tab === 'supply') {
      box.innerHTML = `
        <div class="ts-card">
          <b style="font-size:12.5px;color:#0E1B33;display:block;margin-bottom:8px">Quick-Commerce & Dark Store Buffer Operations</b>
          <div style="font-size:11.5px;color:#475569;margin-bottom:8px">
            <b>Target Geography:</b> Mumbai MMR Transit Hubs (${m.darkStores})<br>
            <b>Inventory Buffer:</b> +35% stock reserve on 1kg / 500g hero SKUs<br>
            <b>Search Intercepts:</b> Blinkit & Zepto sponsored keyword bids ("monsoon wash", "stain rescue")
          </div>
        </div>
      `;
    } else if (tab === 'media') {
      box.innerHTML = `
        <div class="ts-card">
          <b style="font-size:12.5px;color:#0E1B33;display:block;margin-bottom:8px">Performance Media Campaign Parameters</b>
          <div style="font-size:11.5px;color:#475569">
            <b>Campaign ID:</b> ACT-HUL-MUM-89021 · <b>Channels:</b> Meta Reels + Stories<br>
            <b>Targeting Radius:</b> 5km around Western & Central Line stations<br>
            <b>Dayparting:</b> Commute hours (08:00-11:00 & 16:30-21:30 IST)<br>
            <b>Safety Webhook:</b> Automated pause if sentiment &lt;80% positive
          </div>
        </div>
      `;
    } else if (tab === 'hr') {
      box.innerHTML = `
        <div class="ts-card">
          <b style="font-size:12.5px;color:#0E1B33;display:block;margin-bottom:8px">Internal Communications & Employee Engagement</b>
          <div style="font-size:11.5px;color:#475569">
            <b>Theme:</b> Real Community Solidarity in Urban Weather Crises<br>
            <b>Townhall Soundbite:</b> "Our brands stand with everyday citizens when challenges strike. Real purpose in action."
          </div>
        </div>
      `;
    }
  }

  // Global window functions
  window.openTeamShareModal = function(momentKey) {
    renderShareModalHtml();
    currentMomentKey = momentKey || currentMomentKey || 'sig-mumbai-monsoon-772';
    const m = getMomentData(currentMomentKey);

    const sub = document.getElementById('tsModalSubHeader');
    if (sub) sub.innerText = `${m.brand} · ${m.title}`;

    window.switchTeamShareTab(activeTab || 'exec');
    document.getElementById('nextUniversalTeamShareModal').style.display = 'flex';
  };

  window.closeTeamShareModal = function() {
    const modal = document.getElementById('nextUniversalTeamShareModal');
    if (modal) modal.style.display = 'none';
  };

  window.switchTeamShareTab = function(tab) {
    activeTab = tab;
    const m = getMomentData(currentMomentKey);

    document.querySelectorAll('.ts-tab-btn').forEach(btn => {
      if (btn.getAttribute('data-tab') === tab) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    renderTabContent(tab, m);
  };

  window.copyCurrentTeamBrief = function() {
    const m = getMomentData(currentMomentKey);
    const text = getBriefText(activeTab, m);
    navigator.clipboard.writeText(text).then(() => {
      alert(`✓ ${activeTab.toUpperCase()} brief copied to clipboard! Ready to paste into Slack/Teams.`);
    }).catch(() => {
      alert("Copied to clipboard!");
    });
  };

  window.copyAllTeamBriefs = function() {
    const m = getMomentData(currentMomentKey);
    const tabs = ['exec', 'marketing', 'finance', 'legal', 'supply', 'media', 'hr'];
    const fullText = tabs.map(t => getBriefText(t, m)).join('\n\n========================================\n\n');
    navigator.clipboard.writeText(fullText).then(() => {
      alert("✓ Complete Cross-Functional Team Pack copied to clipboard! (Executive, Marketing, Finance, Legal, Supply, Media, HR)");
    }).catch(() => {
      alert("Copied!");
    });
  };

  window.simulateTeamsDispatch = function() {
    const m = getMomentData(currentMomentKey);
    alert(`🚀 DISPATCHED TO ENTERPRISE TEAMS CHANNELS!\n\n• #hul-brand-triage (${m.brand})\n• #legal-briefs (ASCI Chapter 1.4 Disclaimer Attached)\n• #category-finance (PO HUL-HC-2026)\n• #quick-commerce-ops (48 Dark Store Hubs Alerted)\n\nAll cross-functional stakeholders notified in real-time.`);
  };

})();
