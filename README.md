# InnovX Landslide Guardian 🛡️⛰️
> **AI-Based Early Warning and Landslide Risk Monitoring System for the North Eastern Region (NER)**  

---

## 📌 Project Overview

**InnovX Landslide Guardian** is an AI-powered early warning and disaster risk monitoring prototype specifically engineered to protect vulnerable mountain communities, critical national highway corridors (such as NH-13, NH-54, NH-2, NH-10), and strategic infrastructure across the 8 North Eastern States of India (Arunachal Pradesh, Mizoram, Nagaland, Sikkim, Meghalaya, Manipur, Assam, and Tripura).

By synthesizing multi-source environmental telemetry—including rainfall intensity, soil moisture saturation, slope gradient, historical landslide frequency, satellite SAR anomaly data, IoT vibration sensors, and real-time ground hazard reports—**InnovX Landslide Guardian** computes a transparent, explainable **AI Risk Score ($0-100$)** and dynamically prioritizes response allocation based on exposure metrics.

---

## ✨ Key Features

- 🗺️ **Interactive GIS Hotspot Map**: Real-time Leaflet GIS mapping featuring color-coded severity markers (**LOW**, **MODERATE**, **HIGH**, **CRITICAL**), custom location popups, and polyline highway disruption highlights across key NER hubs (Tawang, Aizawl, Kohima, Itanagar, Shillong, Gangtok, Imphal, Guwahati).
- 🧠 **Transparent Explainable AI Risk Engine**: Multi-factor weighted mathematical risk scoring model:
  $$\text{Risk Score} = \text{Rainfall}(30\%) + \text{Soil Moisture}(25\%) + \text{Slope}(20\%) + \text{History}(10\%) + \text{Sat/Sens/Field}(15\%)$$
  Includes natural language factor explanations detailing *"WHY IS THIS AREA AT RISK?"*.
- 🎬 **One-Click Live SIH Demo Simulation**: Pre-configured real-time scenario for **Tawang, Arunachal Pradesh** demonstrating dynamic rainfall spikes ($52 \rightarrow 142\text{ mm}$), soil saturation escalation ($54\% \rightarrow 81\%$), risk score surge ($42 \rightarrow 82$ **CRITICAL**), automated emergency alert generation, and highway closure highlights.
- 🎯 **Response Prioritization Matrix**: Calculates $\text{Response Priority} = \text{Risk Score} \times \text{Exposure Level}$ evaluating population density, critical road networks, and vulnerable settlements to assist NDRF & SDMA resource allocation.
- 📱 **Mobile Hazard Reporting & Offline Sync**: Field responder submission form with hazard tagging (Landslide, Slope Crack, Rockfall, Blocked Road), GPS geolocation, photo attachment UI, offline local queuing, and 1-click **SYNC NOW** map integration.
- 📊 **Real-time Analytics Dashboard**: Disaster command center interface featuring 7-day regional risk trends, monsoon precipitation bar charts, and soil moisture telemetry powered by Recharts.
- 🏛️ **System Architecture & Data Registry**: Presentation views illustrating data feed integrity (LIVE, SIMULATED, STATIC) and end-to-end data processing workflow for SIH judges.

---

## 🔄 Core Operational Workflow Pipeline

```
  [ Environmental Telemetry ]  (Rainfall, Soil Saturation, Slope, IoT Sensors)
               │
               ▼
   [ AI Risk Calculation Engine ]  (Multi-Factor Weighted Formula)
               │
               ▼
      [ Explainable Risk Score ]  (0–100 Scale & Severity Classification)
               │
               ▼
       [ Interactive GIS Map ]  (Hotspots & Disrupted Highway Overlays)
               │
               ▼
     [ Early Warning Dispatch ]  (Automated Protocol Alerts)
               │
               ▼
  [ Response Priority Matrix ]  (Risk × Exposure Ranking Table)
               │
               ▼
    [ Field Hazard Reporting ]  (Mobile Reporting & Offline Sync)
```

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Lucide React Icons
- **Mapping & GIS**: Leaflet, React-Leaflet, Esri World Dark Gray Base Tiles
- **Data Visualization**: Recharts (Area, Bar, Line charts)
- **Backend & AI Engine (Optional API)**: Python 3, FastAPI, Pydantic, Uvicorn (OpenAPI / Swagger UI)
- **Styling**: Modern Disaster Management Command Center UI (Dark Theme & Glassmorphism)

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes bundled with Node.js)

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR-USERNAME/InnovX-Landslide_Guardian.git
cd InnovX-Landslide_Guardian/frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```

Open your browser and visit: **`http://localhost:5173`**

---


Built for Disaster Risk Reduction & Early Warning in the North Eastern Region of India.
