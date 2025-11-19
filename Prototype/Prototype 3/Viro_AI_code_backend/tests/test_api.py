# test_api.py
"""
Comprehensive API testing suite for Viro-AI
Tests all endpoints and validates responses
"""

import sys
sys.path.append('.')

import requests
import json
import time

BASE_URL = "http://localhost:8000"

def test_health():
    """Test health check endpoint."""
    print("\n[TEST 1] Health Check...")
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=5)
        assert response.status_code == 200
        data = response.json()
        assert data['status'] == 'healthy'
        assert data['model_loaded'] == True
        print("  [PASS] Health check successful")
        return True
    except Exception as e:
        print(f"  [FAIL] {str(e)}")
        return False

def test_list_viruses():
    """Test virus listing endpoint."""
    print("\n[TEST 2] List Viruses...")
    try:
        response = requests.get(f"{BASE_URL}/viruses", timeout=5)
        assert response.status_code == 200
        data = response.json()
        assert 'SARS-CoV-2' in data['supported_viruses']
        assert 'Influenza' in data['supported_viruses']
        print(f"  [PASS] Found {len(data['supported_viruses'])} viruses")
        return True
    except Exception as e:
        print(f"  [FAIL] {str(e)}")
        return False

def test_single_drug_prediction():
    """Test prediction with single drug."""
    print("\n[TEST 3] Single Drug Prediction...")
    try:
        payload = {
            "virus_id": "SARS-CoV-2",
            "protein_pdb_id": "7BNN",
            "drug_ids": ["CID121304016"],  # Remdesivir
            "top_n": 1
        }
        
        start = time.time()
        response = requests.post(f"{BASE_URL}/predict", json=payload, timeout=10)
        latency = (time.time() - start) * 1000
        
        assert response.status_code == 200
        data = response.json()
        assert len(data['top_candidates']) == 1
        assert data['virus'] == 'SARS-CoV-2'
        assert 'deadliness_score' in data
        
        print(f"  [PASS] Prediction successful")
        print(f"  [INFO] Latency: {latency:.0f} ms")
        print(f"  [INFO] Top drug: {data['top_candidates'][0]['drug_name']}")
        return True
    except Exception as e:
        print(f"  [FAIL] {str(e)}")
        return False

def test_batch_prediction():
    """Test batch prediction with multiple drugs."""
    print("\n[TEST 4] Batch Prediction (10 drugs)...")
    try:
        payload = {
            "virus_id": "Influenza",
            "protein_pdb_id": "4GMS",
            "drug_ids": [
                "CID65028", "CID60855", "CID150610", "CID492405", "CID37542",
                "CID2130", "CID5071", "CID121304016", "CID131411", "CID3652"
            ],
            "top_n": 10
        }
        
        start = time.time()
        response = requests.post(f"{BASE_URL}/predict", json=payload, timeout=10)
        latency = (time.time() - start) * 1000
        
        assert response.status_code == 200
        data = response.json()
        assert len(data['top_candidates']) == 10
        
        # Check latency requirement (< 2 seconds)
        assert latency < 2000, f"Latency too high: {latency}ms"
        
        print(f"  [PASS] Batch prediction successful")
        print(f"  [INFO] Latency: {latency:.0f} ms (< 2000 ms target)")
        return True
    except Exception as e:
        print(f"  [FAIL] {str(e)}")
        return False

def test_all_drugs_screening():
    """Test screening all drugs (performance test)."""
    print("\n[TEST 5] Full Drug Library Screening (190 drugs)...")
    try:
        payload = {
            "virus_id": "SARS-CoV-2",
            "protein_pdb_id": "6VXX",
            "top_n": 10
        }
        
        start = time.time()
        response = requests.post(f"{BASE_URL}/predict", json=payload, timeout=15)
        latency = (time.time() - start) * 1000
        
        assert response.status_code == 200
        data = response.json()
        assert data['drugs_screened'] > 100
        assert len(data['top_candidates']) == 10
        
        print(f"  [PASS] Screened {data['drugs_screened']} drugs")
        print(f"  [INFO] Latency: {latency:.0f} ms")
        return True
    except Exception as e:
        print(f"  [FAIL] {str(e)}")
        return False

def test_top_drugs_endpoint():
    """Test convenient top_drugs endpoint."""
    print("\n[TEST 6] Top Drugs Endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/top_drugs/Ebola?limit=5", timeout=10)
        assert response.status_code == 200
        data = response.json()
        assert len(data['top_candidates']) == 5
        assert data['virus'] == 'Ebola'
        
        print(f"  [PASS] Top drugs retrieved")
        print(f"  [INFO] #1 drug: {data['top_candidates'][0]['drug_name']}")
        return True
    except Exception as e:
        print(f"  [FAIL] {str(e)}")
        return False

def test_invalid_virus():
    """Test error handling for invalid virus."""
    print("\n[TEST 7] Invalid Virus Handling...")
    try:
        payload = {
            "virus_id": "InvalidVirus",
            "protein_pdb_id": "9999",
            "top_n": 5
        }
        response = requests.post(f"{BASE_URL}/predict", json=payload, timeout=5)
        assert response.status_code == 404
        print("  [PASS] Correctly returns 404 for invalid virus")
        return True
    except Exception as e:
        print(f"  [FAIL] {str(e)}")
        return False

def test_deadliness_scores():
    """Validate deadliness scores are present."""
    print("\n[TEST 8] Deadliness Score Validation...")
    try:
        payload = {
            "virus_id": "SARS-CoV-2",
            "protein_pdb_id": "7BNN",
            "top_n": 3
        }
        response = requests.post(f"{BASE_URL}/predict", json=payload, timeout=10)
        assert response.status_code == 200
        data = response.json()
        
        deadliness = data['deadliness_score']
        assert 'overall_score' in deadliness
        assert 0 <= deadliness['overall_score'] <= 100
        assert deadliness['risk_level'] in ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']
        
        print(f"  [PASS] Deadliness score valid")
        print(f"  [INFO] Score: {deadliness['overall_score']}/100 ({deadliness['risk_level']})")
        return True
    except Exception as e:
        print(f"  [FAIL] {str(e)}")
        return False

def run_all_tests():
    """Run all API tests."""
    print("\n" + "="*80)
    print("VIRO-AI API TEST SUITE")
    print("="*80)
    print("\n[INFO] Make sure API server is running:")
    print("       python backend/api/main.py")
    print("\n" + "="*80)
    
    tests = [
        test_health,
        test_list_viruses,
        test_single_drug_prediction,
        test_batch_prediction,
        test_all_drugs_screening,
        test_top_drugs_endpoint,
        test_invalid_virus,
        test_deadliness_scores
    ]
    
    results = []
    for test_func in tests:
        result = test_func()
        results.append(result)
    
    # Summary
    passed = sum(results)
    total = len(results)
    
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    print(f"Tests Passed: {passed}/{total}")
    print(f"Success Rate: {passed/total*100:.0f}%")
    
    if passed == total:
        print("\n[SUCCESS] All tests passed!")
    elif passed >= total * 0.75:
        print("\n[OK] Most tests passed - system functional")
    else:
        print("\n[WARNING] Multiple test failures - check API")
    
    print("="*80)
    
    return passed == total

if __name__ == "__main__":
    # Note: API server must be running separately
    print("\n[NOTE] This test requires API server to be running.")
    print("[NOTE] Start server first: python backend/api/main.py")
    print("\nPress Enter to continue with tests, or Ctrl+C to cancel...")
    
    try:
        input()
        success = run_all_tests()
        exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\n[CANCELLED] Tests not run")
        exit(1)

