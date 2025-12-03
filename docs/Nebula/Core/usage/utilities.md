---
sidebar_position: 8
title: "Utilities"
description: Clipboard helpers for quarantine MessageIds and e-mail address lists.
hide_title: true
id: utilities
tags:
  - Format-MessageIDsFromClipboard
  - Format-SortedEmailsFromClipboard
  - Tools
  - Nebula.Core
---

# Utilities

For full details and examples, run `Get-Help Format-MessageIDsFromClipboard -Detailed` or `Get-Help Format-SortedEmailsFromClipboard -Detailed`.

## Format-MessageIDsFromClipboard (`mids`)
Reads MessageId values (one per line) from the clipboard, normalizes them for quarantine commands, copies a quoted/comma-separated list back to the clipboard, and can release the messages immediately.

| Parameter | Description | Default |
| --- | --- | --- |
| `NoRelease` | Skip automatic release of the MessageIds. | `False` |
| `PassThru` | Emit the formatted string to the pipeline. | `False` |

**Example**
```powershell
# Format and release immediately
Format-MessageIDsFromClipboard

# Format only, keep the list in the clipboard and show it
Format-MessageIDsFromClipboard -NoRelease -PassThru
```

## Format-SortedEmailsFromClipboard (`fse`)
Extracts e-mail addresses from clipboard text, deduplicates and sorts them, then copies a quoted/comma-separated list back to the clipboard.

| Parameter | Description | Default |
| --- | --- | --- |
| `PassThru` | Emit the formatted string to the pipeline. | `False` |

**Example**
```powershell
Format-SortedEmailsFromClipboard -PassThru
```
