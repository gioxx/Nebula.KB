---
sidebar_position: 4
title: "Remove old module versions"
description: Remove stale module folders while keeping the most recent releases.
hide_title: true
id: cleanup-old-versions
tags:
  - Modules
  - Tools
  - Nebula.Tools
---

# Remove old module versions

`Remove-OldModuleVersions` removes stale module folders while keeping the most recent releases.

## Example

```powershell
# Keep the latest version and preview the removal
Remove-OldModuleVersions -Name 'PSAppDeployToolkit' -Keep 1 -WhatIf
```

Notes:

- Supports modules installed via PSResourceGet, PowerShellGet, and unmanaged folders.
- Respects `-WhatIf` / `-Confirm` for safe dry runs.
- Works well after `Update-Modules` to clean up superseded copies.
