import React, { useState } from 'react';
import { 
  Radio, 
  Search, 
  Filter, 
  Clock, 
  MapPin, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Send, 
  ChevronRight, 
  ShieldAlert,
  UserCheck,
  RotateCcw
} from 'lucide-react';
import { updateIncidentStatus, addStaffNote } from '../services/storageService';
import { SITUATION_CONFIG } from '../services/responseEngine';

export default function StaffView({ incidents, refreshIncidents, showToast }) {
  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [urgencyFilter, setUrgencyFilter] = useState('ALL');
  const [selectedIncidentId, setSelectedIncidentId] = useState(incidents[0]?.id || null);

  // New Note State
  const [newNoteText, setNewNoteText] = useState('');
  const [staffAuthor, setStaffAuthor] = useState('Dispatcher #24');

  // Filter incidents
  const filteredIncidents = incidents.filter(item => {
    // Status filter
    if (statusFilter !== 'ALL' && item.status !== statusFilter) return false;
    // Urgency filter
    if (urgencyFilter !== 'ALL' && item.urgency !== urgencyFilter) return false;
    // Search query (search in ID, line, vehicle, notes, situation)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = item.id.toLowerCase().includes(q);
      const matchLine = item.location?.transitType?.toLowerCase().includes(q);
      const matchVehicle = item.location?.vehicleNumber?.toLowerCase().includes(q);
      const matchStation = item.location?.stationOrStop?.toLowerCase().includes(q);
      const matchSituation = item.situation.toLowerCase().includes(q);
      if (!matchId && !matchLine && !matchVehicle && !matchStation && !matchSituation) {
        return false;
      }
    }
    return true;
  });

  const selectedIncident = incidents.find(i => i.id === selectedIncidentId) || filteredIncidents[0];

  const handleStatusChange = (id, newStatus) => {
    try {
      updateIncidentStatus(id, newStatus, `Status updated to ${newStatus}`, staffAuthor);
      refreshIncidents();
      showToast({
        title: 'Status Updated',
        message: `Incident ${id} set to ${newStatus}.`,
        type: 'info'
      });
    } catch (err) {
      showToast({
        title: 'Update Failed',
        message: 'Could not change status.',
        type: 'error'
      });
    }
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim() || !selectedIncident) return;

    try {
      addStaffNote(selectedIncident.id, newNoteText, staffAuthor);
      setNewNoteText('');
      refreshIncidents();
      showToast({
        title: 'Follow-up Note Added',
        message: `Logged under ${selectedIncident.id} by ${staffAuthor}.`,
        type: 'success'
      });
    } catch (err) {
      showToast({
        title: 'Note Failed',
        message: 'Could not save note.',
        type: 'error'
      });
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#06b6d4', letterSpacing: '0.05em', fontWeight: 700 }}>
          Transit Security & Operations
        </span>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.2rem' }}>
          Transport Staff Incident Console
        </h1>
        <p style={{ fontSize: '0.88rem', color: '#94a3b8', maxWidth: '750px' }}>
          Triage incoming passenger assistance requests, monitor peer bystander coordination, dispatch platform or vehicle staff, and record audit logs.
        </p>
      </div>

      {/* SEARCH AND FILTERS BAR */}
      <div className="card" style={{ padding: '1rem', marginBottom: '1.5rem', background: 'rgba(18, 28, 51, 0.7)' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', flex: '1 1 240px' }}>
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by ID, line, vehicle, or station..."
              className="form-input"
              style={{ paddingLeft: '2.2rem' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Status:</span>
            <select
              className="form-select"
              style={{ width: 'auto', padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="New">New</option>
              <option value="Acknowledged">Acknowledged</option>
              <option value="Responding">Responding</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Urgency Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Urgency:</span>
            <select
              className="form-select"
              style={{ width: 'auto', padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
            >
              <option value="ALL">All Urgencies</option>
              <option value="high">High</option>
              <option value="moderate">Moderate</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Staff Author ID */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Staff ID:</span>
            <input
              type="text"
              className="form-input"
              style={{ width: '130px', padding: '0.4rem 0.6rem', fontSize: '0.8rem' }}
              value={staffAuthor}
              onChange={(e) => setStaffAuthor(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN DISPATCH VIEW */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
        {/* Left Column: Filterable Incident Queue */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>
              Live Incident Queue ({filteredIncidents.length})
            </h2>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Click item to view dispatch details & log
            </span>
          </div>

          {filteredIncidents.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <p style={{ color: '#94a3b8' }}>No incidents matching the current search filters.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {filteredIncidents.map(inc => {
                const isSelected = selectedIncident?.id === inc.id;
                const situationLabel = SITUATION_CONFIG[inc.situation]?.label.split('/')[0] || inc.situation;

                return (
                  <div
                    key={inc.id}
                    onClick={() => setSelectedIncidentId(inc.id)}
                    className={`card ${isSelected ? 'highlighted' : ''}`}
                    style={{
                      padding: '1rem',
                      cursor: 'pointer',
                      borderLeft: isSelected ? '4px solid #06b6d4' : '1px solid var(--border-subtle)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <strong style={{ fontSize: '0.92rem', color: '#fff' }}>{inc.id}</strong>
                          <span className={`badge badge-${inc.urgency}`}>
                            {inc.urgency}
                          </span>
                          <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                            {new Date(inc.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.82rem', color: '#67e8f9', fontWeight: 600, display: 'block', marginTop: '2px' }}>
                          {situationLabel}
                        </span>
                      </div>

                      <span className={`status-badge status-${inc.status.toLowerCase()}`}>
                        {inc.status}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.76rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.2rem', marginBottom: '0.6rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <MapPin size={12} color="#38bdf8" />
                        <span>{inc.location?.transitType} • {inc.location?.vehicleNumber}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Clock size={12} />
                        <span>{inc.location?.stationOrStop}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ color: '#94a3b8' }}>
                        Support: <strong style={{ color: '#fff' }}>{inc.supportRequested}</strong>
                      </span>
                      <span style={{ color: inc.assignedHelpers?.length > 0 ? '#6ee7b7' : '#94a3b8' }}>
                        {inc.assignedHelpers?.length || 0} Bystander(s) Linked
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Detailed Dispatch Panel & Status Lifecycle */}
        <div>
          {selectedIncident ? (
            <div className="card highlighted" style={{ borderColor: 'rgba(6, 182, 212, 0.4)' }}>
              {/* Header */}
              <div className="card-header">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
                      Incident Dispatch: {selectedIncident.id}
                    </h2>
                    <span className={`badge badge-${selectedIncident.urgency}`}>
                      {selectedIncident.urgency} Urgency
                    </span>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                    Created at {new Date(selectedIncident.createdAt).toLocaleString()}
                  </span>
                </div>

                <span className={`status-badge status-${selectedIncident.status.toLowerCase()}`}>
                  Current: {selectedIncident.status}
                </span>
              </div>

              {/* Status Change Action Buttons */}
              <div style={{ background: 'rgba(9, 14, 25, 0.8)', padding: '0.85rem', borderRadius: '8px', marginBottom: '1.25rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
                  Update Incident Status (Audit Trail Logged)
                </span>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {['New', 'Acknowledged', 'Responding', 'Closed'].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(selectedIncident.id, s)}
                      className={`btn-secondary-sm ${selectedIncident.status === s ? 'active' : ''}`}
                      style={{
                        background: selectedIncident.status === s ? 'rgba(6, 182, 212, 0.25)' : 'rgba(255,255,255,0.05)',
                        borderColor: selectedIncident.status === s ? '#06b6d4' : 'rgba(255,255,255,0.1)',
                        color: selectedIncident.status === s ? '#67e8f9' : '#cbd5e1',
                        fontWeight: selectedIncident.status === s ? 700 : 500,
                        padding: '0.45rem 0.85rem'
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Incident Details Summary */}
              <div style={{ background: 'rgba(18, 28, 51, 0.6)', padding: '1rem', borderRadius: '8px', marginBottom: '1.25rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
                  Transit & Passenger Specification
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', fontSize: '0.8rem' }}>
                  <div>
                    <span style={{ color: '#94a3b8', display: 'block' }}>Transit Route:</span>
                    <strong style={{ color: '#fff' }}>{selectedIncident.location?.transitType}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#94a3b8', display: 'block' }}>Vehicle / Car:</span>
                    <strong style={{ color: '#fff' }}>{selectedIncident.location?.vehicleNumber}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#94a3b8', display: 'block' }}>Location / Stop:</span>
                    <strong style={{ color: '#fff' }}>{selectedIncident.location?.stationOrStop}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#94a3b8', display: 'block' }}>Support Channel:</span>
                    <strong style={{ color: '#00f2fe' }}>{selectedIncident.supportRequested}</strong>
                  </div>
                </div>

                {selectedIncident.location?.additionalNotes && (
                  <div style={{ marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '0.8rem' }}>
                    <span style={{ color: '#94a3b8' }}>Passenger Details: </span>
                    <span style={{ color: '#e2e8f0' }}>"{selectedIncident.location.additionalNotes}"</span>
                  </div>
                )}
              </div>

              {/* Context-Aware Recommended Protocol for Staff */}
              <div style={{ background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.25)', borderRadius: '8px', padding: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                  <Radio size={16} color="#06b6d4" />
                  <strong style={{ fontSize: '0.85rem', color: '#67e8f9' }}>
                    Rule-Based Staff Protocol Recommendation
                  </strong>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#cbd5e1', margin: '0 0 0.5rem 0' }}>
                  {selectedIncident.fullRecommendation?.staffProtocol?.recommendedAction || 'Monitor line, alert conductor for routine presence walkthrough.'}
                </p>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  Triage Level: <span style={{ color: '#fff', fontWeight: 600 }}>{selectedIncident.recommendedPlan?.priority || 'P2 - Elevated'}</span>
                </div>
              </div>

              {/* Follow-up Notes & Log History */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <FileText size={16} color="#00f2fe" />
                  Staff Audit Trail & Field Notes ({selectedIncident.staffNotes?.length || 0})
                </h3>

                {selectedIncident.staffNotes?.length === 0 ? (
                  <p style={{ fontSize: '0.78rem', color: '#64748b', fontStyle: 'italic', marginBottom: '0.75rem' }}>
                    No follow-up notes recorded yet. Add one below.
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    {selectedIncident.staffNotes.map((note, idx) => (
                      <div key={idx} style={{ background: 'rgba(0,0,0,0.2)', padding: '0.65rem', borderRadius: '6px', fontSize: '0.78rem', borderLeft: '2px solid #06b6d4' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.7rem', marginBottom: '2px' }}>
                          <span style={{ fontWeight: 600, color: '#67e8f9' }}>{note.author}</span>
                          <span>{new Date(note.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                        </div>
                        <p style={{ color: '#f1f5f9', margin: 0 }}>{note.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Note Input */}
                <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Add follow-up field note (e.g. Officer arrived at car 4)..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    style={{ fontSize: '0.82rem' }}
                  />
                  <button
                    type="submit"
                    className="btn btn-outline-teal"
                    style={{ padding: '0.5rem 0.9rem', flexShrink: 0 }}
                  >
                    <Send size={14} /> Add Note
                  </button>
                </form>
              </div>

              {/* Lifecycle History Log */}
              {selectedIncident.statusHistory?.length > 0 && (
                <div style={{ fontSize: '0.72rem', color: '#64748b', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.75rem' }}>
                  <span style={{ fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>
                    System Status Timeline:
                  </span>
                  {selectedIncident.statusHistory.map((hist, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '0.5rem', margin: '2px 0' }}>
                      <span style={{ color: '#94a3b8' }}>{new Date(hist.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}:</span>
                      <span>{hist.note}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <p style={{ color: '#94a3b8' }}>Select an incident from the queue on the left to view staff triage options.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
