---
title: 'IntuneWinAppUtil GUI installation and launch'
sidebar_label: 'Installation and launch'
description: 'Install from the PowerShell Gallery or the repository, and the launch switches.'
sidebar_position: 2
---

## Installation
### PowerShell Gallery (recommended)
```powershell
Install-Module IntuneWinAppUtilGUI -Scope CurrentUser
Show-IntuneWinAppUtilGUI
```

Update to the latest release, or remove the module:
```powershell
Update-Module IntuneWinAppUtilGUI
Uninstall-Module IntuneWinAppUtilGUI
```

### From the repository (clone or ZIP)
```powershell
Import-Module "C:\IntuneWinAppUtilGUI\IntuneWinAppUtilGUI.psd1"
Show-IntuneWinAppUtilGUI
```
To keep it available in every session, copy the folder into one of the paths listed in `$env:PSModulePath` (for example `Documents\PowerShell\Modules\IntuneWinAppUtilGUI` for PowerShell 7).

## Launching the GUI
```powershell
Show-IntuneWinAppUtilGUI
```

WPF needs a single-threaded apartment (STA). If the current session is not STA, the command starts a new `pwsh` (or `powershell`, under Windows PowerShell) process with `-STA` and launches the GUI there, passing along any switch you used.

<div className="param-table">

| Switch | What it does |
| --- | --- |
| `-ShowVersion` | Shows the installed module version and the latest version on the PowerShell Gallery in the header banner. Works even when the update check is disabled in the configuration. |
| `-ForceUpdateBanner` | Shows a test "update available" banner, useful to check how the notification looks. |
| `-Diag` | Writes diagnostics (handles, GDI handles, working set) when the GUI starts and after it closes, plus a detailed log of every packaging run in `%APPDATA%\IntuneWinAppUtilGUI\logs`: inputs, tool version, staging folder, exact command, exit code and tool output. When a run fails, the log also lists the files the tool left behind and the processes holding them open. |
| `-Verbose`, `-Debug` | Standard PowerShell switches; preserved when the GUI relaunches itself in STA mode. |

</div>

The **Help** link at the bottom of the window shows the same switches and the keyboard shortcuts.
