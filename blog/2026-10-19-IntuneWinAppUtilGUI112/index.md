---
slug: intunewinapputilgui-1-1-2
title: "IntuneWinAppUtil GUI 1.1.2: import errors name the failing file"
date: 2026-10-19T10:37:00+02:00
authors: [gioxx]
tags: [intune, intunewinapputilgui, powershell]
---

IntuneWinAppUtil GUI 1.1.2 is a small follow-up to [1.1.1](/news/intunewinapputilgui-1-1-1): if one of the module's scripts cannot be loaded, the import now stops with an error that names the file.

{/* truncate */}

Before, Windows PowerShell 5.1 printed an error with an empty file name and carried on with some functions missing. That is how the 5.1 problem fixed in 1.1.1 went unnoticed for so long.

The background scan introduced in [1.1.0](/news/intunewinapputilgui-1-1-0) was also reviewed again, with no issues found.

```powershell
Update-Module IntuneWinAppUtilGUI
```

:::note
Written in October 2026 from the release notes, to keep the history of every IntuneWinAppUtil GUI release on this site.
:::
