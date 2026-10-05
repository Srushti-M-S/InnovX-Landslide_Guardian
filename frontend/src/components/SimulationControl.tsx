import React from 'react';
import { Play, RotateCcw, AlertTriangle, CloudRain, Droplets, ArrowRight, CheckCircle2 } from 'lucide-react';

interface SimulationControlProps {
  isSimulating: boolean;
  simulationStep: number;
  onStartSimulation: () => void;
  onResetSimulation: () => void;
}

export const SimulationControl: React.FC<SimulationControlProps> = ({
  isSimulating,
  simulationStep,
  onStartSimulation,
  onResetSimulation
}) => {
  const steps = [
    { label: 'Initial Baseline', detail: 'Rainfall: 52mm, Soil: 54%, Risk: 42 (MODERATE)' },
    { label: 'Stage 1: Rain Spike', detail: 'Rainfall: 85mm, Soil: 63%, Risk: 55 (HIGH)' },
    { label: 'Stage 2: Soil Saturation', detail: 'Rainfall: 110mm, Soil: 72%, Risk: 68 (HIGH)' },
    { label: 'Stage 3: Risk Escalation', detail: 'Rainfall: 142mm, Soil: 81%, Risk: 82 (CRITICAL)' },
    { label: 'Stage 4: Emergency Alert', detail: 'Critical Alert Generated & Roads Affected' },
  ];

  return (
    <div className="glass-panel p-4 rounded-xl border border-slate-700/80 shadow-2xl relative overflow-hidden">
      {/* Background glow effect during active simulation */}
      {isSimulating && (
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-amber-500/10 to-cyan-500/10 animate-pulse pointer-events-none" />
      )}

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-3 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-red-500/20 text-red-400 border border-red-500/40 uppercase tracking-wide">
              LIVE DEMONSTRATION SIMULATION
            </span>
            <h3 className="font-['Outfit'] font-extrabold text-lg text-white">
              Tawang, Arunachal Pradesh Risk Escalation Scenario
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Simulate real-time cloudburst, soil saturation, dynamic risk score escalation, and automatic alert dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          {simulationStep > 0 && (
            <button
              onClick={onResetSimulation}
              disabled={isSimulating}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Scenario
            </button>
          )}

          <button
            onClick={onStartSimulation}
            disabled={isSimulating}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs shadow-lg transition-all ${
              isSimulating
                ? 'bg-red-600 text-white animate-pulse'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/20'
            }`}
          >
            <Play className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
            {isSimulating ? 'SIMULATING...' : simulationStep === 0 ? 'START RISK SIMULATION' : 'RE-RUN SIMULATION'}
          </button>
        </div>
      </div>

      {/* Progress Timeline Stepper */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
        {steps.map((step, idx) => {
          const isActive = simulationStep === idx;
          const isDone = simulationStep > idx;

          return (
            <div
              key={idx}
              className={`p-2.5 rounded-lg border text-xs transition-all ${
                isActive
                  ? 'bg-red-500/15 border-red-500/60 shadow-lg shadow-red-500/10'
                  : isDone
                  ? 'bg-slate-900/80 border-slate-700 text-slate-300'
                  : 'bg-slate-950/40 border-slate-800/80 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`font-bold ${isActive ? 'text-red-400' : isDone ? 'text-cyan-400' : 'text-slate-500'}`}>
                  Step {idx}
                </span>
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                ) : isActive ? (
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                ) : null}
              </div>
              <div className="font-semibold text-white text-[11px] truncate">{step.label}</div>
              <div className="text-[10px] text-slate-400 mt-1 line-clamp-2">{step.detail}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
