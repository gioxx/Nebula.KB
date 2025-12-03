---
sidebar_position: 5
title: "Licenses"
description: Export tenant license assignments and inspect user licenses with friendly SKU names.
hide_title: true
id: licenses
tags:
  - Export-MsolAccountSku
  - Get-UserMsolAccountSku
  - Update-LicenseCatalog
  - Nebula.Core
  - Licenses
---

# License reports

Backed by Microsoft Graph with a cached SKU catalog. For full details and examples, run `Get-Help <FunctionName> -Detailed`.

## Syntax

```powershell
Export-MsolAccountSku [-CsvFolder <String>] [-ForceLicenseCatalogRefresh]
```

```powershell
Get-UserMsolAccountSku -UserPrincipalName <String> [-ForceLicenseCatalogRefresh]
```

```powershell
Update-LicenseCatalog [-Force]
```

## Export-MsolAccountSku
Export all users with assigned licenses to CSV, mapping SKU part numbers to friendly names.

| Parameter | Description | Required | Default |
| --- | --- | :---: | --- |
| `CsvFolder` | Output folder. | No | Current directory |
| `ForceLicenseCatalogRefresh` | Redownload the license catalog cache. | No | `False` |

**Example**
```powershell
Export-MsolAccountSku -CsvFolder 'C:\Temp\Reports'
```

## Get-UserMsolAccountSku
Show licenses assigned to a single user with friendly names.

| Parameter | Description | Required |
| --- | --- | :---: |
| `UserPrincipalName` | Target UPN or object ID. | Yes |
| `ForceLicenseCatalogRefresh` | Redownload license catalog cache. | No |

**Example**
```powershell
Get-UserMsolAccountSku -UserPrincipalName 'user@contoso.com'
```

## Update-LicenseCatalog
Refresh the local license catalog cache (download SKU mappings).

| Parameter | Description |
| --- | --- |
| `Force` | Force a refresh even if cache exists. |

**Example**
```powershell
Update-LicenseCatalog -Force
```

## Questions and answers

### Can I export licenses/mailboxes without Graph?

No. License functions and some statistics require Microsoft Graph for complete data. Ensure `Connect-Nebula` requested the right scopes.