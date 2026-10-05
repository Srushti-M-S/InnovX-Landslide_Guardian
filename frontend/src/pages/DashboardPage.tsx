import React from 'react';
import { LocationRiskData, AlertItem, FieldReport } from '../types';
import { InteractiveMap } from '../components/InteractiveMap';
import { RiskGauge } from '../components/RiskGauge';
import { SimulationControl } from '../components/SimulationControl';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { AlertTriangle, MapPin, Activity, ShieldAlert, CloudRain, Droplets, Navigation2, FileText, ChevronRight } from 'lucide-react';

interface DashboardPageProps {
  locations: LocationRiskData[];
  alerts: AlertItem[];
  reports: FieldReport[];
  selectedLocation: LocationRiskData | null;
  onSelectLocation: (loc: LocationRiskData) => void;
  onNavigate: (tab: string) => void;
  isSimulating: boolean;
  simulationStep: number;
  onStartSimulation: () => void;
  onResetSimulation: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  locations,
  alerts,
  reports,
  selectedLocation,
  onSelectLocation,
  onNavigate,
  isSimulating,
  simulationStep,
  onStartSimulation,
  onResetSimulation
}) => {
  // Compute overall regional risk metrics
  const highOrCriticalCount = locations.filter(l => l.severity === 'HIGH' || l.severity === 'CRITICAL').length;
  const totalRoadsCount = locations.reduce((sum, l) => sum + l.affected_roads.length, 0);
  const activeAlertsCount = alerts.filter(a => a.status === 'ACTIVE').length;

  // Average regional risk score calculation
  const avgRiskScore = Math.round(locations.reduce((sum, l) => sum + l.risk_score, 0) / locations.length);

  // Chart simulated trend data (past 7 days + current)
  const trendData = [
    { day: 'Mon', risk: 45, rainfall: 40, moisture: 50 },
    { day: 'Tue', risk: 48, rainfall: 55, moisture: 55 },
    { day: 'Wed', risk: 52, rainfall: 70, moisture: 62 },
    { day: 'Thu', risk: 61, rainfall: 95, moisture: 68 },
    { day: 'Fri', risk: 66, rainfall: 110, moisture: 75 },
    { day: 'Sat', risk: 70, rainfall: 125, moisture: 78 },
    { day: 'Today', risk: avgRiskScore, rainfall: 142, moisture: 81 },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Demo watermark banner */}
      <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
          <span className="font-bold text-slate-200">REAL-TIME NER LANDSLIDE COMMAND DASHBOARD</span>
        </div>
        <span className="px-2.5 py-0.5 rounded font-extrabold bg-amber-500/10 text-amber-300 border border-amber-500/30">
          DEMO / SIMULATED DATA
        </span>
      </div>

      {/* Top 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Regional Risk */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Overall Regional Risk
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-['Outfit'] font-black text-3xl text-white">{avgRiskScore}</span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
            <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-extrabold ${
              avgRiskScore >= 70 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}>
              {avgRiskScore >= 70 ? 'CRITICAL THREAT' : 'HIGH THREAT'}
            </span>
          </div>
          <RiskGauge score={avgRiskScore} severity="HIGH" color={avgRiskScore >= 70 ? '#ef4444' : '#f97316'} size="sm" />
        </div>

        {/* High Risk Zones */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              High / Critical Risk Zones
            </span>
            <div className="font-['Outfit'] font-black text-3xl text-amber-400 mt-1">
              {highOrCriticalCount}
            </div>
            <span className="text-xs text-slate-400 mt-2 block">
              Out of 8 monitored key hubs
            </span>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <MapPin className="w-6 h-6" />
          </div>
        </div>

        {/* Active Alerts */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Active Warning Alerts
            </span>
            <div className="font-['Outfit'] font-black text-3xl text-red-400 mt-1">
              {activeAlertsCount}
            </div>
            <span className="text-xs text-slate-400 mt-2 block">
              Direct authority notifications
            </span>
          </div>
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 animate-pulse">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        {/* Critical Roads */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Critical Road Arteries
            </span>
            <div className="font-['Outfit'] font-black text-3xl text-cyan-400 mt-1">
              {totalRoadsCount}
            </div>
            <span className="text-xs text-slate-400 mt-2 block">
              Vulnerable transit corridors
            </span>
          </div>
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Navigation2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Live SIH Simulation Control */}
      <SimulationControl
        isSimulating={isSimulating}
        simulationStep={simulationStep}
        onStartSimulation={onStartSimulation}
        onResetSimulation={onResetSimulation}
      />

      {/* Main Center Area: Map (Left 7 cols) + Selected Location Panel (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive GIS Map */}
        <div className="lg:col-span-7 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-['Outfit'] font-extrabold text-lg text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-400" /> Interactive GIS Risk Hotspots
            </h3>
            <button
              onClick={() => onNavigate('map')}
              className="text-xs text-cyan-400 hover:underline font-semibold flex items-center gap-1"
            >
              Full GIS View <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-[480px] w-full">
            <InteractiveMap
              locations={locations}
              selectedLocation={selectedLocation}
              onSelectLocation={onSelectLocation}
              reports={reports}
            />
          </div>
        </div>

        {/* Location Specific Quick Inspector Side Panel */}
        <div className="lg:col-span-5 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-['Outfit'] font-extrabold text-lg text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" /> Location Inspector
            </h3>
            <span className="text-xs text-slate-400">Click map pin to select</span>
          </div>

          {selectedLocation ? (
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-5 h-[480px] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h4 className="font-['Outfit'] font-black text-2xl text-white">
                    {selectedLocation.name}
                  </h4>
                  <p className="text-xs text-slate-400">{selectedLocation.state}</p>
                </div>
                <div className="text-right">
                  <span
                    className="px-2.5 py-1 rounded text-xs font-black text-white"
                    style={{ backgroundColor: selectedLocation.color }}
                  >
                    {selectedLocation.severity}
                  </span>
                  <div className="text-xs font-bold text-slate-300 mt-1">
                    Score: {selectedLocation.risk_score} / 100
                  </div>
                </div>
              </div>

              {/* Factors Quick Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                  <span className="text-slate-400 flex items-center gap-1">
                    <CloudRain className="w-3.5 h-3.5 text-cyan-400" /> Rainfall
                  </span>
                  <span className="font-bold text-sm text-cyan-300 mt-1 block">
                    {selectedLocation.rainfall_mm} mm
                  </span>
                </div>

                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-blue-400" /> Soil Moisture
                  </span>
                  <span className="font-bold text-sm text-blue-300 mt-1 block">
                    {selectedLocation.soil_moisture_pct}%
                  </span>
                </div>

                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                  <span className="text-slate-400">Slope Angle</span>
                  <span className="font-bold text-sm text-slate-200 mt-1 block">
                    {selectedLocation.slope_deg}°
                  </span>
                </div>

                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                  <span className="text-slate-400">History Activity</span>
                  <span className="font-bold text-sm text-slate-200 mt-1 block capitalize">
                    {selectedLocation.historical_activity}
                  </span>
                </div>
              </div>

              {/* Explanation Summary */}
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1">
                <span className="font-bold text-cyan-400 uppercase text-[10px] tracking-wide">
                  AI Explainability Insight
                </span>
                <p className="text-slate-200 leading-relaxed">
                  "{selectedLocation.explanation}"
                </p>
              </div>

              {/* Infrastructure details */}
              <div className="text-xs space-y-2">
                <span className="font-bold text-slate-300 block">Affected Arteries:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedLocation.affected_roads.map((road, idx) => (
                    <span key={idx} className="bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded text-[11px]">
                      {road}
                    </span>
                  ))}
                  {selectedLocation.affected_villages.map((v, idx) => (
                    <span key={idx} className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded text-[11px]">
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onNavigate('analysis')}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                Inspect AI Factor Weights Engine
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="glass-panel p-8 rounded-2xl border border-slate-800 text-center text-slate-400 h-[480px] flex flex-col items-center justify-center space-y-3">
              <MapPin className="w-10 h-10 text-slate-600 animate-bounce" />
              <p className="text-sm">Click any location marker on the GIS map to view real-time risk scores & AI explanations.</p>
            </div>
          )}
        </div>
      </div>

      {/* Analytics Charts Section (Risk Trend, Rainfall, Soil Moisture) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Risk Trend Chart */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" /> Regional Risk Score Trend
            </h4>
            <span className="text-[11px] text-slate-400">7-Day Rolling</span>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="day" stroke="#6b7280" fontSize={11} />
                <YAxis stroke="#6b7280" fontSize={11} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="risk" stroke="#ef4444" fillOpacity={1} fill="url(#riskGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rainfall Chart */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-cyan-400" /> Precipitative Rainfall (mm)
            </h4>
            <span className="text-[11px] text-cyan-400 font-bold">Monsoon Gauge</span>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="day" stroke="#6b7280" fontSize={11} />
                <YAxis stroke="#6b7280" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="rainfall" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Soil Moisture Chart */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-400" /> Soil Saturation (%)
            </h4>
            <span className="text-[11px] text-slate-400">IoT Telemetry</span>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="day" stroke="#6b7280" fontSize={11} />
                <YAxis stroke="#6b7280" fontSize={11} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="moisture" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Alerts Feed Table */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h4 className="font-['Outfit'] font-extrabold text-lg text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" /> Active System Landslide Alerts
          </h4>
          <button
            onClick={() => onNavigate('alerts')}
            className="text-xs text-cyan-400 hover:underline font-semibold flex items-center gap-1"
          >
            View All Active Alerts <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-slate-700 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                    alert.severity === 'CRITICAL'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}>
                    {alert.severity} ({alert.risk_score}/100)
                  </span>
                  <span className="font-bold text-sm text-white">{alert.location_name}, {alert.state}</span>
                  <span className="text-[11px] text-slate-400">({alert.timestamp})</span>
                </div>
                <p className="text-xs text-slate-300">{alert.reason}</p>
                <div className="text-[11px] text-amber-400">
                  Recommended Action: {alert.recommended_action}
                </div>
              </div>

              <button
                onClick={() => onNavigate('alerts')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors whitespace-nowrap self-end md:self-auto"
              >
                Action Response
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
