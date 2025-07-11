@echo off
REM PlayerLAB Emergency Recovery Batch Script

echo ====================================
echo PLAYERLAB EMERGENCY RECOVERY SCRIPT
echo ====================================

echo.
echo Killing Node/Next/NPM processes...
for /f "tokens=2" %%a in ('tasklist ^| findstr /i "node npm next"') do taskkill /F /PID %%a

echo.
echo Deleting .next cache if exists...
if exist .next rmdir /s /q .next

echo.
echo Cleaning npm cache...
npm cache clean --force

echo.
echo Running: npm run build
npm run build

echo.
echo EMERGENCY RECOVERY COMPLETE 