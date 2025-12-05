---
sidebar_position: 6
title: "Quarantine"
description: Search, export, release, or delete Exchange Online quarantine items.
hide_title: true
id: quarantine
tags:
  - Quarantine
  - Export-QuarantineEml
  - Get-QuarantineToRelease
  - Unlock-QuarantineFrom
  - Nebula.Core
---

# Quarantine toolkit

All commands require an active EXO session (`Test-EOLConnection` is called internally). For complete and current details, run `Get-Help <FunctionName> -Detailed`.

## Export-QuarantineEml
Fetch a quarantined message by MessageId, save it as EML, optionally open it, and optionally release to all recipients.

**Syntax**

```powershell
Export-QuarantineEml -MessageId <String> [-DestinationFolder <String>] [-OpenFile] [-ReleaseToAll] [-ReportFalsePositive]
```

| Parameter | Description | Required | Default |
| --- | --- | :---: | --- |
| `MessageId` | MessageId with/without angle brackets. | Yes | - |
| `DestinationFolder` | Folder for the EML file. | No | Current directory |
| `OpenFile` | Open the file after saving. | No | `False` |
| `ReleaseToAll` | Release to all recipients after export. | No | `False` |
| `ReportFalsePositive` | Also report as false positive on release. | No | `False` |

**Example**
```powershell
Export-QuarantineEml -MessageId '20230617142935.F5B74194B266E458@contoso.com' `
  -DestinationFolder C:\Temp\Quarantine `
  -OpenFile -ReleaseToAll -ReportFalsePositive
```

## Get-QuarantineFrom / Get-QuarantineFromDomain
List quarantined messages by sender or sender domain.

**Syntax**

```powershell
Get-QuarantineFrom -SenderAddress <String[]> [-IncludeReleased]
Get-QuarantineFromDomain -SenderDomain <String[]> [-IncludeReleased]
```

| Parameter | Description | Required | Applies to |
| --- | --- | :---: | --- |
| `SenderAddress` | Sender address(es). Pipeline accepted. | Yes | Get-QuarantineFrom |
| `SenderDomain` | Domain(s) (e.g., contoso.com). Pipeline accepted. | Yes | Get-QuarantineFromDomain |
| `IncludeReleased` | Include messages already released. | No | Both

**Examples**
```powershell
Get-QuarantineFrom -SenderAddress 'bad@contoso.com' -IncludeReleased
Get-QuarantineFromDomain -SenderDomain 'contoso.com'
```

## Get-QuarantineToRelease
Pull quarantine items for a date range, optionally pick items via Out-GridView, export CSV/HTML, and release or delete in bulk.

**Syntax**

```powershell
Get-QuarantineToRelease -Interval <Int> [-ChooseDayFromCalendar] [-GridView] [-Csv] [-Html]
                       [-OutputFolder <String>] [-ReleaseSelected] [-DeleteSelected] [-ReportFalsePositive]
```

| Parameter | Description | Required | Default |
| --- | --- | :---: | --- |
| `Interval` | Days back to search (1-30). | Yes (unless calendar) | - |
| `ChooseDayFromCalendar` | Pick a single day via calendar UI. | No | `False` |
| `GridView` | Select items via Out-GridView. | No | `False` |
| `Csv` / `Html` | Export reports. | No | `False` |
| `OutputFolder` | Target folder for CSV/HTML. | No | Current directory |
| `ReleaseSelected` / `DeleteSelected` | Release or delete selected items. | No | `False` |
| `ReportFalsePositive` | Also report as false positive when releasing. | No | `False` |

**Example**
```powershell
Get-QuarantineToRelease -Interval 7 -GridView -ReleaseSelected -ReportFalsePositive
```

## Unlock-QuarantineFrom / Unlock-QuarantineMessageId
Bulk-release messages for specific senders or message IDs/identities (to all recipients, with optional false-positive report). Confirmation is controlled by `SupportsShouldProcess`; use `-Confirm:$false` when you want to suppress prompts.

**Syntax**

```powershell
Unlock-QuarantineFrom -SenderAddress <String[]> [-ReportFalsePositive] [-Confirm]
Unlock-QuarantineMessageId [-MessageId <String[]>] [-Identity <String[]>] [-ReportFalsePositive] [-Confirm]
```

| Parameter | Description | Required | Applies to |
| --- | --- | :---: | --- |
| `SenderAddress` | Sender address(es). Pipeline accepted. | Yes | Unlock-QuarantineFrom |
| `MessageId` | MessageId values (with/without angle brackets). Pipeline accepted. | One of MessageId/Identity | Unlock-QuarantineMessageId |
| `Identity` | Quarantine Identity values (e.g., GUID\GUID). Pipeline accepted. | One of MessageId/Identity | Unlock-QuarantineMessageId |
| `ReportFalsePositive` | Also report as false positive. | No | Both

**Example**
```powershell
Unlock-QuarantineFrom -SenderAddress 'sender@contoso.com' -ReportFalsePositive -Confirm:$false
```

:::tip
`Format-MessageIDsFromClipboard` (`mids`) now prepares quarantine identities and can trigger `Unlock-QuarantineMessageId -Identity` directly from clipboard content.
:::

## Questions and answers

### Is EXO required for quarantine functions?

Yes. Quarantine cmdlets call `Test-EOLConnection` and expect an active EXO session (`Connect-EOL`/`Connect-Nebula`).

### How do I handle confirmations for destructive actions?

Cmdlets like `Unlock-QuarantineFrom` or `Remove-MboxPermission` support `-Confirm:$false` / `-WhatIf` via `SupportsShouldProcess`. Use them to automate or dry run.
