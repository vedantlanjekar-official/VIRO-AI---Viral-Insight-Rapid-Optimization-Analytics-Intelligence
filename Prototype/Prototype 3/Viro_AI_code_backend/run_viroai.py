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
    print("\n[1] Run Complete Demo (See all outputs)")
    print("[2] Start API Server (Backend for frontend)")
    print("[3] Train/Retrain Model (If data updated)")
    print("[4] Run API Tests (Requires server running)")
    print("[5] Show Chemical Modifications (For best drug)")
    print("[6] View Project Status")
    print("[7] Exit")
    print("\n" + "="*70)

def run_demo():
    """Run complete system demo."""
    print("\n[LAUNCH] Running Viro-AI Demo...")
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
        choice = input("\nEnter choice (1-7): ").strip()
        
        if choice == '1':
            run_demo()
        elif choice == '2':
            start_api()
        elif choice == '3':
            train_model()
        elif choice == '4':
            run_tests()
        elif choice == '5':
            show_modifications()
        elif choice == '6':
            show_status()
        elif choice == '7':
            print("\n[EXIT] Goodbye!")
            break
        else:
            print("\n[ERROR] Invalid choice. Please enter 1-7.")
        
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

