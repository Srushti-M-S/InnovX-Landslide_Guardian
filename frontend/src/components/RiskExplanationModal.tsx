import React from 'react';
import { LocationRiskData } from '../types';
import { RiskGauge } from './RiskGauge';
import { X, HelpCircle, AlertTriangle, ShieldCheck, Cpu, ArrowUpRight, MapPin, Building, Car } from 'lucide-react';

interface RiskExplanationModalProps {
  location: LocationRiskData | null;
  onClose: () => void;
  onStartSimulationForLocation?: (locId: string) => void;
}

export const RiskExplanationModal: React.FC<RiskExplanationModalProps> = ({
  location,
  onClose,
  onStartSimulationForLocation
}) => {
  if (!location) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-3xl rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-['Outfit'] font-extrabold text-2xl text-white">
                  {location.name}
                </h2>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {location.state}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Detailed AI Risk Engine Factor Analysis & Geological Evidence
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Top Score & Severity Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-slate-900/60 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-center gap-4">
              <RiskGauge score={location.risk_score} severity={location.severity} color={location.color} size="lg" />
              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Calculated Risk</span>
                <div
                  className="font-extrabold text-xl tracking-tight mt-0.5"
                  style={{ color: location.color }}
                >
                  {location.severity} SEVERITY
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Population: {location.population.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-2 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-5">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <HelpCircle className="w-4 h-4" /> WHY IS THIS AREA AT RISK?
              </div>
              <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                "{location.explanation}"
              </p>
            </div>
          </div>

          {/* Environmental Factor Contribution Breakdown */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                AI Risk Score Contributing Factors (Transparent Weights)
              </h3>
              <span className="text-xs text-slate-400">Total Score: 100 max</span>
            </div>

            <div className="space-y-3">
              {location.factors.map((factor, idx) => (
                <div key={idx} className="bg-slate-900/50 p-3 rounded-lg border border-slate-800/70">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-200">{factor.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400">Recorded: <strong className="text-white">{factor.value}</strong></span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        factor.level === 'HIGH' || factor.level === 'CRITICAL'
                          ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                          : factor.level === 'MODERATE'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}>
                        {factor.level}
                      </span>
                      <span className="font-bold text-cyan-400 w-12 text-right">+{factor.contribution} pts</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (factor.contribution / 30) * 100)}%`,
                        backgroundColor: factor.contribution > 15 ? '#ef4444' : factor.contribution > 8 ? '#f97316' : '#22c55e'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Infrastructure & Exposure Impact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <h4 className="font-bold text-sm text-slate-200 flex items-center gap-2 mb-2">
                <Car className="w-4 h-4 text-amber-400" /> Affected Critical Infrastructure
              </h4>
              {location.affected_roads.length > 0 ? (
                <ul className="space-y-1 text-xs text-amber-300/90">
                  {location.affected_roads.map((road, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      {road}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-400">No major road closures detected.</p>
              )}
            </div>

            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <h4 className="font-bold text-sm text-slate-200 flex items-center gap-2 mb-2">
                <Building className="w-4 h-4 text-cyan-400" /> Vulnerable Villages & Settlements
              </h4>
              {location.affected_villages.length > 0 ? (
                <ul className="space-y-1 text-xs text-cyan-300/90">
                  {location.affected_villages.map((v, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      {v}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-400">No dense village settlements in high threat perimeter.</p>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            Formula: <code className="bg-slate-950 px-2 py-0.5 rounded text-cyan-400">Rain(30%) + Soil(25%) + Slope(20%) + Hist(10%) + Sat/Sens/Field(15%)</code>
          </div>

          <div className="flex items-center gap-3">
            {onStartSimulationForLocation && location.id === 'tawang' && (
              <button
                onClick={() => {
                  onClose();
                  onStartSimulationForLocation(location.id);
                }}
                className="bg-red-600 hover:bg-red-500 text-white font-bold py-1.5 px-4 rounded-lg text-xs transition-colors shadow-lg shadow-red-600/30 flex items-center gap-1.5 animate-pulse"
              >
                Start Tawang Live Simulation
                <ArrowUpRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onClose}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-1.5 px-4 rounded-lg text-xs transition-colors"
            >
              Close Panel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
