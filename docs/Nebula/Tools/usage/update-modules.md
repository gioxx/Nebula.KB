---
sidebar_position: 1
title: "Find/Update-Modules"
description: Inspect and update installed modules using PSResourceGet (v3) or PowerShellGet (v2).
hide_title: true
id: update-modules
tags:
  - Modules
  - Tools
  - Nebula.Tools
---

# Find/Update-Modules

Nebula.Tools includes helpers to inspect and update installed modules using PSResourceGet (v3) or PowerShellGet (v2). Provider selection defaults to PSResourceGet and falls back to PowerShellGet when needed.

## Syntax

```powershell
Find-ModulesUpdates [-Scope <String>] [-Provider <String>] [-IncludePrerelease]
```

```powershell
Update-Modules [-Scope <String>] [-Provider <String>] [-IncludePrerelease] [-CleanupOld] [-Preview]
```

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

## Questions and answers

### Do I need admin rights to update modules?

Only for system scope. `Update-Modules -Scope User` and `Find-ModulesUpdates` work without elevation; system-scope updates are skipped when not admin.

### How do I clean old versions after an update?

Run `Update-Modules -CleanupOld` or `Remove-OldModuleVersions -Name '<Module>' -Keep 1` for a specific module (add `-WhatIf` for a preview).