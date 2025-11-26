# main.py
"""
Viro-AI FastAPI Backend - FINE-TUNED VERSION
Provides drug-virus binding prediction with comprehensive viral threat analysis
Enhanced with caching, performance optimizations, and better error handling
"""

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from typing import List, Optional, Dict
import pandas as pd
import sys
import os
from datetime import datetime
import numpy as np
import hashlib
import json
from functools import lru_cache
import logging

# Configure logging first (before any imports that might use it)
logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] %(levelname)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)

# Add parent directory to path to import model
sys.path.append(os.path.join(os.path.dirname(__file__), '../..'))
from models.binding_affinity_predictor import BindingAffinityPredictor
from config import config

# Import chatbot router (optional - will use demo mode if Gemini API not available)
try:
    from backend.api.chatbot import router as chatbot_router
    CHATBOT_AVAILABLE = True
except ImportError:
    try:
        from api.chatbot import router as chatbot_router
        CHATBOT_AVAILABLE = True
    except ImportError:
        CHATBOT_AVAILABLE = False
        logger.warning("Chatbot router not available - chatbot features will be disabled")

# === FASTAPI APP ===
app = FastAPI(
    title=config.API_TITLE,
    description=config.API_DESCRIPTION,
    version=config.API_VERSION
)

# CORS middleware (allow frontend access)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include chatbot router if available
if CHATBOT_AVAILABLE:
    app.include_router(chatbot_router)
    logger.info("Chatbot router included")

# === GLOBAL STATE ===
predictor = None
drugs_db = None

# Simple in-memory cache for predictions
prediction_cache = {}

def get_cache_key(virus_id: str, protein_pdb_id: str, drug_ids: Optional[List[str]] = None) -> str:
    """Generate cache key for prediction request."""
    key_data = {
        "virus": virus_id,
        "protein": protein_pdb_id,
        "drugs": sorted(drug_ids) if drug_ids else "all"
    }
    key_str = json.dumps(key_data, sort_keys=True)
    return hashlib.md5(key_str.encode()).hexdigest()

def get_from_cache(cache_key: str) -> Optional[Dict]:
    """Get prediction from cache if available."""
    if not config.ENABLE_CACHING:
        return None
    
    if cache_key in prediction_cache:
        cached_data, timestamp = prediction_cache[cache_key]
        age_seconds = (datetime.now() - timestamp).total_seconds()
        
        if age_seconds < config.CACHE_EXPIRY_SECONDS:
            logger.info(f"Cache hit for key: {cache_key[:8]}... (age: {age_seconds:.0f}s)")
            return cached_data
        else:
            # Cache expired
            del prediction_cache[cache_key]
    
    return None

def save_to_cache(cache_key: str, data: Dict):
    """Save prediction to cache."""
    if config.ENABLE_CACHING:
        prediction_cache[cache_key] = (data, datetime.now())
        logger.info(f"Cached result for key: {cache_key[:8]}...")

# === PYDANTIC MODELS ===
class PredictionRequest(BaseModel):
    virus_id: str = Field(..., description="Virus identifier (e.g., SARS-CoV-2)")
    protein_pdb_id: str = Field(..., description="Protein PDB ID (e.g., 6VXX)")
    drug_ids: Optional[List[str]] = Field(None, description="Specific drug IDs to screen. If None, screens all drugs")
    top_n: int = Field(10, ge=1, le=100, description="Number of top candidates to return")
    
    @validator('virus_id')
    def validate_virus(cls, v):
        if v not in config.SUPPORTED_VIRUSES:
            raise ValueError(f"Unsupported virus. Supported: {list(config.SUPPORTED_VIRUSES.keys())}")
        return v
    
    @validator('top_n')
    def validate_top_n(cls, v):
        if v < 1 or v > 100:
            raise ValueError("top_n must be between 1 and 100")
        return v

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
@lru_cache(maxsize=128)
def calculate_deadliness_score(virus_id: str) -> DeadlinessScore:
    """
    Calculate deadliness score using configuration.
    Uses LRU cache for performance.
    """
    scores = config.get_deadliness_scores(virus_id)
    overall = config.calculate_overall_deadliness(virus_id)
    risk_level = config.get_risk_level(overall)
    
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
    
    logger.info("="*70)
    logger.info("VIRO-AI API STARTUP - FINE-TUNED VERSION")
    logger.info("="*70)
    
    try:
        # Load trained model
        model_path = str(config.MODEL_PATH)
        if os.path.exists(model_path):
            predictor = BindingAffinityPredictor(model_path)
            logger.info(f"Model loaded successfully: {model_path}")
        else:
            logger.error(f"Model not found: {model_path}")
            logger.info("Run: python models/binding_affinity_predictor.py")
            raise FileNotFoundError(f"Model not found at {model_path}")
        
        # Load drugs database
        drugs_file = str(config.DRUGS_DATA_PATH)
        if os.path.exists(drugs_file):
            drugs_db = pd.read_csv(drugs_file)
            logger.info(f"Loaded {len(drugs_db)} drugs from database")
        else:
            logger.error(f"Drugs database not found: {drugs_file}")
            raise FileNotFoundError(f"Drugs database not found at {drugs_file}")
        
        logger.info(f"Caching: {'Enabled' if config.ENABLE_CACHING else 'Disabled'}")
        logger.info(f"Supported viruses: {list(config.SUPPORTED_VIRUSES.keys())}")
        logger.info("="*70)
        logger.info("VIRO-AI API READY!")
        logger.info("="*70)
        
    except Exception as e:
        logger.error(f"Startup failed: {str(e)}")
        raise

@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown."""
    logger.info("Shutting down Viro-AI API...")
    prediction_cache.clear()
    logger.info("Cache cleared. Goodbye!")

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
    Main prediction endpoint with caching and optimized performance.
    Returns ranked drug candidates with deadliness analysis.
    """
    start_time = datetime.now()
    
    try:
        # Validate model and data availability
        if predictor is None or not predictor.is_trained:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Prediction model not loaded"
            )
        
        if drugs_db is None:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Drugs database not loaded"
            )
        
        # Validate virus and protein
        if request.virus_id not in config.SUPPORTED_VIRUSES:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Virus {request.virus_id} not supported. Available: {list(config.SUPPORTED_VIRUSES.keys())}"
            )
        
        proteins = config.SUPPORTED_VIRUSES[request.virus_id]["proteins"]
        if request.protein_pdb_id not in proteins:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Protein {request.protein_pdb_id} not found for {request.virus_id}. Available: {list(proteins.keys())}"
            )
        
        # Check cache first
        cache_key = get_cache_key(request.virus_id, request.protein_pdb_id, request.drug_ids)
        cached_result = get_from_cache(cache_key)
        
        if cached_result is not None:
            # Return cached result (update processing time)
            cached_result["processing_time_ms"] = int((datetime.now() - start_time).total_seconds() * 1000)
            cached_result["cached"] = True
            return cached_result
        
        # Get protein info
        protein_info = proteins[request.protein_pdb_id]
    
        # Select drugs to screen
        if request.drug_ids:
            # Screen specific drugs
            drugs_to_screen = drugs_db[drugs_db['drug_id'].isin(request.drug_ids)]
            if len(drugs_to_screen) == 0:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="None of the specified drug IDs were found in database"
                )
        else:
            # Screen all drugs
            drugs_to_screen = drugs_db.copy()
        
        logger.info(f"Screening {len(drugs_to_screen)} drugs for {request.virus_id}...")
        
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
                confidence_score=0.85,  # Model ensemble confidence
                estimated_ic50_nm=float(row['predicted_ic50_nm']),
                binding_strength=str(row['binding_strength']),
                molecular_weight=float(row['mol_weight']),
                logP=float(row['logP']),
                smiles=row['smiles'],
                approval_status="Research compound"
            ))
        
        # Calculate deadliness score
        deadliness = calculate_deadliness_score(request.virus_id)
        
        # Calculate processing time
        processing_time = int((datetime.now() - start_time).total_seconds() * 1000)
        
        # Create response
        response_data = {
            "request_id": f"req_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
            "timestamp": datetime.now().isoformat(),
            "virus": request.virus_id,
            "protein_name": protein_info['name'],
            "protein_pdb_id": request.protein_pdb_id,
            "drugs_screened": len(drugs_to_screen),
            "top_candidates": [c.dict() for c in candidates],
            "deadliness_score": deadliness.dict(),
            "model_version": config.MODEL_VERSION,
            "processing_time_ms": processing_time,
            "cached": False
        }
        
        # Save to cache
        save_to_cache(cache_key, response_data.copy())
        
        logger.info(f"Prediction completed in {processing_time}ms for {request.virus_id}")
        
        return PredictionResponse(**response_data)
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Prediction failed: {str(e)}"
        )

@app.get("/top_drugs/{virus_id}")
async def get_top_drugs(virus_id: str, limit: int = 10):
    """
    Get top drug candidates for a virus (screens all drugs).
    Quick endpoint for basic screening.
    """
    if virus_id not in config.SUPPORTED_VIRUSES:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Virus {virus_id} not supported"
        )
    
    # Use first available protein for this virus
    proteins = config.SUPPORTED_VIRUSES[virus_id]["proteins"]
    protein_pdb_id = list(proteins.keys())[0]
    
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
        "supported_viruses": list(config.SUPPORTED_VIRUSES.keys()),
        "virus_details": {
            virus_id: {
                "proteins": list(data["proteins"].keys()),
                "deadliness_score": config.calculate_overall_deadliness(virus_id)
            }
            for virus_id, data in config.SUPPORTED_VIRUSES.items()
        }
    }

@app.get("/cache/stats")
async def get_cache_stats():
    """Get cache statistics."""
    return {
        "enabled": config.ENABLE_CACHING,
        "cache_size": len(prediction_cache),
        "expiry_seconds": config.CACHE_EXPIRY_SECONDS
    }

@app.post("/cache/clear")
async def clear_cache():
    """Clear prediction cache."""
    prediction_cache.clear()
    return {"status": "success", "message": "Cache cleared"}

# === RUN SERVER ===
if __name__ == "__main__":
    import uvicorn
    logger.info("="*70)
    logger.info("STARTING VIRO-AI API SERVER - FINE-TUNED VERSION")
    logger.info("="*70)
    logger.info(f"API: http://{config.API_HOST}:{config.API_PORT}")
    logger.info(f"Docs: http://localhost:{config.API_PORT}/docs")
    logger.info(f"Version: {config.API_VERSION}")
    logger.info("="*70)
    
    uvicorn.run(
        app,
        host=config.API_HOST,
        port=config.API_PORT,
        log_level="info"
    )

