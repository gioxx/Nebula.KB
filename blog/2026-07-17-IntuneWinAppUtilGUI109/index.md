---
slug: intunewinapputilgui-1-0-9
title: "IntuneWinAppUtil GUI 1.0.9: Get-IntuneFileVersion for detection rules"
date: 2026-07-17T09:41:00+02:00
authors: [gioxx]
tags: [intune, intunewinapputilgui, powershell]
---

IntuneWinAppUtil GUI 1.0.9 adds `Get-IntuneFileVersion`, a command that reads the `FileVersion` of a file, which is the value to use in an Intune detection rule based on a file version.

```powershell
Get-IntuneFileVersion 'C:\Program Files\Contoso\App.exe'
```

{/* truncate */}

The version Windows shows in a file's properties is not always the one Intune compares in a detection rule, and a mismatch makes the app reinstall at every check-in. I wrote about it, in Italian, on [gioxx.org](https://gioxx.org/2026/07/17/intune-detection-rule-win32app).

The command works from the command line only: the GUI does not use it yet. If you already have 1.0.8 and don't need it, you can skip this update.

```powershell
Update-Module IntuneWinAppUtilGUI
```

:::note
Written in October 2026 from the release notes, to keep the history of every IntuneWinAppUtil GUI release on this site.
:::
