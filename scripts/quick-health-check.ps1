# Quick Health Check for PlayerLAB
# Simple health monitoring without complex syntax

Write-Host "🔍 PlayerLAB Quick Health Check" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js processes
$nodeProcesses = Get-Process | Where-Object {$_.ProcessName -like "*node*" -or $_.ProcessName -like "*npm*" -or $_.ProcessName -like "*next*"}

Write-Host "🔧 Found $($nodeProcesses.Count) Node.js processes:" -ForegroundColor White

if ($nodeProcesses.Count -gt 0) {
    foreach ($process in $nodeProcesses) {
        $cpu = $process.CPU
        $memory = [math]::Round($process.WorkingSet / 1MB, 2)
        
        $status = if ($cpu -gt 80 -or $memory -gt 1500) { "⚠️  WARNING" } else { "✅ HEALTHY" }
        $color = if ($cpu -gt 80 -or $memory -gt 1500) { "Yellow" } else { "Green" }
        
        Write-Host "  $status $($process.ProcessName) (PID: $($process.Id))" -ForegroundColor $color
        Write-Host "    CPU: $cpu%, Memory: $memory MB" -ForegroundColor Gray
    }
    
    # Check for issues
    $issues = $nodeProcesses | Where-Object { $_.CPU -gt 80 -or ($_.WorkingSet / 1MB) -gt 1500 }
    
    if ($issues.Count -gt 0) {
        Write-Host ""
        Write-Host "🚨 ISSUES DETECTED - Performing recovery..." -ForegroundColor Red
        
        # Kill problematic processes
        foreach ($process in $issues) {
            try {
                $process.Kill()
                Write-Host "✅ Killed $($process.ProcessName) (PID: $($process.Id))" -ForegroundColor Green
            }
            catch {
                Write-Host "❌ Failed to kill $($process.ProcessName)" -ForegroundColor Red
            }
        }
        
        # Clear cache
        if (Test-Path ".next") {
            Remove-Item ".next" -Recurse -Force -ErrorAction SilentlyContinue
            Write-Host "✅ Cleared Next.js cache" -ForegroundColor Green
        }
        
        Write-Host "🔄 Recovery completed!" -ForegroundColor Green
    }
    else {
        Write-Host ""
        Write-Host "✅ All processes are healthy!" -ForegroundColor Green
    }
}
else {
    Write-Host "✅ No Node.js processes running" -ForegroundColor Green
}

Write-Host ""
Write-Host "🏁 Health check completed" -ForegroundColor Cyan 