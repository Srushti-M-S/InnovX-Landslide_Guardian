import { LocationRiskData } from '../types';

export const INITIAL_NER_LOCATIONS: LocationRiskData[] = [
  {
    id: 'tawang',
    name: 'Tawang',
    state: 'Arunachal Pradesh',
    lat: 27.5861,
    lng: 91.8594,
    rainfall_mm: 52,
    soil_moisture_pct: 54,
    slope_deg: 38,
    historical_activity: 'moderate',
    affected_roads: ['NH-13 Tawang-Tezpur Highway', 'Bhalukpong Pass'],
    affected_villages: ['LUM LA Village'],
    exposure_level: 'HIGH',
    population: 11200,
    risk_score: 42,
    severity: 'MODERATE',
    color: '#eab308',
    explanation: 'Risk is moderate driven by steep slope angle (38°) and baseline rainfall levels.',
    factors: [
      { name: 'Heavy Rainfall', contribution: 8.7, level: 'MODERATE', value: '52 mm' },
      { name: 'Soil Moisture Saturation', contribution: 15.0, level: 'MODERATE', value: '54%' },
      { name: 'Terrain Slope Angle', contribution: 15.2, level: 'HIGH', value: '38°' },
      { name: 'Historical Landslide Activity', contribution: 5.5, level: 'MODERATE', value: 'Moderate' },
      { name: 'Satellite Change Detection', contribution: 1.0, level: 'LOW', value: '20% anomaly' },
      { name: 'IoT Sensor Anomaly', contribution: 0.5, level: 'LOW', value: 'Normal' },
      { name: 'Field Hazard Reports', contribution: 0.0, level: 'LOW', value: '0 reports' }
    ]
  },
  {
    id: 'itanagar',
    name: 'Itanagar',
    state: 'Arunachal Pradesh',
    lat: 27.0844,
    lng: 93.6053,
    rainfall_mm: 88,
    soil_moisture_pct: 68,
    slope_deg: 32,
    historical_activity: 'moderate',
    affected_roads: ['NH-415 Itanagar Highway'],
    affected_villages: ['Naharlagun Sector 4'],
    exposure_level: 'HIGH',
    population: 35000,
    risk_score: 58,
    severity: 'HIGH',
    color: '#f97316',
    explanation: 'Risk is high due to elevated soil saturation (68%) and sustained regional rainfall.',
    factors: [
      { name: 'Heavy Rainfall', contribution: 14.7, level: 'HIGH', value: '88 mm' },
      { name: 'Soil Moisture Saturation', contribution: 18.9, level: 'HIGH', value: '68%' },
      { name: 'Terrain Slope Angle', contribution: 12.8, level: 'MODERATE', value: '32°' },
      { name: 'Historical Landslide Activity', contribution: 5.5, level: 'MODERATE', value: 'Moderate' },
      { name: 'Satellite Change Detection', contribution: 1.5, level: 'LOW', value: '30% anomaly' },
      { name: 'IoT Sensor Anomaly', contribution: 0.5, level: 'LOW', value: 'Normal' },
      { name: 'Field Hazard Reports', contribution: 0.0, level: 'LOW', value: '0 reports' }
    ]
  },
  {
    id: 'aizawl',
    name: 'Aizawl',
    state: 'Mizoram',
    lat: 23.7271,
    lng: 92.7176,
    rainfall_mm: 135,
    soil_moisture_pct: 82,
    slope_deg: 42,
    historical_activity: 'high',
    affected_roads: ['NH-54 Aizawl Bypass', 'Sairang Link Road'],
    affected_villages: ['Laipuitlang Hill Slope', 'Zemabawk East'],
    exposure_level: 'CRITICAL',
    population: 293000,
    risk_score: 78,
    severity: 'CRITICAL',
    color: '#ef4444',
    explanation: 'Risk is critical because heavy rainfall (135 mm) and high soil moisture (82%) combine on steep slopes (42°).',
    factors: [
      { name: 'Heavy Rainfall', contribution: 22.5, level: 'HIGH', value: '135 mm' },
      { name: 'Soil Moisture Saturation', contribution: 22.8, level: 'HIGH', value: '82%' },
      { name: 'Terrain Slope Angle', contribution: 16.8, level: 'HIGH', value: '42°' },
      { name: 'Historical Landslide Activity', contribution: 9.0, level: 'HIGH', value: 'High' },
      { name: 'Satellite Change Detection', contribution: 2.5, level: 'MODERATE', value: '50% anomaly' },
      { name: 'IoT Sensor Anomaly', contribution: 3.0, level: 'HIGH', value: 'Vibration Detected' },
      { name: 'Field Hazard Reports', contribution: 1.25, level: 'LOW', value: '1 report' }
    ]
  },
  {
    id: 'shillong',
    name: 'Shillong',
    state: 'Meghalaya',
    lat: 25.5788,
    lng: 91.8933,
    rainfall_mm: 45,
    soil_moisture_pct: 48,
    slope_deg: 26,
    historical_activity: 'low',
    affected_roads: ['NH-6 Shillong Bypass'],
    affected_villages: ['Upper Shillong Zone'],
    exposure_level: 'MEDIUM',
    population: 143000,
    risk_score: 34,
    severity: 'MODERATE',
    color: '#eab308',
    explanation: 'Risk remains moderate with normal seasonal moisture and stable slopes.',
    factors: [
      { name: 'Heavy Rainfall', contribution: 7.5, level: 'LOW', value: '45 mm' },
      { name: 'Soil Moisture Saturation', contribution: 13.3, level: 'LOW', value: '48%' },
      { name: 'Terrain Slope Angle', contribution: 10.4, level: 'LOW', value: '26°' },
      { name: 'Historical Landslide Activity', contribution: 2.0, level: 'LOW', value: 'Low' },
      { name: 'Satellite Change Detection', contribution: 0.5, level: 'LOW', value: '10% anomaly' },
      { name: 'IoT Sensor Anomaly', contribution: 0.5, level: 'LOW', value: 'Normal' },
      { name: 'Field Hazard Reports', contribution: 0.0, level: 'LOW', value: '0 reports' }
    ]
  },
  {
    id: 'kohima',
    name: 'Kohima',
    state: 'Nagaland',
    lat: 25.6751,
    lng: 94.1086,
    rainfall_mm: 102,
    soil_moisture_pct: 74,
    slope_deg: 36,
    historical_activity: 'high',
    affected_roads: ['NH-2 Kohima-Dimapur Highway'],
    affected_villages: ['Phesama Village', 'Zubza Corridor'],
    exposure_level: 'HIGH',
    population: 99000,
    risk_score: 68,
    severity: 'HIGH',
    color: '#f97316',
    explanation: 'Risk is elevated due to heavy rainfall (102 mm) on known unstable geological faults.',
    factors: [
      { name: 'Heavy Rainfall', contribution: 17.0, level: 'HIGH', value: '102 mm' },
      { name: 'Soil Moisture Saturation', contribution: 20.5, level: 'HIGH', value: '74%' },
      { name: 'Terrain Slope Angle', contribution: 14.4, level: 'HIGH', value: '36°' },
      { name: 'Historical Landslide Activity', contribution: 9.0, level: 'HIGH', value: 'High' },
      { name: 'Satellite Change Detection', contribution: 2.0, level: 'LOW', value: '40% anomaly' },
      { name: 'IoT Sensor Anomaly', contribution: 3.0, level: 'HIGH', value: 'Vibration Detected' },
      { name: 'Field Hazard Reports', contribution: 0.0, level: 'LOW', value: '0 reports' }
    ]
  },
  {
    id: 'gangtok',
    name: 'Gangtok',
    state: 'Sikkim',
    lat: 27.3389,
    lng: 88.6065,
    rainfall_mm: 30,
    soil_moisture_pct: 38,
    slope_deg: 35,
    historical_activity: 'moderate',
    affected_roads: ['NH-10 Gangtok-Siliguri Highway'],
    affected_villages: ['Deorali Ward'],
    exposure_level: 'MEDIUM',
    population: 100000,
    risk_score: 31,
    severity: 'MODERATE',
    color: '#eab308',
    explanation: 'Risk is currently moderate with clear weather patterns.',
    factors: [
      { name: 'Heavy Rainfall', contribution: 5.0, level: 'LOW', value: '30 mm' },
      { name: 'Soil Moisture Saturation', contribution: 10.5, level: 'LOW', value: '38%' },
      { name: 'Terrain Slope Angle', contribution: 14.0, level: 'HIGH', value: '35°' },
      { name: 'Historical Landslide Activity', contribution: 5.5, level: 'MODERATE', value: 'Moderate' },
      { name: 'Satellite Change Detection', contribution: 0.5, level: 'LOW', value: '10% anomaly' },
      { name: 'IoT Sensor Anomaly', contribution: 0.5, level: 'LOW', value: 'Normal' },
      { name: 'Field Hazard Reports', contribution: 0.0, level: 'LOW', value: '0 reports' }
    ]
  },
  {
    id: 'imphal',
    name: 'Imphal',
    state: 'Manipur',
    lat: 24.8170,
    lng: 93.9368,
    rainfall_mm: 72,
    soil_moisture_pct: 60,
    slope_deg: 24,
    historical_activity: 'moderate',
    affected_roads: ['NH-37 Imphal-Silchar Highway'],
    affected_villages: ['Noney Hill Sector'],
    exposure_level: 'MEDIUM',
    population: 268000,
    risk_score: 46,
    severity: 'MODERATE',
    color: '#eab308',
    explanation: 'Moderate risk with moderate precipitation on hillside transport arteries.',
    factors: [
      { name: 'Heavy Rainfall', contribution: 12.0, level: 'MODERATE', value: '72 mm' },
      { name: 'Soil Moisture Saturation', contribution: 16.6, level: 'MODERATE', value: '60%' },
      { name: 'Terrain Slope Angle', contribution: 9.6, level: 'LOW', value: '24°' },
      { name: 'Historical Landslide Activity', contribution: 5.5, level: 'MODERATE', value: 'Moderate' },
      { name: 'Satellite Change Detection', contribution: 1.0, level: 'LOW', value: '20% anomaly' },
      { name: 'IoT Sensor Anomaly', contribution: 0.5, level: 'LOW', value: 'Normal' },
      { name: 'Field Hazard Reports', contribution: 0.0, level: 'LOW', value: '0 reports' }
    ]
  },
  {
    id: 'guwahati',
    name: 'Guwahati',
    state: 'Assam',
    lat: 26.1445,
    lng: 91.7362,
    rainfall_mm: 25,
    soil_moisture_pct: 32,
    slope_deg: 18,
    historical_activity: 'low',
    affected_roads: ['Kamakhya Hill Access Road'],
    affected_villages: ['Narakasur Hill Colony'],
    exposure_level: 'LOW',
    population: 957000,
    risk_score: 19,
    severity: 'LOW',
    color: '#22c55e',
    explanation: 'Low landslide threat under present dry weather and low slope angles.',
    factors: [
      { name: 'Heavy Rainfall', contribution: 4.1, level: 'LOW', value: '25 mm' },
      { name: 'Soil Moisture Saturation', contribution: 8.8, level: 'LOW', value: '32%' },
      { name: 'Terrain Slope Angle', contribution: 7.2, level: 'LOW', value: '18°' },
      { name: 'Historical Landslide Activity', contribution: 2.0, level: 'LOW', value: 'Low' },
      { name: 'Satellite Change Detection', contribution: 0.5, level: 'LOW', value: '10% anomaly' },
      { name: 'IoT Sensor Anomaly', contribution: 0.5, level: 'LOW', value: 'Normal' },
      { name: 'Field Hazard Reports', contribution: 0.0, level: 'LOW', value: '0 reports' }
    ]
  }
];

export function recalculateLocationRisk(
  loc: LocationRiskData,
  newRainfall?: number,
  newMoisture?: number,
  fieldReportsCount?: number
): LocationRiskData {
  const rainfall = newRainfall !== undefined ? newRainfall : loc.rainfall_mm;
  const moisture = newMoisture !== undefined ? newMoisture : loc.soil_moisture_pct;
  const reportsCount = fieldReportsCount !== undefined ? fieldReportsCount : 0;

  const rScore = Math.min(100, (rainfall / 180.0) * 100);
  const mScore = Math.min(100, (moisture / 90.0) * 100);
  const sScore = Math.min(100, (loc.slope_deg / 50.0) * 100);
  const hScore = loc.historical_activity === 'high' ? 90 : loc.historical_activity === 'moderate' ? 55 : 20;
  const fScore = Math.min(100, reportsCount * 25);

  const weighted = rScore * 0.30 + mScore * 0.25 + sScore * 0.20 + hScore * 0.10 + 20 * 0.05 + 10 * 0.05 + fScore * 0.05;
  const risk_score = Math.round(Math.min(100, Math.max(0, weighted)));

  let severity: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL' = 'LOW';
  let color = '#22c55e';
  if (risk_score >= 75) {
    severity = 'CRITICAL';
    color = '#ef4444';
  } else if (risk_score >= 50) {
    severity = 'HIGH';
    color = '#f97316';
  } else if (risk_score >= 25) {
    severity = 'MODERATE';
    color = '#eab308';
  }

  const reasons: string[] = [];
  if (rainfall > 70) reasons.push(`intense rainfall (${rainfall} mm)`);
  if (moisture > 65) reasons.push(`high soil moisture saturation (${moisture}%)`);
  if (loc.slope_deg > 30) reasons.push(`steep mountain terrain (${loc.slope_deg}°)`);
  if (loc.historical_activity === 'high') reasons.push('known history of slope instability');
  if (reportsCount > 0) reasons.push(`${reportsCount} recent ground field report(s)`);

  const explanation = reasons.length > 0
    ? `Risk is ${severity.toLowerCase()} because ${reasons.join(' and ')}.`
    : 'Environmental factors remain within stable baseline limits with low immediate landslide threat.';

  return {
    ...loc,
    rainfall_mm: rainfall,
    soil_moisture_pct: moisture,
    risk_score,
    severity,
    color,
    explanation,
    factors: [
      { name: 'Heavy Rainfall', contribution: Number((rScore * 0.30).toFixed(1)), level: rScore > 65 ? 'HIGH' : rScore > 35 ? 'MODERATE' : 'LOW', value: `${rainfall} mm` },
      { name: 'Soil Moisture Saturation', contribution: Number((mScore * 0.25).toFixed(1)), level: mScore > 65 ? 'HIGH' : mScore > 35 ? 'MODERATE' : 'LOW', value: `${moisture}%` },
      { name: 'Terrain Slope Angle', contribution: Number((sScore * 0.20).toFixed(1)), level: sScore > 60 ? 'HIGH' : sScore > 35 ? 'MODERATE' : 'LOW', value: `${loc.slope_deg}°` },
      { name: 'Historical Landslide Activity', contribution: Number((hScore * 0.10).toFixed(1)), level: loc.historical_activity.toUpperCase(), value: loc.historical_activity },
      { name: 'Satellite Change Detection', contribution: 1.0, level: 'LOW', value: '20% anomaly' },
      { name: 'IoT Sensor Anomaly', contribution: 0.5, level: 'LOW', value: 'Normal' },
      { name: 'Field Hazard Reports', contribution: Number((fScore * 0.05).toFixed(1)), level: reportsCount > 1 ? 'HIGH' : 'LOW', value: `${reportsCount} report(s)` }
    ]
  };
}
