---
slug: intunewinapputilgui-1-0-2
title: "IntuneWinAppUtil GUI 1.0.2: existing packages are no longer in the way"
date: 2025-07-07T12:48:00+02:00
authors: [gioxx]
tags: [intune, intunewinapputilgui, powershell]
---

IntuneWinAppUtil GUI 1.0.2 fixes the rename of the generated package when a file with the same name is already in the output folder.

{/* truncate */}

`IntuneWinAppUtil.exe` names the package after the setup file, and the GUI then renames it to the name you chose. If a file with that name already existed, the rename failed. Now the GUI appends an incremental suffix (`_1`, `_2` and so on) and never overwrites an existing package.

The release also includes the loading fix from [1.0.1](/news/intunewinapputilgui-1-0-1).

```powershell
Update-Module IntuneWinAppUtilGUI
```

:::note
Written in October 2026 from the release notes, to keep the history of every IntuneWinAppUtil GUI release on this site.
:::
