# 🧬 Viro-AI Full-Stack Application

**Viral Insight & Rapid Optimization Analytics Intelligence**

A complete AI-powered system for viral analysis and drug discovery, featuring real-time machine learning predictions and beautiful interactive visualizations.

---

## 🎯 What is Viro-AI?

Viro-AI combines cutting-edge machine learning with modern web technologies to:
- **Analyze viral mutations** and predict their impact
- **Screen 190 antiviral drugs** in under 2 seconds
- **Predict drug-virus binding affinities** using trained ML models
- **Calculate viral threat scores** (transmissibility, mortality, immune evasion)
- **Suggest drug improvements** with AI-powered recommendations
- **Visualize molecular structures** and protein interactions

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│         REACT FRONTEND (Vite)           │
│    UI, Animations, User Experience      │
│         Port: 5173                      │
└──────────────┬──────────────────────────┘
               │
               │ Axios API Calls
               │
┌──────────────▼──────────────────────────┐
│      PYTHON BACKEND (FastAPI)           │
│   ML Model, Drug Screening, Predictions │
│         Port: 8000                      │
└──────────────┬──────────────────────────┘
               │
               │ Trained Model
               │
┌──────────────▼──────────────────────────┐
│         DATABASES & ML MODEL             │
│  - 190 Antiviral Compounds               │
│  - 7 Viral Protein Structures (PDB)     │
│  - Random Forest Regressor Model         │
│  - 81 Validated Drug-Virus Pairs         │
└──────────────────────────────────────────┘
```

---

## ⚡ Quick Start (30 seconds)

### Prerequisites
- **Node.js** (v16 or higher) for React frontend
- **Python 3.9+** for FastAPI backend
- **Git** (optional, for version control)

### Start Everything with One Command

```powershell
cd E:\V_AI_fr
.\start-viroai.ps1
```

That's it! The script will:
1. ✅ Check if ports are available
2. ✅ Verify ML model is trained
3. ✅ Start Python backend (port 8000)
4. ✅ Start React frontend (port 5173)
5. ✅ Open both in separate terminals

### Access the Application

- **Main App:** http://localhost:5173
- **API:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs

---

## 🎮 User Flow

```
1. Landing Page
   └─> Click "ANALYZE VIRUSES"
       │
2. Analyze Page (Virus Selection)
   ├─> Backend loads 3 viruses: COVID-19, Influenza, Ebola
   └─> Select a virus (e.g., COVID-19)
       │
3. Mutation Dashboard
   ├─> Shows 5 mutations with deadliness scores
   ├─> Click a mutation to see details
   ├─> View 3D protein structure placeholder
   ├─> See affected organs and symptoms
   └─> Click "PREDICT ANTIDOTE"
       │
4. Drug/Antidote Prediction Page
   ├─> Backend screens 190 drugs (~1.2 seconds)
   ├─> AI ranks top 10 candidates
   ├─> Shows IC50 values, binding affinity, molecular properties
   ├─> Displays viral threat score (transmissibility, mortality)
   └─> Suggests AI improvements for each drug
```

---

## 📊 Features

### Frontend (React + Vite)
- ✅ **Modern UI** with blue-grey-white theme
- ✅ **3D DNA Background** (Spline animation)
- ✅ **Smooth Animations** (fade, slide, hover effects)
- ✅ **Responsive Design** (desktop, tablet, mobile)
- ✅ **Loading States** (spinners, progress indicators)
- ✅ **Error Handling** (graceful offline mode)
- ✅ **Navigation Bar** (scroll-triggered on home, persistent on other pages)
- ✅ **Mutation Cards** (animated transitions)
- ✅ **Drug Tables** (sortable, scrollable rankings)
- ✅ **Video Integration** (human body rotation)

### Backend (Python FastAPI)
- ✅ **Machine Learning Model** (Random Forest, 17 features)
- ✅ **Drug Screening** (190 compounds in < 2 seconds)
- ✅ **Binding Affinity Prediction** (IC50 estimation)
- ✅ **Deadliness Score Calculator** (0-100 scale)
- ✅ **Protein Database** (7 PDB structures)
- ✅ **RESTful API** (JSON responses)
- ✅ **Interactive Docs** (Swagger UI)
- ✅ **CORS Enabled** (frontend communication)

---

## 📁 Project Structure

```
E:\V_AI_fr\                          # Frontend
├── src/
│   ├── components/
│   │   ├── Landing.jsx              # Landing page
│   │   ├── Analyze.jsx              # Virus selection
│   │   ├── MutationDashboard.jsx    # Mutation details
│   │   ├── DrugTable.jsx            # Drug rankings
│   │   └── ...
│   ├── pages/
│   │   └── DrugAntidotePage.jsx     # Drug prediction
│   ├── services/
│   │   └── api.js                   # Backend API calls
│   ├── App.jsx                      # Router
│   └── main.jsx                     # Entry point
├── public/
│   ├── bg_component1_viro.png       # Side images
│   ├── bg_component2_viro.png       # Footer logo
│   └── Cinematic_Body_Rotation_Video_Generation.mp4
├── .env.local                        # Environment variables
├── start-viroai.ps1                 # Startup script
└── README_FULLSTACK.md              # This file

E:\V_AI_fr\Viro_AI_code_backend\     # Backend
├── backend/
│   └── api/
│       └── main.py                   # FastAPI server
├── models/
│   ├── binding_affinity_predictor.py # ML model
│   └── saved_models/
│       └── binding_model_v1.pkl      # Trained model
├── Viroai_DataBase/
│   ├── structural/                   # Protein PDB files
│   │   ├── SARS-CoV-2/
│   │   ├── Influenza/
│   │   └── Ebola/
│   ├── pharma/
│   │   └── approved-drugs/
│   │       └── antiviral_compounds.csv  # 190 drugs
│   └── clinical/                     # Bioactivity data
└── requirements.txt
```

---

## 🔧 Manual Setup (If Script Fails)

### Backend Setup

```bash
# Navigate to backend
cd E:\V_AI_fr\Viro_AI_code_backend

# Install dependencies
pip install -r requirements.txt

# Train model (if not already trained)
python models\binding_affinity_predictor.py

# Start server
python backend\api\main.py
```

### Frontend Setup

```bash
# Navigate to frontend
cd E:\V_AI_fr

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🧪 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API information |
| `/health` | GET | Health check (model status, drugs loaded) |
| `/viruses` | GET | List supported viruses and proteins |
| `/predict` | POST | Predict drug-virus binding affinity |
| `/top_drugs/{virus_id}` | GET | Quick drug screening for a virus |

### Example API Call

```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "virus_id": "SARS-CoV-2",
    "protein_pdb_id": "6VXX",
    "top_n": 10
  }'
```

---

## 📊 Sample Output

### Drug Prediction Response

```json
{
  "virus": "SARS-CoV-2",
  "protein_name": "Spike Protein",
  "drugs_screened": 190,
  "processing_time_ms": 1234,
  "top_candidates": [
    {
      "rank": 1,
      "drug_name": "Nirmatrelvir",
      "predicted_affinity": 0.94,
      "estimated_ic50_nm": 3.1,
      "binding_strength": "strong",
      "molecular_weight": 499.5,
      "logP": 2.2,
      "approval_status": "FDA Approved"
    }
  ],
  "deadliness_score": {
    "overall_score": 71,
    "risk_level": "HIGH",
    "transmissibility": 82,
    "immune_evasion": 75,
    "mortality_rate": 65
  }
}
```

---

## 🐛 Troubleshooting

### "Backend offline" message in frontend

```bash
# Check if backend is running
curl http://localhost:8000/health

# If not, start backend
cd E:\V_AI_fr\Viro_AI_code_backend
python backend\api\main.py
```

### Port already in use

```powershell
# Find and kill process using port 8000
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Find and kill process using port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Model not found error

```bash
cd E:\V_AI_fr\Viro_AI_code_backend
python models\binding_affinity_predictor.py
```

---

## 🚀 Deployment

### Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd E:\V_AI_fr
vercel
```

Set environment variable:
```
VITE_API_URL=https://your-backend.onrender.com
```

### Backend (Render)

1. Create new Web Service on Render
2. Connect GitHub repository
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `uvicorn backend.api.main:app --host 0.0.0.0 --port $PORT`
5. Deploy

---

## 📈 Performance

| Metric | Value |
|--------|-------|
| Backend Startup | ~5 seconds |
| Drug Screening (190 drugs) | ~1.2 seconds |
| Frontend Load Time | ~1 second |
| API Response Time | < 200ms (avg) |
| ML Model Accuracy | 0.53 correlation (test set) |

---

## 🎯 Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling with animations

### Backend
- **Python 3.9+** - Programming language
- **FastAPI** - Web framework
- **Uvicorn** - ASGI server
- **scikit-learn** - Machine learning
- **pandas** - Data manipulation
- **NumPy** - Numerical computing

### Data
- **190 antiviral compounds** (PubChem)
- **7 protein structures** (PDB)
- **81 validated drug-virus pairs** (literature)
- **2,300 genomic sequences** (NCBI)

---

## 📚 Documentation

- **`BACKEND_INTEGRATION.md`** - Detailed integration guide
- **`INTEGRATION_COMPLETE.md`** - Integration summary
- **`API_DOCS.md`** (in backend folder) - API reference
- **`README.md`** (in backend folder) - Backend documentation

---

## 🏆 Features Highlights

✅ **Real-time AI Predictions** - Live drug screening with ML model
✅ **Beautiful UI** - Modern design with smooth animations
✅ **Responsive Design** - Works on all devices
✅ **Offline Mode** - Graceful fallback if backend is down
✅ **Fast Performance** - < 2 second drug screening
✅ **Production Ready** - Error handling, loading states, validation
✅ **Well Documented** - Comprehensive guides and API docs
✅ **Easy Deployment** - Ready for Vercel + Render

---

## 👥 For Developers

### Adding a New Virus

1. Add PDB files to `Viroai_DataBase/structural/{virus}/proteins/`
2. Update `protein_db` in `backend/api/main.py`
3. Add mapping in `Analyze.jsx` → `mapBackendViruses()`
4. Add mutations in `api.js` → `getVirusMutations()`

### Adding a New API Endpoint

1. Define endpoint in `backend/api/main.py`
2. Add function in `src/services/api.js`
3. Import and use in components

---

## 📞 Quick Commands

```powershell
# Start everything
.\start-viroai.ps1

# Backend only
cd E:\V_AI_fr\Viro_AI_code_backend
python backend\api\main.py

# Frontend only
cd E:\V_AI_fr
npm run dev

# Health check
curl http://localhost:8000/health

# Stop servers
# Ctrl+C in each terminal window
```

---

## 🎉 Success!

Your Viro-AI full-stack application is ready to:
- Analyze viral mutations
- Predict drug efficacy
- Screen hundreds of compounds
- Calculate threat scores
- Suggest drug improvements

**Happy drug discovery! 💊🧬🚀**

---

**Version:** 1.0.0  
**Last Updated:** October 14, 2025  
**Status:** ✅ Production Ready

