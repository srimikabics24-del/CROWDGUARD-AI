import React from 'react';
import { 
  ShieldCheck, 
  User, 
  HeartHandshake, 
  Radio, 
  Cpu, 
  BookOpen, 
  EyeOff, 
  RotateCcw,
  LayoutDashboard
} from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  counts, 
  onTriggerCamouflage, 
  onResetDemo 
}) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <div className="brand-wrapper" onClick={() => setCurrentTab('overview')}>
          <div className="brand-icon-box">
            <ShieldCheck size={22} />
          </div>
          <div className="brand-text">
            <h1>CROWDGUARD <span style={{ color: '#00f2fe' }}>AI</span></h1>
            <span className="brand-tagline">Harassment Response & Bystander Coordination</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="nav-tabs" aria-label="Main Navigation">
          <button
            onClick={() => setCurrentTab('overview')}
            className={`nav-tab-btn ${currentTab === 'overview' ? 'active' : ''}`}
          >
            <LayoutDashboard size={15} />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setCurrentTab('passenger')}
            className={`nav-tab-btn ${currentTab === 'passenger' ? 'active' : ''}`}
          >
            <User size={15} />
            <span>Passenger Request</span>
          </button>

          <button
            onClick={() => setCurrentTab('helper')}
            className={`nav-tab-btn ${currentTab === 'helper' ? 'active' : ''}`}
          >
            <HeartHandshake size={15} />
            <span>Helper Hub</span>
            {counts.activeRequests > 0 && (
              <span className="nav-badge" title="Active requests seeking helper support">
                {counts.activeRequests}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentTab('staff')}
            className={`nav-tab-btn ${currentTab === 'staff' ? 'active' : ''}`}
          >
            <Radio size={15} />
            <span>Staff Console</span>
            {counts.staffQueue > 0 && (
              <span className="nav-badge" style={{ background: 'rgba(6, 182, 212, 0.25)', borderColor: '#06b6d4', color: '#67e8f9' }}>
                {counts.staffQueue}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentTab('engine')}
            className={`nav-tab-btn ${currentTab === 'engine' ? 'active' : ''}`}
          >
            <Cpu size={15} />
            <span>Engine Explorer</span>
          </button>

          <button
            onClick={() => setCurrentTab('guide')}
            className={`nav-tab-btn ${currentTab === 'guide' ? 'active' : ''}`}
          >
            <BookOpen size={15} />
            <span>Safety Guide</span>
          </button>
        </nav>

        {/* Top Right Actions */}
        <div className="nav-actions">
          <button
            onClick={onTriggerCamouflage}
            className="discreet-toggle-btn"
            title="Quickly mask your screen with a fake subway timetable (Shortcut: ESC to close)"
          >
            <EyeOff size={14} />
            <span>Discreet Mode</span>
          </button>

          <button
            onClick={onResetDemo}
            className="btn-secondary-sm"
            title="Reset demo records to original defaults"
          >
            <RotateCcw size={13} />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>
    </header>
  );
}
