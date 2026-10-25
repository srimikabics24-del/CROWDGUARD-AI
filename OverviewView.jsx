import React from 'react';
import StatsSummary from './StatsSummary';
import { 
  ShieldCheck, 
  User, 
  HeartHandshake, 
  Radio, 
  Cpu, 
  ArrowRight, 
  Sparkles, 
  EyeOff, 
  Lock, 
  AlertTriangle,
  Clock,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { SITUATION_CONFIG } from '../services/responseEngine';

export default function OverviewView({ 
  incidents, 
  setCurrentTab, 
  onTriggerCamouflage 
}) {
  const recentIncidents = incidents.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section style={{ marginBottom: '2.5rem', textAlign: 'center', maxWidth: '840px', margin: '0 auto 2.5rem auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(0, 242, 254, 0.1)', border: '1px solid rgba(0, 242, 254, 0.3)', borderRadius: '999px', padding: '0.3rem 0.85rem', fontSize: '0.78rem', color: '#00f2fe', fontWeight: 600, marginBottom: '1rem' }}>
          <Sparkles size={14} /> Context-Aware De-escalation & Safe Coordination
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
          De-escalating Public Transit Harassment Through <span style={{ background: 'linear-gradient(90deg, #00f2fe, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Discreet Coordination</span>
        </h1>

        <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.75rem', maxWidth: '680px', margin: '0 auto 1.75rem auto' }}>
          Empower transit riders to request assistance quietly, coordinate safe non-confrontational bystander interventions, and give transport operators transparent situational awareness—without false AI claims, surveillance, or dangerous accusations.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => setCurrentTab('passenger')}
            className="btn btn-primary"
            style={{ padding: '0.75rem 1.5rem', fontSize: '0.92rem' }}
          >
            <User size={18} />
            <span>Passenger Request Portal</span>
          </button>

          <button
            onClick={() => setCurrentTab('helper')}
            className="btn btn-outline-teal"
            style={{ padding: '0.75rem 1.5rem', fontSize: '0.92rem' }}
          >
            <HeartHandshake size={18} />
            <span>Helper Hub ({incidents.filter(i => i.status !== 'Closed').length} Active)</span>
          </button>

          <button
            onClick={() => setCurrentTab('staff')}
            className="btn btn-outline"
            style={{ padding: '0.75rem 1.25rem', fontSize: '0.92rem' }}
          >
            <Radio size={18} />
            <span>Staff Console</span>
          </button>
        </div>
      </section>

      {/* Summary Statistics */}
      <StatsSummary incidents={incidents} onSelectTab={setCurrentTab} />

      {/* THREE PILLAR ARCHITECTURE CARDS */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
          Coordinated Public Safety Roles
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {/* Card 1: Passenger */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
              <div className="card-icon" style={{ background: 'rgba(0, 242, 254, 0.1)', color: '#00f2fe' }}>
                <User size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', margin: 0 }}>1. Passenger Experience</h3>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Discreet & Stealthy</span>
              </div>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5, flex: 1, marginBottom: '1rem' }}>
              Submit help requests quietly from any phone. Features "Discreet Camouflage Mode" that masks your screen as a normal transit departure board if anyone looks your way.
            </p>
            <button
              onClick={() => setCurrentTab('passenger')}
              className="btn btn-outline-teal"
              style={{ width: '100%', fontSize: '0.8rem', padding: '0.5rem' }}
            >
              Open Passenger Portal <ArrowRight size={14} />
            </button>
          </div>

          {/* Card 2: Helper */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
              <div className="card-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                <HeartHandshake size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', margin: 0 }}>2. Bystander Helper Hub</h3>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Gentle 5 D's Protocol</span>
              </div>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5, flex: 1, marginBottom: '1rem' }}>
              Consenting bystanders receive safe, pre-scripted distraction questions (e.g., asking for directions or time). Strictly forbids confronting the harasser.
            </p>
            <button
              onClick={() => setCurrentTab('helper')}
              className="btn btn-outline-teal"
              style={{ width: '100%', fontSize: '0.8rem', padding: '0.5rem' }}
            >
              Open Helper Hub <ArrowRight size={14} />
            </button>
          </div>

          {/* Card 3: Staff */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
              <div className="card-icon" style={{ background: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4' }}>
                <Radio size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', margin: 0 }}>3. Transport Staff Console</h3>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Triage & Dispatch</span>
              </div>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5, flex: 1, marginBottom: '1rem' }}>
              Searchable incident queue for transit operators, train conductors, and platform personnel. Track status lifecycle (New → Acknowledged → Responding → Closed) and audit logs.
            </p>
            <button
              onClick={() => setCurrentTab('staff')}
              className="btn btn-outline-teal"
              style={{ width: '100%', fontSize: '0.8rem', padding: '0.5rem' }}
            >
              Open Staff Console <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* RECENT REQUESTS & AUDIT PREVIEW */}
      <section style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
              Live System Activity & Recent Requests
            </h2>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Local demonstration records stored in browser
            </span>
          </div>

          <button
            onClick={() => setCurrentTab('staff')}
            className="btn-secondary-sm"
          >
            View Full Queue ({incidents.length}) <ArrowRight size={13} />
          </button>
        </div>

        <div className="table-container">
          <table className="incident-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Situation</th>
                <th>Location / Route</th>
                <th>Urgency</th>
                <th>Support</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentIncidents.map(inc => {
                const situationLabel = SITUATION_CONFIG[inc.situation]?.label.split('/')[0] || inc.situation;

                return (
                  <tr key={inc.id}>
                    <td>
                      <strong style={{ color: '#fff' }}>{inc.id}</strong>
                    </td>
                    <td>
                      <span style={{ color: '#00f2fe', fontWeight: 600 }}>{situationLabel}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span>{inc.location?.transitType}</span>
                        <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{inc.location?.vehicleNumber}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-${inc.urgency}`}>
                        {inc.urgency}
                      </span>
                    </td>
                    <td>
                      <span style={{ textTransform: 'capitalize', color: '#cbd5e1' }}>
                        {inc.supportRequested}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge status-${inc.status.toLowerCase()}`}>
                        {inc.status}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => setCurrentTab('staff')}
                        className="btn-outline-teal"
                        style={{ padding: '0.25rem 0.55rem', fontSize: '0.72rem', borderRadius: '4px' }}
                      >
                        Triage
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* WHY TRANSPARENT RULE ENGINE IS SAFER */}
      <section className="card" style={{ background: 'linear-gradient(180deg, #121c33, #0b1322)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
          <Cpu size={22} color="#00f2fe" />
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
            Context-Aware Response Engine: Safe & Explainable by Design
          </h2>
        </div>
        <p style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '1rem' }}>
          CrowdGuard AI explicitly rejects predictive crime profiling and algorithmic facial tagging. Instead, our deterministic rule engine maps situational urgency directly to proven bystander intervention heuristics (the Right To Be 5 D's methodology).
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setCurrentTab('engine')}
            className="btn btn-outline-teal"
            style={{ fontSize: '0.82rem' }}
          >
            Explore Rule Engine in Sandbox <ArrowRight size={14} />
          </button>
          <button
            onClick={() => setCurrentTab('guide')}
            className="btn btn-outline"
            style={{ fontSize: '0.82rem' }}
          >
            Read Bystander Safety Protocol
          </button>
        </div>
      </section>
    </div>
  );
}
