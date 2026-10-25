import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BannerNotice from './components/BannerNotice';
import CamouflageOverlay from './components/CamouflageOverlay';
import Toast from './components/Toast';

import OverviewView from './components/OverviewView';
import PassengerView from './components/PassengerView';
import HelperView from './components/HelperView';
import StaffView from './components/StaffView';
import EngineExplorerView from './components/EngineExplorerView';
import SafetyGuideView from './components/SafetyGuideView';

import { getStoredIncidents, resetDemoData } from './services/storageService';

export default function App() {
  const [currentTab, setCurrentTab] = useState('overview');
  const [incidents, setIncidents] = useState([]);
  const [isCamouflageOpen, setIsCamouflageOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Load incidents from localStorage
  const refreshIncidents = () => {
    const list = getStoredIncidents();
    setIncidents(list);
  };

  useEffect(() => {
    refreshIncidents();

    // Listen for storage changes in case of multi-tab demo testing
    const handleStorage = () => refreshIncidents();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Global Toast Dispatcher
  const showToast = ({ title, message, type = 'success' }) => {
    const id = Date.now() + Math.random();
    const newToast = { id, title, message, type };
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const handleDismissToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleResetDemoData = () => {
    if (window.confirm('Reset all demo incidents to default state?')) {
      resetDemoData();
      refreshIncidents();
      showToast({
        title: 'Demo Data Reset',
        message: 'Loaded clean sample records.',
        type: 'info'
      });
    }
  };

  // Incident counts for navbar badges
  const activeHelperRequests = incidents.filter(
    i => (i.supportRequested === 'helper' || i.supportRequested === 'both') && i.status !== 'Closed'
  ).length;

  const staffQueueCount = incidents.filter(
    i => i.status === 'New' || i.status === 'Acknowledged' || i.status === 'Responding'
  ).length;

  return (
    <div className="app-container">
      {/* Ambient background glow */}
      <div className="ambient-glow" />

      {/* Safety & Hackathon Banner */}
      <BannerNotice />

      {/* Main Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        counts={{
          activeRequests: activeHelperRequests,
          staffQueue: staffQueueCount
        }}
        onTriggerCamouflage={() => setIsCamouflageOpen(true)}
        onResetDemo={handleResetDemoData}
      />

      {/* Main Body Content based on active tab */}
      <main className="main-content">
        {currentTab === 'overview' && (
          <OverviewView
            incidents={incidents}
            setCurrentTab={setCurrentTab}
            onTriggerCamouflage={() => setIsCamouflageOpen(true)}
          />
        )}

        {currentTab === 'passenger' && (
          <PassengerView
            onTriggerCamouflage={() => setIsCamouflageOpen(true)}
            showToast={showToast}
            onNavigateToHelper={() => setCurrentTab('helper')}
          />
        )}

        {currentTab === 'helper' && (
          <HelperView
            incidents={incidents}
            refreshIncidents={refreshIncidents}
            showToast={showToast}
          />
        )}

        {currentTab === 'staff' && (
          <StaffView
            incidents={incidents}
            refreshIncidents={refreshIncidents}
            showToast={showToast}
          />
        )}

        {currentTab === 'engine' && (
          <EngineExplorerView />
        )}

        {currentTab === 'guide' && (
          <SafetyGuideView />
        )}
      </main>

      {/* Discreet Camouflage Screen */}
      <CamouflageOverlay
        isOpen={isCamouflageOpen}
        onClose={() => setIsCamouflageOpen(false)}
      />

      {/* Floating Notifications */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-subtle)', background: 'rgba(9, 14, 25, 0.95)', padding: '1.5rem 1rem', textAlign: 'center', fontSize: '0.78rem', color: '#64748b' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
          <div>
            <strong style={{ color: '#cbd5e1' }}>CROWDGUARD AI</strong> — Context-Aware Harassment Response and Bystander Coordination Platform
          </div>
          <p style={{ maxWidth: '650px', margin: 0, lineHeight: 1.4 }}>
            Built for hackathon evaluation. Built with React + Vite. Uses local browser storage with zero external tracking, zero paid APIs, and zero biometric profiling.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ color: '#00f2fe' }}>✓ Deterministic Rule Engine</span>
            <span>•</span>
            <span style={{ color: '#38bdf8' }}>✓ Non-Confrontational 5 D's Protocol</span>
            <span>•</span>
            <span style={{ color: '#10b981' }}>✓ Privacy-Preserving Local Storage</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
