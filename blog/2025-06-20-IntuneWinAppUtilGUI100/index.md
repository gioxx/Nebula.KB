---
slug: intunewinapputilgui-1-0-0
title: "IntuneWinAppUtil GUI 1.0.0: a window for the Win32 Content Prep Tool"
date: 2025-06-20T16:27:00+02:00
authors: [gioxx]
tags: [intune, intunewinapputilgui, powershell]
---

IntuneWinAppUtil GUI is a PowerShell module with a WPF window around Microsoft's `IntuneWinAppUtil.exe`, the [Win32 Content Prep Tool](https://github.com/microsoft/Microsoft-Win32-Content-Prep-Tool) that turns an installer and its files into the `.intunewin` package Intune needs. Version 1.0.0 is the first one on the PowerShell Gallery.

```powershell
Install-Module IntuneWinAppUtilGUI -Scope CurrentUser
Show-IntuneWinAppUtilGui
```

{/* truncate */}

`IntuneWinAppUtil.exe` is a command-line tool: every time you package an app you type the source folder (`-c`), the setup file (`-s`) and the output folder (`-o`), and then rename the result. The GUI fills those switches for you:

- a field and a browse dialog for each of the three switches;
- optional download of the latest `IntuneWinAppUtil.exe` from GitHub, so you don't have to fetch it yourself;
- the tool path is saved in a JSON file and reused at the next launch;
- invalid characters are removed from the output file name;
- after a successful run, it offers to open the output folder;
- `Enter` runs the packaging, `Esc` closes the window.

It is built with WPF (XAML) and PowerShell only, with no external dependencies, and needs Windows 10 or later and PowerShell 5.1 or later.

The [documentation](/Projects/M365/intunewinapputilgui) covers installation and every field of the window.

:::note
Written in October 2026 from the release notes, to keep the history of every IntuneWinAppUtil GUI release on this site.
:::
