# Viro-AI API Documentation

**Base URL**: `http://localhost:8000`  
**Version**: 1.0.0  
**Last Updated**: October 9, 2025

---

## Quick Start

### 1. Start the API Server
```bash
python backend/api/main.py
```

Server will start at: `http://localhost:8000`  
Interactive docs: `http://localhost:8000/docs`

### 2. Test Health Endpoint
```bash
curl http://localhost:8000/health
```

---

## Endpoints

### GET `/` - API Root
Returns API information and available endpoints.

**Response:**
```json
{
  "message": "Viro-AI API - Drug-Virus Binding Prediction",
  "version": "1.0.0",
  "endpoints": [...]
}
```

---

### GET `/health` - Health Check
Check if API and model are loaded correctly.

**Response:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "drugs_loaded": true,
  "timestamp": "2025-10-09T16:30:00.000000"
}
```

---

### POST `/predict` - Predict Drug-Virus Binding

**Main endpoint** for drug screening and ranking.

#### Request Body:
```json
{
  "virus_id": "SARS-CoV-2",
  "protein_pdb_id": "6VXX",
  "drug_ids": ["CID121304016", "CID492405"],  // Optional: specific drugs
  "top_n": 10  // Number of top candidates to return
}
```

#### Parameters:
- `virus_id` (required): One of `SARS-CoV-2`, `Influenza`, `Ebola`
- `protein_pdb_id` (required): PDB ID of target protein
- `drug_ids` (optional): List of specific drug CIDs to test. If omitted, screens all 190 drugs
- `top_n` (optional): Number of top candidates to return (default: 10)

#### Example curl:
```bash
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "virus_id": "SARS-CoV-2",
    "protein_pdb_id": "6VXX",
    "top_n": 10
  }'
```

#### Response:
```json
{
  "request_id": "req_20251009_163000",
  "timestamp": "2025-10-09T16:30:00.000000",
  "virus": "SARS-CoV-2",
  "protein_name": "Spike Protein",
  "protein_pdb_id": "6VXX",
  "drugs_screened": 190,
  "top_candidates": [
    {
      "rank": 1,
      "drug_id": "CID155903259",
      "drug_name": "Nirmatrelvir",
      "predicted_affinity": 0.94,
      "confidence_score": 0.85,
      "estimated_ic50_nm": 3.1,
      "binding_strength": "strong",
      "molecular_weight": 499.5,
      "logP": 2.2,
      "smiles": "CC1(C2C1C(N(C2)C(=O)C(C(C)(C)C)NC(=O)C(F)(F)F)C(=O)NC(CC3CCNC3=O)C#N)C",
      "approval_status": "FDA Approved"
    },
    // ... 9 more candidates
  ],
  "deadliness_score": {
    "overall_score": 71,
    "risk_level": "HIGH",
    "transmissibility": 82,
    "immune_evasion": 75,
    "mortality_rate": 65,
    "infection_severity": 74
  },
  "model_version": "v1.0",
  "processing_time_ms": 1234
}
```

---

### GET `/top_drugs/{virus_id}` - Quick Drug Screening

Get top drug candidates for a specific virus (uses primary protein automatically).

#### Parameters:
- `virus_id` (path): Virus name (`SARS-CoV-2`, `Influenza`, `Ebola`)
- `limit` (query, optional): Number of drugs to return (default: 10)

#### Example:
```bash
curl "http://localhost:8000/top_drugs/SARS-CoV-2?limit=5"
```

#### Response:
Same format as `/predict` endpoint.

---

### GET `/viruses` - List Supported Viruses

Returns all supported viruses and their available protein structures.

#### Response:
```json
{
  "supported_viruses": ["SARS-CoV-2", "Influenza", "Ebola"],
  "proteins": {
    "SARS-CoV-2": {
      "6VXX": {"name": "Spike Protein", "pdb_path": "..."},
      "6VSB": {"name": "Spike RBD", "pdb_path": "..."},
      "7BNN": {"name": "Main Protease", "pdb_path": "..."}
    },
    // ... other viruses
  }
}
```

---

## Available Proteins by Virus

### SARS-CoV-2
- **6VXX** - Spike Protein (full length)
- **6VSB** - Spike Receptor Binding Domain (RBD)
- **7BNN** - Main Protease (Mpro / 3CLpro)

### Influenza
- **1RVX** - Hemagglutinin
- **4GMS** - Neuraminidase (NA)

### Ebola
- **5JQ3** - Glycoprotein (GP)
- **5JQ7** - GP Complex

---

## Response Fields Explained

### Drug Candidate Object

| Field | Type | Description |
|-------|------|-------------|
| `rank` | int | Ranking position (1 = best) |
| `drug_id` | str | PubChem CID (e.g., "CID121304016") |
| `drug_name` | str | Generic drug name |
| `predicted_affinity` | float | Binding score 0-1 (higher = better) |
| `confidence_score` | float | Model confidence 0-1 |
| `estimated_ic50_nm` | float | Predicted IC50 in nanomolar |
| `binding_strength` | str | "strong", "medium", or "weak" |
| `molecular_weight` | float | Molecular weight in Daltons |
| `logP` | float | Lipophilicity coefficient |
| `smiles` | str | SMILES molecular structure |
| `approval_status` | str | FDA approval status |

### Deadliness Score Object

| Field | Type | Description |
|-------|------|-------------|
| `overall_score` | int | 0-100 (higher = more dangerous) |
| `risk_level` | str | "CRITICAL", "HIGH", "MEDIUM", "LOW" |
| `transmissibility` | int | 0-100 (spread rate) |
| `immune_evasion` | int | 0-100 (antibody escape) |
| `mortality_rate` | int | 0-100 (lethality) |
| `infection_severity` | int | 0-100 (symptom severity) |

---

## Error Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | Success | Request processed successfully |
| 404 | Not Found | Virus or protein not in database |
| 503 | Service Unavailable | Model not loaded |
| 500 | Server Error | Internal error occurred |

---

## Usage Examples

### Example 1: Screen All Drugs for SARS-CoV-2
```python
import requests

response = requests.post("http://localhost:8000/predict", json={
    "virus_id": "SARS-CoV-2",
    "protein_pdb_id": "7BNN",  # Main Protease
    "top_n": 10
})

results = response.json()
print(f"Top drug: {results['top_candidates'][0]['drug_name']}")
print(f"Deadliness: {results['deadliness_score']['overall_score']}/100")
```

### Example 2: Test Specific Drugs
```python
response = requests.post("http://localhost:8000/predict", json={
    "virus_id": "Influenza",
    "protein_pdb_id": "4GMS",  # Neuraminidase
    "drug_ids": ["CID65028", "CID60855", "CID150610"],  # Tamiflu, Relenza, Peramivir
    "top_n": 3
})
```

### Example 3: Quick Top Drugs
```bash
curl "http://localhost:8000/top_drugs/Ebola?limit=5"
```

---

## Performance

- **Average Response Time**: < 2 seconds (190 drug screening)
- **Model Accuracy**: Training correlation 0.77, Test correlation 0.38
- **Throughput**: Can handle concurrent requests

---

## Model Information

**Model Type**: Random Forest Regressor  
**Features**: 17 (SMILES-based + molecular properties)  
**Training Data**: 51 drug-virus pairs  
**Validation**: 13 pairs  
**Test Set**: 17 pairs  

**Limitations**:
- Predictions are estimates based on limited training data (81 samples)
- Works best for drugs similar to training set
- For research purposes - not clinical recommendations

---

## Support

For issues or questions:
- Check interactive docs: `http://localhost:8000/docs`
- Review demo: `python demo/viroai_demo.py`
- Test endpoints: See examples above

**Built for**: 24-Hour Hackathon  
**Team**: Viro-AI

