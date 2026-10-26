---
slug: intunewinapputilgui-1-0-4
title: "IntuneWinAppUtil GUI 1.0.4: input checks and cleanup (withdrawn)"
date: 2025-10-01T14:32:00+02:00
authors: [gioxx]
tags: [intune, intunewinapputilgui, powershell]
---

IntuneWinAppUtil GUI 1.0.4 brought a round of input checks and a code cleanup. It was withdrawn from the PowerShell Gallery the same day: the package did not export `Show-IntuneWinAppUtilGui`, so the GUI could not be started. [1.0.5](/news/intunewinapputilgui-1-0-5) replaced it about twenty minutes later with the same changes.

{/* truncate */}

What 1.0.4 changed, and 1.0.5 then shipped:

- the setup file must exist and be of a supported type before packaging starts;
- the output folder is created if it is missing;
- the package always ends with exactly one `.intunewin` extension;
- if you leave the source folder empty, it is taken from the folder of the setup file;
- references to ZIP files as setup files were removed;
- relative paths are resolved in a way that also works in Windows PowerShell 5.1 (`[System.IO.Path]::GetRelativePath` exists only in PowerShell 7);
- the GitHub download logic was simplified and the code refactored.

:::note
Written in October 2026 from the release notes, to keep the history of every IntuneWinAppUtil GUI release on this site.
:::
