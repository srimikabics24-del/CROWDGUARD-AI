import React, { useState, useEffect } from 'react';
import { Clock, RefreshCw, XCircle, ArrowLeft } from 'lucide-react';

export default function CamouflageOverlay({ isOpen, onClose }) {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const mockDepartures = [
    { line: 'M3 Blue', destination: 'City Center / Harbor Terminal', plat: '3A', dep: '2 min', status: 'On Time' },
    { line: 'M1 Red', destination: 'North Station / University', plat: '1B', dep: '4 min', status: 'On Time' },
    { line: 'B42 Bus', destination: 'Grand Plaza / Market St', bay: 'Bay 4', dep: '6 min', status: 'Scheduled' },
    { line: 'M4 Gold', destination: 'Westside Airport Express', plat: '2A', dep: '9 min', status: 'Boarding' },
    { line: 'B15 Bus', destination: 'South Coast Transit Hub', bay: 'Bay 7', dep: '12 min', status: 'On Time' },
    { line: 'M2 Green', destination: 'Eastern Hills / Science Park', plat: '4B', dep: '15 min', status: 'Delayed 2m' }
  ];

  return (
    <div className="camouflage-overlay" role="dialog" aria-modal="true" aria-label="Live Transit Timetable Camouflage">
      <div className="camouflage-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
              METRO TRANSIT AUTHORITY
            </span>
            <span style={{ background: '#334155', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', color: '#38bdf8' }}>
              LIVE FEED
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
            Central Concourse • Departure Board • Passenger Information System
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#1e293b', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.9rem', fontFamily: 'monospace' }}>
            <Clock size={16} color="#38bdf8" />
            <span>{currentTime}</span>
          </div>
          <button
            onClick={onClose}
            className="exit-camouflage-btn"
            title="Return to CrowdGuard (Shortcut: ESC)"
          >
            <ArrowLeft size={14} style={{ display: 'inline', marginRight: '4px' }} />
            Back to App
          </button>
        </div>
      </div>

      <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', border: '1px solid #334155', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#f8fafc', margin: 0 }}>
            Upcoming Departures & Track Assignments
          </h2>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <RefreshCw size={12} className="spinning" /> Auto-updates every 15s
          </span>
        </div>

        <table className="transit-departures-table">
          <thead>
            <tr>
              <th>Line</th>
              <th>Destination</th>
              <th>Platform / Bay</th>
              <th>Departure</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {mockDepartures.map((item, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: 700, color: item.line.includes('Blue') ? '#38bdf8' : item.line.includes('Red') ? '#f43f5e' : '#fbbf24' }}>
                  {item.line}
                </td>
                <td style={{ color: '#f1f5f9' }}>{item.destination}</td>
                <td style={{ color: '#94a3b8' }}>{item.plat || item.bay}</td>
                <td style={{ fontWeight: 700, color: '#38bdf8' }}>{item.dep}</td>
                <td>
                  <span style={{
                    color: item.status === 'Boarding' ? '#34d399' : item.status.includes('Delayed') ? '#fbbf24' : '#94a3b8',
                    background: 'rgba(255,255,255,0.05)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.78rem'
                  }}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 'auto', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid #334155', padding: '0.85rem', borderRadius: '6px', fontSize: '0.75rem', color: '#64748b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Camouflage Mode Active. Press [Escape] or the "Back to App" button above to restore your session.</span>
        <span>MTA Station Safety Advisory Code: 04-B</span>
      </div>
    </div>
  );
}
