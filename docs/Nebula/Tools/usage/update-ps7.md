---
sidebar_position: 5
title: "Update-PS7"
description: Run the official Microsoft helper script to install or upgrade PowerShell 7 via MSI.
hide_title: true
id: update-ps7
tags:
  - Update-PS7
  - Nebula.Tools
  - PowerShell
  - PowerShell 7
  - Tools
---

# Update-PS7

`Update-PS7` runs the official Microsoft helper script to install or upgrade PowerShell 7 via MSI.

## Syntax

```powershell
Update-PS7
```

Notes:

- Downloads `aka.ms/install-powershell.ps1` and executes it with `-UseMSI`.
- The installer UI appears; run from an elevated session for system-wide upgrades.
- Ideal for keeping managed endpoints on the latest stable PowerShell release.

## Questions and answers

### Does `Update-PS7` install silently?

No. It downloads and runs the official Microsoft script with the interactive MSI (`-UseMSI`). Use an elevated session for system-wide upgrades.