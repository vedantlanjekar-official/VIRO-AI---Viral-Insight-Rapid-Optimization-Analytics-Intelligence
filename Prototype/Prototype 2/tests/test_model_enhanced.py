# test_model_enhanced.py
"""
Enhanced Test Suite for Viro-AI Fine-Tuned Model
Tests model performance, feature engineering, and predictions
"""

import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

import pytest
import numpy as np
import pandas as pd
from models.binding_affinity_predictor import BindingAffinityPredictor
from config import config

class TestBindingAffinityPredictor:
    """Test cases for the enhanced binding affinity predictor."""
    
    @pytest.fixture
    def predictor(self):
        """Load trained model."""
        model_path = str(config.MODEL_PATH)
        if not os.path.exists(model_path):
            pytest.skip("Model not trained yet")
        return BindingAffinityPredictor(model_path)
    
    @pytest.fixture
    def sample_drug(self):
        """Sample drug for testing."""
        return {
            'smiles': 'CC(C)Cc1ccc(cc1)C(C)C(=O)O',  # Ibuprofen
            'mol_weight': 206.28,
            'logP': 3.5,
            'name': 'Ibuprofen'
        }
    
    def test_model_loaded(self, predictor):
        """Test that model loads successfully."""
        assert predictor is not None
        assert predictor.is_trained
        assert predictor.model is not None
        assert predictor.scaler is not None
    
    def test_feature_extraction_shape(self, predictor):
        """Test that feature extraction produces correct shape."""
        smiles = 'CC(=O)Oc1ccccc1C(=O)O'  # Aspirin
        features = predictor.extract_smiles_features(smiles)
        
        assert features.shape == (config.NUM_SMILES_FEATURES,)
        assert not np.any(np.isnan(features))
    
    def test_feature_extraction_missing_smiles(self, predictor):
        """Test handling of missing SMILES."""
        features = predictor.extract_smiles_features(None)
        assert features.shape == (config.NUM_SMILES_FEATURES,)
        assert np.all(features == 0)
    
    def test_single_prediction(self, predictor, sample_drug):
        """Test single drug prediction."""
        pic50 = predictor.predict(
            sample_drug['smiles'],
            sample_drug['mol_weight'],
            sample_drug['logP']
        )
        
        assert isinstance(pic50, (int, float, np.number))
        assert 0 <= pic50 <= 15  # Reasonable pIC50 range
    
    def test_batch_prediction(self, predictor):
        """Test batch prediction with multiple drugs."""
        drugs_df = pd.DataFrame([
            {'smiles': 'CC(C)Cc1ccc(cc1)C(C)C(=O)O', 'mol_weight': 206, 'logP': 3.5, 
             'drug_id': 'D1', 'name': 'Drug1'},
            {'smiles': 'CC(=O)Oc1ccccc1C(=O)O', 'mol_weight': 180, 'logP': 1.2,
             'drug_id': 'D2', 'name': 'Drug2'},
            {'smiles': 'CN1C=NC2=C1C(=O)N(C(=O)N2C)C', 'mol_weight': 194, 'logP': -0.1,
             'drug_id': 'D3', 'name': 'Drug3'}
        ])
        
        results = predictor.batch_predict(drugs_df)
        
        assert len(results) == 3
        assert 'predicted_pic50' in results.columns
        assert 'predicted_ic50_nm' in results.columns
        assert 'binding_score' in results.columns
        assert 'binding_strength' in results.columns
        assert 'rank' in results.columns
        
        # Check that rankings are assigned
        assert results['rank'].tolist() == [1, 2, 3]
    
    def test_feature_names(self, predictor):
        """Test that feature names are correctly assigned."""
        assert len(predictor.feature_names) == config.TOTAL_FEATURES
        assert 'SMILES_length' in predictor.feature_names
        assert 'mol_weight' in predictor.feature_names
        assert 'logP' in predictor.feature_names
    
    def test_binding_strength_classification(self, predictor, sample_drug):
        """Test binding strength classification."""
        df = pd.DataFrame([sample_drug])
        results = predictor.batch_predict(df)
        
        strength = results['binding_strength'].iloc[0]
        assert strength in ['strong', 'medium', 'weak']
    
    def test_feature_extraction_complex_smiles(self, predictor):
        """Test feature extraction with complex SMILES."""
        complex_smiles = 'CC(C)CC1=CC=C(C=C1)C(C)C(=O)N[C@@H]2C[C@@H](C[C@H](O2)C(=O)N[C@@H](C3=CC=CC=C3)C(=O)O)OC'
        
        features = predictor.extract_smiles_features(complex_smiles)
        
        assert features.shape == (config.NUM_SMILES_FEATURES,)
        assert not np.any(np.isnan(features))
        assert features[0] == len(complex_smiles)  # First feature is length
    
    def test_reproducibility(self, predictor, sample_drug):
        """Test that predictions are reproducible."""
        pic50_1 = predictor.predict(
            sample_drug['smiles'],
            sample_drug['mol_weight'],
            sample_drug['logP']
        )
        
        pic50_2 = predictor.predict(
            sample_drug['smiles'],
            sample_drug['mol_weight'],
            sample_drug['logP']
        )
        
        assert pic50_1 == pic50_2
    
    def test_model_save_load(self, predictor, tmp_path):
        """Test model saving and loading."""
        save_path = tmp_path / "test_model.pkl"
        predictor.save_model(str(save_path))
        
        assert save_path.exists()
        
        # Load and test
        loaded_predictor = BindingAffinityPredictor(str(save_path))
        assert loaded_predictor.is_trained
        
        # Test prediction with loaded model
        smiles = 'CC(=O)Oc1ccccc1C(=O)O'
        pic50_original = predictor.predict(smiles, 180, 1.2)
        pic50_loaded = loaded_predictor.predict(smiles, 180, 1.2)
        
        assert abs(pic50_original - pic50_loaded) < 0.001


class TestFeatureEngineering:
    """Test feature engineering enhancements."""
    
    def test_functional_group_detection(self):
        """Test functional group feature detection."""
        predictor = BindingAffinityPredictor()
        
        # Molecule with carboxyl group
        smiles_carboxyl = 'CC(=O)O'
        features = predictor.extract_smiles_features(smiles_carboxyl)
        
        # Should detect carbonyl and other features
        assert features[23] > 0  # Some complexity measure
    
    def test_lipinski_features(self):
        """Test Lipinski rule features."""
        predictor = BindingAffinityPredictor()
        
        # Prepare features for a drug-like molecule
        df = pd.DataFrame([{
            'smiles': 'CC(C)Cc1ccc(cc1)C(C)C(=O)O',
            'mol_weight': 206,  # < 500 (good)
            'logP': 3.5  # Within range (good)
        }])
        
        X = predictor.prepare_features(df)
        
        # Check Lipinski features
        lipinski_mw = X[0, -2]  # Second to last feature
        lipinski_logp = X[0, -1]  # Last feature
        
        assert lipinski_mw == 1.0  # Passes MW rule
        assert lipinski_logp == 1.0  # Passes logP rule


class TestPerformance:
    """Test performance and speed."""
    
    def test_prediction_speed(self):
        """Test that predictions are reasonably fast."""
        import time
        
        model_path = str(config.MODEL_PATH)
        if not os.path.exists(model_path):
            pytest.skip("Model not trained yet")
        
        predictor = BindingAffinityPredictor(model_path)
        
        # Create 100 test drugs
        drugs_df = pd.DataFrame([
            {
                'smiles': 'CC(C)Cc1ccc(cc1)C(C)C(=O)O' * (i % 3 + 1),
                'mol_weight': 200 + i,
                'logP': 2.0 + i * 0.1,
                'drug_id': f'D{i}',
                'name': f'Drug{i}'
            }
            for i in range(100)
        ])
        
        start = time.time()
        results = predictor.batch_predict(drugs_df)
        end = time.time()
        
        duration = end - start
        
        assert duration < 5.0  # Should complete in under 5 seconds
        assert len(results) == 100
        
        print(f"\nPrediction speed: {duration:.2f}s for 100 drugs ({duration/100*1000:.1f}ms per drug)")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])

