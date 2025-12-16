---
sidebar_position: 2
title: "Remove-OldModuleVersions"
description: Remove stale module folders while keeping the most recent releases.
hide_title: true
id: remove-oldmoduleversions
tags:
  - Remove-OldModuleVersions
  - Nebula.Tools
  - Modules
  - Tools
---

# Remove-OldModuleVersions

`Remove-OldModuleVersions` removes stale module folders while keeping the most recent releases.

## Syntax

```powershell
Remove-OldModuleVersions -Name <String> [-Keep <Int>] [-WhatIf] [-Confirm]
```

## Example

```powershell
# Keep the latest version and preview the removal
Remove-OldModuleVersions -Name 'PSAppDeployToolkit' -Keep 1 -WhatIf
```

Notes:

- Supports modules installed via PSResourceGet, PowerShellGet, and unmanaged folders.
- Respects `-WhatIf` / `-Confirm` for safe dry runs.
- Works well after `Update-Modules` to clean up superseded copies.
