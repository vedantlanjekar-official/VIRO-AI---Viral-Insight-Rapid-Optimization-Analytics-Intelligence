@echo off
echo ========================================
echo    Starting Viro-AI Complete System
echo ========================================
echo.

echo Starting Backend API...
start "Viro-AI Backend" cmd /k "cd backend && uvicorn api.main:app --reload --port 8000"

echo Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak >nul

echo Starting Frontend...
start "Viro-AI Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo Both servers are starting!
echo ========================================
echo Backend API: http://localhost:8000
echo Frontend:    http://localhost:5173
echo.
echo Press any key to exit this window...
echo The servers will continue running in their own windows.
echo.
pause >nul

