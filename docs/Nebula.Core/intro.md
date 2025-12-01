---
sidebar_position: 1
title: 'Getting started'
description: Get up and running with Nebula.Core in minutes.
hide_title: true
id: intro
tags:
  - Getting started
  - Nebula.Core
---

# Getting started

**Nebula.Core** is a PowerShell module that wraps common M365/Exchange Online administration tasks with safer defaults, verbose logging, and CSV-friendly exports. It bundles:

- Connection helpers (`Connect-Nebula`, `Connect-EOL`, `Disconnect-Nebula`) with health checks and optional Graph.
- Configuration reloads (`Get-NebulaConfig`, `Sync-NebulaConfig`).
- Mailbox utilities (aliases, permissions, language/quota tweaks, shared mailbox creation).
- Group exports (distribution, dynamic, M365 groups, role group members, user group memberships).
- License reports (`Export-MsolAccountSku`, `Get-UserMsolAccountSku`, `Update-LicenseCatalog`).
- Quarantine utilities (search, export EML, release/delete in bulk).
- Statistics exports (mailbox stats).

## Requirements

- PowerShell 5.1+ or 7+.
- Exchange Online Management module for EXO features.
- Microsoft Graph module for Graph-backed operations (license catalog, M365 groups, etc.).
- Proper permissions on the target tenant for the actions you run.

## Install/Import

Import the module from its source path (or your internal gallery if published there):

```powershell
Import-Module "$PSScriptRoot\Nebula.Core.psd1"
```

If you rely on Microsoft Graph/EXO, ensure those modules are present (Nebula.Core can auto-install when `-AutoInstall` is available).
