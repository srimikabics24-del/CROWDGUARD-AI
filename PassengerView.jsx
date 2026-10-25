import React, { useState, useEffect } from 'react';
import { 
  createIncident, 
  getActivePassengerRequestId, 
  getStoredIncidents, 
  clearActivePassengerRequest 
} from '../services/storageService';
import { SITUATION_CONFIG, URGENCY_LEVELS, SUPPORT_MODES } from '../services/responseEngine';
import { 
  ShieldAlert, 
  Send, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  EyeOff, 
  Compass, 
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  XCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export default function PassengerView({ onTriggerCamouflage, showToast, onNavigateToHelper }) {
  // Form State
  const [situation, setSituation] = useState('unwanted_attention');
  const [urgency, setUrgency] = useState('moderate');
  const [supportRequested, setSupportRequested] = useState('both');
  const [transitType, setTransitType] = useState('Metro Line 3 (Blue)');
  const [vehicleNumber, setVehicleNumber] = useState('Carriage 4');
  const [stationOrStop, setStationOrStop] = useState('Central Concourse');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Active Request Tracking
  const [activeRequestId, setActiveRequestId] = useState(null);
  const [activeIncident, setActiveIncident] = useState(null);

  useEffect(() => {
    loadActiveRequest();
    const interval = setInterval(loadActiveRequest, 2500); // Poll local store for staff/helper updates
    return () => clearInterval(interval);
  }, []);

  const loadActiveRequest = () => {
    const id = getActivePassengerRequestId();
    if (id) {
      setActiveRequestId(id);
      const allIncidents = getStoredIncidents();
      const match = allIncidents.find(i => i.id === id);
      if (match) {
        setActiveIncident(match);
      }
    } else {
      setActiveRequestId(null);
      setActiveIncident(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!consentGiven) {
      setValidationError('Please confirm consent to coordinate with bystander helpers or transit staff.');
      return;
    }

    setIsSubmitting(true);

    try {
      const newRecord = createIncident({
        situation,
        urgency,
        supportRequested,
        transitType,
        vehicleNumber,
        stationOrStop,
        additionalNotes
      });

      setActiveRequestId(newRecord.id);
      setActiveIncident(newRecord);
      setIsSubmitting(false);

      showToast({
        title: 'Discreet Request Submitted',
        message: `ID ${newRecord.id} is active. Response plan generated and dispatched.`,
        type: 'success'
      });
    } catch (err) {
      setIsSubmitting(false);
      setValidationError('Failed to generate plan. Please try again.');
    }
  };

  const handleCancelRequest = () => {
    if (window.confirm('Are you safe and would you like to close this active request?')) {
      clearActivePassengerRequest();
      setActiveRequestId(null);
      setActiveIncident(null);
      showToast({
        title: 'Request Closed',
        message: 'Active request cleared from your mobile session.',
        type: 'info'
      });
    }
  };

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto' }}>
      {/* Top Passenger Header & Quick Discreet Camouflage banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#00f2fe', letterSpacing: '0.05em', fontWeight: 700 }}>
            Passenger Discreet Safe-Zone
          </span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.2rem' }}>
            Request Discreet Assistance
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#94a3b8', maxWidth: '600px' }}>
            Coordinate low-key bystander distraction or transport staff intervention without escalating tensions or confronting anyone directly.
          </p>
        </div>

        <button
          onClick={onTriggerCamouflage}
          className="discreet-toggle-btn"
          style={{ padding: '0.6rem 1rem' }}
        >
          <EyeOff size={16} />
          <span>Hide Screen (Camouflage)</span>
        </button>
      </div>

      {/* ACTIVE REQUEST TRACKER (IF SUBMITTED) */}
      {activeIncident && (
        <section aria-label="Active Incident Status" className="card highlighted" style={{ marginBottom: '2rem', borderColor: '#00f2fe' }}>
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon" style={{ background: 'rgba(0, 242, 254, 0.2)', color: '#00f2fe' }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
                  Active Request: {activeIncident.id}
                </h2>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                  Submitted {new Date(activeIncident.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className={`status-badge status-${activeIncident.status.toLowerCase()}`}>
                <span className="indicator-dot" style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: activeIncident.status === 'Closed' ? '#10b981' : '#00f2fe'
                }} />
                Status: {activeIncident.status}
              </span>
              <button
                onClick={handleCancelRequest}
                className="btn-secondary-sm"
                title="Mark safe / Clear active tracking"
              >
                <XCircle size={14} /> Safe / Close
              </button>
            </div>
          </div>

          {/* Interactive Status Timeline */}
          <div style={{ background: 'rgba(9, 14, 25, 0.7)', borderRadius: '10px', padding: '1rem', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>
              <span>Live Response Timeline</span>
              <span>Updated Real-Time</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
              {['New', 'Acknowledged', 'Responding', 'Closed'].map((step, idx) => {
                const stepOrder = { New: 1, Acknowledged: 2, Responding: 3, Closed: 4 };
                const currentOrder = stepOrder[activeIncident.status] || 1;
                const isPassed = stepOrder[step] <= currentOrder;
                const isCurrent = activeIncident.status === step;

                return (
                  <div key={step} style={{
                    padding: '0.5rem 0.25rem',
                    borderRadius: '6px',
                    background: isCurrent ? 'rgba(0, 242, 254, 0.15)' : isPassed ? 'rgba(255,255,255,0.04)' : 'transparent',
                    border: isCurrent ? '1px solid #00f2fe' : '1px solid rgba(255,255,255,0.05)',
                    color: isCurrent ? '#00f2fe' : isPassed ? '#cbd5e1' : '#64748b'
                  }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                      {idx + 1}. {step}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Context-Aware Recommended Action Plan */}
          <div style={{ background: 'linear-gradient(145deg, rgba(14, 26, 49, 0.9), rgba(10, 19, 36, 0.9))', border: '1px solid var(--border-accent)', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Sparkles size={18} color="#00f2fe" />
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#00f2fe', margin: 0 }}>
                Your Tailored Safety & De-escalation Plan
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {activeIncident.fullRecommendation?.passengerPlan?.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '8px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(0, 242, 254, 0.2)', color: '#00f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>
                    {item.step}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', margin: 0 }}>{item.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '2px', margin: 0 }}>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Why This Was Recommended */}
            <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(0, 242, 254, 0.05)', borderRadius: '8px', borderLeft: '3px solid #00f2fe' }}>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#00f2fe', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
                Why this recommendation? (Transparent Rule Engine)
              </span>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>
                {activeIncident.fullRecommendation?.reasoning?.summary || 'Formulated based on situation classification, urgency level, and safe bystander distraction heuristics.'}
              </p>
            </div>
          </div>

          {/* Live Staff & Helper Engagement Status */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'rgba(18, 28, 51, 0.6)', padding: '0.9rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem', color: '#00f2fe', fontSize: '0.82rem', fontWeight: 600 }}>
                <ShieldCheck size={16} /> Bystander Helper Status
              </div>
              <p style={{ fontSize: '0.8rem', color: '#cbd5e1', margin: 0 }}>
                {activeIncident.assignedHelpers?.length > 0 
                  ? `Active helpers nearby: ${activeIncident.assignedHelpers.join(', ')}. They are following non-confrontational distraction protocol.`
                  : 'Alert broadcast to vetted peer helpers in your transit vicinity. Awaiting first acceptance.'}
              </p>
            </div>

            <div style={{ background: 'rgba(18, 28, 51, 0.6)', padding: '0.9rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem', color: '#06b6d4', fontSize: '0.82rem', fontWeight: 600 }}>
                <Clock size={16} /> Staff Dispatch Log
              </div>
              <p style={{ fontSize: '0.8rem', color: '#cbd5e1', margin: 0 }}>
                {activeIncident.staffNotes?.length > 0
                  ? activeIncident.staffNotes[activeIncident.staffNotes.length - 1].text
                  : activeIncident.status === 'New' 
                    ? 'Staff console notified. Priority dispatch being assigned.' 
                    : 'Staff team monitoring transit line.'}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* DISCREET REQUEST FORM */}
      <section aria-label="Request Assistance Form" className="card">
        <form onSubmit={handleSubmit}>
          {/* Situation Selection */}
          <div className="form-group">
            <label className="form-label">
              1. What describes your current situation?
              <span className="sub-label">(Select closest match)</span>
            </label>
            <div className="situation-grid">
              {Object.entries(SITUATION_CONFIG).map(([key, config]) => (
                <div
                  key={key}
                  className={`option-card ${situation === key ? 'selected' : ''}`}
                  onClick={() => setSituation(key)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') setSituation(key); }}
                >
                  <div className="option-card-title">
                    <span>{config.label.split('/')[0]}</span>
                    {situation === key && <CheckCircle2 size={16} color="#00f2fe" />}
                  </div>
                  <span className="option-card-desc">{config.typicalDeescalation}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Urgency Selection */}
          <div className="form-group" style={{ marginTop: '1.5rem' }}>
            <label className="form-label">
              2. Urgency Level
              <span className="sub-label">(Determines helper distraction vs immediate staff dispatch)</span>
            </label>
            <div className="urgency-grid">
              {Object.entries(URGENCY_LEVELS).map(([key, item]) => (
                <div
                  key={key}
                  className={`urgency-card ${urgency === key ? `selected urgency-${key}` : ''}`}
                  onClick={() => setUrgency(key)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') setUrgency(key); }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem', color: item.color }}>
                      {item.label}
                    </span>
                    {urgency === key && <CheckCircle2 size={16} color={item.color} />}
                  </div>
                  <span style={{ fontSize: '0.74rem', color: '#94a3b8', lineHeight: 1.3 }}>
                    {item.description}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Support Mode Selection */}
          <div className="form-group" style={{ marginTop: '1.5rem' }}>
            <label className="form-label">
              3. Desired Support Type
              <span className="sub-label">(Choose how you feel most comfortable being assisted)</span>
            </label>
            <div className="support-grid">
              {Object.entries(SUPPORT_MODES).map(([key, item]) => (
                <div
                  key={key}
                  className={`support-card ${supportRequested === key ? 'selected' : ''}`}
                  onClick={() => setSupportRequested(key)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') setSupportRequested(key); }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#fff' }}>
                      {item.label}
                    </span>
                    {supportRequested === key && <CheckCircle2 size={16} color="#00f2fe" />}
                  </div>
                  <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                    {item.summary}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Optional Location & Transit Details */}
          <div className="form-group" style={{ marginTop: '1.5rem' }}>
            <label className="form-label">
              4. Location & Transit Details
              <span className="sub-label">(Helps helpers & staff pinpoint your carriage or platform)</span>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                  Transit Line / Vehicle
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Metro Blue Line / Bus 42"
                  value={transitType}
                  onChange={(e) => setTransitType(e.target.value)}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                  Carriage / Seat / Section
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Carriage 4, near rear doors"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                  Current Station / Direction
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. En route to Central Station"
                  value={stationOrStop}
                  onChange={(e) => setStationOrStop(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                Additional Observations (Optional & Non-Accusatory)
              </label>
              <textarea
                className="form-textarea"
                rows={2}
                placeholder="Optional notes (e.g., passenger wearing green jacket needs seat swap; please ask for directions)"
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
              />
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="consent-wrapper">
            <input
              type="checkbox"
              id="passenger-consent-check"
              className="consent-checkbox"
              checked={consentGiven}
              onChange={(e) => setConsentGiven(e.target.checked)}
            />
            <label htmlFor="passenger-consent-check" className="consent-text">
              <strong>I give consent to coordinate discreet assistance.</strong> I understand this is a hackathon simulation that activates safe, non-confrontational bystander guidance and staff dispatch protocols without automated criminal accusations or public panic.
            </label>
          </div>

          {validationError && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem', color: '#f43f5e', fontSize: '0.82rem' }}>
              <AlertCircle size={15} />
              <span>{validationError}</span>
            </div>
          )}

          {/* Submit Button */}
          <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn ${urgency === 'high' ? 'btn-urgent' : 'btn-primary'}`}
              style={{ minWidth: '220px' }}
            >
              {isSubmitting ? (
                <>
                  <RefreshCw size={16} className="spinning" />
                  <span>Formulating Action Plan...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Submit Discreet Request</span>
                </>
              )}
            </button>

            <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
              No sound will play on your device.
            </span>
          </div>
        </form>
      </section>
    </div>
  );
}
