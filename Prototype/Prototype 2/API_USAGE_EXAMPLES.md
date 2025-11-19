# Viro-AI Backend - API Usage Examples

## Quick Start

The Viro-AI backend is running at: **http://localhost:8000**

### Interactive Documentation
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

---

## Basic Endpoints

### 1. Health Check
```bash
curl http://localhost:8000/health
```

### 2. List Supported Viruses
```bash
curl http://localhost:8000/viruses
```

---

## Prediction Examples

### Example 1: SARS-CoV-2 Spike Protein

**PowerShell:**
```powershell
$body = @{
    virus_id = "SARS-CoV-2"
    protein_pdb_id = "6VXX"
    top_n = 10
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:8000/predict" `
    -Method POST `
    -Body $body `
    -ContentType "application/json" `
    -UseBasicParsing | Select-Object -ExpandProperty Content | ConvertFrom-Json
```

**cURL:**
```bash
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "virus_id": "SARS-CoV-2",
    "protein_pdb_id": "6VXX",
    "top_n": 10
  }'
```

### Example 2: Influenza Hemagglutinin

**PowerShell:**
```powershell
$body = @{
    virus_id = "Influenza"
    protein_pdb_id = "1RVX"
    top_n = 5
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:8000/predict" `
    -Method POST -Body $body -ContentType "application/json"
```

**cURL:**
```bash
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "virus_id": "Influenza",
    "protein_pdb_id": "1RVX",
    "top_n": 5
  }'
```

### Example 3: Ebola Glycoprotein

**PowerShell:**
```powershell
$body = @{
    virus_id = "Ebola"
    protein_pdb_id = "5JQ3"
    top_n = 10
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:8000/predict" `
    -Method POST -Body $body -ContentType "application/json"
```

**cURL:**
```bash
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "virus_id": "Ebola",
    "protein_pdb_id": "5JQ3",
    "top_n": 10
  }'
```

---

## Quick Drug Screening

Get top drug candidates for a virus without specifying a protein:

### SARS-CoV-2
```bash
curl "http://localhost:8000/top_drugs/SARS-CoV-2?limit=5"
```

### Influenza
```bash
curl "http://localhost:8000/top_drugs/Influenza?limit=5"
```

### Ebola
```bash
curl "http://localhost:8000/top_drugs/Ebola?limit=5"
```

---

## Specific Drug Screening

Screen only specific drugs by their IDs:

**PowerShell:**
```powershell
$body = @{
    virus_id = "SARS-CoV-2"
    protein_pdb_id = "6VXX"
    drug_ids = @("CID67683334", "CID25077993", "CID5329102")
    top_n = 3
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:8000/predict" `
    -Method POST -Body $body -ContentType "application/json"
```

**cURL:**
```bash
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "virus_id": "SARS-CoV-2",
    "protein_pdb_id": "6VXX",
    "drug_ids": ["CID67683334", "CID25077993", "CID5329102"],
    "top_n": 3
  }'
```

---

## Cache Management

### Check Cache Stats
```bash
curl http://localhost:8000/cache/stats
```

### Clear Cache
```bash
curl -X POST http://localhost:8000/cache/clear
```

---

## Available Proteins by Virus

### SARS-CoV-2
- `6VXX` - Spike Protein
- `6VSB` - Spike RBD
- `7BNN` - Main Protease (Mpro)

### Influenza
- `1RVX` - Hemagglutinin
- `4GMS` - Neuraminidase

### Ebola
- `5JQ3` - Glycoprotein (GP)
- `5JQ7` - GP Complex

---

## Response Format

All prediction responses include:

```json
{
  "request_id": "req_20251009_220213",
  "timestamp": "2025-10-09T22:02:13.862593",
  "virus": "SARS-CoV-2",
  "protein_name": "Spike Protein",
  "protein_pdb_id": "6VXX",
  "drugs_screened": 190,
  "top_candidates": [
    {
      "rank": 1,
      "drug_id": "CID67683334",
      "drug_name": "Glecaprevir",
      "predicted_affinity": 1.0,
      "confidence_score": 0.85,
      "estimated_ic50_nm": 2.5,
      "binding_strength": "strong",
      "molecular_weight": 853.8,
      "logP": 5.2,
      "smiles": "...",
      "approval_status": "Research compound"
    }
  ],
  "deadliness_score": {
    "overall_score": 73,
    "risk_level": "HIGH",
    "transmissibility": 82,
    "immune_evasion": 75,
    "mortality_rate": 65,
    "infection_severity": 74
  },
  "model_version": "v1.0-finetuned",
  "processing_time_ms": 78,
  "cached": false
}
```

---

## Error Handling

The API returns appropriate HTTP status codes:

- `200 OK` - Successful prediction
- `404 Not Found` - Virus or protein not found
- `422 Unprocessable Entity` - Invalid request parameters
- `500 Internal Server Error` - Server error
- `503 Service Unavailable` - Model not loaded

---

## Performance Tips

1. **Use caching:** Identical requests are cached for 1 hour
2. **Limit results:** Use `top_n` parameter to get only what you need
3. **Specific drugs:** Screen specific drugs when you know what to test
4. **Quick endpoint:** Use `/top_drugs/{virus_id}` for fast screening

---

## Python Client Example

```python
import requests

# Predict top drugs for SARS-CoV-2
url = "http://localhost:8000/predict"
payload = {
    "virus_id": "SARS-CoV-2",
    "protein_pdb_id": "6VXX",
    "top_n": 10
}

response = requests.post(url, json=payload)
data = response.json()

print(f"Virus: {data['virus']}")
print(f"Protein: {data['protein_name']}")
print(f"Deadliness: {data['deadliness_score']['overall_score']}/100")
print(f"\nTop 5 Drug Candidates:")

for drug in data['top_candidates'][:5]:
    print(f"{drug['rank']}. {drug['drug_name']}")
    print(f"   IC50: {drug['estimated_ic50_nm']} nM")
    print(f"   Binding: {drug['binding_strength']}")
```

---

## Stopping the Server

To stop the backend server:
```powershell
Get-Process | Where-Object {$_.ProcessName -eq "python"} | Stop-Process
```

Or press `Ctrl+C` in the terminal where the server is running.

---

*Viro-AI v1.0.1-finetuned - Drug-Virus Binding Affinity Prediction System*

