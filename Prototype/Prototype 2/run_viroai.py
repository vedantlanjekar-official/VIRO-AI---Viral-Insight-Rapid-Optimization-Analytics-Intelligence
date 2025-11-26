# run_viroai.py
"""
Master launcher for Viro-AI system
Provides easy access to all features
"""

import sys
import subprocess

def print_menu():
    """Display main menu."""
    print("\n" + "="*70)
    print("  VIRO-AI SYSTEM LAUNCHER")
    print("="*70)
    print("\n[1] Run COMPLETE Demo (ALL features + 3D viz + Mutations)")
    print("[2] Run Basic Demo (Drug ranking only)")
    print("[3] Start API Server (Backend for frontend)")
    print("[4] Train/Retrain Model (If data updated)")
    print("[5] Run API Tests (Requires server running)")
    print("[6] Show Chemical Modifications (For best drug)")
    print("[7] Mutation Prediction Demo")
    print("[8] 3D Visualization Demo")
    print("[9] Exit")
    print("\n" + "="*70)

def run_complete_demo():
    """Run COMPLETE system demo with ALL features."""
    print("\n[LAUNCH] Running COMPLETE Viro-AI Demo...")
    print("[INFO] Includes: Deadliness, Drugs, Mutations, 3D Viz, Export")
    subprocess.run([sys.executable, "demo/viroai_complete_demo.py"])

def run_basic_demo():
    """Run basic demo (drug ranking only)."""
    print("\n[LAUNCH] Running Basic Viro-AI Demo...")
    subprocess.run([sys.executable, "demo/viroai_demo.py"])

def start_api():
    """Start FastAPI server."""
    print("\n[LAUNCH] Starting API Server...")
    print("[INFO] Server will start at http://localhost:8000")
    print("[INFO] Interactive docs at http://localhost:8000/docs")
    print("[INFO] Press Ctrl+C to stop\n")
    subprocess.run([sys.executable, "backend/api/main.py"])

def train_model():
    """Train or retrain model."""
    print("\n[LAUNCH] Training model...")
    subprocess.run([sys.executable, "models/binding_affinity_predictor.py"])

def run_tests():
    """Run API test suite."""
    print("\n[LAUNCH] Running API tests...")
    print("[WARNING] Make sure API server is running first!")
    subprocess.run([sys.executable, "tests/test_api.py"])

def show_modifications():
    """Show chemical modification suggestions."""
    print("\n[LAUNCH] Chemical Modification Suggester...")
    subprocess.run([sys.executable, "models/chemical_modifier.py"])

def run_mutation_prediction():
    """Run mutation prediction demo."""
    print("\n[LAUNCH] Future Mutation Prediction...")
    subprocess.run([sys.executable, "models/mutation_predictor.py"])

def run_3d_visualization():
    """Run 3D visualization demo."""
    print("\n[LAUNCH] 3D Molecular Visualization...")
    subprocess.run([sys.executable, "visualization/molecular_3d.py"])

def show_status():
    """Display project status."""
    try:
        with open("PROJECT_STATUS.md", 'r') as f:
            print("\n" + f.read())
    except:
        print("[ERROR] PROJECT_STATUS.md not found")

def main():
    """Main launcher loop."""
    while True:
        print_menu()
        choice = input("\nEnter choice (1-9): ").strip()
        
        if choice == '1':
            run_complete_demo()
        elif choice == '2':
            run_basic_demo()
        elif choice == '3':
            start_api()
        elif choice == '4':
            train_model()
        elif choice == '5':
            run_tests()
        elif choice == '6':
            show_modifications()
        elif choice == '7':
            run_mutation_prediction()
        elif choice == '8':
            run_3d_visualization()
        elif choice == '9':
            print("\n[EXIT] Goodbye!")
            break
        else:
            print("\n[ERROR] Invalid choice. Please enter 1-9.")
        
        input("\nPress Enter to continue...")

if __name__ == "__main__":
    print("\n" + "#"*70)
    print("#" + " "*68 + "#")
    print("#" + "  VIRO-AI: Drug-Virus Binding Prediction System".center(68) + "#")
    print("#" + "  24-Hour Hackathon Project".center(68) + "#")
    print("#" + " "*68 + "#")
    print("#"*70)
    
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n[EXIT] Interrupted by user. Goodbye!")

