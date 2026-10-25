import React from 'react';
import { ShieldAlert, Info, Database } from 'lucide-react';

export default function BannerNotice() {
  return (
    <div className="safety-banner" role="alert">
      <div className="safety-banner-content">
        <span className="demo-pill">
          <span className="indicator-dot"></span>
          Hackathon Evaluation Demo
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <ShieldAlert size={14} style={{ color: '#00f2fe' }} />
          <span>
            <strong>Simulated Environment:</strong> Not connected to 911, emergency services, or real transit operators.
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#94a3b8' }}>
          <Database size={13} /> Browser LocalStorage Only • Zero PII Stored
        </span>
      </div>
    </div>
  );
}
