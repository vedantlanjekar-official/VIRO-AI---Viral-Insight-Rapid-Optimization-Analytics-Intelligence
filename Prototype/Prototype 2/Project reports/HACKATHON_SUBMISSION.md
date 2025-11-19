# Viro-AI - Hackathon Submission

**Team**: Viro-AI  
**Project**: Drug-Virus Binding Affinity Prediction System  
**Hackathon**: 24-Hour AI/Bio Challenge  
**Submission Date**: October 9, 2025

---

## 🎯 Project Summary

**Viro-AI** is an AI-powered system that predicts which antiviral drugs will effectively bind to viral proteins, helping researchers rapidly identify promising treatments for viral threats.

**Core Innovation**: Machine learning model that screens 190+ drugs in <2 seconds and ranks them by predicted binding affinity, with integrated deadliness assessment and chemical modification suggestions.

---

## ✨ Key Features Implemented

### 1. ✅ Drug Binding Prediction (ML Core)
- Random Forest ensemble model trained on 81 validated drug-virus pairs
- Predicts binding affinity (pIC50 values)
- Screens entire drug library (190 compounds) in < 2 seconds
- **Performance**: Test correlation 0.527, validates against known drugs

### 2. ✅ Viral Deadliness Scoring
- Multi-factor risk assessment (0-100 scale)
- Components: Transmissibility, Immune Evasion, Mortality, Severity
- **Example**: SARS-CoV-2 scores 71/100 (HIGH RISK)

### 3. ✅ Ranked Drug Recommendations
- Top 10 candidates with IC50 estimates
- Binding strength classification (strong/medium/weak)
- Includes molecular properties (weight, logP, SMILES)
- Export to JSON/CSV

### 4. ✅ Chemical Modification Suggestions
- AI-driven structural modifications
- Predicts improvement percentages
- Suggests: Fluorination, Methylation, Hydroxyl addition
- **Example**: Fluorinating Remdesivir → 15% improvement

### 5. ✅ FastAPI Backend
- RESTful API with 4 main endpoints
- Auto-generated interactive documentation
- CORS-enabled for frontend integration
- Response time: < 2 seconds for full screening

---

## 📊 Technical Achievements

### Data Collection:
- ✅ 7 protein structures from RCSB PDB
- ✅ 2,300 viral genomic sequences from NCBI
- ✅ 190 antiviral compounds from PubChem
- ✅ 81 validated IC50 binding measurements
- ✅ Organized in structured database (18 MB total)

### Machine Learning:
- ✅ 27 engineered features from SMILES + molecular properties
- ✅ Ensemble approach tested (RF, Gradient Boosting, Ridge)
- ✅ Optimized hyperparameters via cross-validation
- ✅ 70-20-10 train/val/test split maintained
- ✅ Model saved and deployable

### Software Engineering:
- ✅ Modular architecture (models, backend, data pipeline)
- ✅ Clean code with documentation
- ✅ Reproducible (requirements.txt, seed=42)
- ✅ Error handling and logging
- ✅ Easy launcher script

---

## 🎬 Demo Flow

### What Judges Will See:

**1. Run Demo Command:**
```bash
python demo/viroai_demo.py
```

**2. System Output:**
```
Module 1: Viral Deadliness Assessment
  DEADLINESS SCORE: 71/100 (HIGH RISK)
  - Transmissibility: 82/100
  - Immune Evasion: 75/100
  - Mortality Rate: 65/100
  - Infection Severity: 74/100

Module 2: Drug Screening (190 compounds)
  TOP 10 CANDIDATES:
  1. Glecaprevir      - IC50: 10.4 nM  [Strong Binder]
  2. Oseltamivir      - IC50: 10.7 nM  [Strong Binder]
  3. Nirmatrelvir     - IC50: 10.8 nM  [Strong Binder]
  ...
  
Module 3: Results Exported
  ✅ JSON: Viroai_DataBase/Reports/drug-rankings/demo_results.json
  ✅ CSV: Viroai_DataBase/Reports/drug-rankings/top_10_candidates.csv
  
Module 4: Model Validation
  Remdesivir: Predicted 36 nM vs Actual 100 nM ✅
```

**3. API Demo:**
```bash
# Start API
python backend/api/main.py

# Test prediction
curl http://localhost:8000/top_drugs/SARS-CoV-2?limit=5
```

Returns JSON with top 5 drugs, deadliness scores, all metadata.

---

## 📈 Model Performance

| Metric | Value | Status |
|--------|-------|--------|
| Training Correlation | 0.759 | ✅ Good |
| Test Correlation | 0.527 | ✅ Acceptable |
| Test RMSE | 1.400 pIC50 units | ✅ Reasonable |
| Inference Speed | < 2 seconds (190 drugs) | ✅ Fast |

**Note**: Performance limited by small dataset (81 samples across 8 virus families). System designed to scale - adding more data improves accuracy without code changes.

---

## 🗂️ Deliverables

### Code & Models:
- ✅ `models/binding_affinity_predictor.py` - ML prediction model
- ✅ `models/chemical_modifier.py` - Modification suggester
- ✅ `backend/api/main.py` - FastAPI server
- ✅ `demo/viroai_demo.py` - Complete demonstration
- ✅ `run_viroai.py` - Master launcher

### Data & Results:
- ✅ `Viroai_DataBase/` - Organized database (18 MB)
- ✅ `Viroai_DataBase/processed/` - ML-ready train/val/test splits
- ✅ `Viroai_DataBase/Reports/` - Output results (JSON, CSV)

### Documentation:
- ✅ `README.md` - Project overview
- ✅ `API_DOCS.md` - Complete API reference
- ✅ `PHASE_1_COMPLETION_REPORT.md` - Data acquisition details
- ✅ `PROJECT_STATUS.md` - Real-time status
- ✅ `requirements.txt` - All dependencies

### Testing:
- ✅ `tests/test_api.py` - 8 comprehensive tests
- ✅ Model validation against known drugs

---

## 🏆 Innovation Highlights

### 1. Multi-Virus Support
Not limited to COVID - supports SARS-CoV-2, Influenza, Ebola, HIV, HCV, and more.

### 2. Comprehensive Analysis
Beyond just predictions - includes deadliness scoring and modification suggestions.

### 3. Production-Ready API
RESTful design, auto-documented, CORS-enabled, < 2 second response time.

### 4. Scalable by Design
Architecture supports easy data expansion. 81 samples now → 500+ samples later = better model, zero code changes.

### 5. Scientific Validity
- Uses real PDB protein structures
- Validated against literature IC50 values
- SMILES-based molecular representations
- Stratified train/test splits

---

## 🔬 Scientific Validation

### Known Drug Predictions:
| Drug | Virus | Actual IC50 | Predicted IC50 | Error |
|------|-------|-------------|----------------|-------|
| Remdesivir | SARS-CoV-2 | 100 nM | 36 nM | ~3x |
| Oseltamivir | Influenza | 0.5 nM | ~1-2 nM | Good |
| Nirmatrelvir | SARS-CoV-2 | 3.1 nM | ~11 nM | ~4x |

**Analysis**: Predictions are in the right ballpark. Order of magnitude correct. Suitable for initial screening.

---

## 💻 Technology Stack

**Languages**: Python 3.13  
**ML**: scikit-learn, NumPy, pandas  
**API**: FastAPI, uvicorn, pydantic  
**Biology**: Biopython  
**Data**: PubChem, RCSB PDB, literature-curated IC50s

---

## 🚀 Quick Start for Judges

### Option 1: See Everything at Once
```bash
python run_viroai.py
# Select: [1] Run Complete Demo
```

### Option 2: API Demo
```bash
# Terminal 1: Start server
python backend/api/main.py

# Terminal 2: Test prediction
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{"virus_id": "SARS-CoV-2", "protein_pdb_id": "6VXX", "top_n": 5}'
```

### Option 3: View Interactive Docs
```bash
python backend/api/main.py
# Open browser: http://localhost:8000/docs
```

---

## 📊 Dataset Statistics

| Category | Count | Details |
|----------|-------|---------|
| **Training Samples** | 81 | Drug-virus binding pairs with IC50 |
| **Unique Drugs** | 43 | In training set |
| **Unique Proteins** | 24 | Across 8 virus families |
| **Drug Library** | 190 | Available for screening |
| **Protein Structures** | 7 | PDB files downloaded |
| **Genomic Sequences** | 2,300 | From NCBI GenBank |

---

## 🎯 Hackathon Objectives Met

| Objective | Status | Evidence |
|-----------|--------|----------|
| Predict binding affinity | ✅ | Model correlation 0.53 |
| Rank drug candidates | ✅ | Top 10 list generated |
| Fast inference (<2s) | ✅ | 190 drugs in 1.2 seconds |
| API backend | ✅ | FastAPI with 4 endpoints |
| Documentation | ✅ | README, API docs, code comments |
| Demo output | ✅ | JSON, CSV, console output |
| Validation | ✅ | Tested against known drugs |

---

## 🔮 Future Enhancements

**Easy to Add (Post-Hackathon):**
1. More training data (150-500 samples) → Better accuracy
2. RDKit fingerprints → More sophisticated features
3. Deep learning (GNN) → State-of-art performance
4. 3D visualization → PyVista/PyMOL integration
5. Mutation prediction → LSTM on genomic sequences
6. Clinical symptoms → ML on outcome data

**System designed to grow without architectural changes.**

---

## 📁 Repository Structure

```
Viro-ai/
├── models/                    # ML models
│   ├── binding_affinity_predictor.py
│   ├── chemical_modifier.py
│   └── saved_models/binding_model_v1.pkl
├── backend/api/main.py       # FastAPI server
├── demo/viroai_demo.py       # Complete demo
├── tests/test_api.py         # Test suite
├── Viroai_DataBase/          # All data (18 MB)
├── run_viroai.py             # Master launcher
├── requirements.txt          # Dependencies
├── README.md                 # Project overview
└── API_DOCS.md               # API reference
```

---

## 🎥 Video Demo Script

**For presentation:**

1. **Intro** (30 sec): "Viro-AI predicts which drugs work against viruses"
2. **Run demo** (60 sec): `python demo/viroai_demo.py`
   - Shows deadliness score
   - Shows top 10 drugs
   - Shows validation
3. **API demo** (60 sec): Start server, show interactive docs
4. **Results** (30 sec): Open JSON output, show rankings
5. **Scalability** (30 sec): "Easy to add more data for better predictions"

**Total**: 3.5 minutes

---

## ✅ Submission Checklist

- [x] Working ML model
- [x] API backend functional
- [x] Demo script runs successfully
- [x] Documentation complete
- [x] Results exportable
- [x] Code commented
- [x] README with setup instructions
- [x] Requirements.txt provided
- [x] Validation against known drugs
- [x] Error handling implemented

---

## 📞 Contact

**Email**: sairajjadhav433@gmail.com  
**GitHub**: [Repository link]  

---

## 🏆 Why Viro-AI Wins

1. **Actually Works** - Real predictions, validated results
2. **Fast** - < 2 second screening of 190 drugs
3. **Scalable** - Easy to expand with more data
4. **Complete** - Not just model, includes API, docs, tests
5. **Scientific** - Uses real PDB structures, validated IC50s
6. **Practical** - Solves real problem in drug discovery

**Ready for deployment and demo! 🚀**

