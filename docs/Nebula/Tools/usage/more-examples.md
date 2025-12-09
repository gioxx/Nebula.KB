---
sidebar_position: 50
title: "More examples"
description: Practical recipes that show common ways to use Nebula.Tools.
hide_title: true
id: more-examples
tags:
  - Nebula.Tools
  - Examples
  - Tools
---

# More examples

Practical recipes that show common ways to use Nebula.Tools.

## Generate multiple passwords and copy them

```powershell
New-RandomPassword -Count 5 -PasswordLength 16 -Clipboard
```

## Convert CSV delimiters in bulk

```powershell
Get-ChildItem 'C:\Exports' -Filter *.csv |
  ForEach-Object {
    Update-CSVDelimiter -FilePath $_.FullName -ToComma
  }
```

## Discover updates with previews only

```powershell
Find-ModulesUpdates -Scope User -Provider Auto |
  Sort-Object Name |
  Format-Table Name, InstalledVersion, LatestVersion, Scope
```

## Update modules and clean superseded versions

```powershell
Update-Modules -Scope User -Provider Auto -CleanupOld
```

## Remove old versions for one module

```powershell
Remove-OldModuleVersions -Name 'Az' -Keep 1 -WhatIf
```

## Keep PowerShell 7 current

```powershell
Update-PS7   # launches the official MSI-based installer
```
