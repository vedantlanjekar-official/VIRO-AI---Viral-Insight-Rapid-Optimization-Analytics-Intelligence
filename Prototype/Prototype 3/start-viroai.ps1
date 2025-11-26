# Viro-AI Full-Stack Startup Script
# PowerShell script to start both frontend and backend servers

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   VIRO-AI FULL-STACK STARTUP SCRIPT   " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Function to check if a port is in use
function Test-Port {
    param([int]$Port)
    $connection = Test-NetConnection -ComputerName localhost -Port $Port -WarningAction SilentlyContinue
    return $connection.TcpTestSucceeded
}

# Check if backend port (8000) is already in use
Write-Host "Checking ports..." -ForegroundColor Yellow
if (Test-Port -Port 8000) {
    Write-Host "⚠️  Port 8000 is already in use (Backend)" -ForegroundColor Red
    Write-Host "   Backend may already be running or another service is using this port." -ForegroundColor Yellow
    $continue = Read-Host "   Do you want to continue anyway? (y/n)"
    if ($continue -ne "y") {
        exit
    }
} else {
    Write-Host "✓ Port 8000 is available" -ForegroundColor Green
}

if (Test-Port -Port 5173) {
    Write-Host "⚠️  Port 5173 is already in use (Frontend)" -ForegroundColor Red
    Write-Host "   Frontend may already be running or another service is using this port." -ForegroundColor Yellow
    $continue = Read-Host "   Do you want to continue anyway? (y/n)"
    if ($continue -ne "y") {
        exit
    }
} else {
    Write-Host "✓ Port 5173 is available" -ForegroundColor Green
}

Write-Host ""

# Start Backend Server
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "1. Starting Python Backend (FastAPI)..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$backendPath = "E:\V_AI_fr\Viro_AI_code_backend"
Write-Host "Backend Path: $backendPath" -ForegroundColor Gray

# Check if model exists
$modelPath = Join-Path $backendPath "models\saved_models\binding_model_v1.pkl"
if (Test-Path $modelPath) {
    Write-Host "✓ ML Model found" -ForegroundColor Green
} else {
    Write-Host "⚠️  ML Model not found!" -ForegroundColor Red
    Write-Host "   Training model... (this may take a minute)" -ForegroundColor Yellow
    Set-Location $backendPath
    python models\binding_affinity_predictor.py
    Write-Host "✓ Model trained successfully" -ForegroundColor Green
}

# Start backend in new PowerShell window
Write-Host "Starting backend server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; Write-Host '🧬 VIRO-AI BACKEND SERVER' -ForegroundColor Cyan; python backend\api\main.py"

Write-Host "✓ Backend starting at http://localhost:8000" -ForegroundColor Green
Write-Host "  API Docs: http://localhost:8000/docs" -ForegroundColor Gray

# Wait for backend to start
Write-Host ""
Write-Host "Waiting for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Check if backend is healthy
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8000/health" -Method Get -TimeoutSec 10
    if ($response.status -eq "healthy") {
        Write-Host "✓ Backend is healthy!" -ForegroundColor Green
        Write-Host "  Model Loaded: $($response.model_loaded)" -ForegroundColor Gray
        Write-Host "  Drugs Loaded: $($response.drugs_loaded)" -ForegroundColor Gray
    }
} catch {
    Write-Host "⚠️  Backend health check failed - but it may still be starting..." -ForegroundColor Yellow
}

Write-Host ""

# Start Frontend Server
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "2. Starting React Frontend (Vite)..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$frontendPath = "E:\V_AI_fr"
Write-Host "Frontend Path: $frontendPath" -ForegroundColor Gray

# Check if node_modules exists
$nodeModulesPath = Join-Path $frontendPath "node_modules"
if (!(Test-Path $nodeModulesPath)) {
    Write-Host "⚠️  node_modules not found!" -ForegroundColor Red
    Write-Host "   Installing dependencies..." -ForegroundColor Yellow
    Set-Location $frontendPath
    npm install
    Write-Host "✓ Dependencies installed" -ForegroundColor Green
}

# Start frontend in new PowerShell window
Write-Host "Starting frontend server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; Write-Host '🌐 VIRO-AI FRONTEND SERVER' -ForegroundColor Cyan; npm run dev"

Write-Host "✓ Frontend starting at http://localhost:5173" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   VIRO-AI IS NOW RUNNING!   " -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "🌐 Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "🧬 Backend:  http://localhost:8000" -ForegroundColor Cyan
Write-Host "📚 API Docs: http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C in each terminal window to stop the servers." -ForegroundColor Gray
Write-Host ""
Write-Host "Happy coding! 🚀" -ForegroundColor Green

