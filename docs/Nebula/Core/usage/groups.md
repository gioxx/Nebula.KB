---
sidebar_position: 4
title: "Groups"
description: Export distribution/dynamic groups, M365 groups, role groups, and user memberships.
hide_title: true
id: groups
tags:
  - Add-EntraGroupDevice
  - Add-EntraGroupUser
  - Export-DistributionGroups
  - Export-DynamicDistributionGroups
  - Export-M365Group
  - Get-DynamicDistributionGroupFilter
  - Get-RoleGroupsMembers
  - Get-UserGroups
  - Nebula.Core
  - Distribution Groups
  - Dynamic Distribution Groups
  - Microsoft 365 Unified Groups
---

# Group helpers

Requires EXO (for DGs/role groups) and Microsoft Graph for M365 groups where applicable. For complete, up-to-date info, run `Get-Help <FunctionName> -Detailed`.

## Add-EntraGroupDevice
Add one or more devices to an Entra group (Graph scopes: `Group.ReadWrite.All`, `Directory.Read.All`).

**Syntax**

```powershell
Add-EntraGroupDevice [-GroupName <String>] [-GroupId <String>] -DeviceIdentifier <String[]> [-TreatInputAsId] [-PassThru]
```

| Parameter | Description | Required | Default |
| --- | --- | :---: | --- |
| `GroupName` | Target group display name. | Yes* | - |
| `GroupId` | Target group object ID (use instead of `GroupName`). | Yes* | - |
| `DeviceIdentifier` | Device display name or object ID. Pipeline accepted. | Yes | - |
| `TreatInputAsId` | Treat every `DeviceIdentifier` as an object ID (skip name lookup). | No | `False` |
| `PassThru` | Emit a status object per device. | No | `False` |

\*Use either `GroupName` or `GroupId`.

**Examples**
```powershell
"PC1","PC2" | Add-EntraGroupDevice -GroupName "Zero Trust Devices"
```

```powershell
Add-EntraGroupDevice -GroupId "00000000-0000-0000-0000-000000000000" -DeviceIdentifier "PC1" -PassThru
```

## Add-EntraGroupUser
Add one or more users to an Entra group (Graph scopes: `Group.ReadWrite.All`, `Directory.Read.All`).

**Syntax**

```powershell
Add-EntraGroupUser [-GroupName <String>] [-GroupId <String>] -UserIdentifier <String[]> [-TreatInputAsId] [-PassThru]
```

| Parameter | Description | Required | Default |
| --- | --- | :---: | --- |
| `GroupName` | Target group display name. | Yes* | - |
| `GroupId` | Target group object ID (use instead of `GroupName`). | Yes* | - |
| `UserIdentifier` | UPN/display name/object ID. Pipeline accepted. | Yes | - |
| `TreatInputAsId` | Treat every `UserIdentifier` as an object ID (skip name lookup). | No | `False` |
| `PassThru` | Emit a status object per user. | No | `False` |

\*Use either `GroupName` or `GroupId`.

**Examples**
```powershell
"user1@contoso.com","user2@contoso.com" | Add-EntraGroupUser -GroupName "Project Team"
```

```powershell
Add-EntraGroupUser -GroupId "00000000-0000-0000-0000-000000000000" -UserIdentifier "user1@contoso.com" -PassThru
```

## Export-DistributionGroups
Export distribution groups and members.

**Syntax**

```powershell
Export-DistributionGroups [-DistributionGroup <String[]>] [-Csv] [-CsvFolder <String>]
```

| Parameter | Description | Required | Default |
| --- | --- | :---: | --- |
| `DistributionGroup` | Group identity (name/alias/SMTP). Pipeline accepted. | No | All DGs |
| `Csv` | Force CSV export. | No | `False` |
| `CsvFolder` | Destination for CSV. | No | Current directory |

**Example**
```powershell
Export-DistributionGroups -DistributionGroup "IT Team" -CsvFolder 'C:\Temp\DGs'
```

## Export-DynamicDistributionGroups
Export dynamic DGs and evaluated members.

**Syntax**

```powershell
Export-DynamicDistributionGroups [-DynamicDistributionGroup <String[]>] [-Csv] [-CsvFolder <String>]
```

| Parameter | Description | Required | Default |
| --- | --- | :---: | --- |
| `DynamicDistributionGroup` | Dynamic DG identity. Pipeline accepted. | No | All dynamic DGs |
| `Csv` | Force CSV export. | No | `False` |
| `CsvFolder` | Destination for CSV. | No | Current directory |

**Example**
```powershell
Export-DynamicDistributionGroups -CsvFolder 'C:\Temp\DynDGs'
```

## Export-M365Group
Export Microsoft 365 groups (members/owners).

**Syntax**

```powershell
Export-M365Group [-M365Group <String[]>] [-Csv] [-CsvFolder <String>]
```

| Parameter | Description | Required | Default |
| --- | --- | :---: | --- |
| `M365Group` | Group identity (name/alias/SMTP). Pipeline accepted. | No | All M365 groups |
| `Csv` | Force CSV export. | No | `False` |
| `CsvFolder` | Destination for CSV. | No | Current directory |

**Example**
```powershell
Export-M365Group -M365Group "Project A" -CsvFolder 'C:\Temp\M365'
```

## Get-DynamicDistributionGroupFilter
Show the simplified filter of a dynamic distribution group.

**Syntax**

```powershell
Get-DynamicDistributionGroupFilter -DynamicDistributionGroup <String> [-IncludeDefaults] [-AsObject]
```

| Parameter | Description | Required |
| --- | --- | :---: |
| `DynamicDistributionGroup` | Dynamic DG identity. Pipeline accepted. | Yes |
| `IncludeDefaults` | Include default EXO filter clauses. | No |
| `AsObject` | Return as object instead of string. | No |

**Example**
```powershell
Get-DynamicDistributionGroupFilter -DynamicDistributionGroup "All Mailboxes"
```

## Get-RoleGroupsMembers
List Exchange Online role groups and members.

**Syntax**

```powershell
Get-RoleGroupsMembers [-AsTable] [-GridView]
```

| Parameter | Description | Required | Default |
| --- | --- | :---: | --- |
| `AsTable` | Show formatted table output. | No | `False` (objects) |
| `GridView` | Show results in Out-GridView. | No | `False` |

**Example**
```powershell
Get-RoleGroupsMembers -AsTable
```

## Get-UserGroups
Show the groups (DGs/M365) a user/contact/group belongs to.

**Syntax**

```powershell
Get-UserGroups -UserPrincipalName <String> [-GridView]
```

| Parameter | Description | Required | Default |
| --- | --- | :---: | --- |
| `UserPrincipalName` | User/contact/group identity. | Yes | - |
| `GridView` | Show details in Out-GridView. | No | `False` |

**Example**
```powershell
Get-UserGroups -UserPrincipalName 'user@contoso.com'
```
