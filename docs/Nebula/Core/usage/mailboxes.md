---
sidebar_position: 3
title: "Mailboxes"
description: Manage aliases, permissions, languages, quotas, and shared mailbox setup.
hide_title: true
id: mailboxes
tags:
  - Add-MboxAlias
  - Add-MboxPermission
  - Export-MboxAlias
  - Export-MboxPermission
  - Get-MboxAlias
  - Get-MboxPermission
  - Get-UserLastSeen
  - New-SharedMailbox
  - Remove-MboxAlias
  - Remove-MboxPermission
  - Set-MboxLanguage
  - Set-MboxRulesQuota
  - Set-SharedMboxCopyForSent
  - Test-SharedMailboxCompliance
  - Nebula.Core
---

# Mailbox helpers

Requires an EXO session. For full and always-up-to-date details, use `Get-Help <FunctionName> -Detailed`.

## Add-MboxAlias
Add SMTP aliases on a recipient.

**Syntax**

```powershell
Add-MboxAlias -SourceMailbox <String> -MailboxAlias <String>
```

| Parameter | Description | Required |
| --- | --- | :---: |
| `SourceMailbox` (`Identity`) | Target mailbox/recipient. Pipeline accepted. | Yes |
| `MailboxAlias` | Alias (SMTP address) to add. | Yes |

**Examples**
```powershell
Add-MboxAlias -SourceMailbox 'info@contoso.com' -MailboxAlias 'alias@contoso.com'
```

```powershell
Add-MboxAlias -Identity 'user@contoso.com' -Aliases 'user.sales@contoso.com','user.eu@contoso.com'
```

## Add-MboxPermission
Grant mailbox permissions.

**Syntax**

```powershell
Add-MboxPermission -Identity <String> -User <String> -AccessRights <String[]> [-AutoMapping]
```

| Parameter | Description | Required |
| --- | --- | :---: |
| `Identity` | Target mailbox. | Yes |
| `User` | Principal to grant. | Yes |
| `AccessRights` | Rights (e.g., FullAccess, SendAs, SendOnBehalf). | Yes |
| `AutoMapping` | Enable/disable Outlook automapping. | No |

**Examples**
```powershell
Add-MboxPermission -Identity 'shared@contoso.com' -User 'john@contoso.com' -AccessRights FullAccess -AutoMapping:$false
```

## Export-MboxAlias
Export aliases for auditing.

**Syntax**

```powershell
Export-MboxAlias -Identity <String> [-CsvFolder <String>]
```

| Parameter | Description | Required |
| --- | --- | :---: |
| `Identity` | Target mailbox/recipient. | Yes |
| `CsvFolder` | Destination folder for CSV export. | No |

**Examples**
```powershell
Export-MboxAlias -Identity 'user@contoso.com' -CsvFolder 'C:\Temp'
```

## Export-MboxPermission
Export mailbox permissions to CSV.

**Syntax**

```powershell
Export-MboxPermission -Identity <String> [-CsvFolder <String>]
```

| Parameter | Description | Required |
| --- | --- | :---: |
| `Identity` | Target mailbox. | Yes |
| `CsvFolder` | Destination folder for CSV export. | No |

**Examples**
```powershell
Export-MboxPermission -Identity 'shared@contoso.com' -CsvFolder 'C:\Temp'
```

## Get-MboxAlias
List aliases for auditing.

**Syntax**

```powershell
Get-MboxAlias -Identity <String>
```

| Parameter | Description | Required |
| --- | --- | :---: |
| `Identity` | Target mailbox/recipient. | Yes |

**Examples**
```powershell
Get-MboxAlias -Identity 'user@contoso.com'
```

## Get-MboxPermission
List mailbox permissions.

**Syntax**

```powershell
Get-MboxPermission -Identity <String>
```

| Parameter | Description | Required |
| --- | --- | :---: |
| `Identity` | Target mailbox. | Yes |

**Examples**
```powershell
Get-MboxPermission -Identity 'shared@contoso.com'
```

## Get-UserLastSeen
Return the most recent activity for a mailbox combining Exchange LastUserActionTime and (when available) Entra ID sign-in logs.

**Syntax**

```powershell
Get-UserLastSeen -User <String>
```

| Parameter | Description |
| --- | --- |
| `User` (`Identity`, `UserPrincipalName`) | Target mailbox identity. Pipeline accepted. |

**Example**
```powershell
Get-UserLastSeen -User 'alice@contoso.com'
```

Notes:
- Requires Exchange Online connection. Graph sign-in logs are included when `AuditLog.Read.All` + `Directory.Read.All` scopes are available.
- Output includes `LastUserActionTime`, `LastInteractiveSignIn`, `LastSeen`, and the `Source` used.

## New-SharedMailbox
Create a shared mailbox.

**Syntax**

```powershell
New-SharedMailbox -Name <String> -Alias <String> -PrimarySmtpAddress <String> [-Members <String[]>]
                  [-Language <String>] [-TimeZone <String>]
```

| Parameter | Description | Required |
| --- | --- | :---: |
| `Name` | Display name. | Yes |
| `Alias` | Mail alias. | Yes |
| `PrimarySmtpAddress` | Primary SMTP. | Yes |
| `Members` | Members to grant FullAccess/SendAs. | No |
| `Language` / `TimeZone` | Optional localization. | No |

**Example**
```powershell
New-SharedMailbox -Name "Support" -Alias 'support' -PrimarySmtpAddress 'support@contoso.com' -Members 'agent1@contoso.com','agent2@contoso.com'
```

## Remove-MboxAlias
Remove SMTP aliases from a recipient.

**Syntax**

```powershell
Remove-MboxAlias -SourceMailbox <String> -MailboxAlias <String>
```

| Parameter | Description | Required |
| --- | --- | :---: |
| `SourceMailbox` (`Identity`) | Target mailbox/recipient. Pipeline accepted. | Yes |
| `MailboxAlias` | Alias (SMTP address) to remove. | Yes |

**Examples**
```powershell
Remove-MboxAlias -SourceMailbox 'info@contoso.com' -MailboxAlias 'alias@contoso.com'
```

## Remove-MboxPermission
Revoke mailbox permissions.

**Syntax**

```powershell
Remove-MboxPermission -Identity <String> -User <String> -AccessRights <String[]>
```

| Parameter | Description | Required |
| --- | --- | :---: |
| `Identity` | Target mailbox. | Yes |
| `User` | Principal to revoke. | Yes |
| `AccessRights` | Rights (e.g., FullAccess, SendAs, SendOnBehalf). | Yes |

**Examples**
```powershell
Remove-MboxPermission -Identity 'shared@contoso.com' -User 'john@contoso.com' -AccessRights FullAccess
```

## Set-MboxLanguage
Set mailbox UI language, time zone, and regional settings.

**Syntax**

```powershell
Set-MboxLanguage -UserPrincipalName <String> [-Language <String>] [-TimeZone <String>]
                 [-DateFormat <String>] [-TimeFormat <String>]
```

| Parameter | Description |
| --- | --- |
| `UserPrincipalName` (`Identity`) | Target mailbox. |
| `Language` | Culture code (e.g., it-IT, en-US). |
| `TimeZone` | Time zone ID (e.g., W. Europe Standard Time). |
| `DateFormat` / `TimeFormat` | Optional overrides. |

**Example**
```powershell
Set-MboxLanguage -UserPrincipalName 'user@contoso.com' -Language it-IT -TimeZone "W. Europe Standard Time"
```

## Set-MboxRulesQuota
Adjust inbox rules quota for a mailbox.

**Syntax**

```powershell
Set-MboxRulesQuota -Identity <String> -RulesQuotaInKB <Int>
```

| Parameter | Description |
| --- | --- |
| `Identity` | Target mailbox. |
| `RulesQuotaInKB` | New quota in KB. |

**Example**
```powershell
Set-MboxRulesQuota -Identity 'user@contoso.com' -RulesQuotaInKB 128
```

## Set-SharedMboxCopyForSent
Toggle saving sent items for delegated send-as/send-on-behalf.

**Syntax**

```powershell
Set-SharedMboxCopyForSent -Identity <String> [-Enable]
```

| Parameter | Description | Required |
| --- | --- | :---: |
| `Identity` | Shared mailbox. | Yes |
| `Enable` | Switch to enable; omit for disable. | No |

**Example**
```powershell
Set-SharedMboxCopyForSent -Identity 'shared@contoso.com' -Enable
```

## Test-SharedMailboxCompliance
Quick checks on shared mailbox configuration (permissions, quotas, sent-items copy).

**Syntax**

```powershell
Test-SharedMailboxCompliance -Identity <String>
```

| Parameter | Description |
| --- | --- |
| `Identity` | Shared mailbox to validate. |

**Example**
```powershell
Test-SharedMailboxCompliance -Identity 'shared@contoso.com'
```
