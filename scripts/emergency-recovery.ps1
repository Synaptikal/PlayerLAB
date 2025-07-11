# PlayerLAB Minimal Emergency Recovery Script
# Use this if the system is frozen or unresponsive

Write-Host "PLAYERLAB EMERGENCY RECOVERY SCRIPT"
Write-Host "===================================="
Write-Host ""

# 1. Kill Node/Next/NPM processes
$procs = Get-Process | Where-Object { $_.ProcessName -like "*node*" -or $_.ProcessName -like "*npm*" -or $_.ProcessName -like "*next*" }
if ($procs.Count -gt 0) {
    foreach ($p in $procs) {
        $p.Kill()
        Write-Host ("Killed process: {0} (PID: {1})" -f $p.ProcessName, $p.Id)
    }
} else {
    Write-Host "No Node/Next/NPM processes running."
}

# 2. Clear Next.js cache
if (Test-Path ".next") {
    Remove-Item ".next" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "Cleared .next cache."
} else {
    Write-Host "No .next cache found."
}

# 3. Clear npm cache
npm cache clean --force
Write-Host "NPM cache cleaned."

# 4. Rebuild project
Write-Host "Running: npm run build"
npm run build

Write-Host "EMERGENCY RECOVERY COMPLETE" 