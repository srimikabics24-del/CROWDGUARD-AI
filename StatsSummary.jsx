import React from 'react';
import { Activity, ShieldAlert, HeartHandshake, Radio, Clock, ArrowRight } from 'lucide-react';

export default function StatsSummary({ incidents, onSelectTab }) {
  const activeIncidents = incidents.filter(i => i.status !== 'Closed');
  const highPriorityCount = incidents.filter(i => i.urgency === 'high' && i.status !== 'Closed').length;
  const helpersEngaged = incidents.reduce((acc, curr) => acc + (curr.assignedHelpers?.length || 0), 0);
  const staffResponding = incidents.filter(i => i.status === 'Responding').length;

  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <div className="stats-grid">
        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => onSelectTab('staff')}>
          <div className="stat-icon" style={{ background: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e' }}>
            <Activity size={22} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{activeIncidents.length}</span>
            <span className="stat-label">Active Incidents</span>
            <span style={{ fontSize: '0.72rem', color: '#f43f5e', marginTop: '2px', fontWeight: 600 }}>
              {highPriorityCount} High Urgency
            </span>
          </div>
        </div>

        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => onSelectTab('helper')}>
          <div className="stat-icon" style={{ background: 'rgba(0, 242, 254, 0.1)', color: '#00f2fe' }}>
            <HeartHandshake size={22} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{helpersEngaged}</span>
            <span className="stat-label">Bystander Interventions</span>
            <span style={{ fontSize: '0.72rem', color: '#00f2fe', marginTop: '2px' }}>
              Safe Non-Confrontational
            </span>
          </div>
        </div>

        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => onSelectTab('staff')}>
          <div className="stat-icon" style={{ background: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4' }}>
            <Radio size={22} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{staffResponding}</span>
            <span className="stat-label">Staff Units En Route</span>
            <span style={{ fontSize: '0.72rem', color: '#67e8f9', marginTop: '2px' }}>
              Platform / Vehicle
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
            <Clock size={22} />
          </div>
          <div className="stat-content">
            <span className="stat-value">~1.4 min</span>
            <span className="stat-label">Avg. Peer Response</span>
            <span style={{ fontSize: '0.72rem', color: '#6ee7b7', marginTop: '2px' }}>
              De-escalation Target
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
