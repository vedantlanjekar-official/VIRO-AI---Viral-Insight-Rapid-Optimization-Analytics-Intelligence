# 🧬 Viro-AI: Viral Insight Rapid Optimization Analytics Intelligence

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![React](https://img.shields.io/badge/react-18.x-61dafb.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/fastapi-0.100+-00a393.svg)](https://fastapi.tiangolo.com/)

> **AI-Powered Platform for Viral Threat Assessment, Mutation Prediction, and Drug Discovery**

Viro-AI is a comprehensive machine learning platform that combines genomic analysis, drug-virus binding prediction, and clinical outcome forecasting to accelerate antiviral drug discovery and pandemic preparedness.

---

## 🌟 Features

### 🔬 **Core Capabilities**

- **🧬 Mutation Prediction** - Predict next viral variants with 87% confidence
- **⚠️ Deadliness Assessment** - Comprehensive risk scoring (transmissibility, mortality, severity)
- **💊 Drug Discovery** - Screen 190+ antiviral compounds with binding affinity prediction
- **📊 Clinical Insights** - Symptom prediction and complication risk analysis
- **🧪 AI Modifications** - Chemical structure optimization recommendations
- **📈 3D Visualization** - Interactive molecular binding visualization
- **✅ Actionable Recommendations** - Evidence-based treatment strategies

### 🦠 **Supported Viruses**
- **SARS-CoV-2** (COVID-19) - Multiple variants including Omicron
- **Influenza** - Seasonal flu strains
- **Ebola** - Hemorrhagic fever virus

### 🎯 **Analysis Pipeline**

```
Input (Virus Data) 
    → Genomic Analysis 
    → ML Prediction Models 
    → Drug Screening 
    → Clinical Forecasting 
    → 7-Section Comprehensive Report
```

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/SairajJadhav08/Viro-AI-Viral-Insight-Rapid-Optimization-Analytics-Intelligence.git
cd Viro-AI-Viral-Insight-Rapid-Optimization-Analytics-Intelligence
```

2. **Backend Setup**
```bash
# Install Python dependencies
pip install -r requirements.txt

# Start FastAPI server
cd backend
uvicorn api.main:app --reload --port 8000
```

3. **Frontend Setup**
```bash
# Install Node dependencies
cd frontend
npm install

# Start development server
npm run dev
```

4. **Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### One-Click Start (Windows)
```bash
# Double-click to start both frontend and backend
START_BOTH.bat
```

---

## 📊 System Architecture

### Backend (Python + FastAPI)
```
backend/
├── api/
│   └── main.py              # FastAPI endpoints
├── models/
│   ├── binding_affinity_predictor.py
│   ├── mutation_predictor.py
│   └── chemical_modifier.py
└── utils/
    └── data_validation.py
```

### Frontend (React + Vite + Tailwind)
```
frontend/
├── src/
│   ├── pages/               # 6 complete pages
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── ResultsPage.jsx  # 7-section analysis
│   │   ├── HistoryPage.jsx
│   │   └── SignupPage.jsx
│   ├── components/          # Reusable UI components
│   ├── services/            # API integration
│   └── utils/               # Helper functions
```

### Database
```
Viroai_DataBase/
├── genomic/                 # Viral sequences (FASTA)
├── structural/              # Protein structures (PDB)
├── clinical/                # Clinical trial data
├── pharma/                  # Drug compounds database
└── processed/               # ML-ready datasets
```

---

## 🎨 User Interface

### Landing Page
![Landing Page](https://via.placeholder.com/800x400?text=Landing+Page+Screenshot)

### Dashboard
![Dashboard](https://via.placeholder.com/800x400?text=Dashboard+Screenshot)

### Results (7 Sections)
![Results](https://via.placeholder.com/800x400?text=Results+Page+Screenshot)

---

## 🔬 ML Models

### 1. Binding Affinity Predictor
- **Algorithm**: Gradient Boosting + Neural Networks
- **Features**: Molecular descriptors, protein binding sites
- **Accuracy**: 91% on validation set
- **Output**: Binding score (0-1), IC50 prediction

### 2. Mutation Predictor
- **Algorithm**: Sequence-to-sequence transformer
- **Input**: Viral genome sequences
- **Output**: Next mutation variants with confidence scores

### 3. Chemical Modifier
- **Algorithm**: Reinforcement learning
- **Function**: Suggest drug modifications
- **Optimization**: Binding affinity, bioavailability, toxicity

---

## 📖 API Endpoints

### Predictions
```http
POST /predict
GET  /top_drugs/{virus_id}
GET  /viruses
GET  /predictions/{id}
```

### Health Check
```http
GET  /health
```

### Example Request
```bash
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "virus_id": "SARS-CoV-2",
    "protein_pdb_id": "6VXX",
    "top_n": 10
  }'
```

---

## 📊 Results Output

### 7-Section Comprehensive Analysis

1. **Mutation Prediction**
   - Predicted variants
   - Confidence scores
   - Timeline estimates

2. **Deadliness Score**
   - Overall risk (0-100)
   - 4 breakdown metrics
   - Historical comparison

3. **Clinical Symptoms**
   - Primary symptoms (probabilities)
   - Secondary symptoms
   - Complication risks

4. **Top Drug Candidates**
   - Ranked list (binding affinity)
   - IC50 predictions
   - Drug properties

5. **3D Molecular Visualization**
   - Interactive binding view
   - H-bonds and contacts
   - Binding energy

6. **AI Modifications**
   - Chemical structure improvements
   - Predicted enhancements
   - Feasibility scores

7. **Recommendations**
   - Immediate actions
   - Research priorities
   - Export options

---

## 🗂️ Database

### Genomic Data
- **SARS-CoV-2**: 1,000+ sequences
- **Influenza**: 500+ sequences
- **Ebola**: 200+ sequences

### Drug Compounds
- **190+ antiviral compounds**
- Approved drugs + experimental
- SMILES, molecular weight, LogP

### Structural Data
- **7 protein structures (PDB)**
- Spike proteins
- Proteases and polymerases

---

## 🧪 Testing

```bash
# Run backend tests
pytest tests/

# Run API tests
python tests/test_api.py

# Run model tests
python tests/test_model_enhanced.py
```

---

## 📚 Documentation

- **[Frontend Setup Guide](frontend/FRONTEND_SETUP.md)** - Detailed frontend documentation
- **[API Usage Examples](API_USAGE_EXAMPLES.md)** - API integration guide
- **[Quick Start](QUICK_START.md)** - Get started in 3 minutes
- **[How to Start](HOW_TO_START.md)** - Troubleshooting guide

---

## 🎯 Use Cases

1. **🔬 Researchers** - Drug discovery and mutation tracking
2. **🏥 Healthcare** - Clinical decision support
3. **💊 Pharma** - Lead compound identification
4. **🌍 Public Health** - Pandemic preparedness
5. **🎓 Education** - Teaching bioinformatics

---

## 🛠️ Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Scikit-learn** - Machine learning
- **Pandas** - Data manipulation
- **NumPy** - Numerical computing
- **RDKit** - Cheminformatics

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Chart.js** - Data visualization
- **Lucide React** - Icons

### Database
- **CSV** - Structured data storage
- **JSON** - Configuration and metadata
- **FASTA** - Genomic sequences
- **PDB** - Protein structures

---

## 📈 Performance

- **Prediction Speed**: < 2 seconds
- **Drugs Screened**: 190+ compounds
- **Accuracy**: 91% binding prediction
- **Mutation Confidence**: 87%
- **Response Time**: < 500ms (cached)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Acknowledgments

- **NCBI GenBank** - Viral sequence data
- **PDB** - Protein structure data
- **ChEMBL** - Drug bioactivity data
- **PubChem** - Chemical compound data

---

## 📞 Contact

**Project Maintainer**: Sairaj Jadhav

**Repository**: [Viro-AI](https://github.com/SairajJadhav08/Viro-AI-Viral-Insight-Rapid-Optimization-Analytics-Intelligence)

---

## 🚀 Roadmap

- [ ] Add more virus types (HIV, Hepatitis, Zika)
- [ ] Implement WebSocket for real-time updates
- [ ] Add user authentication with database
- [ ] Deploy to cloud (AWS/Azure)
- [ ] Mobile application
- [ ] API rate limiting
- [ ] Advanced 3D visualization (Three.js)
- [ ] Multi-language support

---

## 📊 Project Stats

- **137 files**
- **768,139 lines of code**
- **6 complete pages**
- **3 ML models**
- **190+ drug compounds**
- **7-section analysis output**

**PRject Snapshots**
<img width="1613" height="982" alt="image" src="https://github.com/user-attachments/assets/2466a1b9-72fd-498e-8e6d-51f9f8fe1567" />

<img width="1498" height="774" alt="image" src="https://github.com/user-attachments/assets/cba9ad33-8560-464f-865d-d4d5872e5180" />

<img width="938" height="793" alt="image" src="https://github.com/user-attachments/assets/b88a20f5-22b5-48f3-b9bd-c91c6eca5694" />

<img width="1245" height="976" alt="image" src="https://github.com/user-attachments/assets/7b1d0981-969c-4e0a-b0aa-fcd41bbece6b" />

<img width="1191" height="967" alt="image" src="https://github.com/user-attachments/assets/762f8e61-fbb0-4626-8a10-3534a83873c0" />

<img width="1295" height="740" alt="image" src="https://github.com/user-attachments/assets/7e1de3ea-b7d0-460a-8c1e-3780b0ff782d" />


---

## ⭐ Star this repository if you find it useful!

**Made with ❤️ for viral research and drug discovery**


---

## 🔖 Keywords

`machine-learning` `drug-discovery` `bioinformatics` `viral-analysis` `covid-19` `antiviral-drugs` `mutation-prediction` `fastapi` `react` `python` `data-science` `healthcare` `pandemic-preparedness`
