import React, { useState } from 'react';
import { 
  evaluateResponsePlan, 
  SITUATION_CONFIG, 
  URGENCY_LEVELS, 
  SUPPORT_MODES 
} from '../services/responseEngine';
import { 
  Cpu, 
  Sparkles, 
  HelpCircle, 
  ShieldCheck, 
  Sliders, 
  CheckCircle2, 
  FileCode, 
  Info,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export default function EngineExplorerView() {
  const [situation, setSituation] = useState('verbal_harassment');
  const [urgency, setUrgency] = useState('high');
  const [supportRequested, setSupportRequested] = useState('both');
  const [transitLocation, setTransitLocation] = useState('Crowded Sub-surface Train (Carriage 3)');

  // Run the transparent rule engine
  const recommendation = evaluateResponsePlan({
    situation,
    urgency,
    supportRequested,
    locationContext: transitLocation
  });

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#00f2fe', letterSpacing: '0.05em', fontWeight: 700 }}>
          Deterministic Safety Architecture
        </span>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.2rem' }}>
          Context-Aware Response Engine Sandbox
        </h1>
        <p style={{ fontSize: '0.88rem', color: '#94a3b8', maxWidth: '780px' }}>
          Test and audit the transparent rule-based JavaScript engine in real time. 
          See exactly how input parameters produce tailored safety protocols, bystander distraction scripts, and dispatcher triage.
        </p>
      </div>

      {/* CORE HONESTY DISCLAIMER CARD */}
      <div style={{
        background: 'rgba(0, 242, 254, 0.04)',
        border: '1px solid var(--border-accent)',
        borderRadius: '12px',
        padding: '1.25rem',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <ShieldCheck size={20} color="#00f2fe" />
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', margin: 0 }}>
            Explainable Heuristics vs. Black-Box Crime Prediction
          </h2>
        </div>
        <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>
          Unlike problematic "predictive policing" algorithms that claim to predict crimes or profile individuals, 
          <strong> CROWDGUARD AI</strong> relies strictly on deterministic public safety heuristics and validated non-confrontational bystander methodologies. 
          It generates safe human coordination workflows without facial recognition, personal data harvesting, or automated criminal accusations.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem', alignItems: 'start' }}>
        {/* Left Column: Interactive Simulation Inputs */}
        <div className="card">
          <div className="card-header">
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sliders size={18} color="#00f2fe" />
              <span>Simulate Scenario Inputs</span>
            </h2>
            <span style={{ fontSize: '0.72rem', color: '#00f2fe', background: 'rgba(0,242,254,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
              Live Re-evaluation
            </span>
          </div>

          {/* Situation Selector */}
          <div className="form-group">
            <label className="form-label">A. Situation Type:</label>
            <select
              className="form-select"
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
            >
              {Object.entries(SITUATION_CONFIG).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '4px', display: 'block' }}>
              Category: {SITUATION_CONFIG[situation]?.category}
            </span>
          </div>

          {/* Urgency Selector */}
          <div className="form-group" style={{ marginTop: '1.25rem' }}>
            <label className="form-label">B. Urgency Level:</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {Object.entries(URGENCY_LEVELS).map(([k, v]) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setUrgency(k)}
                  className={`btn-secondary-sm ${urgency === k ? 'active' : ''}`}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    justifyContent: 'center',
                    background: urgency === k ? 'rgba(0, 242, 254, 0.2)' : 'rgba(255,255,255,0.04)',
                    borderColor: urgency === k ? '#00f2fe' : 'var(--border-subtle)',
                    color: urgency === k ? '#fff' : '#94a3b8'
                  }}
                >
                  {k.toUpperCase()}
                </button>
              ))}
            </div>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '4px', display: 'block' }}>
              {URGENCY_LEVELS[urgency]?.description}
            </span>
          </div>

          {/* Support Channel */}
          <div className="form-group" style={{ marginTop: '1.25rem' }}>
            <label className="form-label">C. Desired Support Channel:</label>
            <select
              className="form-select"
              value={supportRequested}
              onChange={(e) => setSupportRequested(e.target.value)}
            >
              {Object.entries(SUPPORT_MODES).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
          </div>

          {/* Location Context */}
          <div className="form-group" style={{ marginTop: '1.25rem' }}>
            <label className="form-label">D. Transit Context:</label>
            <input
              type="text"
              className="form-input"
              value={transitLocation}
              onChange={(e) => setTransitLocation(e.target.value)}
              placeholder="e.g. Metro Line 3, Bus 42, Quiet Platform"
            />
          </div>
        </div>

        {/* Right Column: Transparent Output Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Recommendation Header */}
          <div className="card highlighted" style={{ borderColor: '#00f2fe' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#00f2fe', fontWeight: 700 }}>
                  Evaluated Priority
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: '2px 0 0 0', color: '#fff' }}>
                  {recommendation.priority}
                </h3>
              </div>
              <span className={`badge badge-${urgency}`}>
                Urgency: {recommendation.inputs.urgencyLabel}
              </span>
            </div>

            {/* Plain English "Why was this recommendation made?" */}
            <div style={{ background: 'rgba(0, 242, 254, 0.08)', borderRadius: '8px', padding: '1rem', borderLeft: '4px solid #00f2fe', marginBottom: '1.25rem' }}>
              <strong style={{ fontSize: '0.85rem', color: '#00f2fe', display: 'block', marginBottom: '0.35rem' }}>
                Why was this recommendation generated?
              </strong>
              <p style={{ fontSize: '0.82rem', color: '#f1f5f9', lineHeight: 1.5, margin: 0 }}>
                {recommendation.reasoning.summary}
              </p>
            </div>

            {/* Contributing Heuristic Factors */}
            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                Evaluated Factors & Rule Weighting:
              </span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {recommendation.reasoning.factors.map((factor, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#cbd5e1' }}>
                    <CheckCircle2 size={13} color="#00f2fe" />
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Generated Passenger Guidance */}
            <div style={{ background: 'rgba(9, 14, 25, 0.7)', borderRadius: '8px', padding: '0.85rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#38bdf8', display: 'block', marginBottom: '0.35rem' }}>
                Dispatched Passenger Steps:
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {recommendation.passengerPlan.map((p, idx) => (
                  <div key={idx} style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                    <strong>Step {p.step}: {p.title}</strong> — {p.detail}
                  </div>
                ))}
              </div>
            </div>

            {/* Generated Bystander Tactics & Strict Guardrails */}
            <div style={{ background: 'rgba(9, 14, 25, 0.7)', borderRadius: '8px', padding: '0.85rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#00f2fe', display: 'block', marginBottom: '0.35rem' }}>
                Bystander Guidance (Safe Non-Confrontational):
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '0.5rem' }}>
                {recommendation.helperGuidance.tactics.map((t, idx) => (
                  <div key={idx} style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                    <strong style={{ color: '#fff' }}>{t.name}:</strong> {t.description}
                  </div>
                ))}
              </div>

              {recommendation.helperGuidance.sampleScripts?.length > 0 && (
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.6rem', borderRadius: '6px', fontSize: '0.75rem', color: '#94a3b8' }}>
                  <span style={{ color: '#00f2fe', fontWeight: 600, display: 'block', marginBottom: '2px' }}>Suggested Distraction Line:</span>
                  <em>{recommendation.helperGuidance.sampleScripts[0]}</em>
                </div>
              )}
            </div>

            {/* Generated Staff Protocol */}
            <div style={{ background: 'rgba(9, 14, 25, 0.7)', borderRadius: '8px', padding: '0.85rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#06b6d4', display: 'block', marginBottom: '0.35rem' }}>
                Staff Action Protocol:
              </span>
              <p style={{ fontSize: '0.8rem', color: '#cbd5e1', margin: '0 0 0.4rem 0' }}>
                <strong>Action:</strong> {recommendation.staffProtocol.recommendedAction}
              </p>
              <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                Window: {recommendation.staffProtocol.estimatedDispatchWindow}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
