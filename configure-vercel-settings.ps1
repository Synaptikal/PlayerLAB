# PlayerLAB Vercel Configuration Script
# This script helps configure Vercel settings automatically

Write-Host "PlayerLAB Vercel Configuration Script" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Green

# Check current Git status
Write-Host "`nChecking Git status..." -ForegroundColor Yellow
$currentBranch = git branch --show-current
Write-Host "Current branch: $currentBranch" -ForegroundColor Cyan

# Check if main branch exists and is up to date
Write-Host "`nVerifying main branch..." -ForegroundColor Yellow
$mainExists = git branch -a | Select-String "remotes/origin/main"
if ($mainExists) {
    Write-Host "Main branch exists on remote" -ForegroundColor Green
} else {
    Write-Host "Main branch not found on remote" -ForegroundColor Red
    Write-Host "Creating main branch..." -ForegroundColor Yellow
    git checkout -b main
    git push origin main
}

# Force a fresh deployment
Write-Host "`nForcing fresh Vercel deployment..." -ForegroundColor Yellow
Write-Host "This will deploy the latest code with cache disabled" -ForegroundColor Cyan

# Use the retry script for reliability
if (Test-Path "run-with-retries.ps1") {
    Write-Host "Using retry script for deployment..." -ForegroundColor Cyan
    .\run-with-retries.ps1 -Command "vercel --prod --force" -MaxRetries 3 -TimeoutSeconds 300
} else {
    Write-Host "Retry script not found, using direct deployment..." -ForegroundColor Yellow
    vercel --prod --force
}

Write-Host "`nDeployment completed!" -ForegroundColor Green
Write-Host "`nNext Steps:" -ForegroundColor Yellow
Write-Host "1. Go to Vercel Dashboard: https://vercel.com/dashboard" -ForegroundColor Cyan
Write-Host "2. Select your 'player-lab' project" -ForegroundColor Cyan
Write-Host "3. Go to Settings → Git" -ForegroundColor Cyan
Write-Host "4. Set 'Production Branch' to 'main'" -ForegroundColor Cyan
Write-Host "5. Save changes" -ForegroundColor Cyan
Write-Host "6. Test your custom domain: https://playerlab.net" -ForegroundColor Cyan

Write-Host "`nYour deployment URLs:" -ForegroundColor Yellow
Write-Host "- Vercel Preview: https://player-duphhz7n9-playerlabs-projects.vercel.app" -ForegroundColor Cyan
Write-Host "- Custom Domain: https://playerlab.net" -ForegroundColor Cyan
Write-Host "- www redirect: https://www.playerlab.net" -ForegroundColor Cyan

Write-Host "`nConfiguration complete!" -ForegroundColor Green 