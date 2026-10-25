import React from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  HeartHandshake, 
  Eye, 
  Users, 
  Lock, 
  CheckCircle2, 
  BookOpen,
  Info
} from 'lucide-react';

export default function SafetyGuideView() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#00f2fe', letterSpacing: '0.05em', fontWeight: 700 }}>
          Public Safety Standards
        </span>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.2rem' }}>
          Safety Protocol & Intervention Philosophy
        </h1>
        <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
          Comprehensive guidance on safe bystander coordination, the non-confrontational 5 D's methodology, 
          and the ethical foundations of CrowdGuard AI.
        </p>
      </div>

      {/* SECTION 1: THE CORE DIRECTIVE */}
      <div className="card highlighted" style={{ marginBottom: '1.75rem', borderColor: '#f43f5e' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
          <AlertTriangle size={24} color="#f43f5e" />
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fca5a5', margin: 0 }}>
            The Golden Rule: Never Confront or Accuse
          </h2>
        </div>
        <p style={{ fontSize: '0.85rem', color: '#f1f5f9', lineHeight: 1.6, marginBottom: '0.75rem' }}>
          Public transit vehicles (train cars, buses, light rail) are enclosed physical environments with limited egress. 
          Studies and transit authority analyses demonstrate that <strong>directly confronting, yelling at, or physically challenging a suspected harasser</strong> frequently escalates the situation into physical violence, placing both the victim and the bystander at severe risk.
        </p>
        <div style={{ background: 'rgba(244, 63, 94, 0.12)', borderLeft: '4px solid #f43f5e', padding: '0.85rem', borderRadius: '6px', fontSize: '0.82rem', color: '#fecdd3' }}>
          <strong>What CrowdGuard AI Enforces:</strong> Helpers are instructed to engage only with the <em>person experiencing discomfort</em>, completely ignoring and sidestepping the suspected harasser. By acting as a conversational or physical buffer, harassment is naturally dissolved without provocation.
        </div>
      </div>

      {/* SECTION 2: THE 5 D'S DETAILED */}
      <div className="card" style={{ marginBottom: '1.75rem' }}>
        <div className="card-header">
          <div className="card-title-group">
            <div className="card-icon">
              <HeartHandshake size={20} />
            </div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
              The 5 D's of Bystander Intervention (Transit Edition)
            </h2>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#00f2fe' }}>Evidence-Based Framework</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'rgba(18, 28, 51, 0.6)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#00f2fe', margin: '0 0 0.25rem 0' }}>
              1. DISTRACT (Primary Recommendation)
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', margin: 0, lineHeight: 1.45 }}>
              Create a subtle interruption. Talk to the passenger directly: ask what the next station is, ask if the seat next to them is free, or pretend they are an old friend. This harmlessly changes the social dynamics in the car.
            </p>
          </div>

          <div style={{ background: 'rgba(18, 28, 51, 0.6)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#00f2fe', margin: '0 0 0.25rem 0' }}>
              2. DELEGATE (Alert Transit Personnel)
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', margin: 0, lineHeight: 1.45 }}>
              Use vehicle emergency intercoms or CrowdGuard AI's Staff Alert to notify the bus operator, train conductor, or upcoming platform station attendants who have official communication channels and training.
            </p>
          </div>

          <div style={{ background: 'rgba(18, 28, 51, 0.6)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#00f2fe', margin: '0 0 0.25rem 0' }}>
              3. DELAY (Post-Incident Support)
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', margin: 0, lineHeight: 1.45 }}>
              After the situation has passed or when arriving at a station, check in with the passenger: "Are you okay?", "Would you like me to walk with you to the station exit?", or "Would you like to wait together for your connection?"
            </p>
          </div>

          <div style={{ background: 'rgba(18, 28, 51, 0.6)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#00f2fe', margin: '0 0 0.25rem 0' }}>
              4. DIRECT (Gentle Passenger-Centric Action)
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', margin: 0, lineHeight: 1.45 }}>
              Offer the passenger an immediate physical exit: "Hey, we have an open seat over by our group, come sit with us," or physically standing as a respectful, neutral buffer between the passenger and the aisle.
            </p>
          </div>

          <div style={{ background: 'rgba(18, 28, 51, 0.6)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#00f2fe', margin: '0 0 0.25rem 0' }}>
              5. DOCUMENT (Safe & Responsible Records)
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', margin: 0, lineHeight: 1.45 }}>
              Keep mental or timestamped notes of the vehicle number, line, and station. <strong>Do not point your camera aggressively at individuals</strong>, as this can trigger physical confrontation.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: ETHICS & PRIVACY */}
      <div className="card">
        <div className="card-header">
          <div className="card-title-group">
            <div className="card-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <Lock size={20} />
            </div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
              Privacy-First & Zero False Claims Architecture
            </h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          <div style={{ background: 'rgba(9, 14, 25, 0.6)', padding: '0.9rem', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.3rem' }}>
              <CheckCircle2 size={16} /> Zero PII Collection
            </div>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>
              No names, phone numbers, or government IDs are collected or stored. Requests are ephemeral and live in the client browser session.
            </p>
          </div>

          <div style={{ background: 'rgba(9, 14, 25, 0.6)', padding: '0.9rem', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.3rem' }}>
              <CheckCircle2 size={16} /> No Criminal Profiling
            </div>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>
              The platform never predicts criminality, profiles demographic groups, or assigns guilt. It manages safety logistics and presence only.
            </p>
          </div>

          <div style={{ background: 'rgba(9, 14, 25, 0.6)', padding: '0.9rem', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.3rem' }}>
              <CheckCircle2 size={16} /> Transparent Heuristics
            </div>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>
              Every recommendation is 100% explainable code. Open rules guarantee accountability and prevent algorithmic hallucination.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
