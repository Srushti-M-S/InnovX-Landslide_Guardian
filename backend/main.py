from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import time
from risk_engine import calculate_landslide_risk

app = FastAPI(
    title="NER Landslide Guardian API",
    description="AI-Based Early Warning and Landslide Risk Monitoring System in NER",
    version="1.0.0"
)

# Enable CORS for Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory mock DB for locations
locations_db = [
    {
        "id": "tawang",
        "name": "Tawang",
        "state": "Arunachal Pradesh",
        "lat": 27.5861,
        "lng": 91.8594,
        "rainfall_mm": 52,
        "soil_moisture_pct": 54,
        "slope_deg": 38,
        "historical_activity": "moderate",
        "affected_roads": ["NH-13 Tawang-Tezpur Highway", "Bhalukpong Pass"],
        "affected_villages": ["LUM LA Village"],
        "exposure_level": "HIGH",
        "population": 11200
    },
    {
        "id": "itanagar",
        "name": "Itanagar",
        "state": "Arunachal Pradesh",
        "lat": 27.0844,
        "lng": 93.6053,
        "rainfall_mm": 88,
        "soil_moisture_pct": 68,
        "slope_deg": 32,
        "historical_activity": "moderate",
        "affected_roads": ["NH-415 Itanagar Highway"],
        "affected_villages": ["Naharlagun Sector 4"],
        "exposure_level": "HIGH",
        "population": 35000
    },
    {
        "id": "aizawl",
        "name": "Aizawl",
        "state": "Mizoram",
        "lat": 23.7271,
        "lng": 92.7176,
        "rainfall_mm": 135,
        "soil_moisture_pct": 82,
        "slope_deg": 42,
        "historical_activity": "high",
        "affected_roads": ["NH-54 Aizawl Bypass", "Sairang Link Road"],
        "affected_villages": ["Laipuitlang Hill Slope", "Zemabawk East"],
        "exposure_level": "CRITICAL",
        "population": 293000
    },
    {
        "id": "shillong",
        "name": "Shillong",
        "state": "Meghalaya",
        "lat": 25.5788,
        "lng": 91.8933,
        "rainfall_mm": 45,
        "soil_moisture_pct": 48,
        "slope_deg": 26,
        "historical_activity": "low",
        "affected_roads": ["NH-6 Shillong Bypass"],
        "affected_villages": ["Upper Shillong Zone"],
        "exposure_level": "MEDIUM",
        "population": 143000
    },
    {
        "id": "kohima",
        "name": "Kohima",
        "state": "Nagaland",
        "lat": 25.6751,
        "lng": 94.1086,
        "rainfall_mm": 102,
        "soil_moisture_pct": 74,
        "slope_deg": 36,
        "historical_activity": "high",
        "affected_roads": ["NH-2 Kohima-Dimapur Highway"],
        "affected_villages": ["Phesama Village", "Zubza Corridor"],
        "exposure_level": "HIGH",
        "population": 99000
    },
    {
        "id": "gangtok",
        "name": "Gangtok",
        "state": "Sikkim",
        "lat": 27.3389,
        "lng": 88.6065,
        "rainfall_mm": 30,
        "soil_moisture_pct": 38,
        "slope_deg": 35,
        "historical_activity": "moderate",
        "affected_roads": ["NH-10 Gangtok-Siliguri Highway"],
        "affected_villages": ["Deorali Ward"],
        "exposure_level": "MEDIUM",
        "population": 100000
    },
    {
        "id": "imphal",
        "name": "Imphal",
        "state": "Manipur",
        "lat": 24.8170,
        "lng": 93.9368,
        "rainfall_mm": 72,
        "soil_moisture_pct": 60,
        "slope_deg": 24,
        "historical_activity": "moderate",
        "affected_roads": ["NH-37 Imphal-Silchar Highway"],
        "affected_villages": ["Noney Hill Sector"],
        "exposure_level": "MEDIUM",
        "population": 268000
    },
    {
        "id": "guwahati",
        "name": "Guwahati",
        "state": "Assam",
        "lat": 26.1445,
        "lng": 91.7362,
        "rainfall_mm": 25,
        "soil_moisture_pct": 32,
        "slope_deg": 18,
        "historical_activity": "low",
        "affected_roads": ["Kamakhya Hill Access Road"],
        "affected_villages": ["Narakasur Hill Colony"],
        "exposure_level": "LOW",
        "population": 957000
    }
]

# Field reports db
reports_db = [
    {
        "id": "rep-001",
        "location_id": "aizawl",
        "hazard_type": "Slope Crack",
        "description": "Visible 3-inch fissure noticed along Laipuitlang slope after morning heavy downpour.",
        "lat": 23.7310,
        "lng": 92.7210,
        "timestamp": "2026-09-30 18:30",
        "status": "Synced",
        "image_url": None
    }
]

class RiskCalcRequest(BaseModel):
    rainfall_mm: float
    soil_moisture_pct: float
    slope_deg: float
    historical_activity: str
    satellite_change_index: Optional[float] = 0.2
    sensor_anomaly_score: Optional[float] = 0.1
    field_evidence_count: Optional[int] = 0

class FieldReportCreate(BaseModel):
    location_name: str
    hazard_type: str
    description: str
    lat: float
    lng: float
    image_url: Optional[str] = None
    is_offline: Optional[bool] = False

@app.get("/api/health")
def health_check():
    return {"status": "online", "system": "NER Landslide Guardian API", "timestamp": time.time()}

@app.get("/api/locations")
def get_locations():
    results = []
    for loc in locations_db:
        # Calculate risk dynamically for each location
        field_count = sum(1 for r in reports_db if r.get("location_id") == loc["id"])
        risk_res = calculate_landslide_risk(
            rainfall_mm=loc["rainfall_mm"],
            soil_moisture_pct=loc["soil_moisture_pct"],
            slope_deg=loc["slope_deg"],
            historical_activity=loc["historical_activity"],
            field_evidence_count=field_count
        )
        combined = {**loc, **risk_res}
        results.append(combined)
    return results

@app.get("/api/locations/{location_id}")
def get_location_detail(location_id: str):
    loc = next((l for l in locations_db if l["id"] == location_id.lower()), None)
    if not loc:
        raise HTTPException(status_code=404, detail="Location not found")
    field_count = sum(1 for r in reports_db if r.get("location_id") == loc["id"])
    risk_res = calculate_landslide_risk(
        rainfall_mm=loc["rainfall_mm"],
        soil_moisture_pct=loc["soil_moisture_pct"],
        slope_deg=loc["slope_deg"],
        historical_activity=loc["historical_activity"],
        field_evidence_count=field_count
    )
    return {**loc, **risk_res}

@app.post("/api/risk/calculate")
def calculate_custom_risk(req: RiskCalcRequest):
    return calculate_landslide_risk(
        rainfall_mm=req.rainfall_mm,
        soil_moisture_pct=req.soil_moisture_pct,
        slope_deg=req.slope_deg,
        historical_activity=req.historical_activity,
        satellite_change_index=req.satellite_change_index,
        sensor_anomaly_score=req.sensor_anomaly_score,
        field_evidence_count=req.field_evidence_count
    )

@app.post("/api/reports")
def create_report(report: FieldReportCreate):
    new_rep = {
        "id": f"rep-00{len(reports_db) + 1}",
        "location_id": report.location_name.lower(),
        "hazard_type": report.hazard_type,
        "description": report.description,
        "lat": report.lat,
        "lng": report.lng,
        "timestamp": time.strftime("%Y-%m-%d %H:%M"),
        "status": "Synced" if not report.is_offline else "Pending Sync",
        "image_url": report.image_url
    }
    reports_db.append(new_rep)
    return {"message": "Report created successfully", "report": new_rep}

@app.get("/api/reports")
def get_reports():
    return reports_db
