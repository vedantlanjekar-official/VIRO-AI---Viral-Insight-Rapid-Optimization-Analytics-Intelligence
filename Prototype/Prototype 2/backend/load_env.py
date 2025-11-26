"""
Load environment variables from .env file
"""
import os
from pathlib import Path

def load_env():
    """Load environment variables from .env file"""
    env_path = Path(__file__).parent.parent / '.env'
    
    if env_path.exists():
        with open(env_path, 'r') as f:
            for line in f:
                line = line.strip()
                # Skip comments and empty lines
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    key = key.strip()
                    value = value.strip()
                    # Only set if not already in environment
                    if key and value and key not in os.environ:
                        os.environ[key] = value
        print(f"✅ Loaded environment variables from .env")
    else:
        print(f"⚠️ .env file not found at {env_path}")

# Auto-load when module is imported
load_env()

