# Viro-AI Backend Integration Guide

## 🎯 Overview

This document describes how the React frontend integrates with the Python FastAPI backend for complete full-stack functionality.

---

## 📁 Project Structure

```
E:\V_AI_fr\                          # Frontend (React + Vite)
├── src/
│   ├── services/
│   │   └── api.js                   # API service layer (Axios)
│   ├── components/
│   │   ├── Analyze.jsx              # Virus selection & analysis
│   │   ├── MutationDashboard.jsx    # Mutation details view
│   │   ├── DrugTable.jsx            # Drug rankings table
│   │   ├── MoleculeCard.jsx         # Top drug visualization
│   │   └── DescriptionCard.jsx      # Drug analysis details
│   └── pages/
│       └── DrugAntidotePage.jsx     # Drug prediction page
├── .env.local                        # Frontend environment variables
└── package.json

E:\V_AI_fr\Viro_AI_code_backend\     # Backend (Python FastAPI)
├── backend/
│   └── api/
│       └── main.py                   # FastAPI server
├── models/
│   └── binding_affinity_predictor.py # ML model
├── Viroai_DataBase/                  # Data storage
│   ├── structural/                   # Protein PDB files
│   ├── pharma/                       # Drug compounds
│   └── clinical/                     # Bioactivity data
└── requirements.txt
```

---

## 🚀 Quick Start

### 1. Install Dependencies

#### Frontend (React):
```bash
cd E:\V_AI_fr
npm install
```

#### Backend (Python):
```bash
cd E:\V_AI_fr\Viro_AI_code_backend
pip install -r requirements.txt
```

### 2. Start the Backend Server

```bash
cd E:\V_AI_fr\Viro_AI_code_backend
python backend\api\main.py
```

**Backend will start at:** `http://localhost:8000`
**API Docs:** `http://localhost:8000/docs`

### 3. Start the Frontend Server (New Terminal)

```bash
cd E:\V_AI_fr
npm run dev
```

**Frontend will start at:** `http://localhost:5173`

---

## 🔌 API Integration

### API Service Layer (`src/services/api.js`)

The frontend communicates with the backend through a centralized API service:

```javascript
import { getViruses, predictBinding, getTopDrugs } from '../services/api';
```

### Available API Functions:

#### 1. **checkHealth()**
Verifies backend is running
```javascript
const health = await checkHealth();
// Returns: { success: true, data: { status: "healthy", model_loaded: true } }
```

#### 2. **getViruses()**
Gets list of supported viruses and their proteins
```javascript
const viruses = await getViruses();
// Returns: { success: true, data: { supported_viruses: [...], proteins: {...} } }
```

#### 3. **predictBinding({ virus_id, protein_pdb_id, top_n })**
Predicts drug-virus binding affinity
```javascript
const result = await predictBinding({
  virus_id: 'SARS-CoV-2',
  protein_pdb_id: '6VXX',
  top_n: 10
});
// Returns: { success: true, data: { top_candidates: [...], deadliness_score: {...} } }
```

#### 4. **getTopDrugs(virusId, limit)**
Quick drug screening for a virus
```javascript
const drugs = await getTopDrugs('SARS-CoV-2', 10);
```

---

## 📊 Data Flow

### Landing Page → Analyze Page → Drug Prediction

```
1. User clicks "ANALYZE VIRUSES"
   ↓
2. Analyze page loads → checkHealth() → getViruses()
   ↓
3. User selects a virus (e.g., COVID-19)
   ↓
4. Mutation dashboard shows mutations for that virus
   ↓
5. User clicks "PREDICT ANTIDOTE"
   ↓
6. Drug page → predictBinding() with virus data
   ↓
7. Backend screens 190 drugs and returns top 10
   ↓
8. Results displayed in table with rankings
```

---

## 🧬 Backend Endpoints Used

| Endpoint | Method | Purpose | Frontend Usage |
|----------|--------|---------|----------------|
| `/health` | GET | Check API status | Initial connection check |
| `/viruses` | GET | List supported viruses | Populate virus selection |
| `/predict` | POST | Predict binding affinity | Drug screening |
| `/top_drugs/{virus_id}` | GET | Quick drug screening | Fallback for direct access |

---

## 🎨 Frontend Components Integration

### 1. **Analyze.jsx**
- Checks backend health on mount
- Fetches virus data from `/viruses` endpoint
- Displays connection status indicator
- Falls back to static data if backend is offline

### 2. **DrugAntidotePage.jsx**
- Receives virus data via React Router state
- Calls `/predict` endpoint with virus info
- Shows loading spinner during API call
- Displays drug rankings, deadliness score, processing time

### 3. **DrugTable.jsx**
- Accepts drug data as props
- Maps backend response to table format
- Calculates binding affinity percentages
- Shows IC50 values and binding strength

### 4. **MoleculeCard.jsx & DescriptionCard.jsx**
- Display top drug information
- Show SMILES notation, molecular weight, LogP
- Present deadliness score and viral threat level

---

## 🔧 Environment Variables

### Frontend (`.env.local`)
```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=Viro-AI
VITE_APP_VERSION=1.0.0
```

### Backend (if needed in future)
```env
HOST=0.0.0.0
PORT=8000
FRONTEND_URL=http://localhost:5173
```

---

## 🧪 Testing the Integration

### 1. Test Backend Health
```bash
curl http://localhost:8000/health
```

Expected response:
```json
{
  "status": "healthy",
  "model_loaded": true,
  "drugs_loaded": true
}
```

### 2. Test Virus List
```bash
curl http://localhost:8000/viruses
```

### 3. Test Drug Prediction
```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "virus_id": "SARS-CoV-2",
    "protein_pdb_id": "6VXX",
    "top_n": 5
  }'
```

### 4. Test Full Flow in Browser
1. Open `http://localhost:5173`
2. Click "ANALYZE VIRUSES"
3. Verify "✓ Connected to Viro-AI Backend" appears
4. Select COVID-19
5. Click any mutation
6. Click "PREDICT ANTIDOTE"
7. Verify drug rankings load from backend

---

## ⚠️ Troubleshooting

### Backend Not Connecting

**Symptom:** "⚠ Backend offline - using fallback data"

**Solutions:**
1. Ensure backend is running on port 8000
2. Check firewall settings
3. Verify `VITE_API_URL` in `.env.local`
4. Check browser console for CORS errors

### Model Not Loaded

**Symptom:** Backend returns 503 error

**Solution:**
```bash
cd E:\V_AI_fr\Viro_AI_code_backend
python models\binding_affinity_predictor.py
```
This will train and save the model to `models/saved_models/binding_model_v1.pkl`

### Port Already in Use

**Frontend (5173):**
```bash
# Kill process using port
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

**Backend (8000):**
```bash
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

---

## 🚀 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variable: `VITE_API_URL=https://your-backend-url.com`
4. Deploy

### Backend (Render / Railway)

1. Create new web service
2. Connect repository
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn backend.api.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables
6. Deploy

---

## 📈 Future Enhancements

### AlphaFold 3 Integration

To integrate AlphaFold 3 API for real protein structure prediction:

1. **Update `src/services/api.js`:**
```javascript
export const getProteinStructure = async (sequence) => {
  const response = await apiClient.post('/protein/predict', {
    sequence: sequence,
    alphafold_version: 3
  });
  return response.data;
};
```

2. **Add backend endpoint in `main.py`:**
```python
@app.post("/protein/predict")
async def predict_protein_structure(sequence: str):
    # Call AlphaFold 3 API
    # Return 3D structure data
    pass
```

3. **Update `ProteinModel.jsx`** to render 3D structures using NGL Viewer or Three.js

---

## 📚 API Response Examples

### Virus List Response
```json
{
  "supported_viruses": ["SARS-CoV-2", "Influenza", "Ebola"],
  "proteins": {
    "SARS-CoV-2": {
      "6VXX": { "name": "Spike Protein", "pdb_path": "..." },
      "7BNN": { "name": "Main Protease", "pdb_path": "..." }
    }
  }
}
```

### Drug Prediction Response
```json
{
  "request_id": "req_20251014_120000",
  "virus": "SARS-CoV-2",
  "protein_name": "Spike Protein",
  "drugs_screened": 190,
  "top_candidates": [
    {
      "rank": 1,
      "drug_name": "Nirmatrelvir",
      "predicted_affinity": 0.94,
      "estimated_ic50_nm": 3.1,
      "binding_strength": "strong",
      "molecular_weight": 499.5,
      "logP": 2.2,
      "smiles": "CC1(C2C1...)C",
      "approval_status": "FDA Approved"
    }
  ],
  "deadliness_score": {
    "overall_score": 71,
    "risk_level": "HIGH",
    "transmissibility": 82,
    "immune_evasion": 75,
    "mortality_rate": 65
  },
  "processing_time_ms": 1234
}
```

---

## ✅ Integration Checklist

- [x] API service layer created (`api.js`)
- [x] Backend health check implemented
- [x] Virus data fetching integrated
- [x] Drug prediction endpoint connected
- [x] Loading states added to all pages
- [x] Error handling for offline backend
- [x] Fallback data for offline mode
- [x] Drug rankings table updated
- [x] Molecule and description cards updated
- [x] Navigation state passing implemented
- [x] Environment variables configured

---

## 🎯 Summary

The Viro-AI frontend is now fully integrated with the Python FastAPI backend:

✅ **Seamless Communication:** API service layer handles all backend calls
✅ **Graceful Degradation:** Falls back to static data if backend is offline
✅ **Real-time Data:** Drug predictions from actual ML model
✅ **Loading States:** User feedback during API calls
✅ **Error Handling:** Comprehensive error messages and recovery

**Next Step:** Start both servers and test the complete flow!

---

**Last Updated:** October 14, 2025  
**Integration Version:** 1.0.0

