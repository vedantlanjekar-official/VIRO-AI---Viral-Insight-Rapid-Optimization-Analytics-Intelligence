# binding_affinity_predictor.py
"""
Drug-Virus Binding Affinity Prediction Model for Viro-AI
Hackathon-optimized: Uses simple features + Random Forest for fast training
"""

import pandas as pd
import numpy as np
import pickle
import os
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor, VotingRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
from sklearn.linear_model import Ridge
import warnings
warnings.filterwarnings('ignore')

class BindingAffinityPredictor:
    """
    Predicts drug-virus binding affinity without requiring RDKit.
    Uses SMILES-based features + molecular properties.
    """
    
    def __init__(self, model_path=None):
        self.model = None
        self.scaler = StandardScaler()
        self.feature_names = []
        self.is_trained = False
        
        if model_path and os.path.exists(model_path):
            self.load_model(model_path)
    
    def extract_smiles_features(self, smiles):
        """
        Extract ENHANCED features from SMILES string without RDKit.
        Improved feature engineering for better model performance.
        """
        if pd.isna(smiles) or smiles == '':
            return np.zeros(25)  # Return zero vector for missing SMILES
        
        smiles_upper = smiles.upper()
        
        features = [
            # Basic counts
            len(smiles),  # SMILES length
            smiles.count('C'),  # Carbon count
            smiles.count('N'),  # Nitrogen count
            smiles.count('O'),  # Oxygen count
            smiles.count('S'),  # Sulfur count
            smiles.count('F'),  # Fluorine count
            smiles.count('Cl'),  # Chlorine count
            smiles.count('Br'),  # Bromine count
            smiles.count('P'),  # Phosphorus count
            
            # Bond features
            smiles.count('='),  # Double bonds
            smiles.count('#'),  # Triple bonds
            smiles.count('('),  # Branches
            
            # Structural features
            smiles.count('['),  # Brackets (charged atoms)
            smiles.count('@'),  # Chirality
            int('c' in smiles or 'n' in smiles or 'o' in smiles or 's' in smiles),  # Aromatics
            smiles.count('1') + smiles.count('2') + smiles.count('3'),  # Ring closures
            smiles.count('-') + smiles.count('+'),  # Charges
            
            # Advanced features for drug-likeness
            smiles.count('O') + smiles.count('N'),  # H-bond donors/acceptors
            smiles.count('=O'),  # Carbonyl groups
            smiles.count('NH'),  # Amine groups
            smiles.count('OH'),  # Hydroxyl groups
            
            # Complexity measures
            len(smiles) / (smiles.count('C') + 1),  # Heteroatom ratio
            (smiles.count('=') + smiles.count('#')) / (len(smiles) + 1),  # Unsaturation
            smiles.count('(') / (len(smiles) + 1),  # Branching ratio
            (smiles.count('1') + smiles.count('2') + smiles.count('3')) / (len(smiles) + 1),  # Ring density
        ]
        
        return np.array(features)
    
    def prepare_features(self, df):
        """
        Prepare feature matrix from dataframe.
        
        Args:
            df: DataFrame with columns: smiles, mol_weight, logP
        
        Returns:
            Feature matrix (numpy array)
        """
        print(f"[FEATURES] Extracting features from {len(df)} samples...")
        
        features_list = []
        
        for idx, row in df.iterrows():
            # SMILES-based features (15 features)
            smiles_feat = self.extract_smiles_features(row['smiles'])
            
            # Molecular property features (2 features)
            mol_weight = row.get('mol_weight', 0)
            logP = row.get('logP', 0)
            
            # Combine all features
            combined_features = np.concatenate([
                smiles_feat,
                [mol_weight, logP]
            ])
            
            features_list.append(combined_features)
        
        X = np.array(features_list)
        
        print(f"  [OK] Feature matrix shape: {X.shape}")
        print(f"  [INFO] Features: SMILES properties (25) + molecular descriptors (2)")
        
        return X
    
    def train(self, train_data, val_data, target_column='pic50'):
        """
        Train the binding affinity prediction model.
        
        Args:
            train_data: Training DataFrame
            val_data: Validation DataFrame
            target_column: Column name for target variable (default: pic50)
        """
        print("\n" + "="*70)
        print("TRAINING BINDING AFFINITY PREDICTION MODEL")
        print("="*70)
        
        # Prepare features
        X_train = self.prepare_features(train_data)
        y_train = train_data[target_column].values
        
        X_val = self.prepare_features(val_data)
        y_val = val_data[target_column].values
        
        # Scale features
        print("\n[SCALE] Normalizing features...")
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_val_scaled = self.scaler.transform(X_val)
        
        # ENSEMBLE MODEL: Combine multiple models for better generalization
        print("\n[TRAIN] Training ENSEMBLE MODEL (RF + GradientBoosting + Ridge)...")
        print("  Using ensemble to improve generalization on small dataset...")
        
        # Model 1: Random Forest (good for feature interactions)
        rf_model = RandomForestRegressor(
            n_estimators=150,
            max_depth=5,
            min_samples_split=5,
            min_samples_leaf=2,
            max_features='sqrt',
            random_state=42,
            n_jobs=-1
        )
        
        # Model 2: Gradient Boosting (sequential learning, good for small data)
        gb_model = GradientBoostingRegressor(
            n_estimators=100,
            max_depth=4,
            learning_rate=0.05,  # Slower learning for stability
            subsample=0.8,
            min_samples_split=4,
            random_state=42
        )
        
        # Model 3: Ridge regression (regularized linear, prevents overfitting)
        ridge_model = Ridge(alpha=1.0, random_state=42)
        
        # Ensemble: Average predictions from all 3 models
        self.model = VotingRegressor([
            ('rf', rf_model),
            ('gb', gb_model),
            ('ridge', ridge_model)
        ])
        
        print("  Training 3 models: RandomForest, GradientBoosting, Ridge...")
        self.model.fit(X_train_scaled, y_train)
        print("  [OK] Ensemble trained!")
        
        # Evaluate on training set
        train_pred = self.model.predict(X_train_scaled)
        train_rmse = np.sqrt(mean_squared_error(y_train, train_pred))
        train_r2 = r2_score(y_train, train_pred)
        train_mae = mean_absolute_error(y_train, train_pred)
        
        # Evaluate on validation set
        val_pred = self.model.predict(X_val_scaled)
        val_rmse = np.sqrt(mean_squared_error(y_val, val_pred))
        val_r2 = r2_score(y_val, val_pred)
        val_mae = mean_absolute_error(y_val, val_pred)
        
        # Pearson correlation
        train_corr = np.corrcoef(y_train, train_pred)[0, 1]
        val_corr = np.corrcoef(y_val, val_pred)[0, 1]
        
        # Print results
        print(f"\n{'='*70}")
        print("TRAINING RESULTS:")
        print(f"{'='*70}")
        print(f"\nTraining Set ({len(y_train)} samples):")
        print(f"  RMSE:        {train_rmse:.3f}")
        print(f"  MAE:         {train_mae:.3f}")
        print(f"  R² Score:    {train_r2:.3f}")
        print(f"  Correlation: {train_corr:.3f}")
        
        print(f"\nValidation Set ({len(y_val)} samples):")
        print(f"  RMSE:        {val_rmse:.3f}")
        print(f"  MAE:         {val_mae:.3f}")
        print(f"  R2 Score:    {val_r2:.3f}")
        print(f"  Correlation: {val_corr:.3f} [KEY METRIC]")
        
        # Feature importance (from RandomForest component of ensemble)
        feature_names = [
            'SMILES_length', 'C_count', 'N_count', 'O_count', 'S_count',
            'F_count', 'Cl_count', 'Br_count', 'P_count',
            'double_bonds', 'triple_bonds', 'branches',
            'brackets', 'chirality', 'aromatics', 'ring_closures', 'charges',
            'H_bond_donors', 'carbonyl', 'amine', 'hydroxyl',
            'heteroatom_ratio', 'unsaturation', 'branching_ratio', 'ring_density',
            'mol_weight', 'logP'
        ]
        
        # Get feature importance from RF component
        try:
            rf_estimator = self.model.named_estimators_['rf']
            feature_importance = rf_estimator.feature_importances_
            top_features_idx = np.argsort(feature_importance)[-5:][::-1]
            
            print(f"\nTop 5 Important Features (from RandomForest):")
            for idx in top_features_idx:
                print(f"  {feature_names[idx]}: {feature_importance[idx]:.4f}")
        except:
            print(f"\n[INFO] Feature importance not available for ensemble model")
        
        self.is_trained = True
        self.feature_names = feature_names
        
        return {
            'train_rmse': train_rmse,
            'train_r2': train_r2,
            'val_rmse': val_rmse,
            'val_r2': val_r2,
            'val_correlation': val_corr
        }
    
    def predict(self, smiles, mol_weight=None, logP=None):
        """
        Predict binding affinity for a single drug.
        
        Args:
            smiles: SMILES string
            mol_weight: Molecular weight (optional)
            logP: LogP value (optional)
        
        Returns:
            Predicted pIC50 value
        """
        if not self.is_trained:
            raise ValueError("Model not trained! Call train() first.")
        
        # Create temporary dataframe
        temp_df = pd.DataFrame([{
            'smiles': smiles,
            'mol_weight': mol_weight if mol_weight else 400,  # Default
            'logP': logP if logP else 2.0  # Default
        }])
        
        # Extract features
        X = self.prepare_features(temp_df)
        X_scaled = self.scaler.transform(X)
        
        # Predict
        pic50 = self.model.predict(X_scaled)[0]
        
        return pic50
    
    def batch_predict(self, df):
        """
        Predict binding affinity for multiple drugs.
        
        Args:
            df: DataFrame with columns: drug_id, name, smiles, mol_weight, logP
        
        Returns:
            DataFrame with predictions sorted by affinity
        """
        if not self.is_trained:
            raise ValueError("Model not trained! Call train() first.")
        
        # Extract features
        X = self.prepare_features(df)
        X_scaled = self.scaler.transform(X)
        
        # Predict
        predictions = self.model.predict(X_scaled)
        
        # Add to dataframe
        result_df = df.copy()
        result_df['predicted_pic50'] = predictions
        
        # Convert pIC50 to IC50 (nM)
        result_df['predicted_ic50_nm'] = 10 ** (9 - predictions)
        
        # Normalize to 0-1 score (higher = better binding)
        pic50_min = result_df['predicted_pic50'].min()
        pic50_max = result_df['predicted_pic50'].max()
        result_df['binding_score'] = (result_df['predicted_pic50'] - pic50_min) / (pic50_max - pic50_min)
        
        # Add binding strength classification
        result_df['binding_strength'] = pd.cut(
            result_df['predicted_pic50'],
            bins=[0, 5, 7, 15],
            labels=['weak', 'medium', 'strong']
        )
        
        # Sort by binding score (best first)
        result_df = result_df.sort_values('binding_score', ascending=False).reset_index(drop=True)
        result_df['rank'] = range(1, len(result_df) + 1)
        
        return result_df
    
    def save_model(self, path):
        """Save trained model to file."""
        if not self.is_trained:
            raise ValueError("Cannot save untrained model!")
        
        model_data = {
            'model': self.model,
            'scaler': self.scaler,
            'feature_names': self.feature_names,
            'is_trained': self.is_trained
        }
        
        with open(path, 'wb') as f:
            pickle.dump(model_data, f)
        
        print(f"[SAVED] Model saved to {path}")
    
    def load_model(self, path):
        """Load trained model from file."""
        with open(path, 'rb') as f:
            model_data = pickle.load(f)
        
        self.model = model_data['model']
        self.scaler = model_data['scaler']
        self.feature_names = model_data['feature_names']
        self.is_trained = model_data['is_trained']
        
        print(f"[LOADED] Model loaded from {path}")

# === MAIN TRAINING SCRIPT ===
if __name__ == "__main__":
    print("\n" + "="*70)
    print("VIRO-AI BINDING AFFINITY MODEL - TRAINING")
    print("="*70)
    
    # Load data
    print("\n[LOAD] Loading processed datasets...")
    train_data = pd.read_csv("Viroai_DataBase/processed/train_data.csv")
    val_data = pd.read_csv("Viroai_DataBase/processed/validation_data.csv")
    test_data = pd.read_csv("Viroai_DataBase/processed/test_data.csv")
    
    print(f"  Train: {len(train_data)} samples")
    print(f"  Val:   {len(val_data)} samples")
    print(f"  Test:  {len(test_data)} samples")
    
    # Initialize and train model
    predictor = BindingAffinityPredictor()
    metrics = predictor.train(train_data, val_data, target_column='pic50')
    
    # Test on test set
    print(f"\n{'='*70}")
    print("TESTING ON HELD-OUT TEST SET:")
    print(f"{'='*70}")
    
    X_test = predictor.prepare_features(test_data)
    X_test_scaled = predictor.scaler.transform(X_test)
    y_test = test_data['pic50'].values
    
    test_pred = predictor.model.predict(X_test_scaled)
    test_rmse = np.sqrt(mean_squared_error(y_test, test_pred))
    test_r2 = r2_score(y_test, test_pred)
    test_corr = np.corrcoef(y_test, test_pred)[0, 1]
    
    print(f"\nTest Set ({len(y_test)} samples):")
    print(f"  RMSE:        {test_rmse:.3f}")
    print(f"  R2 Score:    {test_r2:.3f}")
    print(f"  Correlation: {test_corr:.3f} [FINAL]")
    
    # Save model
    model_path = "models/saved_models/binding_model_v1.pkl"
    os.makedirs("models/saved_models", exist_ok=True)
    predictor.save_model(model_path)
    
    print(f"\n{'='*70}")
    if test_corr > 0.6:
        print("[SUCCESS] Model trained successfully! Correlation > 0.6")
    else:
        print("[WARNING] Model performance below target (correlation < 0.6)")
    print(f"{'='*70}")
    
    # Demo prediction
    print("\n[DEMO] Testing prediction on known drug...")
    print("  Drug: Remdesivir (SARS-CoV-2)")
    print("  Known IC50: 100 nM (pIC50: 7.0)")
    
    remdesivir_data = train_data[train_data['drug_name'] == 'Remdesivir'].iloc[0]
    pred_pic50 = predictor.predict(
        remdesivir_data['smiles'],
        remdesivir_data['mol_weight'],
        remdesivir_data['logP']
    )
    pred_ic50 = 10 ** (9 - pred_pic50)
    
    print(f"  Predicted pIC50: {pred_pic50:.2f}")
    print(f"  Predicted IC50: {pred_ic50:.1f} nM")
    print(f"  Error: {abs(pred_pic50 - 7.0):.2f} pIC50 units")
    
    print("\n[OK] Model ready for deployment!")

