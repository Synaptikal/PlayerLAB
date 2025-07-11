param(
    [Parameter(Mandatory=$true)]
    [string]$Command,
    [int]$MaxRetries = 3,
    [int]$TimeoutSeconds = 120
)

$attempt = 0
$success = $false

while (-not $success -and $attempt -lt $MaxRetries) {
    $attempt++
    Write-Host "Attempt $attempt`: Running '$Command' with $TimeoutSeconds second timeout..."

    $job = Start-Job -ScriptBlock { param($c) Invoke-Expression $c } -ArgumentList $Command
    $completed = $job | Wait-Job -Timeout $TimeoutSeconds

    if ($completed) {
        $output = Receive-Job $job
        Write-Host "Command succeeded on attempt $attempt."
        Write-Host $output
        $success = $true
    } else {
        Write-Warning "Command timed out after $TimeoutSeconds seconds. Stopping job..."
        Stop-Job $job | Out-Null
        Remove-Job $job | Out-Null
        if ($attempt -lt $MaxRetries) {
            Write-Host "Retrying..."
        }
    }
}

if (-not $success) {
    Write-Error "Command failed after $MaxRetries attempts."
    exit 1
} 