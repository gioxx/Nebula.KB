<#
.SYNOPSIS
Promote the "Next" documentation of a Nebula module to its stable version.

.DESCRIPTION
Each module keeps only two documentation versions: the stable one (published on PowerShell Gallery)
and "Next" (modules/<Module>, in development). Run this after publishing a module release:
the previous stable snapshot is removed and modules/<Module> is snapshotted as the new stable version.

.PARAMETER Module
Module to promote: Automations, Core, Log or Tools.

.PARAMETER Version
Version just published on PowerShell Gallery (e.g. 1.3.1).

.EXAMPLE
.\Publish-ModuleDocs.ps1 -Module Core -Version 1.3.1

.NOTES
Giovanni Solone, 2026
#>
param(
    [Parameter(Mandatory)][ValidateSet('Automations', 'Core', 'Log', 'Tools')][string]$Module,
    [Parameter(Mandatory)][ValidatePattern('^\d+\.\d+\.\d+$')][string]$Version
)

$ErrorActionPreference = 'Stop'
$id = $Module.ToLower()

Push-Location $PSScriptRoot
try {
    Remove-Item -Recurse -Force -ErrorAction SilentlyContinue "${id}_versioned_docs", "${id}_versioned_sidebars", "${id}_versions.json"
    npx docusaurus "docs:version:$id" $Version
    if ($LASTEXITCODE -ne 0) { throw "docs:version:$id failed (exit code $LASTEXITCODE)." }
}
finally {
    Pop-Location
}
