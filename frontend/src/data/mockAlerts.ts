import { AlertItem } from '../types';

export const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'ALT-1001',
    location_id: 'aizawl',
    location_name: 'Aizawl',
    state: 'Mizoram',
    severity: 'CRITICAL',
    risk_score: 78,
    reason: 'Heavy rainfall (135 mm) + high soil moisture (82%) on steep 42° slope near Laipuitlang',
    affected_roads: ['NH-54 Aizawl Bypass', 'Sairang Link Road'],
    affected_villages: ['Laipuitlang Hill Slope', 'Zemabawk East'],
    recommended_action: 'Deploy NDMA emergency monitoring, restrict vehicle transit on NH-54 bypass, issue localized village evacuation warning.',
    timestamp: '2026-10-01 15:45',
    status: 'ACTIVE'
  },
  {
    id: 'ALT-1002',
    location_id: 'kohima',
    location_name: 'Kohima',
    state: 'Nagaland',
    severity: 'HIGH',
    risk_score: 68,
    reason: 'Continuous downpour (102 mm) saturating weak geological strata along Phesama bypass',
    affected_roads: ['NH-2 Kohima-Dimapur Highway'],
    affected_villages: ['Phesama Village'],
    recommended_action: 'Station heavy excavators at Phesama corridor, send SMS alert to highway transport operators.',
    timestamp: '2026-10-01 14:20',
    status: 'ACTIVE'
  },
  {
    id: 'ALT-1003',
    location_id: 'itanagar',
    location_name: 'Itanagar',
    state: 'Arunachal Pradesh',
    severity: 'HIGH',
    risk_score: 58,
    reason: 'Soil moisture saturation reached 68% in hill sector 4',
    affected_roads: ['NH-415 Itanagar Highway'],
    affected_villages: ['Naharlagun Sector 4'],
    recommended_action: 'Inspect hillside drainage channels and monitor piezometer sensor telemetry.',
    timestamp: '2026-10-01 12:10',
    status: 'MONITORING'
  }
];
