---
sidebar_position: 5
title: "Licenses"
description: Export tenant license assignments and inspect user licenses with friendly SKU names.
hide_title: true
id: licenses
tags:
  - Export-MsolAccountSku
  - Add-MsolAccountSku
  - Get-TenantMsolAccountSku
  - Get-UserMsolAccountSku
  - Move-MsolAccountSku
  - Update-LicenseCatalog
  - Nebula.Core
  - Licenses
---

# License reports

Backed by Microsoft Graph with a cached SKU catalog. For full details and examples, run `Get-Help <FunctionName> -Detailed`.

## Export-MsolAccountSku
Export all users with assigned licenses to CSV, mapping SKU part numbers to friendly names.

**Syntax**

```powershell
Export-MsolAccountSku [-CsvFolder <String>] [-ForceLicenseCatalogRefresh]
```

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

**Syntax**

```powershell
Get-UserMsolAccountSku -UserPrincipalName <String> [-ForceLicenseCatalogRefresh]
```

| Parameter | Description | Required |
| --- | --- | :---: |
| `UserPrincipalName` | Target UPN or object ID. | Yes |
| `ForceLicenseCatalogRefresh` | Redownload license catalog cache. | No |

**Example**
```powershell
Get-UserMsolAccountSku -UserPrincipalName 'user@contoso.com'
```

## Get-TenantMsolAccountSku
List tenant SKUs with resolved names, totals, consumed, available, and seat states.

**Syntax**

```powershell
Get-TenantMsolAccountSku [-ForceLicenseCatalogRefresh] [-AsTable] [-GridView]
```

| Parameter | Description | Required | Default |
| --- | --- | :---: | --- |
| `ForceLicenseCatalogRefresh` | Redownload license catalog cache. | No | `False` |
| `AsTable` | Format output as a table. | No | `False` |
| `GridView` | Show output in a GridView window. | No | `False` |

**Example**
```powershell
Get-TenantMsolAccountSku -AsTable
```

## Add-MsolAccountSku
Assign licenses by friendly name (resolved via catalog), SKU part number, or SKU ID to a user.

**Syntax**

```powershell
Add-MsolAccountSku -UserPrincipalName <String> -License <String[]> [-ForceLicenseCatalogRefresh]
```

| Parameter | Description | Required |
| --- | --- | :---: |
| `UserPrincipalName` | Target user UPN or object ID. | Yes |
| `License` | Friendly name, SKU part number, or SKU ID. Accepts multiple values. | Yes |
| `ForceLicenseCatalogRefresh` | Redownload license catalog cache. | No |

**Examples**
```powershell
Add-MsolAccountSku -UserPrincipalName 'user@contoso.com' -License 'Microsoft 365 E3'
Add-MsolAccountSku -UserPrincipalName 'user@contoso.com' -License 'ENTERPRISEPACK','VISIOCLIENT'
Add-MsolAccountSku -UserPrincipalName 'user@contoso.com' -License '18181a46-0d4e-45cd-891e-60aabd171b4e'
```

:::note
If the target user has no `UsageLocation`, Nebula.Core sets it automatically using the `UsageLocation` key from your configuration (default `US`, override via `%USERPROFILE%\.NebulaCore\settings.psd1`). If updating the usage location fails, license assignment stops.
:::

:::warning
If the tenant does not have units available for the requested license, the assignment is avoided and a warning message is displayed.
:::

## Move-MsolAccountSku
Move all licenses (with disabled plans preserved) from one user to another.

**Syntax**

```powershell
Move-MsolAccountSku -SourceUserPrincipalName <String> -DestinationUserPrincipalName <String>
```

| Parameter | Description | Required |
| --- | --- | :---: |
| `SourceUserPrincipalName` | Source user UPN or object ID. | Yes |
| `DestinationUserPrincipalName` | Destination user UPN or object ID. | Yes |

**Example**
```powershell
Move-MsolAccountSku -SourceUserPrincipalName 'user1@contoso.com' -DestinationUserPrincipalName 'user2@contoso.com'
```

## Update-LicenseCatalog
Refresh the local license catalog cache (download SKU mappings).

**Syntax**

```powershell
Update-LicenseCatalog [-Force]
```

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
