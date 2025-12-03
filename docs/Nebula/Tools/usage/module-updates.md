---
sidebar_position: 3
title: "Find and update modules"
description: Inspect and update installed modules using PSResourceGet (v3) or PowerShellGet (v2).
hide_title: true
id: module-updates
tags:
  - Modules
  - Tools
  - Nebula.Tools
---

# Find and update modules

Nebula.Tools includes helpers to inspect and update installed modules using PSResourceGet (v3) or PowerShellGet (v2). Provider selection defaults to PSResourceGet and falls back to PowerShellGet when needed.

## Find available updates

```powershell
Find-ModulesUpdates -Scope User -Provider Auto |
    Sort-Object Name |
    Format-Table Name, InstalledVersion, LatestVersion, Scope
```

Key parameters:

- `Scope`: `User`, `System`, `All`, or `Unknown`.
- `Provider`: `PSResourceGet`, `PowerShellGet`, or `Auto` (default).
- `IncludePrerelease`: include preview builds in the results.

## Apply updates

```powershell
# Dry run only
Update-Modules -Scope User -Provider Auto -IncludePrerelease -Preview

# Install updates and remove older copies
Update-Modules -Scope User -CleanupOld
```

Notes:

- System-scope updates require an elevated session; non-admin runs skip them with a warning.
- `CleanupOld` removes superseded versions using the same provider.
- All actions honor `-WhatIf` / `-Confirm` through `ShouldProcess`.
