/**
 * CROWDGUARD AI — Context-Aware Response Engine
 * 
 * TRANSPARENCY NOTICE:
 * This is a deterministic, rule-based recommendation engine based on established 
 * public transit safety heuristics and the standard 5 D's of Bystander Intervention 
 * (Distract, Delegate, Document, Delay, Direct - safety focused).
 * 
 * It DOES NOT:
 * - Claim to predict crimes or future actions.
 * - Profile, identify, or accuse any individual.
 * - Use black-box machine learning or facial recognition.
 * - Ever recommend direct confrontation or aggression.
 */

export const SITUATION_CONFIG = {
  unwanted_attention: {
    label: 'Unwanted Attention / Staring / Intrusive Posturing',
    baseSeverity: 'moderate',
    category: 'Spatial / Psychological Discomfort',
    typicalDeescalation: 'Distraction & Physical Separation'
  },
  verbal_harassment: {
    label: 'Verbal Harassment / Inappropriate Comments',
    baseSeverity: 'moderate',
    category: 'Verbal Intimidation',
    typicalDeescalation: 'Third-Party Conversation & Staff Notification'
  },
  unwanted_touching: {
    label: 'Unwanted Touching / Physical Incursion',
    baseSeverity: 'high',
    category: 'Physical Boundary Breach',
    typicalDeescalation: 'Immediate Barrier Creation & Staff Intervention'
  },
  following: {
    label: 'Following / Cornering at Station or Vehicle',
    baseSeverity: 'high',
    category: 'Movement Restriction / Stalking',
    typicalDeescalation: 'Staff Escort & Crowded Public Regrouping'
  },
  other: {
    label: 'Other Unsafe or Intimidating Circumstance',
    baseSeverity: 'low',
    category: 'General Safety Concern',
    typicalDeescalation: 'Discreet Monitoring & Presence'
  }
};

export const URGENCY_LEVELS = {
  low: {
    label: 'Low Urgency (Monitoring)',
    badgeClass: 'badge-low',
    color: '#38bdf8',
    description: 'Feeling uncomfortable; would appreciate passive presence or low-key monitoring.'
  },
  moderate: {
    label: 'Moderate Urgency (Active Concern)',
    badgeClass: 'badge-moderate',
    color: '#f59e0b',
    description: 'Active unwanted behavior persisting; assistance needed to diffuse without confrontation.'
  },
  high: {
    label: 'High Urgency (Immediate Action Needed)',
    badgeClass: 'badge-high',
    color: '#ef4444',
    description: 'Physical proximity breach, intimidation, or feeling trapped; urgent intervention required.'
  }
};

export const SUPPORT_MODES = {
  helper: {
    label: 'Discreet Nearby Helper Only',
    summary: 'Mobilize trusted bystanders for gentle distraction and physical buffering.'
  },
  staff: {
    label: 'Transport Staff Assistance Only',
    summary: 'Alert operator, transit police, or platform staff for formal check.'
  },
  both: {
    label: 'Both Nearby Helper & Transport Staff',
    summary: 'Coordinate bystander buffer now while dispatching staff to intercept.'
  }
};

/**
 * Main transparent rule evaluation function.
 * @param {Object} input
 * @param {string} input.situation - Key in SITUATION_CONFIG
 * @param {string} input.urgency - 'low' | 'moderate' | 'high'
 * @param {string} input.supportRequested - 'helper' | 'staff' | 'both'
 * @param {string} [input.locationContext] - Optional context description (e.g. 'crowded metro', 'night bus')
 * @returns {Object} Comprehensive, explainable response recommendation
 */
export function evaluateResponsePlan({
  situation = 'unwanted_attention',
  urgency = 'moderate',
  supportRequested = 'both',
  locationContext = ''
}) {
  const situationMeta = SITUATION_CONFIG[situation] || SITUATION_CONFIG.other;
  const urgencyMeta = URGENCY_LEVELS[urgency] || URGENCY_LEVELS.moderate;
  const supportMeta = SUPPORT_MODES[supportRequested] || SUPPORT_MODES.both;

  // 1. Calculate Priority Index (P1 = Urgent, P2 = Elevated, P3 = Standard)
  let priority = 'P2 - Elevated';
  let priorityScore = 2;

  if (urgency === 'high' || situation === 'unwanted_touching' || situation === 'following') {
    priority = 'P1 - High Priority';
    priorityScore = 1;
  } else if (urgency === 'low' && (situation === 'other' || situation === 'unwanted_attention')) {
    priority = 'P3 - Standard Advisory';
    priorityScore = 3;
  }

  // 2. Generate Passenger Action Plan
  const passengerSteps = [];
  if (urgency === 'high') {
    passengerSteps.push({
      step: 1,
      title: 'Move Toward Visibility',
      detail: 'If feasible without sudden agitation, move steadily toward the train car operator, front of the bus, or under a bright security camera.'
    });
    passengerSteps.push({
      step: 2,
      title: 'Keep Screen Discreet',
      detail: 'Keep your phone brightness dimmed and use our "Discreet Camouflage Mode" if anyone glances over your shoulder.'
    });
    passengerSteps.push({
      step: 3,
      title: 'Prepare Non-Verbal Exit',
      detail: 'Identify your next station or stop. Stand near doors with other exiting passengers when the vehicle slows.'
    });
  } else if (urgency === 'moderate') {
    passengerSteps.push({
      step: 1,
      title: 'Positioning & Distance',
      detail: 'Create physical space by pretending to look for a seat, checking transit maps, or moving closer to families/groups.'
    });
    passengerSteps.push({
      step: 2,
      title: 'Allow Natural Helper Contact',
      detail: 'A nearby volunteer helper may initiate casual small talk (e.g. asking for the time). You can lean into this conversation safely.'
    });
  } else {
    passengerSteps.push({
      step: 1,
      title: 'Quiet Observation',
      detail: 'Maintain situational awareness while remaining calm. You are under passive peer-monitoring.'
    });
    passengerSteps.push({
      step: 2,
      title: 'Escalation Ready',
      detail: 'If the behavior changes or worsens, one tap will instantly escalate this request to staff.'
    });
  }

  // 3. Generate Helper Guidance (STRICT NON-CONFRONTATIONAL POLICY)
  const helperGuidance = {
    tactics: [],
    strictRules: [
      'NEVER confront, stare at, or accuse the suspected harasser.',
      'Do not escalate verbal tensions or make physical contact with the harasser.',
      'Focus 100% of your warmth, attention, and presence on the passenger in distress.',
      'If you feel unsafe at any point, step back and notify transit staff immediately.'
    ],
    sampleScripts: []
  };

  if (supportRequested === 'helper' || supportRequested === 'both') {
    if (situation === 'unwanted_attention' || situation === 'verbal_harassment') {
      helperGuidance.tactics.push({
        name: 'The Casual Distraction (Distract)',
        description: 'Engage the passenger in casual, everyday conversation to break the uncomfortable interaction without acknowledging the harasser.',
        urgency: 'Recommended first step'
      });
      helperGuidance.sampleScripts.push(
        '"Excuse me, sorry to bother you, do you happen to know if this train stops at Central Station?"',
        '"Hey! Is this seat next to you free? Mind if I sit here?"',
        '"Excuse me, can you tell me what time it is? My phone just died."'
      );
    } else if (situation === 'following' || situation === 'unwanted_touching') {
      helperGuidance.tactics.push({
        name: 'The Gentle Buffer (Presence)',
        description: 'Position your body calmly between the passenger and the source of discomfort, as if adjusting for crowded transit movement. Offer to walk together.',
        urgency: 'Immediate non-verbal support'
      });
      helperGuidance.sampleScripts.push(
        '"Hi there! Are you heading to the station exit as well? Mind if we walk together towards the help desk?"',
        '"Excuse me, we have an empty seat over with our group if you would like to move away from the aisle."'
      );
    } else {
      helperGuidance.tactics.push({
        name: 'Passive Check-in (Delay & Check)',
        description: 'Make gentle eye contact and discreetly check if the passenger needs any assistance.',
        urgency: 'Low-key check'
      });
      helperGuidance.sampleScripts.push(
        '"Everything okay over here? Let me know if you need any directions."'
      );
    }
  } else {
    helperGuidance.tactics.push({
      name: 'Observe from Distance',
      description: 'Passenger requested Staff Assistance only. Keep a respectful distance and only act if direct safety is at risk while staff arrives.',
      urgency: 'Standby'
    });
  }

  // 4. Generate Transport Staff Protocol
  const staffProtocol = {
    triageLevel: priority,
    recommendedAction: '',
    estimatedDispatchWindow: urgency === 'high' ? '1 to 3 minutes (Next Stop Intercept)' : '3 to 6 minutes',
    suggestedProcedure: []
  };

  if (supportRequested === 'staff' || supportRequested === 'both') {
    if (urgency === 'high') {
      staffProtocol.recommendedAction = 'Active Platform / Vehicle Intercept at Next Station';
      staffProtocol.suggestedProcedure = [
        'Alert train conductor / station customer service at next stop to board designated car.',
        'Review live platform & carriage CCTV feed corresponding to vehicle number.',
        'Conduct a calm, routine presence walkthrough without singling out individuals publicly.',
        'Offer passenger direct escort to well-lit station customer hub or platform exit.'
      ];
    } else {
      staffProtocol.recommendedAction = 'Routine Vehicle Patrol & Platform Monitoring';
      staffProtocol.suggestedProcedure = [
        'Notify roving transit security or station attendant to perform routine walkthrough.',
        'Log incident in station incident logbook for spatial trend analysis.',
        'Keep communications open on the discreet incident channel.'
      ];
    }
  } else {
    staffProtocol.recommendedAction = 'Logged for Operational Awareness (No Active Dispatch Requested)';
    staffProtocol.suggestedProcedure = [
      'Maintain situational awareness along transit line.',
      'Auto-escalate if passenger updates request to include Staff Support.'
    ];
  }

  // 5. Plain English Rule-Based Reasoning Explanation
  const reasoningFactors = [
    `Situation classified as "${situationMeta.label}" (Base category: ${situationMeta.category}).`,
    `Urgency specified by passenger is "${urgencyMeta.label}".`,
    `Assistance channel requested is "${supportMeta.label}".`
  ];

  let whyExplanation = '';
  if (urgency === 'high' && situation === 'unwanted_touching') {
    whyExplanation = 'Because physical boundary incursions carry immediate safety concerns, the engine assigned P1 High Priority. It instructs transport staff to intercept at the very next scheduled stop while advising nearby helpers to act as a physical buffer and distraction—strictly without making verbal accusations that could escalate tensions in an enclosed transit vehicle.';
  } else if (urgency === 'high' && situation === 'following') {
    whyExplanation = 'Following scenarios involve mobility and egress restriction. The engine prioritizes guiding the passenger toward bright, monitored transit zones and prompts helpers to offer joint walking or seat swapping, alerting staff to meet the vehicle at the platform.';
  } else if (situation === 'verbal_harassment' || situation === 'unwanted_attention') {
    whyExplanation = 'Verbal and spatial harassment are most safely defused through non-confrontational bystander distraction (the 5 D\'s methodology). By having a bystander engage the passenger in casual neutral conversation (e.g. asking for the time or directions), the harasser loses psychological dominance without anyone being directly confronted or provoked.';
  } else {
    whyExplanation = `Engine assessed moderate urgency with ${supportRequested} support requested. It selected passive presence and low-key distraction guidance to prevent unnecessary alarm while ensuring the passenger feels supported and transit staff have active operational visibility.`;
  }

  return {
    engineVersion: 'CrowdGuard-Rules-v2.4 (Deterministic / Explainable)',
    timestamp: new Date().toISOString(),
    inputs: {
      situation,
      situationLabel: situationMeta.label,
      urgency,
      urgencyLabel: urgencyMeta.label,
      supportRequested,
      supportLabel: supportMeta.label,
      locationContext
    },
    priority,
    priorityScore,
    passengerPlan: passengerSteps,
    helperGuidance,
    staffProtocol,
    reasoning: {
      summary: whyExplanation,
      factors: reasoningFactors,
      methodology: 'Heuristic Multi-Tier De-escalation & Right To Be 5 D\'s Framework'
    },
    safetyNotice: 'Transparent Rule Evaluation: This output is calculated via deterministic safety heuristics. No automated accusation, AI prediction, or criminal record check is performed.'
  };
}
