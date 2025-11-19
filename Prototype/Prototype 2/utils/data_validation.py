# data_validation.py
"""
Data Validation and Preprocessing Utilities for Viro-AI
Ensures data quality and consistency across the system
"""

import pandas as pd
import numpy as np
import logging
from typing import Tuple, List, Dict, Optional
import re

logger = logging.getLogger(__name__)

class DataValidator:
    """Validates and preprocesses data for Viro-AI system."""
    
    def __init__(self):
        self.required_columns_drugs = ['drug_id', 'name', 'smiles', 'mol_weight', 'logP']
        self.required_columns_training = ['drug_id', 'virus_id', 'smiles', 'mol_weight', 'logP', 'pic50']
    
    def validate_smiles(self, smiles: str) -> Tuple[bool, str]:
        """
        Validate SMILES string format.
        
        Args:
            smiles: SMILES string to validate
            
        Returns:
            (is_valid, error_message)
        """
        if not smiles or pd.isna(smiles):
            return False, "SMILES is empty or missing"
        
        if not isinstance(smiles, str):
            return False, "SMILES must be a string"
        
        if len(smiles) < 3:
            return False, "SMILES too short (< 3 characters)"
        
        if len(smiles) > 2000:
            return False, "SMILES too long (> 2000 characters)"
        
        # Check for basic SMILES characters
        valid_chars = set('CNOSPFClBrIHc=@()[]#-+\\/%0123456789.')
        smiles_chars = set(smiles)
        
        invalid_chars = smiles_chars - valid_chars
        if invalid_chars:
            return False, f"Invalid characters in SMILES: {invalid_chars}"
        
        # Basic bracket matching
        if smiles.count('(') != smiles.count(')'):
            return False, "Unmatched parentheses in SMILES"
        
        if smiles.count('[') != smiles.count(']'):
            return False, "Unmatched brackets in SMILES"
        
        return True, "Valid"
    
    def validate_molecular_properties(self, mol_weight: float, logP: float) -> Tuple[bool, str]:
        """
        Validate molecular properties are in reasonable ranges.
        
        Args:
            mol_weight: Molecular weight in g/mol
            logP: LogP value
            
        Returns:
            (is_valid, error_message)
        """
        # Molecular weight checks
        if pd.isna(mol_weight) or mol_weight is None:
            return False, "Molecular weight is missing"
        
        if mol_weight < 50:
            return False, f"Molecular weight too small ({mol_weight} < 50)"
        
        if mol_weight > 2000:
            return False, f"Molecular weight too large ({mol_weight} > 2000)"
        
        # LogP checks
        if pd.isna(logP) or logP is None:
            return False, "LogP is missing"
        
        if logP < -10:
            return False, f"LogP too negative ({logP} < -10)"
        
        if logP > 15:
            return False, f"LogP too large ({logP} > 15)"
        
        return True, "Valid"
    
    def validate_pic50(self, pic50: float) -> Tuple[bool, str]:
        """
        Validate pIC50 value.
        
        Args:
            pic50: pIC50 value
            
        Returns:
            (is_valid, error_message)
        """
        if pd.isna(pic50) or pic50 is None:
            return False, "pIC50 is missing"
        
        if pic50 < 0:
            return False, f"pIC50 cannot be negative ({pic50} < 0)"
        
        if pic50 > 15:
            return False, f"pIC50 unreasonably high ({pic50} > 15)"
        
        return True, "Valid"
    
    def validate_drug_dataframe(self, df: pd.DataFrame) -> Tuple[bool, List[str]]:
        """
        Validate drugs dataframe.
        
        Args:
            df: DataFrame with drug data
            
        Returns:
            (is_valid, list_of_errors)
        """
        errors = []
        
        # Check required columns
        missing_cols = set(self.required_columns_drugs) - set(df.columns)
        if missing_cols:
            errors.append(f"Missing required columns: {missing_cols}")
            return False, errors
        
        # Check for empty dataframe
        if len(df) == 0:
            errors.append("DataFrame is empty")
            return False, errors
        
        # Validate each row
        invalid_rows = []
        
        for idx, row in df.iterrows():
            row_errors = []
            
            # Validate SMILES
            smiles_valid, smiles_msg = self.validate_smiles(row['smiles'])
            if not smiles_valid:
                row_errors.append(f"SMILES: {smiles_msg}")
            
            # Validate molecular properties
            props_valid, props_msg = self.validate_molecular_properties(
                row['mol_weight'], row['logP']
            )
            if not props_valid:
                row_errors.append(f"Properties: {props_msg}")
            
            # Validate drug_id
            if pd.isna(row['drug_id']) or str(row['drug_id']).strip() == '':
                row_errors.append("drug_id is missing")
            
            # Validate name
            if pd.isna(row['name']) or str(row['name']).strip() == '':
                row_errors.append("name is missing")
            
            if row_errors:
                invalid_rows.append({
                    'index': idx,
                    'drug_id': row.get('drug_id', 'N/A'),
                    'errors': row_errors
                })
        
        if invalid_rows:
            for row_info in invalid_rows[:5]:  # Report first 5
                errors.append(
                    f"Row {row_info['index']} (ID: {row_info['drug_id']}): "
                    f"{'; '.join(row_info['errors'])}"
                )
            
            if len(invalid_rows) > 5:
                errors.append(f"... and {len(invalid_rows) - 5} more invalid rows")
        
        is_valid = len(invalid_rows) == 0
        return is_valid, errors
    
    def validate_training_dataframe(self, df: pd.DataFrame) -> Tuple[bool, List[str]]:
        """
        Validate training dataframe.
        
        Args:
            df: DataFrame with training data
            
        Returns:
            (is_valid, list_of_errors)
        """
        errors = []
        
        # Check required columns
        missing_cols = set(self.required_columns_training) - set(df.columns)
        if missing_cols:
            errors.append(f"Missing required columns: {missing_cols}")
            return False, errors
        
        # Check for empty dataframe
        if len(df) == 0:
            errors.append("DataFrame is empty")
            return False, errors
        
        # Validate drug columns first
        drug_valid, drug_errors = self.validate_drug_dataframe(df)
        if not drug_valid:
            errors.extend(drug_errors)
        
        # Validate pIC50 values
        invalid_pic50 = []
        for idx, row in df.iterrows():
            pic50_valid, pic50_msg = self.validate_pic50(row['pic50'])
            if not pic50_valid:
                invalid_pic50.append(f"Row {idx}: {pic50_msg}")
        
        if invalid_pic50:
            errors.extend(invalid_pic50[:5])  # Report first 5
            if len(invalid_pic50) > 5:
                errors.append(f"... and {len(invalid_pic50) - 5} more invalid pIC50 values")
        
        is_valid = len(errors) == 0
        return is_valid, errors
    
    def clean_dataframe(self, df: pd.DataFrame, drop_invalid: bool = False) -> pd.DataFrame:
        """
        Clean dataframe by removing/fixing invalid entries.
        
        Args:
            df: DataFrame to clean
            drop_invalid: Whether to drop invalid rows (default: False, fill with defaults)
            
        Returns:
            Cleaned DataFrame
        """
        df_clean = df.copy()
        
        # Remove duplicate drug IDs
        if 'drug_id' in df_clean.columns:
            duplicates = df_clean.duplicated(subset=['drug_id'], keep='first')
            if duplicates.any():
                logger.warning(f"Removing {duplicates.sum()} duplicate drug IDs")
                df_clean = df_clean[~duplicates]
        
        # Clean SMILES
        if 'smiles' in df_clean.columns:
            # Remove leading/trailing whitespace
            df_clean['smiles'] = df_clean['smiles'].str.strip()
            
            if drop_invalid:
                # Remove invalid SMILES
                valid_mask = df_clean['smiles'].apply(
                    lambda s: self.validate_smiles(s)[0]
                )
                invalid_count = (~valid_mask).sum()
                if invalid_count > 0:
                    logger.warning(f"Dropping {invalid_count} rows with invalid SMILES")
                    df_clean = df_clean[valid_mask]
        
        # Clean molecular properties
        if 'mol_weight' in df_clean.columns:
            # Replace missing or invalid with median
            valid_mw = df_clean['mol_weight'].between(50, 2000)
            if not valid_mw.all():
                median_mw = df_clean.loc[valid_mw, 'mol_weight'].median()
                df_clean.loc[~valid_mw, 'mol_weight'] = median_mw
                logger.warning(f"Imputed {(~valid_mw).sum()} invalid molecular weights with median: {median_mw:.1f}")
        
        if 'logP' in df_clean.columns:
            # Replace missing or invalid with median
            valid_logp = df_clean['logP'].between(-10, 15)
            if not valid_logp.all():
                median_logp = df_clean.loc[valid_logp, 'logP'].median()
                df_clean.loc[~valid_logp, 'logP'] = median_logp
                logger.warning(f"Imputed {(~valid_logp).sum()} invalid logP values with median: {median_logp:.1f}")
        
        # Clean pIC50 for training data
        if 'pic50' in df_clean.columns:
            valid_pic50 = df_clean['pic50'].between(0, 15)
            if not valid_pic50.all():
                if drop_invalid:
                    invalid_count = (~valid_pic50).sum()
                    logger.warning(f"Dropping {invalid_count} rows with invalid pIC50")
                    df_clean = df_clean[valid_pic50]
                else:
                    # Replace with NaN (will be handled later)
                    df_clean.loc[~valid_pic50, 'pic50'] = np.nan
        
        # Reset index
        df_clean = df_clean.reset_index(drop=True)
        
        return df_clean
    
    def generate_validation_report(self, df: pd.DataFrame, df_type: str = "drugs") -> str:
        """
        Generate a validation report for a dataframe.
        
        Args:
            df: DataFrame to validate
            df_type: Type of data ("drugs" or "training")
            
        Returns:
            Validation report as string
        """
        report = []
        report.append("=" * 70)
        report.append(f"DATA VALIDATION REPORT - {df_type.upper()}")
        report.append("=" * 70)
        
        # Run validation
        if df_type == "drugs":
            is_valid, errors = self.validate_drug_dataframe(df)
        else:
            is_valid, errors = self.validate_training_dataframe(df)
        
        # Basic statistics
        report.append(f"\nTotal Rows: {len(df)}")
        report.append(f"Total Columns: {len(df.columns)}")
        
        if 'smiles' in df.columns:
            valid_smiles = sum(self.validate_smiles(s)[0] for s in df['smiles'])
            report.append(f"Valid SMILES: {valid_smiles}/{len(df)} ({valid_smiles/len(df)*100:.1f}%)")
        
        if 'pic50' in df.columns:
            valid_pic50 = df['pic50'].between(0, 15).sum()
            report.append(f"Valid pIC50: {valid_pic50}/{len(df)} ({valid_pic50/len(df)*100:.1f}%)")
        
        # Validation result
        report.append(f"\n{'='*70}")
        if is_valid:
            report.append("✅ VALIDATION PASSED")
        else:
            report.append("❌ VALIDATION FAILED")
            report.append(f"\nErrors Found ({len(errors)}):")
            for error in errors:
                report.append(f"  - {error}")
        
        report.append("=" * 70)
        
        return "\n".join(report)


def validate_and_clean_data(input_path: str, output_path: str, 
                            data_type: str = "drugs", 
                            drop_invalid: bool = False) -> None:
    """
    Utility function to validate and clean data files.
    
    Args:
        input_path: Path to input CSV
        output_path: Path to save cleaned CSV
        data_type: "drugs" or "training"
        drop_invalid: Whether to drop invalid rows
    """
    logger.info(f"Loading data from: {input_path}")
    df = pd.read_csv(input_path)
    
    # Validate
    validator = DataValidator()
    report = validator.generate_validation_report(df, data_type)
    print(report)
    
    # Clean
    logger.info("Cleaning data...")
    df_clean = validator.clean_dataframe(df, drop_invalid=drop_invalid)
    
    # Save
    df_clean.to_csv(output_path, index=False)
    logger.info(f"Cleaned data saved to: {output_path}")
    logger.info(f"Rows before: {len(df)}, after: {len(df_clean)}")


if __name__ == "__main__":
    # Demo
    print("\n" + "="*70)
    print("VIRO-AI DATA VALIDATION UTILITY - DEMO")
    print("="*70)
    
    # Create sample data
    sample_df = pd.DataFrame([
        {
            'drug_id': 'D1',
            'name': 'Drug1',
            'smiles': 'CC(C)Cc1ccc(cc1)C(C)C(=O)O',
            'mol_weight': 206,
            'logP': 3.5
        },
        {
            'drug_id': 'D2',
            'name': 'Drug2',
            'smiles': 'INVALID',  # Invalid SMILES
            'mol_weight': 180,
            'logP': 1.2
        },
        {
            'drug_id': 'D3',
            'name': 'Drug3',
            'smiles': 'CN1C=NC2=C1C(=O)N(C(=O)N2C)C',
            'mol_weight': -100,  # Invalid MW
            'logP': 50  # Invalid logP
        }
    ])
    
    validator = DataValidator()
    report = validator.generate_validation_report(sample_df, "drugs")
    print("\n" + report)
    
    print("\n[CLEAN] Cleaning data...")
    cleaned_df = validator.clean_dataframe(sample_df, drop_invalid=False)
    print(f"\nOriginal rows: {len(sample_df)}")
    print(f"Cleaned rows: {len(cleaned_df)}")
    
    print("\n[OK] Validation utility ready!")

