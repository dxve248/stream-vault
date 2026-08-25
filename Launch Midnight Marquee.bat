@echo off
title Midnight Marquee
cd /d "%~dp0"

powershell -NoProfile -Command "try{Invoke-WebRequest http://localhost:4830 -UseBasicParsing -TimeoutSec 2|Out-Null;exit 0}catch{exit 1}" >nul 2>&1
if %errorlevel%==0 goto :open

echo.
echo   ==============================================
echo      M I D N I G H T   M A R Q U E E
echo      Dave's private cinema - now showing
echo   ==============================================
echo.
echo   Warming up the projector...

if not exist node_modules (
    echo   First run: installing dependencies...
    call npm install --no-audit --no-fund
)

start "marquee-server" /min cmd /c "npm run dev -- --port 4830 --strictPort"

powershell -NoProfile -Command "for($i=0;$i -lt 60;$i++){try{Invoke-WebRequest http://localhost:4830 -UseBasicParsing -TimeoutSec 2|Out-Null;exit 0}catch{Start-Sleep -Milliseconds 500}};exit 1" >nul 2>&1

:open
start "" "http://localhost:4830"
exit
