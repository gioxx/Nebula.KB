---
sidebar_position: 1
title: "Active Directory"
description: Active Directory helpers for everyday administration tasks.
hide_title: true
id: active-directory
tags:
  - Active Directory
  - Find-ADAccountExpirations
  - Nebula.Tools
  - Tools
---

# Active Directory

Active Directory helpers for everyday tasks. This page starts with account expiration management.

## Find-ADAccountExpirations

For full details and examples, run `Get-Help Find-ADAccountExpirations -Detailed`.

`Find-ADAccountExpirations` scans Active Directory for enabled users with an expiration date. You can filter by target date and/or email domain, export results to CSV, and optionally extend account expirations.

**Syntax**

```powershell
Find-ADAccountExpirations [-TargetDate <String>] [-FilterDomain <String>] [-ExportCsv] [-ExportPath <String>] [-ExtendExpiration] [-ExtendTo <String>] [-TargetServer <String>]
```

| Parameter | Description | Required | Default |
| --- | --- | :---: | --- |
| `ExportCsv` | Export results to CSV. | No | `False` |
| `ExportPath` | Output folder for CSV export. | No | Current location |
| `ExtendExpiration` | Extend expiration for matched accounts. | No | `False` |
| `ExtendTo` | New expiration date when using `-ExtendExpiration`. | No | - |
| `FilterDomain` | Filter by email domain (e.g., `@contoso.com`). | No | - |
| `TargetDate` | Reference expiration date (accepts any DateTime-compatible format). | No | - |
| `TargetServer` | Domain controller to query/update. | No | Default DC |

**Examples**
```powershell
# Find users expiring on or before a target date
Find-ADAccountExpirations -TargetDate "2027-01-01"

# Filter by email domain and export to CSV in the current folder
Find-ADAccountExpirations -FilterDomain "@contoso.com" -ExportCsv

# Extend expirations (preview only)
Find-ADAccountExpirations -TargetDate "2027-01-01" -ExtendExpiration -ExtendTo "2027-12-31" -WhatIf
```

:::note
- Requires the `ActiveDirectory` module (RSAT) and appropriate permissions.
- Use `-WhatIf` to preview changes before extending expirations.
:::

## Questions and answers

### Is `TargetDate` mandatory?

Only if `-FilterDomain` is not supplied.

### Is `TargetServer` required?

No. If omitted, the default domain controller is used.
