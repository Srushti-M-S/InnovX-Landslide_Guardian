import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Polyline, Marker } from 'react-leaflet';
import L from 'leaflet';
import { LocationRiskData, FieldReport } from '../types';
import { ShieldAlert, AlertTriangle, Eye, Navigation2 } from 'lucide-react';

interface InteractiveMapProps {
  locations: LocationRiskData[];
  selectedLocation: LocationRiskData | null;
  onSelectLocation: (loc: LocationRiskData) => void;
  reports?: FieldReport[];
  highlightRoads?: boolean;
}

// Custom icon for Field Reports
const fieldReportIcon = L.divIcon({
  className: 'custom-field-icon',
  html: `<div style="background-color: #ef4444; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px #ef4444;"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7]
});

// Sample polyline coordinates for Tawang NH-13 highway to highlight when Tawang is high/critical
const TAWANG_ROAD_COORDS: [number, number][] = [
  [27.5861, 91.8594],
  [27.5500, 91.9200],
  [27.4800, 92.0500],
  [27.3500, 92.1500]
];

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  locations,
  selectedLocation,
  onSelectLocation,
  reports = [],
  highlightRoads = true
}) => {
  // Center of North Eastern Region India (roughly Meghalaya/Assam)
  const centerLat = 26.2000;
  const centerLng = 92.5000;

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={7}
        scrollWheelZoom={true}
        className="w-full h-full min-h-[450px]"
      >
        {/* Esri World Dark Gray Base tiles (100% Free, No API key required) */}
        <TileLayer
          attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          maxZoom={16}
        />

        {/* Render risk zone circle markers */}
        {locations.map((loc) => {
          const isSelected = selectedLocation?.id === loc.id;
          const radius = isSelected ? 22 : loc.severity === 'CRITICAL' ? 18 : loc.severity === 'HIGH' ? 15 : 12;

          return (
            <CircleMarker
              key={loc.id}
              center={[loc.lat, loc.lng]}
              radius={radius}
              pathOptions={{
                color: loc.color,
                fillColor: loc.color,
                fillOpacity: isSelected ? 0.85 : 0.6,
                weight: isSelected ? 4 : 2,
              }}
              eventHandlers={{
                click: () => onSelectLocation(loc)
              }}
            >
              <Popup>
                <div className="p-1 min-w-[220px]">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-2">
                    <div>
                      <h3 className="font-bold text-base text-white">{loc.name}</h3>
                      <p className="text-xs text-slate-400">{loc.state}</p>
                    </div>
                    <span
                      className="px-2 py-0.5 rounded text-xs font-extrabold text-white"
                      style={{ backgroundColor: loc.color }}
                    >
                      {loc.severity}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span>Risk Score:</span>
                      <span className="font-bold text-white">{loc.risk_score} / 100</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rainfall:</span>
                      <span className="font-bold text-cyan-400">{loc.rainfall_mm} mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Soil Moisture:</span>
                      <span className="font-bold text-cyan-400">{loc.soil_moisture_pct}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Slope:</span>
                      <span className="font-bold text-slate-200">{loc.slope_deg}°</span>
                    </div>
                    {loc.affected_roads.length > 0 && (
                      <div className="pt-1 border-t border-slate-800 text-[11px] text-amber-400">
                        ⚠️ Affected: {loc.affected_roads.length} road(s), {loc.affected_villages.length} village(s)
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => onSelectLocation(loc)}
                    className="w-full mt-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-1 px-2 rounded text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Inspect Details & AI Analysis
                  </button>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}

        {/* Highlight critical roads overlay if enabled */}
        {highlightRoads && selectedLocation && (selectedLocation.severity === 'HIGH' || selectedLocation.severity === 'CRITICAL') && (
          <Polyline
            positions={TAWANG_ROAD_COORDS}
            pathOptions={{
              color: selectedLocation.color,
              weight: 5,
              dashArray: '8, 8',
              opacity: 0.9
            }}
          />
        )}

        {/* Render field hazard report pins */}
        {reports.map((rep) => (
          <Marker key={rep.id} position={[rep.lat, rep.lng]} icon={fieldReportIcon}>
            <Popup>
              <div className="p-1 text-xs">
                <span className="bg-red-500/20 text-red-400 font-bold border border-red-500/30 px-1.5 py-0.5 rounded">
                  FIELD HAZARD REPORT
                </span>
                <h4 className="font-bold text-sm text-white mt-1.5">{rep.hazard_type}</h4>
                <p className="text-slate-300 mt-1">{rep.description}</p>
                <div className="mt-2 text-[10px] text-slate-400 flex justify-between">
                  <span>Location: {rep.location_name}</span>
                  <span>{rep.timestamp}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Overlay Legend */}
      <div className="absolute bottom-4 left-4 z-[400] glass-panel p-3 rounded-lg text-xs space-y-2 shadow-xl border border-slate-700/60 max-w-[200px]">
        <div className="font-bold text-slate-200 border-b border-slate-700 pb-1 flex items-center gap-1">
          <Navigation2 className="w-3.5 h-3.5 text-cyan-400" /> Risk Legend
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-slate-300 text-[11px]">Low</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="text-slate-300 text-[11px]">Moderate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-orange-500"></span>
            <span className="text-slate-300 text-[11px]">High</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-slate-300 text-[11px] font-bold text-red-400">Critical</span>
          </div>
        </div>
        {reports.length > 0 && (
          <div className="pt-1.5 border-t border-slate-800 flex items-center gap-1.5 text-[11px] text-red-400">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 border border-white"></span>
            Field Hazard ({reports.length})
          </div>
        )}
      </div>
    </div>
  );
};
