---
slug: powershell-7-7-no-msi
title: "PowerShell 7.7 has no MSI: what it means for servers (and Nebula.Tools 1.0.8)"
date: 2026-11-13T12:00:00+01:00
authors: [gioxx]
tags: [powershell, tools, nebula]
---

[PowerShell 7.7](/blog/powershell-7-7) is the first release without an **MSI installer**: on GitHub you only find ZIP archives and an MSIX package. If you install or update PowerShell with the MSI, on servers or with deployment tools, you stay on **7.6 LTS**, supported until November 14, 2028. **Nebula.Tools 1.0.8** fixes `Update-PS7`, which reinstalled the same 7.6 release every time you ran it.

{/* truncate */}

## Why there is no MSI

The decision is not a mistake in the 7.7 release. Microsoft removed MSI (and EXE) packages from the Windows build and publishing pipeline in [PR #27213](https://github.com/PowerShell/PowerShell/pull/27213), merged in April 2026: from 7.7 on, only ZIP and MSIX packages are built for Windows.

The reason is in [issue #27565](https://github.com/PowerShell/PowerShell/issues/27565), opened by the PowerShell team: *"PowerShell 7 is moving to MSIX packaging as part of the inboxing initiative"*. In short, Microsoft wants PowerShell 7 to become part of Windows, and MSIX is the format chosen for it.

## What MSIX cannot do yet

The same issue tracks the gaps between the MSIX package and what the MSI does today. The ones marked as blockers:

- **No `pwsh` for SYSTEM and service accounts.** MSIX packages are registered per user, so `pwsh` is not found by scheduled tasks running as SYSTEM, Windows services, Intune or ConfigMgr scripts and deployment agents ([#27562](https://github.com/PowerShell/PowerShell/issues/27562)).
- **PowerShell remoting over WinRM does not work** with the MSIX package ([#27563](https://github.com/PowerShell/PowerShell/issues/27563)).
- **DISM cmdlets fail** with `Class not registered`: `Get-WindowsOptionalFeature`, `Add-WindowsCapability` and similar ([#13866](https://github.com/PowerShell/PowerShell/issues/13866)).

Other gaps: `$PSHOME` is read-only, so administrators cannot edit `powershell.config.json` or the AllUsers profile ([#27564](https://github.com/PowerShell/PowerShell/issues/27564)); winget cannot move an MSI installation to MSIX; updates through Microsoft Update and WSUS, an option of the MSI, are not available.

Many people asked for the MSI back in [issue #28290](https://github.com/PowerShell/PowerShell/issues/28290), which is still open. For now nothing suggests that Microsoft will publish one for 7.7.

## What to do

- **Servers, automations, anything that runs as SYSTEM or uses remoting:** stay on **PowerShell 7.6 LTS** with the MSI. It is the latest LTS release, built on .NET 10, and Microsoft supports it until **November 14, 2028** ([support lifecycle](https://learn.microsoft.com/powershell/scripting/install/powershell-support-lifecycle)). 7.6 updates still ship as MSI: 7.6.10 came out together with 7.7.0.
- **Your own workstation:** 7.7 works fine from the MSIX package (also through winget or the Microsoft Store) or from the ZIP archive.
- **7.7 on a server anyway:** use the ZIP archive, and take care yourself of the install folder, the `PATH` and the updates.

Keep in mind that 7.7 is a Stable release, not an LTS one: Microsoft supports it until about six months after the next LTS comes out. On servers, 7.6 LTS is the version that lasts longer anyway.

The official `install-powershell.ps1` script already follows this: since [PR #28403](https://github.com/PowerShell/PowerShell/pull/28403), when you pass `-UseMSI` it installs the latest 7.6 release instead of 7.7, and it stops with an error if you ask for an MSI of 7.7 or later.

## Nebula.Tools 1.0.8

`Update-PS7` runs that official script with `-UseMSI`. Before installing, it checked the running version against the latest release on GitHub, which is now 7.7.0. On a server with 7.6.10 the result was always "update needed", and the script downloaded and reinstalled 7.6.10, the same version, every time:

```text
PS C:\> Update-PS7
VERBOSE: About to download package from 'https://github.com/PowerShell/PowerShell/releases/download/v7.6.10/PowerShell-7.6.10-win-x64.msi'
```

**Nebula.Tools 1.0.8** reads the same file the official script reads ([`tools/metadata.json`](https://github.com/PowerShell/PowerShell/blob/master/tools/metadata.json)), so it compares your version with the one the script would actually install:

- on the latest 7.6 release, it skips the install and tells you so (`-Force` reinstalls anyway);
- on an older 7.6 release, it updates you to the latest one, as before;
- when a newer release without an MSI exists, such as 7.7, it warns you that it must be installed by hand.

```text
WARNING: PowerShell 7.7.0 is available but has no MSI package; Update-PS7 tracks the latest MSI release (7.6.10). Install 7.7.0 manually (zip/winget/Store) if you need it.
WARNING: PowerShell is already up to date (installed: 7.6.10, latest MSI release: 7.6.10). Skipping install. Use -Force to reinstall anyway.
```

To update the module:

```powershell
Update-Module Nebula.Tools
```

The details are in the [Update-PS7](/Nebula/Tools/usage/utilities#update-ps7) documentation, and the changes in the [1.0.8 release](https://github.com/gioxx/Nebula.Tools/releases/tag/v1.0.8).

## Nebula.Core 1.3.1

The [PowerShell update check](/blog/powershell-update-notice-removed) coming with Nebula.Core 1.3.1 had the same problem: on a server with 7.6.10 it would have reported `7.6.10 -> 7.7.0` every time, an update you cannot install with the MSI. [SWUpdates-Alert](https://github.com/gioxx/SWUpdates-Alert) now also tracks the latest LTS release, and Nebula.Core uses it:

- on 7.6 (the LTS line) or older, it tells you about the latest **7.6** release;
- on 7.7 and later, it tells you about the latest **stable** release.

The details are in the [configuration](/Nebula/Core/next/usage/configuration) page of the upcoming version.
