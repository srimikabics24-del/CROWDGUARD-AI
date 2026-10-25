import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <aside className="toast-container" aria-live="polite" aria-label="Notifications">
      {toasts.map(toast => {
        const Icon = toast.type === 'error' ? AlertTriangle : toast.type === 'info' ? Info : CheckCircle2;
        const iconColor = toast.type === 'error' ? '#f43f5e' : toast.type === 'info' ? '#38bdf8' : '#00f2fe';

        return (
          <div key={toast.id} className="toast" role="alert">
            <Icon size={18} style={{ color: iconColor, flexShrink: 0 }} />
            <div style={{ flex: 1, fontSize: '0.82rem' }}>
              {toast.title && <strong style={{ display: 'block', color: '#fff', marginBottom: '2px' }}>{toast.title}</strong>}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '2px' }}
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </aside>
  );
}
