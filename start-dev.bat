@echo off
echo Starting M-Pesa E-commerce Development Environment...
echo.

echo Starting Express server...
start "Express Server" cmd /k "node server/index.js"

echo Waiting for server to start...
timeout /t 3 /nobreak > nul

echo Starting Vite development server...
start "Vite Dev Server" cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo - Express API: http://localhost:3001
echo - Vite Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul