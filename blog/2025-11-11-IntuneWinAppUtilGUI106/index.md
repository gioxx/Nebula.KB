---
slug: intunewinapputilgui-1-0-6
title: "IntuneWinAppUtil GUI 1.0.6: GitHub rate limit and PSADT names"
date: 2025-11-11T15:02:00+01:00
authors: [gioxx]
tags: [intune, intunewinapputilgui, powershell]
---

IntuneWinAppUtil GUI 1.0.6 fixes two problems: one with the GitHub API rate limit and one with the package name proposed for PSAppDeployToolkit packages.

{/* truncate */}

- **GitHub API rate limit**: the requests the GUI makes to GitHub for `IntuneWinAppUtil.exe` could run into the API rate limit. They have been reworked to stay within it.
- **PSAppDeployToolkit package name**: the final file name is now proposed even when `Invoke-AppDeployToolkit.ps1` does not set `AppVersion`.

The release also includes everything from [1.0.5](/news/intunewinapputilgui-1-0-5).

```powershell
Update-Module IntuneWinAppUtilGUI
```

:::note
Written in October 2026 from the release notes, to keep the history of every IntuneWinAppUtil GUI release on this site.
:::
