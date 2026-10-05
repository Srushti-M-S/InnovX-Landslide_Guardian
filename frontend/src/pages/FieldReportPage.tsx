import React, { useState } from 'react';
import { FieldReport } from '../types';
import { FileText, Camera, Navigation, CheckCircle2, Wifi, WifiOff, AlertTriangle } from 'lucide-react';

interface FieldReportPageProps {
  onSubmitReport: (report: Partial<FieldReport>) => void;
  isOffline: boolean;
  pendingSyncCount: number;
  onSyncNow: () => void;
}

export const FieldReportPage: React.FC<FieldReportPageProps> = ({
  onSubmitReport,
  isOffline,
  pendingSyncCount,
  onSyncNow
}) => {
  const [locationName, setLocationName] = useState('Tawang');
  const [hazardType, setHazardType] = useState('Slope Crack');
  const [description, setDescription] = useState('');
  const [lat, setLat] = useState<number>(27.5861);
  const [lng, setLng] = useState<number>(91.8594);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const hazardOptions = [
    'Landslide',
    'Slope Crack',
    'Rockfall',
    'Blocked Road',
    'Soil Movement',
    'Infrastructure Damage'
  ];

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLat(Number(pos.coords.latitude.toFixed(4)));
          setLng(Number(pos.coords.longitude.toFixed(4)));
        },
        () => {
          // Fallback location for demo
          setLat(27.5861);
          setLng(91.8594);
        }
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    onSubmitReport({
      location_name: locationName,
      hazard_type: hazardType,
      description,
      lat,
      lng,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    });

    setSubmittedMessage(isOffline ? 'Report Saved Locally (Pending Sync)' : 'Report Submitted & Synced Successfully!');
    setDescription('');
    setTimeout(() => setSubmittedMessage(null), 4000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div className="border-b border-slate-800 pb-4 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <FileText className="w-6 h-6 text-amber-400" />
          <h2 className="font-['Outfit'] font-extrabold text-2xl text-white">
            Mobile Field Hazard Reporting
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Ground intelligence submission portal for field responders, local village heads, and highway patrol teams.
        </p>
      </div>

      {/* Offline Status Alert */}
      <div className={`p-4 rounded-xl border flex items-center justify-between text-xs ${
        isOffline ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
      }`}>
        <div className="flex items-center gap-2">
          {isOffline ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
          <span>
            {isOffline ? `OFFLINE MODE: Reports queued locally. (${pendingSyncCount} Pending)` : 'ONLINE MODE: Direct sync to AI risk server.'}
          </span>
        </div>

        {isOffline && pendingSyncCount > 0 && (
          <button
            onClick={onSyncNow}
            className="bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded text-xs hover:bg-amber-300 transition-colors"
          >
            SYNC NOW ({pendingSyncCount})
          </button>
        )}
      </div>

      {submittedMessage && (
        <div className="p-4 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-cyan-400" />
          {submittedMessage}
        </div>
      )}

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-200 block">Hazard Category</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {hazardOptions.map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => setHazardType(opt)}
                className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                  hazardType === opt
                    ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Location Select & GPS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200">Target Region / Sector</label>
            <select
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-cyan-500"
            >
              <option value="Tawang">Tawang, Arunachal Pradesh</option>
              <option value="Aizawl">Aizawl, Mizoram</option>
              <option value="Kohima">Kohima, Nagaland</option>
              <option value="Itanagar">Itanagar, Arunachal Pradesh</option>
              <option value="Gangtok">Gangtok, Sikkim</option>
              <option value="Shillong">Shillong, Meghalaya</option>
              <option value="Imphal">Imphal, Manipur</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200">GPS Coordinates</label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={`${lat}, ${lng}`}
                className="w-full bg-slate-950 border border-slate-800 text-slate-400 rounded-xl p-3 text-xs font-mono"
              />
              <button
                type="button"
                onClick={handleGetLocation}
                className="px-3 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-xl border border-slate-700 flex items-center gap-1 text-xs font-bold"
              >
                <Navigation className="w-4 h-4" /> GPS
              </button>
            </div>
          </div>
        </div>

        {/* Description textarea */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-200">Hazard Observations & Description</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe slope cracks, visible mud creep, boulder fall, or road obstruction details..."
            className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-cyan-500 placeholder-slate-600"
          />
        </div>

        {/* Photo Upload mock UI */}
        <div className="border-2 border-dashed border-slate-800 rounded-xl p-4 text-center text-slate-400 hover:border-slate-700 transition-colors cursor-pointer space-y-1">
          <Camera className="w-6 h-6 mx-auto text-slate-500" />
          <span className="text-xs font-semibold text-slate-300 block">Attach Field Photo Evidence</span>
          <span className="text-[10px] text-slate-500">Supports JPG, PNG (Simulated upload)</span>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold py-3.5 rounded-xl text-sm transition-all shadow-xl shadow-cyan-500/20"
        >
          {isOffline ? 'Save Report Offline (Pending Sync)' : 'Submit Field Hazard Report'}
        </button>
      </form>
    </div>
  );
};
