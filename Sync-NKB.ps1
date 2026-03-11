<#
.SYNOPSIS
Sync documentation using a JSON configuration file.

.BEHAVIOR
- Reads a config JSON from the user's PowerShell profile folder (by default).
- Copies only included patterns recursively.
- Supports per-mapping mirror mode for full 1:1 sync (`Mirror: true`), including any file extension and deletions on destination.
- Creates destination directories if missing.
- Copies ONLY when needed:
  - If destination missing => copy
  - If source newer => overwrite destination
  - If destination newer => prompt (overwrite/skip/reverse)
  - If timestamps effectively equal => skip (up-to-date)

.PARAMETER ConfigPath
Path to the JSON configuration file.

.PARAMETER WhatIfMode
If set, no files are actually copied; actions are only logged.

.PARAMETER Environment
Target documentation environment to sync. Allowed values: prod, dev, blog.

.PARAMETER TimeToleranceSeconds
Tolerance used when comparing LastWriteTimeUtc to avoid false positives (e.g., Dropbox/FS rounding).

.NOTES
Giovanni Solone, 2026

CONFIG EXAMPLE (NebulaKB_sync-docs.config.json)
{
    "BasePath": "C:\\Users\\Contoso\\",
    "IncludePatterns": [
        "*.md",
        "_category_.json"
    ],
    "Mappings": [
        {
        "Source": "Documents\\GitHub\\Nebula.KB\\docs",
        "Destination": "Documents\\GitHub\\Nebula.KB\\Projects\\docs-copy",
        "Targets": ["prod"]
        },
        {
        "Source": "Documents\\GitHub\\Nebula.KB\\Projects",
        "Destination": "Documents\\GitHub\\Nebula.KB\\Backup\\Projects",
        "Targets": ["dev"]
        },
        {
        "Source": "Documents\\GitHub\\Nebula.KB\\blog",
        "Destination": "Documents\\GitHub\\Nebula.KB\\Projects\\blog-copy",
        "Targets": ["blog"],
        "Mirror": true
        }
    ]
}
#>

[CmdletBinding()]
param(
    [string]$ConfigPath = (Join-Path (Split-Path -Parent $PROFILE) "NebulaKB_sync-docs.config.json"),
    [switch]$WhatIfMode,
    [ValidateSet("prod", "dev", "blog")]
    [string]$Environment = "prod",
    [int]$TimeToleranceSeconds = 2
)

$ErrorActionPreference = "Stop"

# --- Conflict global decision -------------------------------------------------
# $null | "OverwriteAll" | "SkipAll" | "ReverseAll"
$global:ConflictDecision = $null

function New-DirectoryIfMissing {
    param([Parameter(Mandatory)][string]$Path)

    if (-not (Test-Path -LiteralPath $Path)) {
        if ($WhatIfMode) {
            Write-Host "[WhatIf] Would create directory: $Path"
        }
        else {
            New-Item -ItemType Directory -Path $Path -Force | Out-Null
            Write-Host "Created directory: $Path"
        }
    }
}

function Read-ConflictDecision {
    param(
        [Parameter(Mandatory)][string]$SourceFile,
        [Parameter(Mandatory)][datetime]$SourceTime,
        [Parameter(Mandatory)][string]$DestFile,
        [Parameter(Mandatory)][datetime]$DestTime
    )

    if ($global:ConflictDecision -eq "OverwriteAll") { return "Overwrite" }
    if ($global:ConflictDecision -eq "SkipAll") { return "Skip" }
    if ($global:ConflictDecision -eq "ReverseAll") { return "Reverse" }

    Write-Host ""
    Write-Host "CONFLICT: Destination is newer than source." -ForegroundColor Yellow
    Write-Host "  Source      : $SourceFile"
    Write-Host ("  Source time : {0:yyyy-MM-dd HH:mm:ss} (UTC compare)" -f $SourceTime)
    Write-Host "  Destination : $DestFile"
    Write-Host ("  Dest time   : {0:yyyy-MM-dd HH:mm:ss} (UTC compare)" -f $DestTime)
    Write-Host ""
    Write-Host "Choose what to do:"
    Write-Host "  [Y] Overwrite destination with source (even if older)"
    Write-Host "  [N] Skip this file"
    Write-Host "  [R] Reverse copy (copy destination back to source)"
    Write-Host "  [A] Overwrite ALL conflicts"
    Write-Host "  [S] Skip ALL conflicts"
    Write-Host "  [RA] Reverse ALL conflicts"

    while ($true) {
        $choice = (Read-Host "Choose (Y/N/R/A/S/RA)").Trim().ToUpperInvariant()
        switch ($choice) {
            "Y" { return "Overwrite" }
            "N" { return "Skip" }
            "R" { return "Reverse" }
            "A" { $global:ConflictDecision = "OverwriteAll"; return "Overwrite" }
            "S" { $global:ConflictDecision = "SkipAll"; return "Skip" }
            "RA" { $global:ConflictDecision = "ReverseAll"; return "Reverse" }
            default { Write-Host "Invalid choice. Please enter Y, N, R, A, S, or RA." -ForegroundColor Red }
        }
    }
}

function Resolve-PathIfRelative {
    param(
        [Parameter(Mandatory)][string]$BasePath,
        [Parameter(Mandatory)][string]$PathValue
    )

    if ([System.IO.Path]::IsPathRooted($PathValue)) {
        return $PathValue
    }

    return (Join-Path $BasePath $PathValue)
}

function Get-MappingTargets {
    param([Parameter(Mandatory)]$Mapping)

    # Backward-compatible default: mappings without explicit targets are treated as prod.
    if ($null -eq $Mapping.Targets -and $null -eq $Mapping.DocType) {
        return @("prod")
    }

    if ($Mapping.Targets) {
        $targets = @($Mapping.Targets | ForEach-Object { ([string]$_).Trim().ToLowerInvariant() } | Where-Object { $_ })
        if ($targets.Count -gt 0) { return $targets }
    }

    if ($Mapping.DocType) {
        $docType = ([string]$Mapping.DocType).Trim().ToLowerInvariant()
        if ($docType) { return @($docType) }
    }

    return @("prod")
}

function Get-MappingMirrorMode {
    param([Parameter(Mandatory)]$Mapping)

    if ($null -eq $Mapping.Mirror) { return $false }
    return [bool]$Mapping.Mirror
}

function Invoke-MirrorMapping {
    param(
        [Parameter(Mandatory)][string]$SourceRoot,
        [Parameter(Mandatory)][string]$DestinationRoot,
        [switch]$WhatIf
    )

    $roboArgs = @(
        $SourceRoot,
        $DestinationRoot,
        "/MIR",
        "/FFT",
        "/R:2",
        "/W:1",
        "/NP"
    )

    if ($WhatIf) {
        $roboArgs += "/L"
    }

    Write-Host "Mirror mode: robocopy $($roboArgs -join ' ')" -ForegroundColor DarkGray
    & robocopy @roboArgs
    $exitCode = $LASTEXITCODE

    # Robocopy exit codes 0-7 are success/partial success; >=8 indicates failure.
    if ($exitCode -ge 8) {
        throw "Robocopy failed for mirror mapping (exit code: $exitCode). Source='$SourceRoot' Destination='$DestinationRoot'"
    }

    return $exitCode
}

function Copy-FileOneWay {
    param(
        [Parameter(Mandatory)][string]$FromFile,
        [Parameter(Mandatory)][string]$ToFile,
        [Parameter(Mandatory)][datetime]$FromTimeUtc
    )

    $toDir = Split-Path -Parent $ToFile
    New-DirectoryIfMissing -Path $toDir

    if ($WhatIfMode) {
        Write-Host "[WhatIf] Would copy: $FromFile -> $ToFile"
    }
    else {
        Copy-Item -LiteralPath $FromFile -Destination $ToFile -Force

        # Align destination timestamp with the source timestamp (UTC-based)
        $toItem = Get-Item -LiteralPath $ToFile
        $toItem.LastWriteTimeUtc = $FromTimeUtc
    }
}

function Get-TimeRelation {
    param(
        [Parameter(Mandatory)][datetime]$A,
        [Parameter(Mandatory)][datetime]$B,
        [Parameter(Mandatory)][int]$ToleranceSeconds
    )

    # Returns: "Equal" | "ANewer" | "BNewer"
    $delta = ($A - $B).TotalSeconds
    if ([math]::Abs($delta) -le $ToleranceSeconds) { return "Equal" }
    if ($delta -gt 0) { return "ANewer" }
    return "BNewer"
}

function Copy-FileWithConflictCheck {
    param(
        [Parameter(Mandatory)][string]$SourceFile,
        [Parameter(Mandatory)][string]$DestFile,
        [Parameter(Mandatory)][int]$ToleranceSeconds
    )

    $srcItem = Get-Item -LiteralPath $SourceFile
    $srcTimeUtc = $srcItem.LastWriteTimeUtc

    $destExists = Test-Path -LiteralPath $DestFile
    if (-not $destExists) {
        Copy-FileOneWay -FromFile $SourceFile -ToFile $DestFile -FromTimeUtc $srcTimeUtc
        return @{ Action = "Copied"; Source = $SourceFile; Dest = $DestFile }
    }

    $dstItem = Get-Item -LiteralPath $DestFile
    $dstTimeUtc = $dstItem.LastWriteTimeUtc

    $rel = Get-TimeRelation -A $srcTimeUtc -B $dstTimeUtc -ToleranceSeconds $ToleranceSeconds

    switch ($rel) {
        "Equal" {
            return @{ Action = "SkippedUpToDate"; Source = $SourceFile; Dest = $DestFile }
        }
        "ANewer" {
            # Source newer -> overwrite destination
            Copy-FileOneWay -FromFile $SourceFile -ToFile $DestFile -FromTimeUtc $srcTimeUtc
            return @{ Action = "Overwritten"; Source = $SourceFile; Dest = $DestFile }
        }
        "BNewer" {
            # Destination newer -> conflict prompt
            $decision = Read-ConflictDecision -SourceFile $SourceFile -SourceTime $srcTimeUtc -DestFile $DestFile -DestTime $dstTimeUtc

            if ($decision -eq "Skip") {
                return @{ Action = "SkippedNewerDest"; Source = $SourceFile; Dest = $DestFile }
            }

            if ($decision -eq "Reverse") {
                # Copy destination back to source
                Copy-FileOneWay -FromFile $DestFile -ToFile $SourceFile -FromTimeUtc $dstTimeUtc
                return @{ Action = "Reversed"; Source = $SourceFile; Dest = $DestFile }
            }

            # Overwrite destination with older source (user forced)
            Copy-FileOneWay -FromFile $SourceFile -ToFile $DestFile -FromTimeUtc $srcTimeUtc
            return @{ Action = "OverwrittenForced"; Source = $SourceFile; Dest = $DestFile }
        }
    }
}

# --- Load config -------------------------------------------------------------

if (-not (Test-Path -LiteralPath $ConfigPath)) {
    throw "Config file not found: $ConfigPath"
}

Write-Host ("Config file found: {0}" -f (Resolve-Path -LiteralPath $ConfigPath).Path) -ForegroundColor Cyan

$configRaw = Get-Content -LiteralPath $ConfigPath -Raw
$config = $configRaw | ConvertFrom-Json

if (-not $config.BasePath) {
    throw "Config error: 'BasePath' is missing."
}
if (-not $config.Mappings -or $config.Mappings.Count -lt 1) {
    throw "Config error: 'Mappings' is missing or empty."
}

$BasePath = [string]$config.BasePath
Write-Host "Target environment: $Environment" -ForegroundColor Cyan

$IncludePatterns = @("*.md")
if ($config.IncludePatterns -and $config.IncludePatterns.Count -gt 0) {
    $IncludePatterns = @($config.IncludePatterns | ForEach-Object { [string]$_ })
}

# --- Main --------------------------------------------------------------------

$stats = [ordered]@{
    Copied            = 0
    Overwritten       = 0
    OverwrittenForced = 0
    Reversed          = 0
    SkippedUpToDate   = 0
    SkippedNewerDest  = 0
    MissingSource     = 0
    TotalSeen         = 0
    MirroredMappings  = 0
}

foreach ($m in $config.Mappings) {
    if (-not $m.Source -or -not $m.Destination) {
        Write-Host "Skipping invalid mapping (missing Source/Destination)." -ForegroundColor Red
        continue
    }

    $mappingTargets = Get-MappingTargets -Mapping $m
    if ($mappingTargets -notcontains $Environment) {
        $targetLabel = ($mappingTargets -join ",")
        Write-Host "Skipping mapping for target(s) '$targetLabel' (requested: $Environment)." -ForegroundColor DarkGray
        continue
    }

    $srcRoot = Resolve-PathIfRelative -BasePath $BasePath -PathValue ([string]$m.Source)
    $dstRoot = Resolve-PathIfRelative -BasePath $BasePath -PathValue ([string]$m.Destination)
    $isMirror = Get-MappingMirrorMode -Mapping $m

    Write-Host ""
    Write-Host "=== Mapping ===" -ForegroundColor Cyan
    Write-Host "Source      : $srcRoot"
    Write-Host "Destination : $dstRoot"
    Write-Host ("Mode        : {0}" -f ($(if ($isMirror) { "Mirror (1:1)" } else { "Filtered copy" })))

    if (-not (Test-Path -LiteralPath $srcRoot)) {
        Write-Host "Source folder not found. Skipping: $srcRoot" -ForegroundColor Red
        $stats.MissingSource++
        continue
    }

    New-DirectoryIfMissing -Path $dstRoot

    if ($isMirror) {
        [void](Invoke-MirrorMapping -SourceRoot $srcRoot -DestinationRoot $dstRoot -WhatIf:$WhatIfMode)
        $stats.MirroredMappings++
        continue
    }

    $files = foreach ($pat in $IncludePatterns) {
        Get-ChildItem -LiteralPath $srcRoot -Recurse -File -Filter $pat -ErrorAction Stop
    }

    foreach ($f in $files) {
        $stats.TotalSeen++

        $relative = $f.FullName.Substring($srcRoot.Length).TrimStart("\")
        $destPath = Join-Path $dstRoot $relative

        $result = Copy-FileWithConflictCheck -SourceFile $f.FullName -DestFile $destPath -ToleranceSeconds $TimeToleranceSeconds

        switch ($result.Action) {
            "Copied" { $stats.Copied++ }
            "Overwritten" { $stats.Overwritten++ }
            "OverwrittenForced" { $stats.OverwrittenForced++ }
            "Reversed" { $stats.Reversed++ }
            "SkippedUpToDate" { $stats.SkippedUpToDate++ }
            "SkippedNewerDest" { $stats.SkippedNewerDest++ }
        }

        if ($result.Action -eq "SkippedUpToDate") {
            Write-Host "Up-to-date: $relative" -ForegroundColor DarkGray
        }
        elseif ($result.Action -eq "SkippedNewerDest") {
            Write-Host "SKIP (dest newer): $relative" -ForegroundColor Yellow
        }
        elseif ($result.Action -eq "Reversed") {
            Write-Host "REVERSE (dest->src): $relative" -ForegroundColor Magenta
        }
        elseif ($result.Action -eq "OverwrittenForced") {
            Write-Host "Overwritten (forced): $relative" -ForegroundColor DarkYellow
        }
        else {
            Write-Host "$($result.Action): $relative"
        }
    }
}

Write-Host ""
Write-Host "=== Summary ===" -ForegroundColor Green
$stats.GetEnumerator() | ForEach-Object {
    "{0,-18} {1}" -f $_.Key, $_.Value
} | ForEach-Object { Write-Host $_ }

if ($WhatIfMode) {
    Write-Host ""
    Write-Host "WhatIfMode enabled: no changes were made." -ForegroundColor DarkYellow
}
