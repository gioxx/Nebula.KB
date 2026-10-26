---
slug: intunewinapputilgui-1-0-8
title: "IntuneWinAppUtil GUI 1.0.8: a refreshed window and more reliable packaging"
date: 2026-06-18T11:23:00+02:00
authors: [gioxx]
tags: [intune, intunewinapputilgui, powershell]
---

IntuneWinAppUtil GUI 1.0.8 has a refreshed main window, better handling of PSAppDeployToolkit and MSI metadata, and a more reliable final rename of the package.

{/* truncate */}

## Packaging reliability

- The rename of the final `.intunewin` file is retried when the file is briefly locked by another process or by a sync client such as OneDrive or Dropbox.
- Collision-safe names (`_1`, `_2` and so on) still apply when the requested file name already exists.
- Clearer completion message and prompt to open the output folder.

## PSAppDeployToolkit and MSI metadata

- `Invoke-AppDeployToolkit.exe` is still proposed as the setup file, and when the PSADT `AppName` or `AppVersion` are empty the GUI reads them from the MSI in the package.
- PSADT values are recognised in more forms, such as `$appName`, `$appVersion` and `$adtSession.AppName`.
- MSI files in the package `Files` folder are preferred when looking for those values.

## Refreshed window

- Cleaner, more modern layout, with the same fields and behaviour.
- Plain labels instead of emoji, which did not render well on Windows 10.
- Help moved to the footer, with a popup that lists the launch switches and keyboard shortcuts.
- Clearer confirmation prompts for forced downloads, path-length warnings, package completion and exit with `Esc`.

## Launch switches

`-Diag`, `-ShowVersion`, `-ForceUpdateBanner`, `-Debug` and `-Verbose` are kept when the GUI restarts itself in STA mode, and are documented in the README and in the Help popup.

```powershell
Update-Module IntuneWinAppUtilGUI
```

:::note
Written in October 2026 from the release notes, to keep the history of every IntuneWinAppUtil GUI release on this site.
:::
