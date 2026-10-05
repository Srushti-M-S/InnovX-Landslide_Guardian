import React, { useState } from 'react';
import { AlertItem } from '../types';
import { AlertTriangle, ShieldAlert, CheckCircle, Bell, Filter, MapPin } from 'lucide-react';

interface AlertsPageProps {
  alerts: AlertItem[];
}

export const AlertsPage: React.FC<AlertsPageProps> = ({ alerts }) => {
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');

  const filteredAlerts = alerts.filter(a => {
    if (filterSeverity === 'ALL') return true;
    return a.severity === filterSeverity;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="font-['Outfit'] font-extrabold text-2xl text-white flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-400" /> Active Emergency Landslide Alerts
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time early warning notifications generated automatically when risk threshold scores cross critical limits.
          </p>
        </div>

        {/* Severity Filters */}
        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          {['ALL', 'CRITICAL', 'HIGH', 'MONITORING'].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                filterSeverity === sev
                  ? 'bg-cyan-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`glass-panel p-6 rounded-2xl border transition-all ${
                alert.severity === 'CRITICAL'
                  ? 'border-red-500/50 shadow-xl shadow-red-500/10'
                  : 'border-amber-500/40'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl border ${
                    alert.severity === 'CRITICAL'
                      ? 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}>
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-['Outfit'] font-black text-xl text-white">
                        {alert.location_name}, {alert.state}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded text-xs font-black ${
                        alert.severity === 'CRITICAL'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}>
                        {alert.severity} ({alert.risk_score}/100)
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">
                      Alert Reference ID: <strong>{alert.id}</strong> • Dispatch Time: {alert.timestamp}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
                    Status: {alert.status}
                  </span>
                </div>
              </div>

              {/* Alert Content Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="font-bold text-slate-300 uppercase text-[10px] tracking-wider block">
                    Trigger Cause / Factor Rationale
                  </span>
                  <p className="text-slate-200 leading-relaxed">
                    {alert.reason}
                  </p>
                </div>

                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase text-[10px] tracking-wider block">
                    Recommended Authority Emergency Protocol
                  </span>
                  <p className="text-amber-200/90 leading-relaxed font-semibold">
                    {alert.recommended_action}
                  </p>
                </div>
              </div>

              {/* Affected infrastructure tags */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 font-semibold">Impacted Perimeter:</span>
                {alert.affected_roads.map((road, idx) => (
                  <span key={idx} className="bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded text-[11px]">
                    🛣️ {road}
                  </span>
                ))}
                {alert.affected_villages.map((v, idx) => (
                  <span key={idx} className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded text-[11px]">
                    🏘️ {v}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="glass-panel p-8 rounded-2xl text-center text-slate-400">
            No active alerts matching the selected severity filter.
          </div>
        )}
      </div>
    </div>
  );
};
