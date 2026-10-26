---
slug: intunewinapputilgui-1-1-3
title: "IntuneWinAppUtil GUI 1.1.3: no more access denied while packaging"
date: 2026-10-26T09:29:00+01:00
authors: [gioxx]
tags: [intune, intunewinapputilgui, powershell]
---

[IntuneWinAppUtil GUI](/Projects/M365/intunewinapputilgui) 1.1.3 is out on the PowerShell Gallery. It fixes a packaging failure that showed up on some machines as exit code `-2147024891` (`0x80070005`, access denied). It also changes what you see while a package is being built.

```powershell
Update-Module IntuneWinAppUtilGUI
```

{/* truncate */}

## The access denied error

On some machines, a packaging run could stop with:

```
IntuneWinAppUtil exited with code -2147024891 (0x80070005)
```

The output folder was the first suspect, because it often sits in Dropbox or OneDrive, but it was not the cause. The error came from how the GUI started `IntuneWinAppUtil.exe`: in its own console window. Started that way, on some machines the tool failed while replacing its own temporary package.

Since 1.1.3 the GUI runs the tool without a window and captures its output. If you hit that error before, updating is all you need to do.

## Packages appear only when they are complete

The package is now built in a temporary folder under `%TEMP%`. It reaches the output folder under a temporary name and gets its final name only when it is complete. Dropbox, OneDrive and any other sync client never see a half-written `.intunewin` file. If the temp drive does not have enough free space, the build moves to the output drive, outside any synced folder.

The working folder that `IntuneWinAppUtil.exe` leaves behind in `%TEMP%` is now removed at the end of the run, so it no longer piles up there.

## What you see while packaging

- **Progress overlay**: shows the current step (compressing the source, encrypting, building the package) with an estimated percentage. The window stays responsive, and it cannot be closed until the run ends.
- **Result panel**: when the package is ready, a panel in the window shows its name and folder. **Open folder** (or `Enter`) opens the folder with the package selected, **Close** (or `Esc`) returns to the form. You also hear the Windows success sound, which is handy when the package takes a while and you are working in another window.

## Better errors and a log of every run

When the tool fails, the message now includes the exit code in hexadecimal, the matching Windows error text and the last lines of the tool output. In most cases that is enough to understand what went wrong.

When it is not, start the GUI with `-Diag`:

```powershell
Show-IntuneWinAppUtilGUI -Diag
```

Each packaging run then writes a detailed log to `%APPDATA%\IntuneWinAppUtilGUI\logs`: inputs, tool version, temporary folder, exact command, exit code and tool output. When a run fails, the log also lists the files the tool left behind and the processes holding them open. If you open an issue on [GitHub](https://github.com/gioxx/IntuneWinAppUtilGUI/issues), attach that log.

The full list of changes is in the [release notes](https://github.com/gioxx/IntuneWinAppUtilGUI/releases/tag/v1.1.3). The [documentation](/Projects/M365/intunewinapputilgui) describes each step of a packaging run and has a troubleshooting table for the most common errors.
