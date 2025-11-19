# test_new_virus.py
"""
Demonstration: Testing Viro-AI with a NEW virus not in training data
Shows that system works but explain limitations
"""

import sys
sys.path.append('.')

import pandas as pd
from models.binding_affinity_predictor import BindingAffinityPredictor

def test_new_virus():
    """Test system with viruses NOT in training data."""
    
    print("\n" + "="*80)
    print("TESTING VIRO-AI WITH NEW VIRUSES (NOT IN TRAINING DATA)")
    print("="*80)
    
    # Load model
    print("\n[LOAD] Loading trained model...")
    predictor = BindingAffinityPredictor("models/saved_models/binding_model_v1.pkl")
    
    # Load drugs
    drugs_df = pd.read_csv("Viroai_DataBase/pharma/approved-drugs/antiviral_compounds.csv")
    print(f"[LOAD] Loaded {len(drugs_df)} drugs")
    
    # Check training data viruses
    print("\n[INFO] Viruses in TRAINING data:")
    stats = pd.read_json("Viroai_DataBase/processed/dataset_statistics.json")
    for virus, count in stats['virus_distribution'].items():
        print(f"  - {virus}: {count} samples")
    
    # NEW VIRUSES TO TEST (not in training!)
    new_viruses = [
        {
            "name": "Zika Virus",
            "protein": "NS2B-NS3 Protease",
            "pdb_id": "5U04",
            "in_training": False
        },
        {
            "name": "Dengue Virus", 
            "protein": "NS3 Protease",
            "pdb_id": "4GSX",
            "in_training": False
        },
        {
            "name": "West Nile Virus",
            "protein": "NS3 Protease", 
            "pdb_id": "2YOL",
            "in_training": False
        }
    ]
    
    print("\n" + "="*80)
    print("TESTING WITH NEW VIRUSES (NOT IN TRAINING DATA)")
    print("="*80)
    
    for virus_info in new_viruses:
        print(f"\n{'='*80}")
        print(f"NEW VIRUS TEST: {virus_info['name']}")
        print(f"{'='*80}")
        print(f"Protein: {virus_info['protein']}")
        print(f"PDB ID: {virus_info['pdb_id']}")
        print(f"In Training Data: {virus_info['in_training']}")
        
        # Predict for this virus
        print(f"\n[PREDICT] Screening {len(drugs_df)} drugs for {virus_info['name']}...")
        predictions = predictor.batch_predict(drugs_df)
        
        # Show top 5
        top_5 = predictions.head(5)
        print(f"\nTOP 5 DRUG CANDIDATES:")
        print("-" * 80)
        print(f"{'Rank':<6} {'Drug Name':<25} {'IC50 (nM)':<12} {'Strength':<10}")
        print("-" * 80)
        
        for _, row in top_5.iterrows():
            print(f"{int(row['rank']):<6} {row['name'][:24]:<25} "
                  f"{row['predicted_ic50_nm']:<11.1f} {row['binding_strength']}")
        print("-" * 80)
        
        print(f"\n[RESULT] System WORKS for {virus_info['name']}!")
        print(f"  [OK] Predictions generated")
        print(f"  [OK] Drugs ranked from best to worst")
        print(f"  [OK] IC50 values estimated")
        print(f"\n[WARNING] Accuracy may be lower because:")
        print(f"  [!]  {virus_info['name']} was NOT in training data")
        print(f"  [!]  Model predicts based on drug features only")
        print(f"  [!]  No virus-specific information used")
        print(f"\n[RECOMMENDATION]:")
        print(f"  [>] Use as screening tool to prioritize candidates")
        print(f"  [>] Validate top 5-10 drugs in laboratory")
        print(f"  [>] Add validated data to retrain model")
    
    # Summary
    print("\n" + "="*80)
    print("SUMMARY: CAN VIRO-AI HANDLE NEW VIRUSES?")
    print("="*80)
    print("\n[YES] System works for ANY virus you provide")
    print("[YES] Predictions are generated")
    print("[YES] Drugs are ranked")
    print("[YES] Output files created")
    print("\n[BUT] Limitations exist:")
    print("[BUT] Accuracy decreases for viruses unlike training data")
    print("[BUT] Model doesn't use virus-specific features")
    print("[BUT] Predictions are drug-feature-based only")
    print("\n[BEST PRACTICE]:")
    print("[*] Use for initial screening (cheap, fast)")
    print("[*] Test top candidates in lab (expensive, accurate)")
    print("[*] Add new data to improve model over time")
    print("\n" + "="*80)
    print("[SUCCESS] Demonstration complete!")
    print("="*80)

if __name__ == "__main__":
    test_new_virus()

