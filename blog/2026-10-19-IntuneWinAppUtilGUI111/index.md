---
slug: intunewinapputilgui-1-1-1
title: "IntuneWinAppUtil GUI 1.1.1: Windows PowerShell 5.1 works again"
date: 2026-10-19T10:13:00+02:00
authors: [gioxx]
tags: [intune, intunewinapputilgui, powershell]
---

IntuneWinAppUtil GUI 1.1.1 is a fix for **Windows PowerShell 5.1** users: versions 1.0.7 to 1.1.0 did not import correctly in the PowerShell built into Windows.

```powershell
Update-Module IntuneWinAppUtilGUI
```

{/* truncate */}

Since 1.0.7, the helper that checks for updates used syntax that exists only in PowerShell 7, so importing the module in 5.1 printed parse errors. 1.1.1 restores 5.1 compatibility, and the fallback to the PowerShell Gallery API for the update check works in 5.1 too.

A new test imports the module in Windows PowerShell 5.1 on every pull request, so this cannot break again unnoticed.

If you use PowerShell 7 nothing changes for you, but updating is still recommended.

:::note
Written in October 2026 from the release notes, to keep the history of every IntuneWinAppUtil GUI release on this site.
:::
