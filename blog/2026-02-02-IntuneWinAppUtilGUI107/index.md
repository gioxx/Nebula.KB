---
slug: intunewinapputilgui-1-0-7
title: "IntuneWinAppUtil GUI 1.0.7: path lengths and update notifications"
date: 2026-02-02T10:21:00+01:00
authors: [gioxx]
tags: [intune, intunewinapputilgui, powershell]
---

IntuneWinAppUtil GUI 1.0.7 warns you about paths that are too long before packaging, and tells you when a new version is available.

{/* truncate */}

## Path lengths

Long paths are one of the most common reasons for a failed package. Now:

- the **Source** and **Output** fields show the length of their path while you type;
- when you click Run, the GUI checks the longest file path inside the source folder and, if it exceeds the Windows limit, shows it and asks whether to continue.

The length shown for the source folder is indicative: the full check runs when packaging starts.

## Update notifications

The GUI checks the PowerShell Gallery for a newer version and shows a banner when there is one. The `-ShowVersion` and `-ForceUpdateBanner` switches let you test the banner.

:::warning[Windows PowerShell 5.1]
Versions 1.0.7 to 1.1.0 do not import correctly in Windows PowerShell 5.1. The problem was found and fixed in [1.1.1](/news/intunewinapputilgui-1-1-1): if you use 5.1, update to the latest version.
:::

:::note
Written in October 2026 from the release notes, to keep the history of every IntuneWinAppUtil GUI release on this site.
:::
