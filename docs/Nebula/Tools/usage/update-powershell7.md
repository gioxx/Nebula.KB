---
sidebar_position: 5
title: "Update PowerShell 7"
description: Run the official Microsoft helper script to install or upgrade PowerShell 7 via MSI.
hide_title: true
id: update-powershell7
tags:
  - PowerShell
  - PowerShell 7
  - Tools
  - Nebula.Tools
---

# Update PowerShell 7

`Update-PS7` runs the official Microsoft helper script to install or upgrade PowerShell 7 via MSI.

## Example

```powershell
Update-PS7
```

Notes:

- Downloads `aka.ms/install-powershell.ps1` and executes it with `-UseMSI`.
- The installer UI appears; run from an elevated session for system-wide upgrades.
- Ideal for keeping managed endpoints on the latest stable PowerShell release.
