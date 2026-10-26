---
slug: intunewinapputilgui-1-1-0
title: "IntuneWinAppUtil GUI 1.1.0: any file as setup file"
date: 2026-10-19T09:49:00+02:00
authors: [gioxx]
tags: [intune, intunewinapputilgui, powershell]
---

IntuneWinAppUtil GUI 1.1.0 accepts any file type as the setup file, not only EXE and MSI, and fixes the lag when typing in the **Source Folder** field.

{/* truncate */}

## Any file as setup file

You can now point the **Setup File** field at a PowerShell script (`.ps1`), a `.bat` or `.cmd` script, an MSIX package and so on. The browse dialog offers EXE/MSI (the default), script files and all files. When you pick something other than an EXE or MSI, a hint under the field reminds you to set a matching install command in Intune. The [documentation](/Projects/M365/intunewinapputilgui#packaging-scripts-and-other-file-types) has examples.

## No more lag in Source Folder

The GUI scans the source folder to propose the setup file and the package name. That scan ran at every keystroke and made typing slow on large folders. Now it waits until you stop typing and runs in the background.

```powershell
Update-Module IntuneWinAppUtilGUI
```

:::warning[Windows PowerShell 5.1]
This version does not import correctly in Windows PowerShell 5.1. Use [1.1.1](/news/intunewinapputilgui-1-1-1) or later.
:::

:::note
Written in October 2026 from the release notes, to keep the history of every IntuneWinAppUtil GUI release on this site.
:::
