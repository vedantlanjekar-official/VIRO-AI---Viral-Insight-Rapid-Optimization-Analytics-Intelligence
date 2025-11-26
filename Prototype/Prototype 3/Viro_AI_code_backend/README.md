# Viro-AI: Drug-Virus Binding Affinity Prediction System

**24-Hour Hackathon Project**

An AI-powered system that predicts drug-virus binding affinities, ranks potential treatments, and assesses viral deadliness to accelerate antiviral drug discovery.

---

## 🎯 Project Overview

**Primary Goal**: Predict which drugs will bind effectively to viral proteins and rank them for researchers.

**Key Features**:
1. ✅ Drug binding affinity prediction (ML model)
2. ✅ Ranked drug recommendations (top 10+ candidates)
3. ✅ Viral deadliness assessment (0-100 score)
4. ✅ Fast API backend (< 2 second response)
5. ⏳ 3D molecular visualization (in progress)
6. ⏳ Chemical modification suggestions (in progress)

---

## 📊 Current Status

### ✅ Phase 1 Complete (Data Acquisition) - 100%
- 7 viral protein structures (PDB files)
- 2,300 genomic sequences
- 190 antiviral compounds with SMILES
- 81 validated drug-virus binding pairs (IC50 values)
- 70-20-10 train/val/test splits

### ✅ Phase 2 In Progress (Backend Development) - 60%
- ✅ Binding affinity prediction model trained (RF, 17 features)
- ✅ FastAPI backend with `/predict` endpoint
- ✅ Deadliness score calculator
- ✅ Demo script with full output
- ⏳ 3D visualization module
- ⏳ Database integration
- ⏳ Chemical modification suggester

### ⏳ Phase 3 Pending (Integration & Testing)
- API testing suite
- Model validation
- Frontend hand-off documentation

---

## 🚀 Quick Start

### Installation
```bash
# Install dependencies
pip install -r requirements.txt

# Or install individually:
pip install pandas numpy scikit-learn
pip install fastapi uvicorn
pip install biopython
```

### Run Demo
```bash
python demo/viroai_demo.py
```

**Output shows:**
- Viral deadliness score (71/100 for SARS-CoV-2)
- Top 10 drug candidates ranked
- Predicted IC50 values
- Validation against known drugs

### Start API Server
```bash
python backend/api/main.py
```

Then visit: `http://localhost:8000/docs` for interactive API documentation.

---

## 📁 Project Structure

```
Viro-ai code/
├── Viroai_DataBase/           # All data storage
│   ├── structural/            # Protein PDB files (7 files)
│   ├── genomic/               # Viral sequences (2,300 sequences)
│   ├── pharma/                # Drug compounds (190 drugs)
│   ├── clinical/              # Bioactivity data (83 pairs)
│   ├── processed/             # ML-ready datasets (train/val/test)
│   └── Reports/               # Output results (JSON, CSV)
│
├── models/                    # ML models
│   ├── binding_affinity_predictor.py  # Main prediction model
│   └── saved_models/          # Trained model weights
│
├── backend/                   # API backend
│   ├── api/main.py           # FastAPI server
│   └── database/             # Database modules (pending)
│
├── demo/                      # Demo scripts
│   └── viroai_demo.py        # Complete system demo
│
├── Documents/                 # Project documentation
├── requirements.txt           # Dependencies
├── API_DOCS.md               # API documentation
└── README.md                  # This file
```

---

## 📊 Model Performance

**Training Results:**
- Training samples: 51
- Validation samples: 13
- Test samples: 17

**Metrics:**
- Training correlation: 0.770 ✅
- Validation correlation: 0.206
- Test correlation: 0.383

**Note**: Performance is limited by small dataset (81 samples). Suitable for hackathon proof-of-concept.

---

## 🔬 Supported Viruses

| Virus | Proteins Available | Drug Data |
|-------|-------------------|-----------|
| **SARS-CoV-2** | 3 (Spike, RBD, Mpro) | 19 validated pairs |
| **Influenza** | 2 (HA, NA) | 11 validated pairs |
| **Ebola** | 2 (GP, GP Complex) | 5 validated pairs |
| **HIV-1** | (reference data) | 25 validated pairs |
| **HCV** | (reference data) | 8 validated pairs |

---

## 🎯 Example Usage

### Python API Client

```python
import requests

# Predict for SARS-CoV-2
response = requests.post("http://localhost:8000/predict", json={
    "virus_id": "SARS-CoV-2",
    "protein_pdb_id": "7BNN",  # Main Protease
    "top_n": 5
})

data = response.json()

print(f"Virus: {data['virus']}")
print(f"Deadliness Score: {data['deadliness_score']['overall_score']}/100")
print(f"Risk Level: {data['deadliness_score']['risk_level']}")

print("\nTop 5 Drugs:")
for drug in data['top_candidates']:
    print(f"  {drug['rank']}. {drug['drug_name']} - IC50: {drug['estimated_ic50_nm']:.1f} nM")
```

### Output:
```
Virus: SARS-CoV-2
Deadliness Score: 71/100
Risk Level: HIGH

Top 5 Drugs:
  1. Rilpivirine - IC50: 1.3 nM
  2. Glecaprevir - IC50: 2.9 nM
  3. Oseltamivir - IC50: 3.1 nM
  4. Simeprevir - IC50: 3.4 nM
  5. Daclatasvir - IC50: 3.4 nM
```

---

## 🧪 Data Sources

- **Protein Structures**: RCSB Protein Data Bank
- **Drug Compounds**: PubChem
- **Binding Data**: Literature-validated IC50 values
- **Genomic Sequences**: NCBI GenBank

---

## 🏆 Hackathon Deliverables

### Completed:
- ✅ Clean dataset (81 samples, 190 drugs)
- ✅ Trained ML model (Random Forest)
- ✅ FastAPI backend with `/predict` endpoint
- ✅ API documentation
- ✅ Demo script with outputs
- ✅ JSON/CSV export functionality

### In Progress:
- ⏳ 3D molecular visualization
- ⏳ Chemical modification suggestions
- ⏳ Comprehensive testing suite

---

## 🔧 Technical Stack

- **Language**: Python 3.13
- **ML**: scikit-learn, NumPy, pandas
- **API**: FastAPI, uvicorn
- **Biology**: Biopython
- **Chemistry**: SMILES-based features (RDKit-free for compatibility)

---

## 📈 Future Improvements

For production deployment:
1. Train on larger dataset (500+ samples)
2. Add RDKit molecular fingerprints (when Python 3.13 support available)
3. Implement deep learning model (GNN or Transformer)
4. Add mutation prediction module
5. Integrate molecular dynamics simulation
6. Clinical symptom prediction
7. Real-time ChEMBL API integration

---

## 📝 License

Research and educational purposes only.  
Not for clinical decision-making.

---

## 👥 Team

Viro-AI - 24-Hour Hackathon Project  
**Contact**: sairajjadhav433@gmail.com

---

## 🙏 Acknowledgments

Data sources:
- RCSB Protein Data Bank
- PubChem (NIH)
- Published literature for IC50 validation values

---

**Last Updated**: October 9, 2025

