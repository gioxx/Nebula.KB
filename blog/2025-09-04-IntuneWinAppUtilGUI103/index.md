---
slug: intunewinapputilgui-1-0-3
title: "IntuneWinAppUtil GUI 1.0.3: PSAppDeployToolkit detection"
date: 2025-09-04T10:59:00+02:00
authors: [gioxx]
tags: [intune, intunewinapputilgui, powershell]
---

IntuneWinAppUtil GUI 1.0.3 recognises [PSAppDeployToolkit](https://psappdeploytoolkit.com/) packages and shows which version of `IntuneWinAppUtil.exe` you are using.

{/* truncate */}

## PSAppDeployToolkit

- If the source folder contains `Invoke-AppDeployToolkit.exe`, the GUI proposes it as the setup file.
- If it contains `Invoke-AppDeployToolkit.ps1`, the GUI reads it and proposes a name for the `.intunewin` package based on the application name and version.

## IntuneWinAppUtil.exe version

The window now shows the version of `IntuneWinAppUtil.exe` in use. The **Force download** button downloads the latest version available on GitHub, and the **Version history** link opens the list of released versions.

```powershell
Update-Module IntuneWinAppUtilGUI
```

:::note
Written in October 2026 from the release notes, to keep the history of every IntuneWinAppUtil GUI release on this site.
:::
