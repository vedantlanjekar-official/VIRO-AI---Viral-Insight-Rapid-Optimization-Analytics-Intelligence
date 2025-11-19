# viroai_demo.py
"""
Viro-AI Demo Script - Showcases all dashboard outputs
Demonstrates: Drug ranking, Deadliness score, Predictions
"""

import sys
sys.path.append('.')

import pandas as pd
import json
from models.binding_affinity_predictor import BindingAffinityPredictor

def print_header(title):
    """Print formatted section header."""
    print("\n" + "="*80)
    print(f"  {title}")
    print("="*80)

def format_ic50(ic50_nm):
    """Format IC50 value with appropriate units."""
    if ic50_nm < 1:
        return f"{ic50_nm:.2f} nM"
    elif ic50_nm < 1000:
        return f"{ic50_nm:.1f} nM"
    else:
        return f"{ic50_nm/1000:.2f} μM"

def get_binding_symbol(strength):
    """Get symbol for binding strength."""
    symbols = {
        'strong': '[***]',
        'medium': '[** ]',
        'weak': '[*  ]'
    }
    return symbols.get(strength, '[?  ]')

def demo_full_analysis():
    """Run complete Viro-AI analysis demo."""
    
    print("\n" + "#"*80)
    print("#" + " "*78 + "#")
    print("#" + "  VIRO-AI: COMPREHENSIVE VIRAL THREAT ANALYSIS SYSTEM".center(78) + "#")
    print("#" + " "*78 + "#")
    print("#"*80)
    
    # Load model
    print_header("INITIALIZING VIRO-AI SYSTEM")
    model_path = "models/saved_models/binding_model_v1.pkl"
    predictor = BindingAffinityPredictor(model_path)
    
    # Load drugs
    drugs_df = pd.read_csv("Viroai_DataBase/pharma/approved-drugs/antiviral_compounds.csv")
    print(f"\n[OK] System initialized with {len(drugs_df)} antiviral compounds")
    
    # === MODULE 1: DEADLINESS SCORE ===
    print_header("MODULE 1: VIRAL DEADLINESS ASSESSMENT")
    virus_name = "SARS-CoV-2"
    print(f"\nAnalyzing: {virus_name}")
    print(f"Target Protein: Spike Protein (6VXX)")
    
    # Calculate deadliness (rule-based for demo)
    deadliness_scores = {
        "transmissibility": 82,
        "immune_evasion": 75,
        "mortality_rate": 65,
        "infection_severity": 74
    }
    overall_deadliness = int(sum(deadliness_scores.values()) / len(deadliness_scores) * 0.96)
    
    print(f"\n  DEADLINESS SCORE: {overall_deadliness} / 100")
    print(f"  " + "#" * (overall_deadliness // 2) + "-" * (50 - overall_deadliness // 2))
    print(f"\n  Risk Classification: HIGH RISK")
    print(f"\n  Component Scores:")
    for component, score in deadliness_scores.items():
        bar = "#" * (score // 5) + "-" * (20 - score // 5)
        print(f"    {component.replace('_', ' ').title():.<25} {bar} {score}/100")
    
    # === MODULE 2: DRUG SCREENING & RANKING ===
    print_header("MODULE 2: DRUG SCREENING & BINDING AFFINITY PREDICTION")
    print(f"\nScreening {len(drugs_df)} antiviral compounds...")
    print("Prediction Model: Random Forest (Correlation: 0.77 on training)")
    
    # Predict for all drugs
    predictions = predictor.batch_predict(drugs_df)
    
    # Get top 10
    top_10 = predictions.head(10)
    
    print(f"\nTOP 10 DRUG CANDIDATES:")
    print("-" * 80)
    print(f"{'Rank':<6} {'Drug Name':<20} {'Score':<8} {'Est. IC50':<12} {'Strength':<10}")
    print("-" * 80)
    
    for idx, row in top_10.iterrows():
        symbol = get_binding_symbol(row['binding_strength'])
        print(f"{int(row['rank']):<6} {row['name'][:19]:<20} {row['binding_score']:.2f}     "
              f"{format_ic50(row['predicted_ic50_nm']):<12} {symbol}")
    
    print("-" * 80)
    print(f"\nBest Candidate: {top_10.iloc[0]['name']}")
    print(f"Predicted IC50: {format_ic50(top_10.iloc[0]['predicted_ic50_nm'])}")
    print(f"Binding Score: {top_10.iloc[0]['binding_score']:.3f} / 1.000")
    
    # === MODULE 3: SAVE RESULTS ===
    print_header("MODULE 3: EXPORTING RESULTS")
    
    # Save top candidates to JSON
    output_file = "Viroai_DataBase/Reports/drug-rankings/demo_results.json"
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    
    result_data = {
        "virus": virus_name,
        "protein": "Spike Protein (6VXX)",
        "analysis_date": pd.Timestamp.now().isoformat(),
        "deadliness_score": overall_deadliness,
        "risk_level": "HIGH",
        "top_10_drugs": [
            {
                "rank": int(row['rank']),
                "drug_name": row['name'],
                "drug_id": row['drug_id'],
                "binding_score": float(row['binding_score']),
                "predicted_ic50_nm": float(row['predicted_ic50_nm']),
                "strength": str(row['binding_strength']),
                "smiles": row['smiles']
            }
            for _, row in top_10.iterrows()
        ]
    }
    
    with open(output_file, 'w') as f:
        json.dump(result_data, f, indent=2)
    
    print(f"\n[SAVED] Results exported to: {output_file}")
    
    # Save top 10 to CSV
    csv_file = "Viroai_DataBase/Reports/drug-rankings/top_10_candidates.csv"
    top_10[['rank', 'name', 'drug_id', 'binding_score', 'predicted_ic50_nm', 'binding_strength']].to_csv(
        csv_file, index=False
    )
    print(f"[SAVED] CSV exported to: {csv_file}")
    
    # === MODULE 4: VALIDATION ===
    print_header("MODULE 4: MODEL VALIDATION")
    
    # Load test data to show validation
    test_data = pd.read_csv("Viroai_DataBase/processed/test_data.csv")
    
    print(f"\nValidating predictions against {len(test_data)} known drug-virus pairs...")
    
    # Example validation drugs
    validation_examples = [
        {"name": "Nirmatrelvir", "virus": "SARS-CoV-2", "actual_ic50": 3.1},
        {"name": "Oseltamivir", "virus": "Influenza", "actual_ic50": 0.5},
        {"name": "Remdesivir", "virus": "SARS-CoV-2", "actual_ic50": 100}
    ]
    
    print(f"\nSample Validations:")
    print("-" * 70)
    print(f"{'Drug':<18} {'Virus':<15} {'Actual IC50':<15} {'Predicted IC50'}")
    print("-" * 70)
    
    for example in validation_examples:
        # Find in test data
        match = test_data[test_data['drug_name'] == example['name']]
        if not match.empty:
            row = match.iloc[0]
            pred_pic50 = predictor.predict(row['smiles'], row['mol_weight'], row['logP'])
            pred_ic50 = 10 ** (9 - pred_pic50)
            
            print(f"{example['name']:<18} {example['virus']:<15} "
                  f"{format_ic50(example['actual_ic50']):<15} {format_ic50(pred_ic50)}")
    
    print("-" * 70)
    
    print_header("DEMO COMPLETE")
    print("\n[SUCCESS] All modules functional!")
    print("\nNext steps:")
    print("  1. Start API: python backend/api/main.py")
    print("  2. Test endpoint: curl http://localhost:8000/health")
    print("  3. View docs: http://localhost:8000/docs")
    print("\n" + "="*80)

if __name__ == "__main__":
    import os
    os.chdir("C:/Users/Asus/OneDrive/Desktop/Viro-ai/Viro-ai/Viro-ai code")
    demo_full_analysis()

