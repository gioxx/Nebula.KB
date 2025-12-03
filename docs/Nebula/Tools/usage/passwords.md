---
sidebar_position: 1
title: "Generate passwords"
description: Create strong or simplified passwords and can copy results to the clipboard.
hide_title: true
id: passwords
tags:
  - Passwords
  - Tools
  - Nebula.Tools
---

# Generate passwords

`New-RandomPassword` (alias: `Get-RandomPassword`) creates strong or simplified passwords and can copy results to the clipboard.

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
