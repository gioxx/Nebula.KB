---
sidebar_position: 4
title: "Groups"
description: Export distribution/dynamic groups, M365 groups, role groups, and user memberships.
hide_title: true
id: groups
tags:
  - Export-DistributionGroups
  - Export-DynamicDistributionGroups
  - Distribution Groups
  - Dynamic Distribution Groups
  - Export-M365Group
  - Microsoft 365 Unified Groups
  - Get-RoleGroupsMembers
  - Get-UserGroups
  - Nebula.Core
---

# Group helpers

Requires EXO (for DGs/role groups) and Microsoft Graph for M365 groups where applicable. For complete, up-to-date info, run `Get-Help <FunctionName> -Detailed`.

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
