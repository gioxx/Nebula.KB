---
sidebar_position: 5
title: "Mailboxes"
description: Manage aliases, permissions, languages, quotas, and shared mailbox setup.
hide_title: true
id: mailboxes
tags:
  - Add-MboxAlias
  - Add-MboxPermission
  - Export-MboxPermission
  - New-SharedMailbox
---

# Mailbox utilities

Requires an EXO session. For full and always-up-to-date details, use `Get-Help <FunctionName> -Detailed`.

## Add-MboxAlias / Remove-MboxAlias
Add or remove SMTP aliases on a recipient.

| Parameter | Description | Required |
| --- | --- | :---: |
| `SourceMailbox` (`Identity`) | Target mailbox/recipient. Pipeline accepted. | Yes |
| `MailboxAlias` | Alias (SMTP address) to add/remove. | Yes |

**Examples**
```powershell
Add-MboxAlias -SourceMailbox info@contoso.com -MailboxAlias alias@contoso.com
Remove-MboxAlias -SourceMailbox info@contoso.com -MailboxAlias alias@contoso.com
```

## Add/Remove/Get/Export-MboxPermission
Manage mailbox permissions and export them to CSV.

| Parameter | Description | Required (Add/Remove) |
| --- | --- | :---: |
| `Identity` | Target mailbox. | Yes |
| `User` | Principal to grant/revoke. | Yes |
| `AccessRights` | Rights (e.g., FullAccess, SendAs, SendOnBehalf). | Yes (Add) |
| `AutoMapping` | Enable/disable Outlook automapping. | No |
| `CsvFolder` (Export) | Destination folder for CSV export. | No |

**Examples**
```powershell
Add-MboxPermission -Identity shared@contoso.com -User john@contoso.com -AccessRights FullAccess -AutoMapping:$false
Remove-MboxPermission -Identity shared@contoso.com -User john@contoso.com -AccessRights FullAccess
Export-MboxPermission -Identity shared@contoso.com -CsvFolder C:\Temp
Get-MboxPermission -Identity shared@contoso.com
```

## Get/Export-MboxAlias
List or export aliases for auditing.

| Parameter | Description | Required |
| --- | --- | :---: |
| `Identity` | Target mailbox/recipient. | Yes |
| `CsvFolder` (Export) | Destination folder for CSV export. | No |

**Examples**
```powershell
Get-MboxAlias -Identity user@contoso.com
Export-MboxAlias -Identity user@contoso.com -CsvFolder C:\Temp
```

## Set-MboxLanguage
Set mailbox UI language, time zone, and regional settings.

| Parameter | Description |
| --- | --- |
| `UserPrincipalName` (`Identity`) | Target mailbox. |
| `Language` | Culture code (e.g., it-IT, en-US). |
| `TimeZone` | Time zone ID (e.g., W. Europe Standard Time). |
| `DateFormat` / `TimeFormat` | Optional overrides. |

**Example**
```powershell
Set-MboxLanguage -UserPrincipalName user@contoso.com -Language it-IT -TimeZone "W. Europe Standard Time"
```

## Set-MboxRulesQuota
Adjust inbox rules quota for a mailbox.

| Parameter | Description |
| --- | --- |
| `Identity` | Target mailbox. |
| `RulesQuotaInKB` | New quota in KB. |

**Example**
```powershell
Set-MboxRulesQuota -Identity user@contoso.com -RulesQuotaInKB 128
```

## New-SharedMailbox
Create a shared mailbox.

| Parameter | Description | Required |
| --- | --- | :---: |
| `Name` | Display name. | Yes |
| `Alias` | Mail alias. | Yes |
| `PrimarySmtpAddress` | Primary SMTP. | Yes |
| `Members` | Members to grant FullAccess/SendAs. | No |
| `Language` / `TimeZone` | Optional localization. | No |

**Example**
```powershell
New-SharedMailbox -Name "Support" -Alias support -PrimarySmtpAddress support@contoso.com -Members 'agent1@contoso.com','agent2@contoso.com'
```

## Set-SharedMboxCopyForSent
Toggle saving sent items for delegated send-as/send-on-behalf.

| Parameter | Description | Required |
| --- | --- | :---: |
| `Identity` | Shared mailbox. | Yes |
| `Enable` | Switch to enable; omit for disable. | No |

**Example**
```powershell
Set-SharedMboxCopyForSent -Identity shared@contoso.com -Enable
```

## Test-SharedMailboxCompliance
Quick checks on shared mailbox configuration (permissions, quotas, sent-items copy).

| Parameter | Description |
| --- | --- |
| `Identity` | Shared mailbox to validate. |

**Example**
```powershell
Test-SharedMailboxCompliance -Identity shared@contoso.com
```

**Examples**
```powershell
Add-MboxAlias -Identity 'user@contoso.com' -Aliases 'user.sales@contoso.com','user.eu@contoso.com'

Add-MboxPermission -Identity 'shared@contoso.com' -User 'john@contoso.com' -AccessRights FullAccess -AutoMapping:$false

New-SharedMailbox -Name 'Support' -PrimarySmtpAddress 'support@contoso.com' -Members 'agent1@contoso.com','agent2@contoso.com'
```
