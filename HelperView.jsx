import React, { useState } from 'react';
import { 
  HeartHandshake, 
  ShieldCheck, 
  AlertTriangle, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  MapPin, 
  UserCheck, 
  Compass,
  ArrowRight,
  Shield,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { helperAcceptRequest } from '../services/storageService';
import { SITUATION_CONFIG } from '../services/responseEngine';

export default function HelperView({ incidents, refreshIncidents, showToast }) {
  const [selectedIncidentId, setSelectedIncidentId] = useState(null);
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'needs_helper'

  // Filter requests that need helper or requested helper
  const availableRequests = incidents.filter(i => {
    if (i.status === 'Closed') return false;
    if (filterMode === 'needs_helper') {
      return (i.supportRequested === 'helper' || i.supportRequested === 'both') && (i.assignedHelpers?.length === 0);
    }
    return i.supportRequested === 'helper' || i.supportRequested === 'both';
  });

  const handleAccept = (incident) => {
    try {
      const updated = helperAcceptRequest(incident.id, 'Volunteer Helper #You');
      refreshIncidents();
      setSelectedIncidentId(incident.id);
      showToast({
        title: 'Assistance Request Accepted',
        message: `You are designated as a supportive bystander for ${incident.id}. Please read the non-confrontational protocol below.`,
        type: 'success'
      });
    } catch (err) {
      showToast({
        title: 'Error',
        message: 'Could not accept request.',
        type: 'error'
      });
    }
  };

  const selectedIncident = incidents.find(i => i.id === selectedIncidentId) || availableRequests[0];

  return (
    <div>
      {/* Top Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#00f2fe', letterSpacing: '0.05em', fontWeight: 700 }}>
          Bystander Coordination Hub
        </span>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.2rem' }}>
          Helper & Peer Ally Dashboard
        </h1>
        <p style={{ fontSize: '0.88rem', color: '#94a3b8', maxWidth: '750px' }}>
          Trained peer bystanders safely defuse transit intimidation using indirect distraction and supportive presence. 
          <strong> Strict Rule: Never confront or accuse suspected harassers.</strong>
        </p>
      </div>

      {/* CORE SAFETY DIRECTIVE BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.1), rgba(15, 23, 42, 0.8))',
        border: '1px solid rgba(244, 63, 94, 0.3)',
        borderRadius: '12px',
        padding: '1rem 1.25rem',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.85rem'
      }}>
        <AlertTriangle size={22} color="#f43f5e" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fca5a5', margin: 0 }}>
            Mandatory Bystander Safety Principle
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#cbd5e1', margin: '4px 0 0 0', lineHeight: 1.45 }}>
            Do not confront, argue with, glare at, or accuse the suspected harasser. Direct confrontation increases danger in enclosed spaces. 
            Direct 100% of your warmth, eye contact, and small talk to the <strong>passenger requesting help</strong>. Your own safety is always your first priority.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
        {/* Left Column: Nearby Assistance Queue */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <HeartHandshake size={18} color="#00f2fe" />
              <span>Available Transit Requests ({availableRequests.length})</span>
            </h2>

            <div style={{ display: 'flex', gap: '0.3rem' }}>
              <button
                onClick={() => setFilterMode('all')}
                className={`btn-secondary-sm ${filterMode === 'all' ? 'active' : ''}`}
                style={{ fontSize: '0.72rem', padding: '0.25rem 0.5rem' }}
              >
                All
              </button>
              <button
                onClick={() => setFilterMode('needs_helper')}
                className={`btn-secondary-sm ${filterMode === 'needs_helper' ? 'active' : ''}`}
                style={{ fontSize: '0.72rem', padding: '0.25rem 0.5rem' }}
              >
                Unclaimed
              </button>
            </div>
          </div>

          {availableRequests.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
              <ShieldCheck size={36} color="#10b981" style={{ margin: '0 auto 0.75rem auto' }} />
              <h3 style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.25rem' }}>No Active Bystander Requests</h3>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                All nearby requests have accepted helpers or are resolved. Check back or simulate a new request from the Passenger tab.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {availableRequests.map(req => {
                const situationLabel = SITUATION_CONFIG[req.situation]?.label.split('/')[0] || req.situation;
                const isSelected = selectedIncident?.id === req.id;
                const isUserAssigned = req.assignedHelpers?.includes('Volunteer Helper #You');

                return (
                  <div
                    key={req.id}
                    onClick={() => setSelectedIncidentId(req.id)}
                    className={`card ${isSelected ? 'highlighted' : ''}`}
                    style={{
                      padding: '1rem',
                      cursor: 'pointer',
                      borderLeft: isSelected ? '4px solid #00f2fe' : '1px solid var(--border-subtle)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <strong style={{ fontSize: '0.9rem', color: '#fff' }}>{req.id}</strong>
                          <span className={`badge badge-${req.urgency}`}>
                            {req.urgency} urgency
                          </span>
                        </div>
                        <span style={{ fontSize: '0.82rem', color: '#00f2fe', fontWeight: 600, display: 'block', marginTop: '2px' }}>
                          {situationLabel}
                        </span>
                      </div>

                      <span className={`status-badge status-${req.status.toLowerCase()}`} style={{ fontSize: '0.7rem' }}>
                        {req.status}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.2rem', marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <MapPin size={13} color="#38bdf8" />
                        <span>{req.location?.transitType} • {req.location?.vehicleNumber}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Clock size={13} />
                        <span>{req.location?.stationOrStop}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ fontSize: '0.72rem', color: req.assignedHelpers?.length > 0 ? '#6ee7b7' : '#f59e0b' }}>
                        {req.assignedHelpers?.length > 0 
                          ? `✓ ${req.assignedHelpers.length} Helper(s) Active` 
                          : 'Needs Peer Ally'}
                      </span>

                      {isUserAssigned ? (
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#00f2fe', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                          <UserCheck size={14} /> You are Assisting
                        </span>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAccept(req);
                          }}
                          className="btn-outline-teal"
                          style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', borderRadius: '4px' }}
                        >
                          Accept Support Role
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Safe Non-Confrontational Action Guide for Selected Incident */}
        <div>
          {selectedIncident ? (
            <div className="card highlighted" style={{ borderColor: 'rgba(0, 242, 254, 0.4)' }}>
              <div className="card-header">
                <div>
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#00f2fe', fontWeight: 700 }}>
                    Safe Bystander Protocol
                  </span>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '2px 0 0 0' }}>
                    De-escalation Guide for {selectedIncident.id}
                  </h2>
                </div>

                {!selectedIncident.assignedHelpers?.includes('Volunteer Helper #You') ? (
                  <button
                    onClick={() => handleAccept(selectedIncident)}
                    className="btn btn-primary"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.82rem' }}
                  >
                    Accept & Activate
                  </button>
                ) : (
                  <span style={{ background: 'rgba(0, 242, 254, 0.15)', color: '#00f2fe', padding: '0.35rem 0.7rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <ShieldCheck size={14} /> Protocol Engaged
                  </span>
                )}
              </div>

              {/* Passenger Request Details */}
              <div style={{ background: 'rgba(9, 14, 25, 0.7)', borderRadius: '8px', padding: '0.85rem', marginBottom: '1.25rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5rem', fontSize: '0.78rem' }}>
                  <div>
                    <span style={{ color: '#94a3b8', display: 'block' }}>Transit Line:</span>
                    <strong style={{ color: '#fff' }}>{selectedIncident.location?.transitType}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#94a3b8', display: 'block' }}>Carriage / Section:</span>
                    <strong style={{ color: '#fff' }}>{selectedIncident.location?.vehicleNumber}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#94a3b8', display: 'block' }}>Situation:</span>
                    <strong style={{ color: '#00f2fe' }}>
                      {SITUATION_CONFIG[selectedIncident.situation]?.label.split('/')[0] || selectedIncident.situation}
                    </strong>
                  </div>
                </div>

                {selectedIncident.location?.additionalNotes && (
                  <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '0.76rem', color: '#cbd5e1' }}>
                    <span style={{ color: '#94a3b8' }}>Passenger note: </span>
                    "{selectedIncident.location.additionalNotes}"
                  </div>
                )}
              </div>

              {/* Ready-to-Use Non-Confrontational Conversation Scripts */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MessageSquare size={16} color="#00f2fe" />
                  Recommended Distraction Scripts (Say these directly to the passenger)
                </h3>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
                  Act as though you are a friendly stranger or acquaintance. Never speak to or refer to the harasser.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ background: 'rgba(0, 242, 254, 0.08)', border: '1px solid rgba(0, 242, 254, 0.2)', padding: '0.75rem', borderRadius: '6px', fontSize: '0.82rem', color: '#f1f5f9' }}>
                    💬 <em>"Excuse me! Do you know if this train stops at Central Station next or does it skip?"</em>
                  </div>
                  <div style={{ background: 'rgba(0, 242, 254, 0.08)', border: '1px solid rgba(0, 242, 254, 0.2)', padding: '0.75rem', borderRadius: '6px', fontSize: '0.82rem', color: '#f1f5f9' }}>
                    💬 <em>"Hi! Mind if I sit right here? My legs are exhausted today."</em>
                  </div>
                  <div style={{ background: 'rgba(0, 242, 254, 0.08)', border: '1px solid rgba(0, 242, 254, 0.2)', padding: '0.75rem', borderRadius: '6px', fontSize: '0.82rem', color: '#f1f5f9' }}>
                    💬 <em>"Hey, excuse me, did you happen to drop this metro transit card?"</em>
                  </div>
                </div>
              </div>

              {/* The 5 D's of Bystander Intervention (Safe Non-Confrontational Variant) */}
              <div style={{ background: 'rgba(18, 28, 51, 0.5)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#00f2fe', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sparkles size={15} /> Safe 5 D's of Intervention
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.78rem' }}>
                  <li style={{ display: 'flex', gap: '0.5rem' }}>
                    <strong style={{ color: '#00f2fe', width: '70px', flexShrink: 0 }}>DISTRACT:</strong>
                    <span style={{ color: '#cbd5e1' }}>Talk casually to the person being harassed. Ignore the harasser completely.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}>
                    <strong style={{ color: '#00f2fe', width: '70px', flexShrink: 0 }}>DELEGATE:</strong>
                    <span style={{ color: '#cbd5e1' }}>Alert train conductor, driver, or platform staff using transit intercoms.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}>
                    <strong style={{ color: '#00f2fe', width: '70px', flexShrink: 0 }}>DELAY:</strong>
                    <span style={{ color: '#cbd5e1' }}>Check in on the passenger after the situation: "Are you okay? Can I walk with you?"</span>
                  </li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}>
                    <strong style={{ color: '#00f2fe', width: '70px', flexShrink: 0 }}>DIRECT:</strong>
                    <span style={{ color: '#cbd5e1' }}>Direct assistance toward the passenger only: "Would you like to swap seats with me?"</span>
                  </li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}>
                    <strong style={{ color: '#00f2fe', width: '70px', flexShrink: 0 }}>DOCUMENT:</strong>
                    <span style={{ color: '#cbd5e1' }}>Keep note of vehicle number and time; never film aggressive parties in close quarters.</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <p style={{ color: '#94a3b8' }}>Select a request on the left to review the tailored non-confrontational intervention plan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
