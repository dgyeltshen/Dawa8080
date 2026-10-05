@echo off
echo ========================================
echo Attendance System Starter
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please download from: https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js found
echo.
echo Installing dependencies...
npm install

echo.
echo Starting Attendance System...
echo.
echo Access at: http://localhost:3000
echo Press Ctrl+C to stop
echo.

npm start

pause
