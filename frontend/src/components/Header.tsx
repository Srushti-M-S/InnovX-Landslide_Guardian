import React from 'react';
import { Shield, Play, Wifi, WifiOff, AlertTriangle, Layers, Activity, FileText, Database, GitBranch, MapPin } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOffline: boolean;
  setIsOffline: (val: boolean) => void;
  pendingSyncCount: number;
  onSyncNow: () => void;
  onStartSimulation: () => void;
  isSimulating: boolean;
  simulationStep: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isOffline,
  setIsOffline,
  pendingSyncCount,
  onSyncNow,
  onStartSimulation,
  isSimulating,
  simulationStep
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'map', label: 'GIS Risk Map', icon: MapPin },
    { id: 'analysis', label: 'Risk Engine', icon: Layers },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
    { id: 'priority', label: 'Response Priority', icon: Activity },
    { id: 'report', label: 'Field Report', icon: FileText },
    { id: 'datasources', label: 'Data Feeds', icon: Database },
    { id: 'architecture', label: 'Architecture', icon: GitBranch },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0b0f19]/90 backdrop-blur-md border-b border-slate-800/80 shadow-2xl">
      {/* Top Banner Bar */}
      <div className="bg-slate-900/60 border-b border-slate-800/50 px-4 py-1.5 flex flex-wrap items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          {/* <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-semibold px-2 py-0.5 rounded text-[11px] tracking-wide">
           
          </span> */}
          {/* <span className="text-slate-400 font-medium hidden sm:inline">
           
          </span> */}
        </div>
        <div className="flex items-center gap-3">
          {/* Offline mode toggle */}
          <button
            onClick={() => setIsOffline(!isOffline)}
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded font-medium transition-colors ${isOffline
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
              }`}
          >
            {isOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
            {isOffline ? `OFFLINE MODE (${pendingSyncCount} Pending)` : 'ONLINE MODE'}
          </button>

          {isOffline && pendingSyncCount > 0 && (
            <button
              onClick={onSyncNow}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-2.5 py-0.5 rounded transition-all animate-pulse text-[11px]"
            >
              SYNC NOW ({pendingSyncCount})
            </button>
          )}

          {/* Quick simulation launch button */}
          <button
            onClick={onStartSimulation}
            disabled={isSimulating}
            className={`flex items-center gap-1.5 px-3 py-1 rounded font-bold text-[11px] tracking-wide shadow-lg transition-all ${isSimulating
              ? 'bg-red-600 text-white animate-pulse'
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/20'
              }`}
          >
            <Play className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
            {isSimulating ? `SIMULATING TAWANG (STEP ${simulationStep}/4)...` : 'START RISK SIMULATION'}
          </button>
        </div>
      </div>

      {/* Main Header Brand + Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Shield className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-['Outfit'] font-extrabold text-xl tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  InnovX - A Landslide Guardian
                </h1>
                {/* <span className="hidden md:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                
                </span> */}
              </div>
              <p className="text-[11px] text-slate-400 font-medium truncate max-w-xs sm:max-w-md">
                Early Warning & Risk System for North Eastern Region
              </p>

            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${isActive
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-md shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile Navigation Horizontal Scroll */}
        <div className="lg:hidden flex items-center overflow-x-auto py-2 border-t border-slate-800/60 space-x-2 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800'
                  }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
