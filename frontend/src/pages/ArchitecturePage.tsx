import React from 'react';
import { GitBranch, Layers, Cpu, MapPin, Bell, Shield, Users, Radio, Database } from 'lucide-react';

export const ArchitecturePage: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      <div className="border-b border-slate-800 pb-4 text-center sm:text-left">
        <h2 className="font-['Outfit'] font-extrabold text-2xl text-white flex items-center justify-center sm:justify-start gap-2">
          <GitBranch className="w-6 h-6 text-cyan-400" /> SIH Project Architecture Diagram
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Technical flow schematic showcasing data ingest, AI processing, early warning dispatch, and stakeholder delivery.
        </p>
      </div>

      {/* Visual Flow Schematic */}
      <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-8">
        {/* Layer 1: Data Ingestion Feeds */}
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3 text-center">
            1. Multi-Modal Environmental Data Ingestion Layer
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Rainfall Telemetry', icon: Radio },
              { label: 'Soil Sensors', icon: Database },
              { label: 'Satellite InSAR', icon: Layers },
              { label: 'Terrain DEM', icon: MapPin },
              { label: 'Historical Faults', icon: Database },
              { label: 'Field Reports', icon: Users },
            ].map((feed, idx) => {
              const Icon = feed.icon;
              return (
                <div key={idx} className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-center space-y-1.5">
                  <Icon className="w-5 h-5 mx-auto text-cyan-400" />
                  <span className="text-xs font-semibold text-slate-200 block">{feed.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Down Arrow connector */}
        <div className="flex justify-center">
          <div className="w-0.5 h-8 bg-gradient-to-b from-cyan-500 to-blue-500"></div>
        </div>

        {/* Layer 2: Data Normalization & Cleaning */}
        <div className="max-w-xl mx-auto bg-slate-900/90 p-4 rounded-xl border border-slate-800 text-center space-y-1">
          <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider">
            2. Fast Data Pre-Processing & Geo-Spatial Normalization
          </span>
          <p className="text-[11px] text-slate-400">
            Normalizes rainfall, moisture %, slope angles, and ground hazard tags to unified 0-100 metric scale.
          </p>
        </div>

        {/* Down Arrow connector */}
        <div className="flex justify-center">
          <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500 to-purple-500"></div>
        </div>

        {/* Layer 3: AI Risk Scoring Engine */}
        <div className="max-w-2xl mx-auto glass-panel p-6 rounded-2xl border border-purple-500/40 text-center space-y-3 bg-purple-500/5 shadow-xl shadow-purple-500/5">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto border border-purple-500/30">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="font-['Outfit'] font-extrabold text-lg text-white">
            3. AI Landslide Risk Calculation & Explainability Engine
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed max-w-lg mx-auto">
            Multi-factor weighted risk engine producing calibrated risk scores (0–100), severity ranks (LOW, MODERATE, HIGH, CRITICAL), and natural language explainability.
          </p>
        </div>

        {/* Down Arrow connector */}
        <div className="flex justify-center">
          <div className="w-0.5 h-8 bg-gradient-to-b from-purple-500 to-amber-500"></div>
        </div>

        {/* Layer 4: GIS + Alerts + Response Priority */}
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3 text-center">
            4. Dispatch & Visualization Layer
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-center space-y-1">
              <MapPin className="w-6 h-6 mx-auto text-cyan-400" />
              <h4 className="font-bold text-sm text-white">Interactive GIS Map</h4>
              <p className="text-[11px] text-slate-400">Leaflet hotspot visualization with affected highway overlays.</p>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-center space-y-1">
              <Bell className="w-6 h-6 mx-auto text-red-400" />
              <h4 className="font-bold text-sm text-white">Alert Generator</h4>
              <p className="text-[11px] text-slate-400">Automatic early warning dispatch with recommended emergency actions.</p>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-center space-y-1">
              <Shield className="w-6 h-6 mx-auto text-amber-400" />
              <h4 className="font-bold text-sm text-white">Response Prioritization</h4>
              <p className="text-[11px] text-slate-400">Calculates Risk × Exposure to allocate NDRF & district resources.</p>
            </div>
          </div>
        </div>

        {/* Down Arrow connector */}
        <div className="flex justify-center">
          <div className="w-0.5 h-8 bg-gradient-to-b from-amber-500 to-emerald-500"></div>
        </div>

        {/* Layer 5: Stakeholders */}
        <div className="bg-emerald-500/10 p-5 rounded-xl border border-emerald-500/30 text-center space-y-2">
          <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">
            5. End Stakeholders & Actionable Delivery
          </span>
          <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold text-slate-200">
            <span className="bg-slate-900 px-3 py-1 rounded-lg border border-slate-700">State Disaster Management Authorities (SDMA)</span>
            <span className="bg-slate-900 px-3 py-1 rounded-lg border border-slate-700">District Collectors & Emergency Response Teams</span>
            <span className="bg-slate-900 px-3 py-1 rounded-lg border border-slate-700">Border Roads Organisation (BRO) Patrols</span>
            <span className="bg-slate-900 px-3 py-1 rounded-lg border border-slate-700">Mountain Village Communities</span>
          </div>
        </div>
      </div>
    </div>
  );
};
