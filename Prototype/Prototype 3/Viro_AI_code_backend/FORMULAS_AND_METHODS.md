# Viro-AI: Mathematical Formulas & Prediction Methods

**Complete explanation of all calculations and algorithms used in the system**

---

## 📐 Table of Contents

1. [Binding Affinity Prediction](#1-binding-affinity-prediction)
2. [Feature Engineering](#2-feature-engineering)
3. [Data Transformation](#3-data-transformation)
4. [Deadliness Scoring](#4-deadliness-scoring)
5. [Chemical Modification Predictions](#5-chemical-modification-predictions)
6. [Ranking & Normalization](#6-ranking--normalization)
7. [Model Evaluation Metrics](#7-model-evaluation-metrics)

---

## 1. Binding Affinity Prediction

### 1.1 Core ML Model: Random Forest Regressor

**Algorithm**: Ensemble of 300 decision trees

**Mathematical Representation**:
```
ŷ = (1/N) × Σᵢ₌₁ᴺ Tᵢ(X)

where:
  ŷ = predicted pIC50 value
  N = 300 (number of trees)
  Tᵢ(X) = prediction from tree i given features X
  X = 27-dimensional feature vector
```

**Model Parameters**:
- `n_estimators = 300` trees
- `max_depth = 4` (prevents overfitting)
- `min_samples_split = 8` (conservative splitting)
- `min_samples_leaf = 3` (minimum samples per leaf)
- `max_features = 'sqrt'` → √27 ≈ 5 features per split
- `random_state = 42` (reproducibility)

**Training Loss**:
```
MSE = (1/n) × Σᵢ₌₁ⁿ (yᵢ - ŷᵢ)²

where:
  n = number of training samples
  yᵢ = actual pIC50 value
  ŷᵢ = predicted pIC50 value
```

---

## 2. Feature Engineering

### 2.1 SMILES-Based Features (25 features)

**Feature Extraction from SMILES String**:

#### **Basic Atomic Composition** (9 features):
```python
F₁ = length(SMILES)                    # Total string length
F₂ = count('C')                        # Carbon atoms
F₃ = count('N')                        # Nitrogen atoms
F₄ = count('O')                        # Oxygen atoms
F₅ = count('S')                        # Sulfur atoms
F₆ = count('F')                        # Fluorine atoms
F₇ = count('Cl')                       # Chlorine atoms
F₈ = count('Br')                       # Bromine atoms
F₉ = count('P')                        # Phosphorus atoms
```

#### **Structural Features** (8 features):
```python
F₁₀ = count('=')                       # Double bonds
F₁₁ = count('#')                       # Triple bonds
F₁₂ = count('(')                       # Branch points
F₁₃ = count('[')                       # Charged atoms
F₁₄ = count('@')                       # Chiral centers
F₁₅ = has_aromatic(SMILES)            # Aromatic rings (binary)
F₁₆ = count('1') + count('2') + count('3')  # Ring closures
F₁₇ = count('-') + count('+')         # Formal charges
```

#### **Drug-Likeness Features** (4 features):
```python
F₁₈ = count('O') + count('N')         # H-bond donors/acceptors
F₁₉ = count('=O')                      # Carbonyl groups
F₂₀ = count('NH')                      # Amine groups
F₂₁ = count('OH')                      # Hydroxyl groups
```

#### **Complexity Measures** (4 features):
```python
F₂₂ = length(SMILES) / (count('C') + 1)              # Heteroatom ratio
F₂₃ = (count('=') + count('#')) / (length(SMILES) + 1)  # Unsaturation index
F₂₄ = count('(') / (length(SMILES) + 1)              # Branching ratio
F₂₅ = (count('1') + count('2') + count('3')) / (length(SMILES) + 1)  # Ring density
```

### 2.2 Molecular Property Features (2 features)

```python
F₂₆ = molecular_weight (Da)            # Calculated from SMILES
F₂₇ = logP (partition coefficient)     # Lipophilicity estimate
```

**Total Feature Vector**:
```
X = [F₁, F₂, ..., F₂₇] ∈ ℝ²⁷
```

---

## 3. Data Transformation

### 3.1 IC50 to pIC50 Conversion

**Formula**:
```
pIC50 = -log₁₀(IC50_M)

where:
  IC50_M = IC50 in molar units (M)
  IC50_nM = IC50 in nanomolar units (nM)
  
Conversion:
  IC50_M = IC50_nM × 10⁻⁹
  
Therefore:
  pIC50 = -log₁₀(IC50_nM × 10⁻⁹)
  pIC50 = -log₁₀(IC50_nM) - log₁₀(10⁻⁹)
  pIC50 = -log₁₀(IC50_nM) + 9
```

**Example**:
```
If IC50 = 100 nM:
  pIC50 = -log₁₀(100 × 10⁻⁹)
  pIC50 = -log₁₀(10⁻⁷)
  pIC50 = 7.0
```

**Interpretation**:
- pIC50 > 7 (IC50 < 100 nM) = **Strong binder**
- pIC50 5-7 (IC50 100 nM - 10 μM) = **Medium binder**
- pIC50 < 5 (IC50 > 10 μM) = **Weak binder**

### 3.2 pIC50 to IC50 Back-Conversion

**Formula**:
```
IC50_nM = 10⁽⁹ ⁻ ᵖᴵᶜ⁵⁰⁾

Example:
  If pIC50 = 7.5:
  IC50_nM = 10⁽⁹ ⁻ ⁷·⁵⁾ = 10¹·⁵ ≈ 31.6 nM
```

### 3.3 Feature Scaling

**StandardScaler** (Z-score normalization):
```
X_scaled = (X - μ) / σ

where:
  μ = mean(X_train) for each feature
  σ = std(X_train) for each feature
  
For feature j:
  X_scaled[j] = (X[j] - μⱼ) / σⱼ
```

**Benefits**:
- Zero mean: E[X_scaled] = 0
- Unit variance: Var(X_scaled) = 1
- Improves model convergence

---

## 4. Deadliness Scoring

### 4.1 Overall Deadliness Score

**Formula**:
```
Deadliness = (T + I + M + S) / 4 × 0.96

where:
  T = Transmissibility score (0-100)
  I = Immune evasion score (0-100)
  M = Mortality rate score (0-100)
  S = Infection severity score (0-100)
  
0.96 = calibration factor
```

**Example (SARS-CoV-2)**:
```
T = 82 (high airborne transmission)
I = 75 (moderate immune escape)
M = 65 (moderate mortality)
S = 74 (severe respiratory symptoms)

Deadliness = (82 + 75 + 65 + 74) / 4 × 0.96
           = 296 / 4 × 0.96
           = 74 × 0.96
           = 71 / 100
```

### 4.2 Risk Classification

**Thresholds**:
```
Risk Level = {
  CRITICAL  if Deadliness ≥ 80
  HIGH      if 60 ≤ Deadliness < 80
  MEDIUM    if 40 ≤ Deadliness < 60
  LOW       if Deadliness < 40
}
```

### 4.3 Component Score Calculation

**Transmissibility (T)**:
```
T = R₀_normalized × 0.6 + transmission_route × 0.4

where:
  R₀_normalized = (R₀ / 15) × 100  (capped at 15)
  transmission_route = {
    100  for airborne
    70   for droplet
    40   for contact
    20   for bloodborne
  }
```

**Immune Evasion (I)**:
```
I = antibody_escape × 0.5 + mutation_rate × 0.3 + immune_suppression × 0.2

where each component is scored 0-100
```

**Mortality Rate (M)**:
```
M = CFR × 100

where CFR = Case Fatality Rate (0-1)
```

**Infection Severity (S)**:
```
S = hospitalization_rate × 0.5 + organ_damage × 0.3 + symptom_severity × 0.2

where each component is scored 0-100
```

---

## 5. Chemical Modification Predictions

### 5.1 Predicted IC50 After Modification

**Formula**:
```
IC50_modified = IC50_original × (1 - improvement_percent / 100)

where:
  improvement_percent = expected binding improvement (%)
```

**Example (Fluorination)**:
```
IC50_original = 100 nM
Improvement = 15%

IC50_modified = 100 × (1 - 15/100)
              = 100 × 0.85
              = 85 nM
```

### 5.2 Modification Confidence Score

**Formula**:
```
Confidence = literature_success_rate × synthetic_feasibility

where:
  literature_success_rate = historical success rate (0-1)
  synthetic_feasibility = ease of synthesis (0-1)
```

**Modification Types & Expected Improvements**:

| Modification | Formula | Binding Δ | Confidence |
|-------------|---------|-----------|------------|
| Fluorination | R-H → R-F | +15-25% | 0.82 |
| Methylation | Ar-H → Ar-CH₃ | +8-15% | 0.75 |
| Hydroxylation | Ar-H → Ar-OH | +10-18% | 0.78 |
| Chlorination | Ar-H → Ar-Cl | +5-12% | 0.70 |
| N-Introduction | C → N (in ring) | +6-14% | 0.68 |

---

## 6. Ranking & Normalization

### 6.1 Binding Score (0-1 Scale)

**Min-Max Normalization**:
```
Binding_Score = (pIC50 - pIC50_min) / (pIC50_max - pIC50_min)

where:
  pIC50_min = minimum predicted pIC50 in batch
  pIC50_max = maximum predicted pIC50 in batch
```

**Properties**:
- Range: [0, 1]
- 1.0 = best binder in the batch
- 0.0 = worst binder in the batch

### 6.2 Drug Ranking

**Sorting Algorithm**:
```
Rank = argsort(-Binding_Score)

Drugs sorted descending by Binding_Score
Rank 1 = highest Binding_Score
Rank N = lowest Binding_Score
```

---

## 7. Model Evaluation Metrics

### 7.1 Root Mean Square Error (RMSE)

```
RMSE = √[(1/n) × Σᵢ₌₁ⁿ (yᵢ - ŷᵢ)²]

where:
  n = number of test samples
  yᵢ = actual pIC50
  ŷᵢ = predicted pIC50
```

**Current Performance**:
- Training RMSE: 1.08
- Validation RMSE: 1.56
- Test RMSE: 1.40

### 7.2 Pearson Correlation Coefficient

```
r = Σᵢ(xᵢ - x̄)(yᵢ - ȳ) / √[Σᵢ(xᵢ - x̄)² × Σᵢ(yᵢ - ȳ)²]

where:
  x = actual pIC50 values
  y = predicted pIC50 values
  x̄, ȳ = means
```

**Current Performance**:
- Training Correlation: 0.759
- Validation Correlation: 0.158
- Test Correlation: **0.527** ✅

### 7.3 R² Score (Coefficient of Determination)

```
R² = 1 - (SS_res / SS_tot)

where:
  SS_res = Σᵢ(yᵢ - ŷᵢ)²  (residual sum of squares)
  SS_tot = Σᵢ(yᵢ - ȳ)²   (total sum of squares)
```

**Interpretation**:
- R² = 1: Perfect predictions
- R² = 0: Model no better than mean
- R² < 0: Model worse than mean

**Current Performance**:
- Test R²: 0.237

### 7.4 Mean Absolute Error (MAE)

```
MAE = (1/n) × Σᵢ₌₁ⁿ |yᵢ - ŷᵢ|

```

**Current Performance**:
- Test MAE: 1.13 pIC50 units

---

## 8. Complete Prediction Pipeline

### Step-by-Step Mathematical Flow:

```
[1] INPUT: Drug SMILES string
        ↓
[2] FEATURE EXTRACTION (27 features)
    X_raw = extract_features(SMILES)
        ↓
[3] FEATURE SCALING
    X_scaled = (X_raw - μ) / σ
        ↓
[4] RANDOM FOREST PREDICTION
    pIC50 = (1/300) × Σᵢ₌₁³⁰⁰ Treeᵢ(X_scaled)
        ↓
[5] IC50 CONVERSION
    IC50_nM = 10^(9 - pIC50)
        ↓
[6] BINDING SCORE NORMALIZATION
    Binding_Score = (pIC50 - min) / (max - min)
        ↓
[7] STRENGTH CLASSIFICATION
    Strength = classify(pIC50)
        ↓
[8] RANKING
    Rank = argsort(-Binding_Score)
        ↓
[9] OUTPUT: Ranked drug list with IC50 estimates
```

---

## 9. Example Calculation

**Input**: Remdesivir
- SMILES: `CCC(CC)COC(=O)C(C)NP(=O)(OCC1C...`
- Mol Weight: 602.6 Da
- logP: 2.5

**Step 1: Feature Extraction**
```
X = [106, 27, 9, 13, 2, 0, 0, 0, 2, 8, 1, 4, 2, 3, 1, 8, 0, 22, 1, 2, 0, 3.93, 0.08, 0.04, 0.08, 602.6, 2.5]
     ↑    ↑   ↑  ↑   ↑  ↑  ↑  ↑  ↑  ↑  ↑  ↑  ↑  ↑  ↑  ↑  ↑  ↑   ↑  ↑  ↑  ↑     ↑     ↑     ↑     ↑      ↑
    len  C   N  O   S  F  Cl Br P  =  #  (  [  @  ar rc ch HB C= NH OH het  unsat bran ring  MW    logP
```

**Step 2: Scaling**
```
X_scaled = (X - μ_train) / σ_train
```

**Step 3: Prediction**
```
pIC50_predicted = RandomForest.predict(X_scaled)
                = 7.39
```

**Step 4: IC50 Conversion**
```
IC50_predicted = 10^(9 - 7.39)
               = 10^1.61
               = 40.3 nM
```

**Step 5: Comparison**
```
Actual IC50: 100 nM (pIC50 = 7.0)
Predicted IC50: 40.3 nM (pIC50 = 7.39)
Error: 0.39 pIC50 units (2.5x in IC50)
Status: ✅ Right order of magnitude
```

---

## 10. Statistical Validation

### Cross-Validation Strategy

**5-Fold Cross-Validation** (during hyperparameter tuning):
```
For k = 1 to 5:
  Split data into 5 folds
  Use fold k as validation
  Train on remaining 4 folds
  Calculate R² on fold k

Average R² = (1/5) × Σₖ R²ₖ
```

### Stratified Splitting

**Ensures virus distribution balance**:
```
For each virus v:
  n_train_v = round(n_v × 0.70)
  n_val_v = round(n_v × 0.20)
  n_test_v = n_v - n_train_v - n_val_v
```

---

## 🎯 Summary of Key Formulas

| Calculation | Formula | Used For |
|-------------|---------|----------|
| **pIC50 Conversion** | `pIC50 = -log₁₀(IC50 × 10⁻⁹)` | Data normalization |
| **IC50 Prediction** | `IC50 = 10^(9 - pIC50)` | Output conversion |
| **Binding Score** | `(pIC50 - min) / (max - min)` | Ranking drugs |
| **Deadliness** | `(T+I+M+S) / 4 × 0.96` | Risk assessment |
| **Feature Scaling** | `(X - μ) / σ` | ML preprocessing |
| **Random Forest** | `(1/N) × Σ Tree(X)` | Prediction |
| **RMSE** | `√(Σ(y - ŷ)² / n)` | Model evaluation |
| **Correlation** | `Cov(X,Y) / (σₓ × σᵧ)` | Accuracy metric |

---

## 📚 References & Rationale

### Why pIC50 Instead of IC50?
- **Log scale** better for ML: Values distributed more normally
- **Smaller range**: 4-10 vs 0.1-100,000 nM
- **Linear relationships**: Drug properties correlate linearly with pIC50
- **Standard in literature**: Most papers report pIC50

### Why Random Forest?
- **Handles non-linear relationships** between SMILES features and binding
- **Robust to overfitting** (with proper tuning)
- **Works with small datasets** (81 samples)
- **Provides feature importance** for interpretability
- **Fast inference** (< 2 seconds for 190 drugs)

### Why 27 Features?
- **Balance**: Enough to capture drug complexity, not too many to overfit
- **SMILES-based**: No dependency on RDKit (faster, simpler)
- **Drug-likeness**: Includes H-bonding, lipophilicity indicators
- **Proven**: Similar features used in published QSAR models

---

**This document explains all mathematical operations in the Viro-AI system.**  
**Every prediction is traceable back to these formulas.** ✅

