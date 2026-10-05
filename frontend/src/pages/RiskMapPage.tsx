import React from 'react';
import { LocationRiskData, FieldReport } from '../types';
import { InteractiveMap } from '../components/InteractiveMap';
import { MapPin, Activity, CloudRain, Droplets, ArrowUpRight, Eye } from 'lucide-react';

interface RiskMapPageProps {
  locations: LocationRiskData[];
  selectedLocation: LocationRiskData | null;
  onSelectLocation: (loc: LocationRiskData) => void;
  reports: FieldReport[];
  onOpenExplanationModal: (loc: LocationRiskData) => void;
}

export const RiskMapPage: React.FC<RiskMapPageProps> = ({
  locations,
  selectedLocation,
  onSelectLocation,
  reports,
  onOpenExplanationModal
}) => {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <h2 className="font-['Outfit'] font-extrabold text-2xl text-white flex items-center gap-2">
            <MapPin className="w-6 h-6 text-cyan-400" /> Interactive GIS Risk Map
          </h2>
          <p className="text-xs text-slate-400">
            Real-time geospatial hazard monitoring map for 8 key North Eastern Region hubs.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">
            Monitored Hotspots: <strong className="text-cyan-400">{locations.length}</strong>
          </span>
          <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">
            Field Reports: <strong className="text-red-400">{reports.length}</strong>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Map Box */}
        <div className="lg:col-span-8 h-[600px] w-full">
          <InteractiveMap
            locations={locations}
            selectedLocation={selectedLocation}
            onSelectLocation={onSelectLocation}
            reports={reports}
          />
        </div>

        {/* Selected Location Details Panel */}
        <div className="lg:col-span-4 space-y-4">
          {selectedLocation ? (
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-5 h-[600px] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-['Outfit'] font-black text-2xl text-white">
                    {selectedLocation.name}
                  </h3>
                  <span className="text-xs text-slate-400">{selectedLocation.state}</span>
                </div>
                <span
                  className="px-3 py-1 rounded-lg text-xs font-black text-white shadow-lg"
                  style={{ backgroundColor: selectedLocation.color }}
                >
                  {selectedLocation.severity} ({selectedLocation.risk_score}/100)
                </span>
              </div>

              {/* Core Telemetry */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Geological Telemetry
                </span>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 flex items-center gap-1">
                      <CloudRain className="w-3.5 h-3.5 text-cyan-400" /> Rainfall
                    </span>
                    <span className="font-bold text-base text-cyan-300 mt-1 block">
                      {selectedLocation.rainfall_mm} mm
                    </span>
                  </div>

                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Droplets className="w-3.5 h-3.5 text-blue-400" /> Soil Saturation
                    </span>
                    <span className="font-bold text-base text-blue-300 mt-1 block">
                      {selectedLocation.soil_moisture_pct}%
                    </span>
                  </div>

                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400">Slope Gradient</span>
                    <span className="font-bold text-base text-slate-200 mt-1 block">
                      {selectedLocation.slope_deg}°
                    </span>
                  </div>

                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400">Historical History</span>
                    <span className="font-bold text-base text-slate-200 mt-1 block capitalize">
                      {selectedLocation.historical_activity}
                    </span>
                  </div>
                </div>
              </div>

              {/* Natural language AI Explanation */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
                  AI Risk Engine Explanation
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  "{selectedLocation.explanation}"
                </p>
              </div>

              {/* Affected infrastructure */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-slate-300 block">Vulnerable Infrastructure:</span>
                <div className="space-y-1">
                  {selectedLocation.affected_roads.map((road, idx) => (
                    <div key={idx} className="bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      {road}
                    </div>
                  ))}
                  {selectedLocation.affected_villages.map((v, idx) => (
                    <div key={idx} className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 px-2.5 py-1 rounded flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      {v}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onOpenExplanationModal(selectedLocation)}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <Eye className="w-4 h-4" />
                Open AI Factor Contribution Breakdown
              </button>
            </div>
          ) : (
            <div className="glass-panel p-8 rounded-2xl border border-slate-800 text-center text-slate-400 h-[600px] flex flex-col items-center justify-center space-y-3">
              <MapPin className="w-12 h-12 text-slate-600 animate-bounce" />
              <p className="text-sm">Click any map location pin (e.g. Tawang, Aizawl, Kohima) to inspect hazard details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
