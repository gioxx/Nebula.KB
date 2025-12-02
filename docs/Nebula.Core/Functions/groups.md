---
sidebar_position: 6
title: "Groups"
description: Export distribution/dynamic groups, M365 groups, role groups, and user memberships.
hide_title: true
id: groups
tags:
  - Export-DistributionGroups
  - Export-DynamicDistributionGroups
  - Export-M365Group
  - Get-RoleGroupsMembers
  - Get-UserGroups
---

# Group helpers

Requires EXO (for DGs/role groups) and Microsoft Graph for M365 groups where applicable. For complete, up-to-date info, run `Get-Help <FunctionName> -Detailed`.

## Export-DistributionGroups
Export distribution groups and members.

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
Show the simplified filter of a dynamic DG.

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

| Parameter | Description | Required | Default |
| --- | --- | :---: | --- |
| `UserPrincipalName` | User/contact/group identity. | Yes | - |
| `GridView` | Show details in Out-GridView. | No | `False` |

**Examples**
```powershell
Export-DistributionGroups -CSVFolder 'C:\Temp\DGs'

Export-DynamicDistributionGroups -CSVFolder 'C:\Temp\DynDGs'

Get-UserGroups -UserPrincipalName 'user@contoso.com'
```
