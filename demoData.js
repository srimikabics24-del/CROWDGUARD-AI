/**
 * CROWDGUARD AI — Realistic Demo Records
 * Stored locally in browser localStorage for demo and evaluation purposes.
 * Clearly marked as simulated records.
 */

export const INITIAL_DEMO_INCIDENTS = [
  {
    id: 'CG-8041',
    createdAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(), // 8 minutes ago
    situation: 'verbal_harassment',
    urgency: 'high',
    supportRequested: 'both',
    location: {
      transitType: 'Metro Line 3 (Blue Line)',
      vehicleNumber: 'Carriage 4 (Middle Section)',
      stationOrStop: 'En route: Central Station -> Grand Plaza',
      additionalNotes: 'Individual is loudly shouting intimidating remarks near door B.'
    },
    consentGiven: true,
    status: 'Responding', // New | Acknowledged | Responding | Closed
    statusHistory: [
      { status: 'New', timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(), note: 'Discreet request logged by passenger.' },
      { status: 'Acknowledged', timestamp: new Date(Date.now() - 1000 * 60 * 6).toISOString(), note: 'Staff console received P1 priority alert.' },
      { status: 'Responding', timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(), note: 'Transit Officer M. Ramos dispatched to Grand Plaza platform; Volunteer helper accepted low-key distraction.' }
    ],
    assignedHelpers: ['Volunteer Helper #412 (Carriage 4)'],
    staffNotes: [
      { author: 'Dispatcher J. Patel', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), text: 'Coordinating with platform attendants at Grand Plaza to board carriage 4 on arrival.' },
      { author: 'Staff M. Ramos', timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(), text: 'Platform team in position. CCTV monitor shows passenger seated near exit.' }
    ],
    recommendedPlan: {
      priority: 'P1 - High Priority',
      passengerTip: 'Stay seated near exit; staff will board as vehicle doors open.',
      helperAction: 'Stand near aisle casually to break line of sight without verbal confrontation.'
    }
  },
  {
    id: 'CG-7924',
    createdAt: new Date(Date.now() - 1000 * 60 * 24).toISOString(), // 24 minutes ago
    situation: 'unwanted_attention',
    urgency: 'moderate',
    supportRequested: 'helper',
    location: {
      transitType: 'City Bus 42',
      vehicleNumber: 'Bus #8102 (Lower Deck)',
      stationOrStop: 'Crossing 5th Avenue & Pine Street',
      additionalNotes: 'Individual persistently staring, shifting seats closer.'
    },
    consentGiven: true,
    status: 'Acknowledged',
    statusHistory: [
      { status: 'New', timestamp: new Date(Date.now() - 1000 * 60 * 24).toISOString(), note: 'Request initiated by passenger.' },
      { status: 'Acknowledged', timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(), note: 'Alert delivered to 2 nearby registered peer helpers on Bus 42.' }
    ],
    assignedHelpers: ['Volunteer Helper #108'],
    staffNotes: [
      { author: 'Bus Operations Desk', timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(), text: 'Passenger requested helper only. Monitoring bus GPS feed; driver alerted for routine rearview scan.' }
    ],
    recommendedPlan: {
      priority: 'P2 - Elevated',
      passengerTip: 'Maintain calm demeanor; helper will ask a neutral transit question.',
      helperAction: 'Politely ask to sit next to passenger or ask for current time.'
    }
  },
  {
    id: 'CG-7815',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
    situation: 'following',
    urgency: 'high',
    supportRequested: 'staff',
    location: {
      transitType: 'Rapid Rail Platform',
      vehicleNumber: 'Platform 2 (Northbound Concourse)',
      stationOrStop: 'Westside Terminal',
      additionalNotes: 'Person followed passenger from street level escalator to secluded platform bench.'
    },
    consentGiven: true,
    status: 'Closed',
    statusHistory: [
      { status: 'New', timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), note: 'Platform emergency beacon triggered via passenger phone.' },
      { status: 'Acknowledged', timestamp: new Date(Date.now() - 1000 * 60 * 44).toISOString(), note: 'Westside Station master alerted.' },
      { status: 'Responding', timestamp: new Date(Date.now() - 1000 * 60 * 41).toISOString(), note: 'Station security escort reached platform 2.' },
      { status: 'Closed', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), note: 'Passenger safely escorted to main transit customer service hub. Follower exited concourse.' }
    ],
    assignedHelpers: [],
    staffNotes: [
      { author: 'Supervisor K. Vance', timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString(), text: 'CCTV team monitored platform 2 north. Security officer escorted passenger.' },
      { author: 'Supervisor K. Vance', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), text: 'Passenger confirmed safe, boarding connecting train with escort. Case closed.' }
    ],
    recommendedPlan: {
      priority: 'P1 - High Priority',
      passengerTip: 'Move toward station customer booth or help kiosk under lighting.',
      helperAction: 'Standby for staff arrival.'
    }
  },
  {
    id: 'CG-8109',
    createdAt: new Date(Date.now() - 1000 * 60 * 3).toISOString(), // 3 mins ago
    situation: 'unwanted_touching',
    urgency: 'high',
    supportRequested: 'both',
    location: {
      transitType: 'Subway Red Line',
      vehicleNumber: 'Carriage 2 (Near Inter-Car Door)',
      stationOrStop: 'Approaching Civic Center Station',
      additionalNotes: 'Crowded car; individual repeatedly making inappropriate physical contact.'
    },
    consentGiven: true,
    status: 'New',
    statusHistory: [
      { status: 'New', timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(), note: 'Urgent incident submitted by passenger.' }
    ],
    assignedHelpers: [],
    staffNotes: [],
    recommendedPlan: {
      priority: 'P1 - High Priority',
      passengerTip: 'Hold handrail firmly, step sideways into open breathing space, or switch aisles.',
      helperAction: 'Immediate gentle buffer: stand between with backpack/bag, ask passenger for time.'
    }
  }
];
