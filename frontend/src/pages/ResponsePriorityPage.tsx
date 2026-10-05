import React, { useState } from 'react';
import { LocationRiskData } from '../types';
import { Activity, ShieldAlert, ArrowUpDown, Filter, Building, Users } from 'lucide-react';

interface ResponsePriorityPageProps {
  locations: LocationRiskData[];
}

export const ResponsePriorityPage: React.FC<ResponsePriorityPageProps> = ({ locations }) => {
  const [sortField, setSortField] = useState<'priority' | 'risk_score' | 'population'>('priority');

  // Compute Response Priority Score = Risk Score * Exposure Weight
  // Exposure Weights: CRITICAL: 1.25, HIGH: 1.1, MEDIUM: 0.9, LOW: 0.7
  const exposureWeights = { CRITICAL: 1.25, HIGH: 1.1, MEDIUM: 0.9, LOW: 0.7 };

  const rankedLocations = locations.map((loc) => {
    const w = exposureWeights[loc.exposure_level] || 1.0;
    const priorityScore = Math.round(loc.risk_score * w);

    let priorityRank: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' = 'LOW';
    if (priorityScore >= 80) priorityRank = 'CRITICAL';
    else if (priorityScore >= 60) priorityRank = 'HIGH';
    else if (priorityScore >= 35) priorityRank = 'MEDIUM';

    return {
      ...loc,
      priorityScore,
      priorityRank
    };
  });

  rankedLocations.sort((a, b) => {
    if (sortField === 'priority') return b.priorityScore - a.priorityScore;
    if (sortField === 'risk_score') return b.risk_score - a.risk_score;
    if (sortField === 'population') return b.population - a.population;
    return 0;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="font-['Outfit'] font-extrabold text-2xl text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-cyan-400" /> Response Prioritization Matrix
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Calculated formula: <strong>Response Priority = Risk × Exposure</strong> (evaluating population, road networks & vulnerable settlements).
          </p>
        </div>

        {/* Sorting controls */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" /> Sort by:
          </span>
          <button
            onClick={() => setSortField('priority')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              sortField === 'priority'
                ? 'bg-cyan-500 text-slate-950'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Response Priority
          </button>
          <button
            onClick={() => setSortField('risk_score')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              sortField === 'risk_score'
                ? 'bg-cyan-500 text-slate-950'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Raw Risk Score
          </button>
        </div>
      </div>

      {/* Response Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Rank</th>
                <th className="p-4">Location & State</th>
                <th className="p-4">Risk Score</th>
                <th className="p-4">Exposure Level</th>
                <th className="p-4">Population</th>
                <th className="p-4">Impacted Infrastructure</th>
                <th className="p-4">Response Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {rankedLocations.map((loc, idx) => (
                <tr
                  key={loc.id}
                  className={`hover:bg-slate-800/50 transition-colors ${
                    loc.priorityRank === 'CRITICAL' ? 'bg-red-500/5' : ''
                  }`}
                >
                  <td className="p-4 font-bold text-slate-400">
                    <span className={`w-6 h-6 rounded-full inline-flex items-center justify-center font-black ${
                      idx === 0 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}>
                      #{idx + 1}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-sm text-white">{loc.name}</div>
                    <div className="text-[11px] text-slate-400">{loc.state}</div>
                  </td>

                  <td className="p-4">
                    <span className="font-extrabold text-sm" style={{ color: loc.color }}>
                      {loc.risk_score} / 100
                    </span>
                    <span className="text-[10px] block text-slate-400">({loc.severity})</span>
                  </td>

                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-200 border border-slate-700">
                      {loc.exposure_level} EXPOSURE
                    </span>
                  </td>

                  <td className="p-4 text-slate-300 font-medium">
                    {loc.population.toLocaleString()} residents
                  </td>

                  <td className="p-4 text-slate-300">
                    <div>{loc.affected_roads.length} Road arterial(s)</div>
                    <div className="text-[11px] text-slate-400">{loc.affected_villages.length} Settlement(s)</div>
                  </td>

                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-black shadow-lg ${
                      loc.priorityRank === 'CRITICAL'
                        ? 'bg-red-500 text-white animate-pulse'
                        : loc.priorityRank === 'HIGH'
                        ? 'bg-orange-500 text-white'
                        : 'bg-yellow-500 text-slate-950'
                    }`}>
                      {loc.priorityRank} PRIORITY ({loc.priorityScore})
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
