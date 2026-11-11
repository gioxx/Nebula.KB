---
slug: intunewinapputilgui-1-1-4
title: "IntuneWinAppUtil GUI 1.1.4: copy the package path, reuse recent output folders"
date: 2026-11-11T09:28:00+01:00
authors: [gioxx]
tags: [intune, intunewinapputilgui, powershell]
---

[IntuneWinAppUtil GUI](/Projects/intunewinapputilgui) 1.1.4 is out on the PowerShell Gallery. It is a small release with two additions that save a few clicks every time you build a package.

```powershell
Update-Module IntuneWinAppUtilGUI
```

{/* truncate */}

## Copy path

The panel that appears when a package is ready, introduced in [1.1.3](/news/intunewinapputilgui-1-1-3), now has a **Copy path** button next to **Open folder**. It copies the full path of the new `.intunewin` file to the clipboard, ready to paste into the Intune admin center upload dialog or into a script. The button shows **Copied!** for a moment to confirm.

## Recent output folders

The **Output Folder** field is now a drop-down that remembers the last 10 folders where a package was built successfully. The most recent one is at the top, and the same folder never appears twice. If you always package into the same few folders, you no longer need to browse for them.

**Clear recent**, next to the field, empties the list. You can still type or browse to any folder, and a folder that does not exist yet is created when you click Run.

The list is saved in `%APPDATA%\IntuneWinAppUtilGUI\config.json`, under `RecentOutputFolders`, after each successful package and when you click **Clear recent**.

The full list of changes is in the [release notes](https://github.com/gioxx/IntuneWinAppUtilGUI/releases/tag/v1.1.4).
