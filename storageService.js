/**
 * CROWDGUARD AI — LocalStorage Service
 * Handles loading, creating, updating, and resetting local demo incident records.
 */
import { INITIAL_DEMO_INCIDENTS } from '../data/demoData';
import { evaluateResponsePlan } from './responseEngine';

const STORAGE_KEY = 'crowdguard_demo_incidents_v1';
const ACTIVE_PASSENGER_REQUEST_KEY = 'crowdguard_active_passenger_request_id';

export function getStoredIncidents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_INCIDENTS));
      return INITIAL_DEMO_INCIDENTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_DEMO_INCIDENTS;
  } catch (err) {
    console.warn('Error reading from localStorage, using demo defaults', err);
    return INITIAL_DEMO_INCIDENTS;
  }
}

export function saveIncidents(incidents) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(incidents));
  } catch (err) {
    console.error('Failed to save incidents to localStorage', err);
  }
}

export function createIncident({
  situation,
  urgency,
  supportRequested,
  transitType,
  vehicleNumber,
  stationOrStop,
  additionalNotes
}) {
  const incidents = getStoredIncidents();
  const newId = `CG-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date().toISOString();

  // Run the transparent rule-based engine
  const recommendation = evaluateResponsePlan({
    situation,
    urgency,
    supportRequested,
    locationContext: `${transitType || ''} ${vehicleNumber || ''}`.trim()
  });

  const newIncident = {
    id: newId,
    createdAt: now,
    situation,
    urgency,
    supportRequested,
    location: {
      transitType: transitType || 'Unspecified Transit Line',
      vehicleNumber: vehicleNumber || 'Carriage / Seat not specified',
      stationOrStop: stationOrStop || 'In Transit',
      additionalNotes: additionalNotes || ''
    },
    consentGiven: true,
    status: 'New',
    statusHistory: [
      {
        status: 'New',
        timestamp: now,
        note: 'Discreet request logged by passenger on mobile interface.'
      }
    ],
    assignedHelpers: [],
    staffNotes: [],
    recommendedPlan: {
      priority: recommendation.priority,
      passengerTip: recommendation.passengerPlan[0]?.detail || 'Stay visible and follow safety protocol.',
      helperAction: recommendation.helperGuidance.tactics[0]?.description || 'Offer passive non-confrontational presence.'
    },
    fullRecommendation: recommendation
  };

  const updatedList = [newIncident, ...incidents];
  saveIncidents(updatedList);

  // Set as current active request for the passenger view
  localStorage.setItem(ACTIVE_PASSENGER_REQUEST_KEY, newId);

  return newIncident;
}

export function updateIncidentStatus(id, newStatus, optionalNote = '', staffAuthor = 'Staff Console') {
  const incidents = getStoredIncidents();
  const now = new Date().toISOString();

  const updated = incidents.map(item => {
    if (item.id === id) {
      const historyEntry = {
        status: newStatus,
        timestamp: now,
        note: optionalNote || `Status updated to ${newStatus} by ${staffAuthor}.`
      };

      const updatedHistory = [...(item.statusHistory || []), historyEntry];
      const updatedNotes = [...(item.staffNotes || [])];

      if (optionalNote) {
        updatedNotes.push({
          author: staffAuthor,
          timestamp: now,
          text: optionalNote
        });
      }

      return {
        ...item,
        status: newStatus,
        statusHistory: updatedHistory,
        staffNotes: updatedNotes
      };
    }
    return item;
  });

  saveIncidents(updated);
  return updated.find(i => i.id === id);
}

export function helperAcceptRequest(id, helperTag = 'Volunteer Helper #You') {
  const incidents = getStoredIncidents();
  const now = new Date().toISOString();

  const updated = incidents.map(item => {
    if (item.id === id) {
      const helpers = Array.isArray(item.assignedHelpers) ? [...item.assignedHelpers] : [];
      if (!helpers.includes(helperTag)) {
        helpers.push(helperTag);
      }

      const isFirstHelper = helpers.length === 1 && item.status === 'New';
      const newStatus = isFirstHelper ? 'Acknowledged' : item.status;

      const historyEntry = {
        status: newStatus,
        timestamp: now,
        note: `${helperTag} accepted bystander support request (Safe 5 D's protocol activated).`
      };

      return {
        ...item,
        status: newStatus,
        assignedHelpers: helpers,
        statusHistory: [...(item.statusHistory || []), historyEntry]
      };
    }
    return item;
  });

  saveIncidents(updated);
  return updated.find(i => i.id === id);
}

export function addStaffNote(id, noteText, author = 'Station Dispatcher') {
  if (!noteText.trim()) return;
  const incidents = getStoredIncidents();
  const now = new Date().toISOString();

  const updated = incidents.map(item => {
    if (item.id === id) {
      const currentNotes = Array.isArray(item.staffNotes) ? [...item.staffNotes] : [];
      currentNotes.push({
        author,
        timestamp: now,
        text: noteText.trim()
      });
      return {
        ...item,
        staffNotes: currentNotes
      };
    }
    return item;
  });

  saveIncidents(updated);
  return updated.find(i => i.id === id);
}

export function getActivePassengerRequestId() {
  return localStorage.getItem(ACTIVE_PASSENGER_REQUEST_KEY) || null;
}

export function clearActivePassengerRequest() {
  localStorage.removeItem(ACTIVE_PASSENGER_REQUEST_KEY);
}

export function resetDemoData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_INCIDENTS));
  localStorage.removeItem(ACTIVE_PASSENGER_REQUEST_KEY);
  return INITIAL_DEMO_INCIDENTS;
}
