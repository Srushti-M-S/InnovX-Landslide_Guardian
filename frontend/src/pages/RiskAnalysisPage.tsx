import React, { useState } from 'react';
import { Layers, Cpu, Sliders, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { RiskGauge } from '../components/RiskGauge';

export const RiskAnalysisPage: React.FC = () => {
  // Interactive test inputs
  const [rainfall, setRainfall] = useState<number>(120);
  const [soilMoisture, setSoilMoisture] = useState<number>(75);
  const [slope, setSlope] = useState<number>(38);
  const [historicalActivity, setHistoricalActivity] = useState<string>('high');
  const [satelliteAnomaly, setSatelliteAnomaly] = useState<number>(40);
  const [sensorAnomaly, setSensorAnomaly] = useState<number>(30);
  const [fieldReports, setFieldReports] = useState<number>(1);

  // Compute multi-factor weighted formula live
  const rainfallScore = Math.min(100, (rainfall / 180.0) * 100);
  const moistureScore = Math.min(100, (soilMoisture / 90.0) * 100);
  const slopeScore = Math.min(100, (slope / 50.0) * 100);
  const histScore = historicalActivity === 'high' ? 90 : historicalActivity === 'moderate' ? 55 : 20;
  const satScore = Math.min(100, satelliteAnomaly * 2.5);
  const sensorScore = Math.min(100, sensorAnomaly * 2.5);
  const fieldScore = Math.min(100, fieldReports * 25);

  const weightedSum = (
    rainfallScore * 0.30 +
    moistureScore * 0.25 +
    slopeScore * 0.20 +
    histScore * 0.10 +
    satScore * 0.05 +
    sensorScore * 0.05 +
    fieldScore * 0.05
  );

  const calculatedRiskScore = Math.round(Math.min(100, Math.max(0, weightedSum)));

  let severity: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL' = 'LOW';
  let severityColor = '#22c55e';
  if (calculatedRiskScore >= 75) {
    severity = 'CRITICAL';
    severityColor = '#ef4444';
  } else if (calculatedRiskScore >= 50) {
    severity = 'HIGH';
    severityColor = '#f97316';
  } else if (calculatedRiskScore >= 25) {
    severity = 'MODERATE';
    severityColor = '#eab308';
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="font-['Outfit'] font-extrabold text-2xl text-white flex items-center gap-2">
          <Cpu className="w-6 h-6 text-cyan-400" /> Transparent AI Risk Score Engine & Factor Simulator
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Explore the mathematical model calculating landslide probability based on geological, meteorologic, IoT sensor, and satellite parameters.
        </p>
      </div>

      {/* Formula Explanation Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/60">
        <h3 className="font-bold text-sm text-cyan-400 uppercase tracking-wider mb-2">
          Mathematical AI Model Definition
        </h3>
        <p className="text-xs text-slate-300 font-mono bg-slate-950 p-3 rounded-xl border border-slate-800 overflow-x-auto">
          Risk = (Rainfall × 0.30) + (SoilMoisture × 0.25) + (Slope × 0.20) + (History × 0.10) + (Satellite × 0.05) + (Sensor × 0.05) + (FieldEvidence × 0.05)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input Sliders */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
          <h3 className="font-['Outfit'] font-extrabold text-lg text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sliders className="w-5 h-5 text-cyan-400" /> Interactive Environmental Telemetry Controls
          </h3>

          {/* Rainfall Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-300">Monsoon Rainfall Intensity</span>
              <span className="font-bold text-cyan-400">{rainfall} mm</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={rainfall}
              onChange={(e) => setRainfall(Number(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
            <span className="text-[10px] text-slate-500">Weight: 30% contribution</span>
          </div>

          {/* Soil Moisture Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-300">Soil Moisture Saturation</span>
              <span className="font-bold text-blue-400">{soilMoisture}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={soilMoisture}
              onChange={(e) => setSoilMoisture(Number(e.target.value))}
              className="w-full accent-blue-400 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
            <span className="text-[10px] text-slate-500">Weight: 25% contribution</span>
          </div>

          {/* Terrain Slope Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-300">Terrain Slope Angle</span>
              <span className="font-bold text-slate-200">{slope}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              value={slope}
              onChange={(e) => setSlope(Number(e.target.value))}
              className="w-full accent-purple-400 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
            <span className="text-[10px] text-slate-500">Weight: 20% contribution</span>
          </div>

          {/* Historical Activity Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">Historical Landslide Frequency</label>
            <select
              value={historicalActivity}
              onChange={(e) => setHistoricalActivity(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:border-cyan-500"
            >
              <option value="low">Low (Stable bedrock history)</option>
              <option value="moderate">Moderate (Periodic seasonal slope creep)</option>
              <option value="high">High (Known active fault / landslide zone)</option>
            </select>
            <span className="text-[10px] text-slate-500">Weight: 10% contribution</span>
          </div>

          {/* Field Reports Counter */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-300">Ground Field Reports</span>
              <span className="font-bold text-red-400">{fieldReports} report(s)</span>
            </div>
            <input
              type="range"
              min="0"
              max="4"
              value={fieldReports}
              onChange={(e) => setFieldReports(Number(e.target.value))}
              className="w-full accent-red-400 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
            <span className="text-[10px] text-slate-500">Weight: 5% contribution</span>
          </div>
        </div>

        {/* Right Column: Calculated Live Score Output & Factor Contribution */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 text-center space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Calculated Real-Time AI Score
            </h3>

            <RiskGauge score={calculatedRiskScore} severity={severity} color={severityColor} size="lg" />

            <div>
              <div className="font-['Outfit'] font-black text-2xl" style={{ color: severityColor }}>
                {severity} RISK SEVERITY
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {calculatedRiskScore >= 75
                  ? 'Critical emergency state. Evacuation warning required.'
                  : calculatedRiskScore >= 50
                  ? 'High risk alert. Monitor slope telemetry closely.'
                  : 'Moderate or stable risk status.'}
              </p>
            </div>
          </div>

          {/* Factor Breakdown List */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="font-bold text-sm text-white">Factor Score Breakdown</h4>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 bg-slate-900/60 rounded border border-slate-800">
                <span>Rainfall Contribution (30%)</span>
                <span className="font-bold text-cyan-400">+{(rainfallScore * 0.30).toFixed(1)} pts</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-900/60 rounded border border-slate-800">
                <span>Soil Moisture Contribution (25%)</span>
                <span className="font-bold text-blue-400">+{(moistureScore * 0.25).toFixed(1)} pts</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-900/60 rounded border border-slate-800">
                <span>Slope Angle Contribution (20%)</span>
                <span className="font-bold text-slate-200">+{(slopeScore * 0.20).toFixed(1)} pts</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-900/60 rounded border border-slate-800">
                <span>Historical History Contribution (10%)</span>
                <span className="font-bold text-amber-400">+{(histScore * 0.10).toFixed(1)} pts</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-900/60 rounded border border-slate-800">
                <span>Field Reports Contribution (5%)</span>
                <span className="font-bold text-red-400">+{(fieldScore * 0.05).toFixed(1)} pts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
