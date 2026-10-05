export type RiskSeverity = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export interface RiskFactor {
  name: string;
  contribution: number;
  level: string;
  value: string;
}

export interface LocationRiskData {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
  rainfall_mm: number;
  soil_moisture_pct: number;
  slope_deg: number;
  historical_activity: string;
  affected_roads: string[];
  affected_villages: string[];
  exposure_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  population: number;
  risk_score: number;
  severity: RiskSeverity;
  color: string;
  explanation: string;
  factors: RiskFactor[];
}

export interface AlertItem {
  id: string;
  location_id: string;
  location_name: string;
  state: string;
  severity: RiskSeverity;
  risk_score: number;
  reason: string;
  affected_roads: string[];
  affected_villages: string[];
  recommended_action: string;
  timestamp: string;
  status: 'ACTIVE' | 'MONITORING' | 'RESOLVED';
}

export interface FieldReport {
  id: string;
  location_id: string;
  location_name: string;
  hazard_type: string;
  description: string;
  lat: number;
  lng: number;
  timestamp: string;
  status: 'Synced' | 'Pending Sync';
  image_url?: string | null;
}

export interface SimulationStep {
  stepIndex: number;
  title: string;
  rainfall: number;
  moisture: number;
  riskScore: number;
  severity: RiskSeverity;
  alertGenerated: boolean;
  message: string;
}
