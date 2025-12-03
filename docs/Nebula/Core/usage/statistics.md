---
sidebar_position: 7
title: "Statistics"
description: Export mailbox statistics for reporting or capacity checks.
hide_title: true
id: statistics
tags:
  - Export-MboxStatistics
  - Statistics
  - Nebula.Core
---

# Statistics

For full parameter descriptions and up-to-date notes, run `Get-Help Export-MboxStatistics -Detailed`.

## Export-MboxStatistics
Export mailbox statistics (size, quotas, archive info) either to CSV (all mailboxes) or as objects (single mailbox).

| Parameter | Description | Required | Default |
| --- | --- | :---: | --- |
| `UserPrincipalName` | Optional single mailbox identity; when omitted, all mailboxes are exported to CSV. | No | - |
| `CsvFolder` | Output folder (for all-mailbox export). | No | Current directory |
| `Round` | Round quota values up to the nearest integer GB. | No | `False` |
| `BatchSize` | Flush to CSV every N mailboxes. | No | `25` |

**Examples**
```powershell
# Export every mailbox to CSV (batched writes)
Export-MboxStatistics -CsvFolder 'C:\Temp\Reports' -Round

# Inspect a single mailbox as objects
Export-MboxStatistics -UserPrincipalName 'user@contoso.com'
```
