# PlayerLAB Project Export Script
# Robust export with error handling and fallback protocols

param(
    [string]$ExportPath = "PlayerLAB-Export",
    [switch]$Force
)

# Error handling function
function Write-ErrorLog {
    param([string]$Message, [string]$ErrorType = "ERROR")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Host "[$timestamp] [$ErrorType] $Message" -ForegroundColor Red
}

# Success logging function
function Write-SuccessLog {
    param([string]$Message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Host "[$timestamp] [SUCCESS] $Message" -ForegroundColor Green
}

# Progress function
function Write-ProgressLog {
    param([string]$Message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Host "[$timestamp] [PROGRESS] $Message" -ForegroundColor Yellow
}

# Cleanup function
function Cleanup-Export {
    param([string]$Path)
    try {
        if (Test-Path $Path) {
            Remove-Item -Path $Path -Recurse -Force -ErrorAction Stop
            Write-SuccessLog "Cleaned up existing export directory: $Path"
        }
    }
    catch {
        Write-ErrorLog "Failed to cleanup $Path : $($_.Exception.Message)"
    }
}

# Safe copy function with retry logic
function Safe-CopyItem {
    param(
        [string]$Source,
        [string]$Destination,
        [int]$MaxRetries = 3
    )
    
    for ($i = 1; $i -le $MaxRetries; $i++) {
        try {
            if (Test-Path $Source) {
                Copy-Item -Path $Source -Destination $Destination -Recurse -Force -ErrorAction Stop
                Write-SuccessLog "Copied $Source to $Destination"
                return $true
            } else {
                Write-ErrorLog "Source path does not exist: $Source"
                return $false
            }
        }
        catch {
            Write-ErrorLog "Attempt $i failed copying $Source : $($_.Exception.Message)"
            if ($i -eq $MaxRetries) {
                return $false
            }
            Start-Sleep -Seconds 2
        }
    }
    return $false
}

# Main export function
function Export-Project {
    param([string]$ExportPath)
    
    Write-ProgressLog "Starting PlayerLAB project export to: $ExportPath"
    
    # Step 1: Cleanup existing export
    Cleanup-Export -Path $ExportPath
    
    # Step 2: Create export directory
    try {
        New-Item -ItemType Directory -Path $ExportPath -Force -ErrorAction Stop | Out-Null
        Write-SuccessLog "Created export directory: $ExportPath"
    }
    catch {
        Write-ErrorLog "Failed to create export directory: $($_.Exception.Message)"
        return $false
    }
    
    # Step 3: Define essential directories and files
    $directories = @(
        "app",
        "components", 
        "lib",
        "hooks",
        "public"
    )
    
    $files = @(
        "package.json",
        "package-lock.json",
        "tsconfig.json",
        "tailwind.config.ts",
        "next.config.mjs",
        "postcss.config.mjs",
        "components.json",
        "README.md",
        "LICENSE",
        "vercel.json"
    )
    
    # Step 4: Copy directories
    Write-ProgressLog "Copying directories..."
    foreach ($dir in $directories) {
        if (Test-Path $dir) {
            $success = Safe-CopyItem -Source $dir -Destination "$ExportPath\$dir"
            if (-not $success) {
                Write-ErrorLog "Failed to copy directory: $dir"
            }
        } else {
            Write-ErrorLog "Directory not found: $dir"
        }
    }
    
    # Step 5: Copy individual files
    Write-ProgressLog "Copying configuration files..."
    foreach ($file in $files) {
        if (Test-Path $file) {
            $success = Safe-CopyItem -Source $file -Destination "$ExportPath\$file"
            if (-not $success) {
                Write-ErrorLog "Failed to copy file: $file"
            }
        } else {
            Write-ErrorLog "File not found: $file"
        }
    }
    
    # Step 6: Verify export
    Write-ProgressLog "Verifying export..."
    $exportedItems = Get-ChildItem -Path $ExportPath -Recurse | Measure-Object
    Write-SuccessLog "Export completed. Total items: $($exportedItems.Count)"
    
    # Step 7: Create ZIP file
    Write-ProgressLog "Creating ZIP archive..."
    try {
        $zipPath = "$ExportPath.zip"
        if (Test-Path $zipPath) {
            Remove-Item -Path $zipPath -Force -ErrorAction Stop
        }
        
        Compress-Archive -Path $ExportPath -DestinationPath $zipPath -CompressionLevel Optimal -ErrorAction Stop
        Write-SuccessLog "ZIP archive created: $zipPath"
        
        # Get ZIP file size
        $zipSize = (Get-Item $zipPath).Length
        $zipSizeMB = [math]::Round($zipSize / 1MB, 2)
        Write-SuccessLog "ZIP file size: $zipSizeMB MB"
        
        return $true
    }
    catch {
        Write-ErrorLog "Failed to create ZIP archive: $($_.Exception.Message)"
        return $false
    }
}

# Execute export
try {
    $success = Export-Project -ExportPath $ExportPath
    
    if ($success) {
        Write-SuccessLog "PlayerLAB project export completed successfully!"
        Write-Host "`nExport Summary:" -ForegroundColor Cyan
        Write-Host "- Export Directory: $ExportPath" -ForegroundColor White
        Write-Host "- ZIP Archive: $ExportPath.zip" -ForegroundColor White
        Write-Host "- Total Items: $(Get-ChildItem -Path $ExportPath -Recurse | Measure-Object).Count" -ForegroundColor White
    } else {
        Write-ErrorLog "Export failed!"
        exit 1
    }
}
catch {
    Write-ErrorLog "Unexpected error during export: $($_.Exception.Message)"
    exit 1
} 