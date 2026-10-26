---
slug: intunewinapputilgui-1-0-5
title: "IntuneWinAppUtil GUI 1.0.5: Show-IntuneWinAppUtilGui is back"
date: 2025-10-01T14:56:00+02:00
authors: [gioxx]
tags: [intune, intunewinapputilgui, powershell]
---

IntuneWinAppUtil GUI 1.0.5 is an emergency fix for [1.0.4](/news/intunewinapputilgui-1-0-4), which shipped without the `Show-IntuneWinAppUtilGui` command. 1.0.4 has been removed from the PowerShell Gallery.

```powershell
Update-Module IntuneWinAppUtilGUI
```

{/* truncate */}

If you installed 1.0.4 and the GUI command is not found, update to 1.0.5. It contains all the changes announced for 1.0.4: checks on the setup file and output folder, a single `.intunewin` extension, the source folder taken from the setup file when empty, and relative paths that work in Windows PowerShell 5.1.

:::note
Written in October 2026 from the release notes, to keep the history of every IntuneWinAppUtil GUI release on this site.
:::
