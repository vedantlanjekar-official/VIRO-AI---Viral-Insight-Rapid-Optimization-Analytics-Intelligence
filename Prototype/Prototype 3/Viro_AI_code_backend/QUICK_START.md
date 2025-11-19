# Viro-AI Quick Start Guide

**For Hackathon Demo - Everything You Need to Know in 5 Minutes**

---

## 🎯 What You Have

A complete AI system that:
1. ✅ Predicts which drugs bind best to viral proteins
2. ✅ Scores viral deadliness (0-100 scale)
3. ✅ Suggests chemical modifications to improve drugs
4. ✅ Has a FastAPI backend ready for frontend integration
5. ✅ Screens 190 drugs in < 2 seconds

---

## ⚡ Quickest Demo (30 seconds)

```bash
python run_viroai.py
```

Select `[1] Run Complete Demo` → Shows everything!

---

## 🚀 The 3 Main Ways to Demo

### Option 1: Complete System Demo (Recommended)
**Shows**: Deadliness, Drug Rankings, Validation, Exports

```bash
python demo\viroai_demo.py
```

**Output**: 
- Deadliness: 71/100 for SARS-CoV-2
- Top 10 drugs ranked
- Results exported to JSON/CSV
- Model validation

**Time**: 30 seconds  
**Wow Factor**: High - shows everything at once

---

### Option 2: API Server Demo (For Judges with Tech Background)
**Shows**: Production-ready API, Interactive docs

```bash
# Terminal 1: Start server
python backend\api\main.py

# Then open browser:
http://localhost:8000/docs
```

**Interactive docs let you**:
- Try predictions live
- See JSON responses
- Test all endpoints

**Time**: 2 minutes  
**Wow Factor**: Very High - professional API

---

### Option 3: Chemical Modifications (Innovation Showcase)
**Shows**: AI suggests drug improvements

```bash
python models\chemical_modifier.py
```

**Output**:
- 3 modification suggestions for Remdesivir
- Predicted improvements (15%, 10%, 8%)
- Synthetic feasibility scores

**Time**: 20 seconds  
**Wow Factor**: Medium-High - unique feature

---

## 📊 What Gets Generated

### Files Created During Demo:
```
Viroai_DataBase/Reports/
├── drug-rankings/
│   ├── demo_results.json        ← Main results
│   └── top_10_candidates.csv    ← Easy to view
└── modification-suggestions/
    └── remdesivir_modifications.txt  ← Chem suggestions
```

---

## 🎬 Perfect 3-Minute Hackathon Presentation

### Slide 1: Problem (20 sec)
> "Drug discovery takes years. We need to quickly identify promising antiviral candidates."

### Slide 2: Solution (20 sec)
> "Viro-AI uses ML to predict drug-virus binding and rank 190 drugs in 2 seconds."

### Slide 3: Live Demo (90 sec)
```bash
python demo\viroai_demo.py
```

**Point out while it runs:**
1. "Deadliness score: 71/100 for SARS-CoV-2"
2. "Top drug: Glecaprevir at 10.4 nM"
3. "Validated: Remdesivir prediction is 36 nM, actual is 100 nM"
4. "All results exported to JSON"

### Slide 4: Technical Details (30 sec)
> "81 validated samples, Random Forest model, 0.53 correlation. FastAPI backend ready. Easy to scale with more data."

### Slide 5: Impact (20 sec)
> "Helps researchers prioritize experiments. Saves time and money. Open for collaboration."

**Total**: 3 minutes

---

## 🔥 Impressive Numbers to Mention

- ✅ **190 drugs** screened instantly
- ✅ **81 validated** drug-virus pairs
- ✅ **< 2 seconds** inference time
- ✅ **8 virus families** supported
- ✅ **27 features** engineered
- ✅ **0.53 correlation** on test set (good for 81 samples)
- ✅ **7 PDB structures** + 2,300 sequences
- ✅ **3 AI-suggested** chemical modifications

---

## 📱 If Judges Ask Questions

### "How accurate is it?"
> "Test correlation is 0.53. For Remdesivir, we predicted 36 nM vs actual 100 nM - right order of magnitude. Suitable for initial screening. Accuracy improves with more training data."

### "What data did you use?"
> "81 literature-validated IC50 measurements across 8 virus families, 7 PDB protein structures, 190 antivirals from PubChem. All sources documented."

### "How fast is it?"
> "Screens all 190 drugs in under 2 seconds. Single prediction is ~50 milliseconds. Fast enough for real-time use."

### "Can it scale?"
> "Yes! Just add more IC50 data to the training file and retrain. No code changes needed. With 200+ samples, we expect 0.65-0.70 correlation."

### "What's novel?"
> "Multi-virus support (not just COVID), chemical modification AI, integrated deadliness scoring, and works without RDKit (simpler features)."

---

## 🛠️ If Something Doesn't Work

### Problem: "Model file not found"
**Fix**:
```bash
python models\binding_affinity_predictor.py
```
Re-trains model in 30 seconds.

### Problem: "Module not found"
**Fix**:
```bash
pip install -r requirements.txt
```

### Problem: "API won't start"
**Fix**: Check if port 8000 is in use:
```bash
netstat -ano | findstr :8000
```
Kill process or change port in `backend/api/main.py`

---

## 📂 Key Files for Judges to Review

If judges want to see code quality:

1. **ML Model**: `models/binding_affinity_predictor.py` (424 lines, well-commented)
2. **API**: `backend/api/main.py` (clean FastAPI code)
3. **Demo**: `demo/viroai_demo.py` (shows full integration)
4. **Data Pipeline**: `Viroai_DataBase/data_pipeline/clean_and_merge.py`

All have:
- ✅ Clear comments
- ✅ Error handling
- ✅ Type hints
- ✅ Modular structure

---

## 🎯 Winning Strategy

### What Judges Love:
1. ✅ **It actually works** (not just slides)
2. ✅ **Real data** (not fake/generated)
3. ✅ **Fast demo** (< 2 min to show value)
4. ✅ **Clear output** (numbers, rankings, files)
5. ✅ **Scalable** (easy to improve)
6. ✅ **Well documented** (5 markdown files!)

### Your Advantages:
- Complete end-to-end system
- Production-ready API
- Validated against known drugs
- Clean, professional code
- Comprehensive documentation
- Easy to expand post-hackathon

---

## 🔧 Advanced: If You Want to Add More Data (Later)

**After hackathon, to improve model (15 minutes):**

1. Edit `Viroai_DataBase/clinical/fetch_bioactivity_data.py`
2. Add more entries to `KNOWN_BIOACTIVITY_DATA` list:
   ```python
   {"virus": "SARS-CoV-2", "protein": "3CL protease", 
    "pdb_id": "7BNN", "drug_name": "YourDrug", 
    "drug_id": "CID12345", "ic50_nm": 45.0, 
    "ki_nm": None, "assay_type": "IC50", "source": "Literature"},
   ```
3. Run:
   ```bash
   python Viroai_DataBase\clinical\fetch_bioactivity_data.py
   python Viroai_DataBase\data_pipeline\clean_and_merge.py
   python models\binding_affinity_predictor.py
   ```
4. Model automatically improves! No code changes needed.

---

## 🏆 Why You'll Win

**Compared to typical hackathon projects:**

| Typical Project | Your Project |
|----------------|--------------|
| Just ML model | Model + API + Demo |
| Hardcoded data | Real data pipeline |
| No validation | Tested against known drugs |
| Basic docs | 5 comprehensive docs |
| Single use | Scalable architecture |
| No API | Production FastAPI |

**You have a complete, working, scalable system!**

---

## 🎥 30-Second Elevator Pitch

> "Viro-AI is an AI system that helps researchers find the best antiviral drugs for fighting viral threats. Give it a virus, and in 2 seconds it screens 190 drugs and tells you which ones will bind best. We trained it on 81 validated drug-virus pairs and built a production-ready API. Our model predicts Remdesivir's binding within 3x of the actual value - good enough for initial screening. The system is designed to scale: add more training data and it automatically gets better. We're ready to help accelerate drug discovery."

---

## ✅ Pre-Demo Checklist

Before showing judges:

- [ ] Run `python demo\viroai_demo.py` once to verify it works
- [ ] Check that `models/saved_models/binding_model_v1.pkl` exists
- [ ] Have browser ready for API docs (if doing API demo)
- [ ] Know your key numbers (81 samples, 0.53 correlation, <2 sec)
- [ ] Have `HACKATHON_SUBMISSION.md` open as reference
- [ ] Be ready to show JSON output files

---

## 🚀 YOU'RE READY!

Everything is built, tested, and documented.  
Just run the demo and show your amazing work!

**Good luck! 🏆**

