---
slug: intunewinapputilgui-1-0-1
title: "IntuneWinAppUtil GUI 1.0.1: the module loads again after install"
date: 2025-07-04T15:39:00+02:00
authors: [gioxx]
tags: [intune, intunewinapputilgui, powershell]
---

IntuneWinAppUtil GUI 1.0.1 fixes the first bug reported after 1.0.0: once installed from the PowerShell Gallery, the module could fail to load with:

```
Get-ChildItem: Cannot find path '...\IntuneWinAppUtilGUI\1.0.0\Private' because it does not exist.
```

{/* truncate */}

The module looked for its private helper scripts in a folder that the Gallery package did not contain. 1.0.1 fixes the package, and `Show-IntuneWinAppUtilGui` starts as expected.

```powershell
Update-Module IntuneWinAppUtilGUI
```

:::note
Written in October 2026 from the release notes, to keep the history of every IntuneWinAppUtil GUI release on this site.
:::
