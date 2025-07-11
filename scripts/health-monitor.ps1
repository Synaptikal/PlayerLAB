# PlayerLAB Health Monitor
# Simple health monitoring for Node.js processes

param(
    [int]$Interval = 30,
    [switch]$AutoRecover
)

Write-Host "📊 PlayerLAB Health Monitor Started" -ForegroundColor Cyan
Write-Host "Monitoring interval: $Interval seconds" -ForegroundColor Cyan
Write-Host "Auto-recovery: $AutoRecover" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop monitoring" -ForegroundColor Yellow
Write-Host ""

$checks = 0
$warnings = 0
$recoveries = 0
$startTime = Get-Date

# Function to check Node.js processes
function Test-NodeProcesses {
    $nodeProcesses = Get-Process | Where-Object {$_.ProcessName -like "*node*" -or $_.ProcessName -like "*npm*" -or $_.ProcessName -like "*next*"}
    
    $issues = @()
    
    foreach ($process in $nodeProcesses) {
        $cpu = $process.CPU
        $memory = $process.WorkingSet / 1MB
        
        if ($cpu -gt 80 -or $memory -gt 1500) {
            $issues += @{
                Process = $process.ProcessName
                PID = $process.Id
                CPU = $cpu
                Memory = [math]::Round($memory, 2)
                Issue = if ($cpu -gt 80) { "High CPU" } else { "High Memory" }
            }
        }
    }
    
    return $issues
}

# Function to perform quick recovery
function Start-QuickRecovery {
    Write-Host "🔄 Performing quick recovery..." -ForegroundColor Yellow
    
    $nodeProcesses = Get-Process | Where-Object {$_.ProcessName -like "*node*" -or $_.ProcessName -like "*npm*" -or $_.ProcessName -like "*next*"}
    
    foreach ($process in $nodeProcesses) {
        try {
            $process.Kill()
            Write-Host "✅ Killed process: $($process.ProcessName) (PID: $($process.Id))" -ForegroundColor Green
        }
        catch {
            Write-Host "❌ Failed to kill process: $($process.ProcessName)" -ForegroundColor Red
        }
    }
    
    if (Test-Path ".next") {
        Remove-Item ".next" -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "✅ Cleared Next.js cache" -ForegroundColor Green
    }
    
    [System.GC]::Collect()
    $script:recoveries++
}

# Function to display status
function Show-Status {
    $nodeIssues = Test-NodeProcesses
    $uptime = (Get-Date) - $startTime
    
    Clear-Host
    Write-Host "📊 PlayerLAB Health Monitor" -ForegroundColor Cyan
    Write-Host "==========================" -ForegroundColor Cyan
    Write-Host ""
    
    $nodeProcesses = Get-Process | Where-Object {$_.ProcessName -like "*node*" -or $_.ProcessName -like "*npm*" -or $_.ProcessName -like "*next*"}
    Write-Host "🔧 Node.js Processes: $($nodeProcesses.Count)" -ForegroundColor White
    
    if ($nodeIssues.Count -gt 0) {
        Write-Host "⚠️  Issues detected:" -ForegroundColor Yellow
        foreach ($issue in $nodeIssues) {
            Write-Host "  - $($issue.Process) (PID: $($issue.PID)): $($issue.Issue)" -ForegroundColor Red
            Write-Host "    CPU: $($issue.CPU)%, Memory: $($issue.Memory)MB" -ForegroundColor Gray
        }
    }
    else {
        Write-Host "✅ All Node.js processes healthy" -ForegroundColor Green
    }
    Write-Host ""
    
    Write-Host "📈 Statistics:" -ForegroundColor White
    Write-Host "  Checks: $checks" -ForegroundColor Cyan
    Write-Host "  Warnings: $warnings" -ForegroundColor Yellow
    Write-Host "  Recoveries: $recoveries" -ForegroundColor Red
    Write-Host "  Uptime: $([math]::Round($uptime.TotalMinutes, 1)) minutes" -ForegroundColor Cyan
    Write-Host ""
    
    if ($nodeIssues.Count -gt 0) {
        Write-Host "🚨 STATUS: ISSUES DETECTED" -ForegroundColor Red
        if ($AutoRecover) {
            Write-Host "🔄 Auto-recovery enabled - attempting recovery..." -ForegroundColor Yellow
            Start-QuickRecovery
        }
        else {
            Write-Host "💡 Run with -AutoRecover flag to enable automatic recovery" -ForegroundColor Yellow
        }
    }
    else {
        Write-Host "✅ STATUS: HEALTHY" -ForegroundColor Green
    }
    
    Write-Host ""
    Write-Host "Next check in $Interval seconds... (Ctrl+C to stop)" -ForegroundColor Gray
}

# Main monitoring loop
try {
    while ($true) {
        $checks++
        
        Show-Status
        
        $nodeIssues = Test-NodeProcesses
        if ($nodeIssues.Count -gt 0) {
            $warnings++
        }
        
        Start-Sleep -Seconds $Interval
    }
}
catch {
    Write-Host ""
    Write-Host "🛑 Health monitor stopped" -ForegroundColor Yellow
    Write-Host "Final statistics:" -ForegroundColor Cyan
    Write-Host "  Total checks: $checks" -ForegroundColor White
    Write-Host "  Total warnings: $warnings" -ForegroundColor White
    Write-Host "  Total recoveries: $recoveries" -ForegroundColor White
} 