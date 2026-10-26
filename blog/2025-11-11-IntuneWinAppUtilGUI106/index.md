---
slug: intunewinapputilgui-1-0-6
title: "IntuneWinAppUtil GUI 1.0.6: package names without AppVersion"
date: 2025-11-11T15:02:00+01:00
authors: [gioxx]
tags: [intune, intunewinapputilgui, powershell]
---

IntuneWinAppUtil GUI 1.0.6 fixes the package name proposed for PSAppDeployToolkit packages: the final file name is now proposed even when `Invoke-AppDeployToolkit.ps1` does not set `AppVersion`.

{/* truncate */}

The release also includes everything from [1.0.5](/news/intunewinapputilgui-1-0-5).

```powershell
Update-Module IntuneWinAppUtilGUI
```

:::note
Written in October 2026 from the release notes, to keep the history of every IntuneWinAppUtil GUI release on this site.
:::
