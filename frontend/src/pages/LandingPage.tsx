import React from 'react';
import { Shield, ArrowRight, MapPin, Activity, AlertTriangle, Cpu, Radio, PhoneCall, Layers, CheckCircle } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (tab: string) => void;
  onStartSimulation: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onStartSimulation }) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-[#0b0f19] to-slate-950 p-8 sm:p-14 shadow-2xl">
        {/* Decorative Grid & Glow Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-wide">
            <Shield className="w-4 h-4 text-cyan-400" />
          </div>

          <h1 className="font-['Outfit'] font-black text-4xl sm:text-6xl tracking-tight text-white leading-tight">
            InnovX - A Landslide Guardian
          </h1>

          <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 font-['Outfit']">
            AI-Based Early Warning and Landslide Risk Monitoring System for the North Eastern Region
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            Empowering disaster response authorities across 8 North Eastern states with real-time AI risk scoring, explainable terrain analytics, live risk simulation, interactive GIS mapping, and ground hazard reporting.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm transition-all shadow-xl shadow-cyan-500/25 flex items-center gap-2"
            >
              Open Monitoring Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('report')}
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-sm transition-all flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Report Hazard
            </button>

            <button
              onClick={onStartSimulation}
              className="px-6 py-3.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-300 font-bold text-sm transition-all flex items-center gap-2 animate-pulse"
            >
              <Activity className="w-4 h-4 text-red-400" />
              Launch Live Simulation
            </button>
          </div>
        </div>

        {/* Mountain Risk Stylized Visual Card */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-panel p-4 rounded-xl text-center">
            <span className="text-xs text-slate-400 font-medium">Monitoring Zones</span>
            <div className="font-['Outfit'] text-2xl font-black text-cyan-400 mt-1">8 States</div>
            <div className="text-[11px] text-slate-500 mt-0.5">North Eastern Corridor</div>
          </div>

          <div className="glass-panel p-4 rounded-xl text-center">
            <span className="text-xs text-slate-400 font-medium">AI Risk Factor Analysis</span>
            <div className="font-['Outfit'] text-2xl font-black text-emerald-400 mt-1">7 Feeds</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Rain, Soil, Slope, IoT, Field</div>
          </div>

          <div className="glass-panel p-4 rounded-xl text-center">
            <span className="text-xs text-slate-400 font-medium">Critical Road Arteries</span>
            <div className="font-['Outfit'] text-2xl font-black text-amber-400 mt-1">14 Highways</div>
            <div className="text-[11px] text-slate-500 mt-0.5">NH-13, NH-54, NH-2, NH-10</div>
          </div>

          <div className="glass-panel p-4 rounded-xl text-center">
            <span className="text-xs text-slate-400 font-medium">Early Warning Lead Time</span>
            <div className="font-['Outfit'] text-2xl font-black text-red-400 mt-1">3–6 Hours</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Automated Risk Alerts</div>
          </div>
        </div>
      </section>

      {/* Key System Features Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="font-['Outfit'] font-black text-3xl text-white">
            Core System Capabilities
          </h3>
          <p className="text-slate-400 text-sm mt-2">
            Built to provide actionable intelligence for disaster management authorities and mountain communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-lg text-white">Interactive GIS Mapping</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              High-resolution Leaflet map displaying real-time risk scores across Tawang, Aizawl, Kohima, Gangtok, Shillong, Itanagar, Imphal, and Guwahati.
            </p>
          </div>

          <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Cpu className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-lg text-white">Explainable AI Risk Engine</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Transparent multi-factor weighted formula (Rainfall 30%, Soil Moisture 25%, Slope 20%, History 10%) generating human-understandable explanations.
            </p>
          </div>

          <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Activity className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-lg text-white">Response Prioritization</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Calculates Response Priority = Risk × Exposure, prioritizing emergency resource allocation based on population density and highway connectivity.
            </p>
          </div>
        </div>
      </section>

      {/* System Workflow Pipeline */}
      <section className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 className="font-['Outfit'] font-extrabold text-xl text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" /> Disaster Risk Workflow Pipeline
          </h3>
          <span className="text-xs text-slate-400">End-to-End Operational Loop</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-9 gap-3 text-center">
          {[
            'Environmental Data',
            'Risk Analysis',
            'AI Risk Score',
            'GIS Map',
            'Risk Explanation',
            'Alert',
            'Response Priority',
            'Field Report',
            'Risk Update'
          ].map((step, idx) => (
            <div key={idx} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 flex flex-col items-center justify-center space-y-1.5">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-xs flex items-center justify-center border border-cyan-500/30">
                {idx + 1}
              </span>
              <span className="text-xs font-semibold text-slate-200">{step}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
