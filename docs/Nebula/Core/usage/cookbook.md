---
sidebar_position: 9
title: "Cookbook"
description: Practical recipes for Nebula.Core (connections, licenses, quarantine, mailboxes, groups).
hide_title: true
id: cookbook
tags:
  - Cookbook
  - Core
  - Nebula.Core
---

# Cookbook

Practical recipes for Nebula.Core (connections, licenses, quarantine, mailboxes, groups).

## Connect EXO and Graph in one call

```powershell
Connect-Nebula -GraphScopes 'User.Read.All','Directory.Read.All' -AutoInstall
```

## Reload configuration after updating PSD1 files

```powershell
Sync-NebulaConfig
```

## Export all licenses to CSV with a fresh catalog

```powershell
Export-MsolAccountSku -CsvFolder 'C:\Reports\Licenses' -ForceLicenseCatalogRefresh
```

## Review quarantine and release via grid

```powershell
Get-QuarantineToRelease -Interval 7 -GridView -ReleaseSelected -ReportFalsePositive
```

## Create a ready-to-use shared mailbox

```powershell
New-SharedMailbox -Name "Support" -Alias support `
  -PrimarySmtpAddress "support@contoso.com" `
  -Members 'agent1@contoso.com','agent2@contoso.com' `
  -Language it-IT -TimeZone "W. Europe Standard Time"
```

## Set language and time zone on an existing mailbox

```powershell
Set-MboxLanguage -UserPrincipalName 'user@contoso.com' -Language en-US -TimeZone "W. Europe Standard Time"
```

## Export mailbox statistics (CSV, batched)

```powershell
Export-MboxStatistics -CsvFolder 'C:\Reports\Mailboxes' -Round -BatchSize 50
```

## Export DG and M365 groups with members

```powershell
Export-DistributionGroups -CsvFolder 'C:\Reports\DGs'
Export-M365Group -CsvFolder 'C:\Reports\M365'
```

## Normalize MessageIds from clipboard and release immediately

```powershell
Format-MessageIDsFromClipboard   # formats, releases, and shows output
```
