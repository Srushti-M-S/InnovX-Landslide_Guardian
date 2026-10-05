import React, { useState } from 'react';
import { LocationRiskData, AlertItem, FieldReport } from './types';
import { INITIAL_NER_LOCATIONS, recalculateLocationRisk } from './data/nerLocations';
import { INITIAL_ALERTS } from './data/mockAlerts';
import { Header } from './components/Header';
import { RiskExplanationModal } from './components/RiskExplanationModal';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { RiskMapPage } from './pages/RiskMapPage';
import { RiskAnalysisPage } from './pages/RiskAnalysisPage';
import { AlertsPage } from './pages/AlertsPage';
import { ResponsePriorityPage } from './pages/ResponsePriorityPage';
import { FieldReportPage } from './pages/FieldReportPage';
import { DataSourcesPage } from './pages/DataSourcesPage';
import { ArchitecturePage } from './pages/ArchitecturePage';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [locations, setLocations] = useState<LocationRiskData[]>(INITIAL_NER_LOCATIONS);
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [reports, setReports] = useState<FieldReport[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationRiskData | null>(INITIAL_NER_LOCATIONS[0]);
  const [explanationModalLoc, setExplanationModalLoc] = useState<LocationRiskData | null>(null);

  // Offline mode state
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [pendingReports, setPendingReports] = useState<Partial<FieldReport>[]>([]);

  // Simulation state
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationStep, setSimulationStep] = useState<number>(0);

  // Live Simulation Runner for Tawang
  const runTawangSimulation = () => {
    setIsSimulating(true);
    setSimulationStep(1);

    // Stage 1: Rain spike (52 -> 85mm), Soil (54 -> 63%), Risk (42 -> 55, HIGH)
    setTimeout(() => {
      setSimulationStep(1);
      setLocations((prev) =>
        prev.map((l) => (l.id === 'tawang' ? recalculateLocationRisk(l, 85, 63) : l))
      );
      setSelectedLocation((prev) => (prev?.id === 'tawang' ? recalculateLocationRisk(prev, 85, 63) : prev));
    }, 1200);

    // Stage 2: Soil saturation rise (85 -> 110mm), Soil (63 -> 72%), Risk (55 -> 68, HIGH)
    setTimeout(() => {
      setSimulationStep(2);
      setLocations((prev) =>
        prev.map((l) => (l.id === 'tawang' ? recalculateLocationRisk(l, 110, 72) : l))
      );
      setSelectedLocation((prev) => (prev?.id === 'tawang' ? recalculateLocationRisk(prev, 110, 72) : prev));
    }, 2800);

    // Stage 3: Critical Risk Escalation (110 -> 142mm), Soil (72 -> 81%), Risk (68 -> 82, CRITICAL)
    setTimeout(() => {
      setSimulationStep(3);
      setLocations((prev) =>
        prev.map((l) => (l.id === 'tawang' ? recalculateLocationRisk(l, 142, 81) : l))
      );
      setSelectedLocation((prev) => (prev?.id === 'tawang' ? recalculateLocationRisk(prev, 142, 81) : prev));
    }, 4400);

    // Stage 4: Alert Generation & Affected Road overlay
    setTimeout(() => {
      setSimulationStep(4);
      setIsSimulating(false);

      // Generate Critical Alert for Tawang
      const newAlert: AlertItem = {
        id: `ALT-${Date.now().toString().slice(-4)}`,
        location_id: 'tawang',
        location_name: 'Tawang',
        state: 'Arunachal Pradesh',
        severity: 'CRITICAL',
        risk_score: 82,
        reason: 'Heavy rainfall (142 mm) + high soil moisture (81%) on steep 38° slope near NH-13 Tezpur highway corridor',
        affected_roads: ['NH-13 Tawang-Tezpur Highway', 'Bhalukpong Pass'],
        affected_villages: ['LUM LA Village'],
        recommended_action: 'Deploy emergency monitoring, inspect vulnerable slope sectors on NH-13, send SMS advisory to district traffic authority.',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: 'ACTIVE'
      };

      setAlerts((prev) => [newAlert, ...prev]);
    }, 6000);
  };

  const resetSimulation = () => {
    setSimulationStep(0);
    setIsSimulating(false);
    setLocations(INITIAL_NER_LOCATIONS);
    setSelectedLocation(INITIAL_NER_LOCATIONS[0]);
  };

  // Field report submit handler
  const handleReportSubmit = (repData: Partial<FieldReport>) => {
    if (isOffline) {
      setPendingReports((prev) => [...prev, repData]);
    } else {
      const newRep: FieldReport = {
        id: `rep-00${reports.length + 1}`,
        location_id: (repData.location_name || 'Tawang').toLowerCase(),
        location_name: repData.location_name || 'Tawang',
        hazard_type: repData.hazard_type || 'Slope Crack',
        description: repData.description || 'Field report submitted',
        lat: repData.lat || 27.5861,
        lng: repData.lng || 91.8594,
        timestamp: repData.timestamp || new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: 'Synced'
      };

      setReports((prev) => [...prev, newRep]);

      // Update location evidence in locations list
      setLocations((prev) =>
        prev.map((l) =>
          l.id === newRep.location_id
            ? recalculateLocationRisk(l, l.rainfall_mm, l.soil_moisture_pct, 1)
            : l
        )
      );
    }
  };

  const handleSyncNow = () => {
    if (pendingReports.length === 0) return;

    const synced = pendingReports.map((p, idx) => ({
      id: `rep-sync-${Date.now()}-${idx}`,
      location_id: (p.location_name || 'Tawang').toLowerCase(),
      location_name: p.location_name || 'Tawang',
      hazard_type: p.hazard_type || 'Slope Crack',
      description: p.description || 'Synced offline report',
      lat: p.lat || 27.5861,
      lng: p.lng || 91.8594,
      timestamp: p.timestamp || new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Synced' as const
    }));

    setReports((prev) => [...prev, ...synced]);
    setPendingReports([]);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOffline={isOffline}
        setIsOffline={setIsOffline}
        pendingSyncCount={pendingReports.length}
        onSyncNow={handleSyncNow}
        onStartSimulation={runTawangSimulation}
        isSimulating={isSimulating}
        simulationStep={simulationStep}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'landing' && (
          <LandingPage
            onNavigate={setActiveTab}
            onStartSimulation={runTawangSimulation}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardPage
            locations={locations}
            alerts={alerts}
            reports={reports}
            selectedLocation={selectedLocation}
            onSelectLocation={setSelectedLocation}
            onNavigate={setActiveTab}
            isSimulating={isSimulating}
            simulationStep={simulationStep}
            onStartSimulation={runTawangSimulation}
            onResetSimulation={resetSimulation}
          />
        )}

        {activeTab === 'map' && (
          <RiskMapPage
            locations={locations}
            selectedLocation={selectedLocation}
            onSelectLocation={setSelectedLocation}
            reports={reports}
            onOpenExplanationModal={setExplanationModalLoc}
          />
        )}

        {activeTab === 'analysis' && <RiskAnalysisPage />}

        {activeTab === 'alerts' && <AlertsPage alerts={alerts} />}

        {activeTab === 'priority' && <ResponsePriorityPage locations={locations} />}

        {activeTab === 'report' && (
          <FieldReportPage
            onSubmitReport={handleReportSubmit}
            isOffline={isOffline}
            pendingSyncCount={pendingReports.length}
            onSyncNow={handleSyncNow}
          />
        )}

        {activeTab === 'datasources' && <DataSourcesPage />}

        {activeTab === 'architecture' && <ArchitecturePage />}
      </main>

      {/* AI Risk Explanation Modal */}
      <RiskExplanationModal
        location={explanationModalLoc}
        onClose={() => setExplanationModalLoc(null)}
        onStartSimulationForLocation={runTawangSimulation}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 bg-slate-950/60 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500 space-y-1">
          <p className="font-semibold text-slate-400">
            InnovX - A Landslide Guardian
          </p>
          <p>Designed for Disaster Risk Reduction & Early Warning in North Eastern Region, India.</p>
        </div>
      </footer>
    </div>
  );
};
