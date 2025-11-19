# main.py
"""
Viro-AI FastAPI Backend
Provides drug-virus binding prediction with comprehensive viral threat analysis
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict
import pandas as pd
import sys
import os
from datetime import datetime
import numpy as np

# Add parent directory to path to import model
sys.path.append(os.path.join(os.path.dirname(__file__), '../..'))
from models.binding_affinity_predictor import BindingAffinityPredictor

# === FASTAPI APP ===
app = FastAPI(
    title="Viro-AI API",
    description="Drug-Virus Binding Affinity Prediction with Viral Threat Analysis",
    version="1.0.0"
)

# CORS middleware (allow frontend access)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === GLOBAL STATE ===
predictor = None
drugs_db = None
protein_db = {
    "SARS-CoV-2": {
        "6VXX": {"name": "Spike Protein", "pdb_path": "Viroai_DataBase/structural/SARS-CoV-2/proteins/6VXX.pdb"},
        "6VSB": {"name": "Spike RBD", "pdb_path": "Viroai_DataBase/structural/SARS-CoV-2/proteins/6VSB.pdb"},
        "7BNN": {"name": "Main Protease (Mpro)", "pdb_path": "Viroai_DataBase/structural/SARS-CoV-2/proteins/7BNN.pdb"}
    },
    "Influenza": {
        "1RVX": {"name": "Hemagglutinin", "pdb_path": "Viroai_DataBase/structural/Influenza/proteins/1RVX.pdb"},
        "4GMS": {"name": "Neuraminidase", "pdb_path": "Viroai_DataBase/structural/Influenza/proteins/4GMS.pdb"}
    },
    "Ebola": {
        "5JQ3": {"name": "Glycoprotein (GP)", "pdb_path": "Viroai_DataBase/structural/Ebola/proteins/5JQ3.pdb"},
        "5JQ7": {"name": "GP Complex", "pdb_path": "Viroai_DataBase/structural/Ebola/proteins/5JQ7.pdb"}
    }
}

# === PYDANTIC MODELS ===
class PredictionRequest(BaseModel):
    virus_id: str
    protein_pdb_id: str
    drug_ids: Optional[List[str]] = None  # If None, screen all drugs
    top_n: int = 10

class DrugCandidate(BaseModel):
    rank: int
    drug_id: str
    drug_name: str
    predicted_affinity: float  # 0-1 score
    confidence_score: float
    estimated_ic50_nm: float
    binding_strength: str
    molecular_weight: float
    logP: float
    smiles: str
    approval_status: str = "Research compound"

class DeadlinessScore(BaseModel):
    overall_score: int  # 0-100
    risk_level: str
    transmissibility: int
    immune_evasion: int
    mortality_rate: int
    infection_severity: int

class PredictionResponse(BaseModel):
    request_id: str
    timestamp: str
    virus: str
    protein_name: str
    protein_pdb_id: str
    drugs_screened: int
    top_candidates: List[DrugCandidate]
    deadliness_score: DeadlinessScore
    model_version: str
    processing_time_ms: int

# === HELPER FUNCTIONS ===
def calculate_deadliness_score(virus_id: str, mutation_info: Optional[Dict] = None):
    """
    Calculate simplified deadliness score (rule-based for hackathon).
    In full system, this would use ML on genomic features.
    """
    # Base scores for known viruses (from historical data)
    base_scores = {
        "SARS-CoV-2": {
            "transmissibility": 82,
            "immune_evasion": 75,
            "mortality_rate": 65,
            "infection_severity": 74
        },
        "Influenza": {
            "transmissibility": 78,
            "immune_evasion": 45,
            "mortality_rate": 45,
            "infection_severity": 55
        },
        "Ebola": {
            "transmissibility": 40,
            "immune_evasion": 50,
            "mortality_rate": 90,
            "infection_severity": 95
        }
    }
    
    scores = base_scores.get(virus_id, {
        "transmissibility": 50,
        "immune_evasion": 50,
        "mortality_rate": 50,
        "infection_severity": 50
    })
    
    # Calculate overall score (weighted average)
    overall = int(
        scores["transmissibility"] * 0.25 +
        scores["immune_evasion"] * 0.20 +
        scores["mortality_rate"] * 0.35 +
        scores["infection_severity"] * 0.20
    )
    
    # Determine risk level
    if overall >= 80:
        risk_level = "CRITICAL"
    elif overall >= 70:
        risk_level = "HIGH"
    elif overall >= 50:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"
    
    return DeadlinessScore(
        overall_score=overall,
        risk_level=risk_level,
        **scores
    )

# === STARTUP/SHUTDOWN ===
@app.on_event("startup")
async def startup_event():
    """Load model and databases on startup."""
    global predictor, drugs_db
    
    print("\n[STARTUP] Loading Viro-AI model and databases...")
    
    # Load trained model
    model_path = "models/saved_models/binding_model_v1.pkl"
    if os.path.exists(model_path):
        predictor = BindingAffinityPredictor(model_path)
        print(f"  [OK] Model loaded: {model_path}")
    else:
        print(f"  [ERROR] Model not found: {model_path}")
        print(f"  [INFO] Run: python models/binding_affinity_predictor.py")
        return
    
    # Load drugs database
    drugs_file = "Viroai_DataBase/pharma/approved-drugs/antiviral_compounds.csv"
    if os.path.exists(drugs_file):
        drugs_db = pd.read_csv(drugs_file)
        print(f"  [OK] Loaded {len(drugs_db)} drugs")
    else:
        print(f"  [ERROR] Drugs database not found!")
        return
    
    print("[SUCCESS] Viro-AI API ready!")

# === API ENDPOINTS ===
@app.get("/")
async def root():
    """API root endpoint."""
    return {
        "message": "Viro-AI API - Drug-Virus Binding Prediction",
        "version": "1.0.0",
        "endpoints": [
            "/predict - Predict drug-virus binding affinity",
            "/top_drugs/{virus_id} - Get top drug candidates",
            "/health - API health check"
        ]
    }

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "model_loaded": predictor is not None and predictor.is_trained,
        "drugs_loaded": drugs_db is not None,
        "timestamp": datetime.now().isoformat()
    }

@app.post("/predict", response_model=PredictionResponse)
async def predict_binding(request: PredictionRequest):
    """
    Main prediction endpoint - returns ranked drug candidates with deadliness analysis.
    """
    start_time = datetime.now()
    
    # Validate inputs
    if predictor is None or not predictor.is_trained:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    if drugs_db is None:
        raise HTTPException(status_code=503, detail="Drugs database not loaded")
    
    if request.virus_id not in protein_db:
        raise HTTPException(status_code=404, detail=f"Virus {request.virus_id} not supported")
    
    if request.protein_pdb_id not in protein_db[request.virus_id]:
        raise HTTPException(status_code=404, detail=f"Protein {request.protein_pdb_id} not found")
    
    # Get protein info
    protein_info = protein_db[request.virus_id][request.protein_pdb_id]
    
    # Select drugs to screen
    if request.drug_ids:
        # Screen specific drugs
        drugs_to_screen = drugs_db[drugs_db['drug_id'].isin(request.drug_ids)]
    else:
        # Screen all drugs
        drugs_to_screen = drugs_db.copy()
    
    print(f"[PREDICT] Screening {len(drugs_to_screen)} drugs for {request.virus_id}...")
    
    # Batch predict
    predictions_df = predictor.batch_predict(drugs_to_screen)
    
    # Get top N candidates
    top_drugs = predictions_df.head(request.top_n)
    
    # Format as response
    candidates = []
    for idx, row in top_drugs.iterrows():
        candidates.append(DrugCandidate(
            rank=int(row['rank']),
            drug_id=row['drug_id'],
            drug_name=row['name'],
            predicted_affinity=float(row['binding_score']),
            confidence_score=0.85,  # Simplified for hackathon
            estimated_ic50_nm=float(row['predicted_ic50_nm']),
            binding_strength=str(row['binding_strength']),
            molecular_weight=float(row['mol_weight']),
            logP=float(row['logP']),
            smiles=row['smiles'],
            approval_status="FDA Approved"  # Simplified
        ))
    
    # Calculate deadliness score
    deadliness = calculate_deadliness_score(request.virus_id)
    
    # Calculate processing time
    processing_time = int((datetime.now() - start_time).total_seconds() * 1000)
    
    # Create response
    response = PredictionResponse(
        request_id=f"req_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
        timestamp=datetime.now().isoformat(),
        virus=request.virus_id,
        protein_name=protein_info['name'],
        protein_pdb_id=request.protein_pdb_id,
        drugs_screened=len(drugs_to_screen),
        top_candidates=candidates,
        deadliness_score=deadliness,
        model_version="v1.0",
        processing_time_ms=processing_time
    )
    
    return response

@app.get("/top_drugs/{virus_id}")
async def get_top_drugs(virus_id: str, limit: int = 10):
    """
    Get top drug candidates for a virus (screens all drugs).
    """
    if virus_id not in protein_db:
        raise HTTPException(status_code=404, detail=f"Virus {virus_id} not supported")
    
    # Use first available protein for this virus
    protein_pdb_id = list(protein_db[virus_id].keys())[0]
    
    # Create prediction request
    request = PredictionRequest(
        virus_id=virus_id,
        protein_pdb_id=protein_pdb_id,
        drug_ids=None,
        top_n=limit
    )
    
    return await predict_binding(request)

@app.get("/viruses")
async def list_viruses():
    """List supported viruses and their proteins."""
    return {
        "supported_viruses": list(protein_db.keys()),
        "proteins": protein_db
    }

# === RUN SERVER ===
if __name__ == "__main__":
    import uvicorn
    print("\n" + "="*70)
    print("STARTING VIRO-AI API SERVER")
    print("="*70)
    print("\nAPI will be available at: http://localhost:8000")
    print("Interactive docs at: http://localhost:8000/docs")
    print("\n" + "="*70 + "\n")
    
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")

