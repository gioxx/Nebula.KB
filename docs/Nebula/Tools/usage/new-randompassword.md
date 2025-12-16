---
sidebar_position: 3
title: "New-RandomPassword"
description: Create strong or simplified passwords and can copy results to the clipboard.
hide_title: true
id: new-randompassword
tags:
  - New-RandomPassword
  - Nebula.Tools
  - Passwords
  - Tools
---

# New-RandomPassword

`New-RandomPassword` creates strong or simplified passwords and can copy results to the clipboard.

:::note
The function name is `New-RandomPassword`. The legacy alias `Get-RandomPassword` remains available for backward compatibility.
:::

## Syntax

```powershell
New-RandomPassword [-PasswordLength <Int>] [-Simple] [-Count <Int>] [-Clipboard]
```

## Examples

```powershell
# Single strong password (default length 12)
New-RandomPassword

# Explicit length
New-RandomPassword -PasswordLength 16

# Simplified characters, three passwords, copied to clipboard
New-RandomPassword -Simple -Count 3 -Clipboard
```

### Notes

- `-Clipboard` writes the generated passwords to the Windows clipboard.
- `-Simple` reduces special characters for systems with stricter input rules.
- `-Count` lets you produce multiple passwords in one call.

## Questions and answers

### What is the default password length?

12 characters. Change it with `-PasswordLength`. Use `-Simple` to reduce special characters or `-Count` to generate multiple passwords.

### Does `-Clipboard` need special permissions?

No. It uses the Windows clipboard. If the session cannot access the clipboard (for example, a remoting session without clipboard support) the cmdlet throws.