# config.py
"""
Configuration Management for Viro-AI System
Centralized configuration for all modules
"""

import os
from pathlib import Path

class Config:
    """Main configuration class for Viro-AI system."""
    
    # === Base Paths ===
    BASE_DIR = Path(__file__).parent.absolute()
    DATABASE_DIR = BASE_DIR / "Viroai_DataBase"
    MODELS_DIR = BASE_DIR / "models"
    REPORTS_DIR = DATABASE_DIR / "Reports"
    
    # === Data Paths ===
    PROCESSED_DATA_DIR = DATABASE_DIR / "processed"
    TRAIN_DATA_PATH = PROCESSED_DATA_DIR / "train_data.csv"
    VAL_DATA_PATH = PROCESSED_DATA_DIR / "validation_data.csv"
    TEST_DATA_PATH = PROCESSED_DATA_DIR / "test_data.csv"
    
    DRUGS_DATA_PATH = DATABASE_DIR / "pharma" / "approved-drugs" / "antiviral_compounds.csv"
    STRUCTURAL_DATA_DIR = DATABASE_DIR / "structural"
    
    # === Model Configuration ===
    MODEL_SAVE_DIR = MODELS_DIR / "saved_models"
    MODEL_PATH = MODEL_SAVE_DIR / "binding_model_v1.pkl"
    MODEL_VERSION = "v1.0-finetuned"
    
    # Model hyperparameters
    RANDOM_FOREST_PARAMS = {
        'n_estimators': 200,
        'max_depth': 6,
        'min_samples_split': 3,
        'min_samples_leaf': 1,
        'max_features': 'sqrt',
        'random_state': 42,
        'n_jobs': -1,
        'bootstrap': True
    }
    
    EXTRA_TREES_PARAMS = {
        'n_estimators': 200,
        'max_depth': 7,
        'min_samples_split': 3,
        'min_samples_leaf': 1,
        'max_features': 'sqrt',
        'random_state': 42,
        'n_jobs': -1,
        'bootstrap': True
    }
    
    GRADIENT_BOOSTING_PARAMS = {
        'n_estimators': 150,
        'max_depth': 5,
        'learning_rate': 0.03,
        'subsample': 0.85,
        'min_samples_split': 3,
        'max_features': 'sqrt',
        'random_state': 42
    }
    
    ELASTIC_NET_PARAMS = {
        'alpha': 0.5,
        'l1_ratio': 0.5,
        'random_state': 42,
        'max_iter': 2000
    }
    
    ENSEMBLE_WEIGHTS = [2, 2, 2, 1]  # RF, ET, GB, ElasticNet
    
    # === Training Configuration ===
    TARGET_COLUMN = 'pic50'
    USE_CROSS_VALIDATION = True
    CV_FOLDS = 5
    SCALER_TYPE = 'robust'  # 'standard' or 'robust'
    
    # === Feature Engineering ===
    NUM_SMILES_FEATURES = 35
    NUM_MOLECULAR_FEATURES = 4
    TOTAL_FEATURES = NUM_SMILES_FEATURES + NUM_MOLECULAR_FEATURES
    
    # Lipinski's Rule of Five thresholds
    LIPINSKI_MW_MAX = 500
    LIPINSKI_LOGP_MIN = -0.4
    LIPINSKI_LOGP_MAX = 5.6
    
    # === API Configuration ===
    API_HOST = "0.0.0.0"
    API_PORT = 8000
    API_TITLE = "Viro-AI API"
    API_DESCRIPTION = "Drug-Virus Binding Affinity Prediction with Viral Threat Analysis"
    API_VERSION = "1.0.1-finetuned"
    
    # API Performance
    ENABLE_CACHING = True
    CACHE_EXPIRY_SECONDS = 3600  # 1 hour
    MAX_BATCH_SIZE = 500
    
    # === Virus Database ===
    SUPPORTED_VIRUSES = {
        "SARS-CoV-2": {
            "proteins": {
                "6VXX": {"name": "Spike Protein", "pdb_path": "SARS-CoV-2/proteins/6VXX.pdb"},
                "6VSB": {"name": "Spike RBD", "pdb_path": "SARS-CoV-2/proteins/6VSB.pdb"},
                "7BNN": {"name": "Main Protease (Mpro)", "pdb_path": "SARS-CoV-2/proteins/7BNN.pdb"}
            },
            "deadliness_scores": {
                "transmissibility": 82,
                "immune_evasion": 75,
                "mortality_rate": 65,
                "infection_severity": 74
            }
        },
        "Influenza": {
            "proteins": {
                "1RVX": {"name": "Hemagglutinin", "pdb_path": "Influenza/proteins/1RVX.pdb"},
                "4GMS": {"name": "Neuraminidase", "pdb_path": "Influenza/proteins/4GMS.pdb"}
            },
            "deadliness_scores": {
                "transmissibility": 78,
                "immune_evasion": 45,
                "mortality_rate": 45,
                "infection_severity": 55
            }
        },
        "Ebola": {
            "proteins": {
                "5JQ3": {"name": "Glycoprotein (GP)", "pdb_path": "Ebola/proteins/5JQ3.pdb"},
                "5JQ7": {"name": "GP Complex", "pdb_path": "Ebola/proteins/5JQ7.pdb"}
            },
            "deadliness_scores": {
                "transmissibility": 40,
                "immune_evasion": 50,
                "mortality_rate": 90,
                "infection_severity": 95
            }
        }
    }
    
    # Default deadliness scores for unknown viruses
    DEFAULT_DEADLINESS_SCORES = {
        "transmissibility": 50,
        "immune_evasion": 50,
        "mortality_rate": 50,
        "infection_severity": 50
    }
    
    # Deadliness score weights
    DEADLINESS_WEIGHTS = {
        "transmissibility": 0.25,
        "immune_evasion": 0.20,
        "mortality_rate": 0.35,
        "infection_severity": 0.20
    }
    
    # === Output Configuration ===
    DRUG_RANKINGS_DIR = REPORTS_DIR / "drug-rankings"
    MUTATION_PREDICTIONS_DIR = REPORTS_DIR / "mutation-predictions"
    VISUALIZATIONS_DIR = REPORTS_DIR / "3d-visualizations"
    MODIFICATIONS_DIR = REPORTS_DIR / "modification-suggestions"
    
    # === Logging Configuration ===
    LOG_LEVEL = "INFO"
    LOG_FORMAT = '[%(asctime)s] %(levelname)s: %(message)s'
    LOG_DATE_FORMAT = '%Y-%m-%d %H:%M:%S'
    
    # === Performance Tuning ===
    BATCH_PREDICTION_CHUNK_SIZE = 100
    NUM_WORKERS = -1  # Use all CPU cores
    
    # === Validation Thresholds ===
    MIN_ACCEPTABLE_CORRELATION = 0.4
    TARGET_CORRELATION = 0.7
    
    # IC50 Classification thresholds (pIC50)
    IC50_STRONG_THRESHOLD = 7.0  # < 100 nM
    IC50_MEDIUM_THRESHOLD = 5.0  # 100 nM - 10 μM
    # weak is anything above medium
    
    # === System Information ===
    SYSTEM_NAME = "Viro-AI"
    SYSTEM_DESCRIPTION = "Fine-Tuned Drug-Virus Binding Affinity Prediction System"
    CONTACT_EMAIL = "sairajjadhav433@gmail.com"
    
    @classmethod
    def ensure_directories(cls):
        """Create all necessary directories if they don't exist."""
        directories = [
            cls.DATABASE_DIR,
            cls.MODELS_DIR,
            cls.REPORTS_DIR,
            cls.MODEL_SAVE_DIR,
            cls.DRUG_RANKINGS_DIR,
            cls.MUTATION_PREDICTIONS_DIR,
            cls.VISUALIZATIONS_DIR,
            cls.MODIFICATIONS_DIR,
        ]
        
        for directory in directories:
            directory.mkdir(parents=True, exist_ok=True)
    
    @classmethod
    def get_protein_path(cls, virus_id, protein_pdb_id):
        """Get full path to protein PDB file."""
        if virus_id not in cls.SUPPORTED_VIRUSES:
            raise ValueError(f"Virus {virus_id} not supported")
        
        proteins = cls.SUPPORTED_VIRUSES[virus_id]["proteins"]
        if protein_pdb_id not in proteins:
            raise ValueError(f"Protein {protein_pdb_id} not found for {virus_id}")
        
        rel_path = proteins[protein_pdb_id]["pdb_path"]
        return cls.STRUCTURAL_DATA_DIR / rel_path
    
    @classmethod
    def get_deadliness_scores(cls, virus_id):
        """Get deadliness scores for a virus."""
        if virus_id in cls.SUPPORTED_VIRUSES:
            return cls.SUPPORTED_VIRUSES[virus_id]["deadliness_scores"]
        return cls.DEFAULT_DEADLINESS_SCORES
    
    @classmethod
    def calculate_overall_deadliness(cls, virus_id):
        """Calculate overall deadliness score (0-100)."""
        scores = cls.get_deadliness_scores(virus_id)
        weights = cls.DEADLINESS_WEIGHTS
        
        overall = int(
            scores["transmissibility"] * weights["transmissibility"] +
            scores["immune_evasion"] * weights["immune_evasion"] +
            scores["mortality_rate"] * weights["mortality_rate"] +
            scores["infection_severity"] * weights["infection_severity"]
        )
        
        return overall
    
    @classmethod
    def get_risk_level(cls, deadliness_score):
        """Get risk level classification."""
        if deadliness_score >= 80:
            return "CRITICAL"
        elif deadliness_score >= 70:
            return "HIGH"
        elif deadliness_score >= 50:
            return "MEDIUM"
        else:
            return "LOW"


# Create an instance for easy import
config = Config()

# Ensure directories exist on import
config.ensure_directories()


if __name__ == "__main__":
    # Test configuration
    print(f"\n{Config.SYSTEM_NAME} Configuration")
    print("=" * 70)
    print(f"Base Directory: {Config.BASE_DIR}")
    print(f"Database Directory: {Config.DATABASE_DIR}")
    print(f"Model Path: {Config.MODEL_PATH}")
    print(f"\nSupported Viruses: {list(Config.SUPPORTED_VIRUSES.keys())}")
    print(f"\nTotal Features: {Config.TOTAL_FEATURES}")
    print(f"  - SMILES Features: {Config.NUM_SMILES_FEATURES}")
    print(f"  - Molecular Features: {Config.NUM_MOLECULAR_FEATURES}")
    print(f"\nAPI Configuration:")
    print(f"  - Host: {Config.API_HOST}")
    print(f"  - Port: {Config.API_PORT}")
    print(f"  - Version: {Config.API_VERSION}")
    print("\n[OK] Configuration loaded successfully!")

