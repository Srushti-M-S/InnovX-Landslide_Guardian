"""
AI Risk Engine for NER Landslide Guardian
Formula:
Risk Score = (
    Rainfall_contrib * 0.30 +
    SoilMoisture_contrib * 0.25 +
    Slope_contrib * 0.20 +
    HistoricalActivity_contrib * 0.10 +
    SatelliteChange_contrib * 0.05 +
    SensorAnomaly_contrib * 0.05 +
    FieldEvidence_contrib * 0.05
) normalized to 0-100
"""

def calculate_landslide_risk(
    rainfall_mm: float,
    soil_moisture_pct: float,
    slope_deg: float,
    historical_activity: str, # 'low', 'moderate', 'high'
    satellite_change_index: float = 0.2, # 0.0 to 1.0
    sensor_anomaly_score: float = 0.1,  # 0.0 to 1.0
    field_evidence_count: int = 0
) -> dict:
    # 1. Normalize Rainfall (0-200mm -> 0-100 score)
    rainfall_score = min(100.0, (rainfall_mm / 180.0) * 100.0)
    
    # 2. Normalize Soil Moisture (0-100% -> 0-100 score)
    # Critical saturation starts around 65%
    moisture_score = min(100.0, (soil_moisture_pct / 90.0) * 100.0)
    
    # 3. Normalize Slope Angle (0-60 deg -> 0-100 score)
    # Steep slopes (>30 deg) present significant risk
    slope_score = min(100.0, (slope_deg / 50.0) * 100.0)
    
    # 4. Historical Activity Map
    hist_map = {'low': 20.0, 'moderate': 55.0, 'high': 90.0}
    hist_score = hist_map.get(historical_activity.lower(), 40.0)
    
    # 5. Satellite Change Score (0-1 -> 0-100)
    sat_score = min(100.0, satellite_change_index * 100.0)
    
    # 6. Sensor Anomaly (0-1 -> 0-100)
    sensor_score = min(100.0, sensor_anomaly_score * 100.0)
    
    # 7. Field Evidence Score (0-5 reports -> 0-100)
    field_score = min(100.0, field_evidence_count * 25.0)
    
    # Weighted Weighted Calculation
    weighted_score = (
        rainfall_score * 0.30 +
        moisture_score * 0.25 +
        slope_score * 0.20 +
        hist_score * 0.10 +
        sat_score * 0.05 +
        sensor_score * 0.05 +
        field_score * 0.05
    )
    
    risk_score = round(min(100.0, max(0.0, weighted_score)))
    
    # Severity classification
    if risk_score >= 75:
        severity = "CRITICAL"
        color = "#ef4444" # red
    elif risk_score >= 50:
        severity = "HIGH"
        color = "#f97316" # orange
    elif risk_score >= 25:
        severity = "MODERATE"
        color = "#eab308" # yellow
    else:
        severity = "LOW"
        color = "#22c55e" # green
        
    # Explainability breakdown
    factors = [
        {"name": "Heavy Rainfall", "contribution": round(rainfall_score * 0.30, 1), "level": "HIGH" if rainfall_score > 65 else ("MODERATE" if rainfall_score > 35 else "LOW"), "value": f"{rainfall_mm} mm"},
        {"name": "Soil Moisture Saturation", "contribution": round(moisture_score * 0.25, 1), "level": "HIGH" if moisture_score > 65 else ("MODERATE" if moisture_score > 35 else "LOW"), "value": f"{soil_moisture_pct}%"},
        {"name": "Terrain Slope Angle", "contribution": round(slope_score * 0.20, 1), "level": "HIGH" if slope_score > 60 else ("MODERATE" if slope_score > 35 else "LOW"), "value": f"{slope_deg}°"},
        {"name": "Historical Landslide Activity", "contribution": round(hist_score * 0.10, 1), "level": historical_activity.upper(), "value": historical_activity.capitalize()},
        {"name": "Satellite Change Detection", "contribution": round(sat_score * 0.05, 1), "level": "MODERATE" if sat_score > 40 else "LOW", "value": f"{round(satellite_change_index * 100)}% anomaly"},
        {"name": "IoT Sensor Anomaly", "contribution": round(sensor_score * 0.05, 1), "level": "HIGH" if sensor_score > 60 else "LOW", "value": "Normal" if sensor_score < 40 else "Vibration Detected"},
        {"name": "Field Hazard Reports", "contribution": round(field_score * 0.05, 1), "level": "HIGH" if field_evidence_count > 1 else "LOW", "value": f"{field_evidence_count} report(s)"}
    ]
    
    # Generate human readable explanation
    reasons = []
    if rainfall_score > 60:
        reasons.append(f"intense rainfall ({rainfall_mm} mm)")
    if moisture_score > 60:
        reasons.append(f"high soil moisture saturation ({soil_moisture_pct}%)")
    if slope_score > 55:
        reasons.append(f"steep mountain terrain ({slope_deg}°)")
    if hist_score > 50:
        reasons.append("known history of slope instability")
    if field_evidence_count > 0:
        reasons.append(f"{field_evidence_count} recent ground field report(s)")
        
    if not reasons:
        explanation = "Environmental factors remain within stable baseline limits with low immediate landslide threat."
    else:
        explanation = f"Risk is {severity.lower()} because " + ", ".join(reasons[:-1]) + (f" and {reasons[-1]}" if len(reasons) > 1 else reasons[0]) + "."
        
    return {
        "risk_score": risk_score,
        "severity": severity,
        "color": color,
        "explanation": explanation,
        "factors": factors
    }
