---
slug: powershell-update-notice-removed
title: PowerShell no longer tells you about new releases (and Nebula.Core will)
date: 2026-10-29T12:00:00+01:00
authors: [gioxx]
tags: [powershell, core, nebula]
---

If PowerShell 7 closed by itself right after start-up with `totalWidth ('-5') must be a non-negative value`, you met the bug that made Microsoft remove the update notice from PowerShell. The fix is in **PowerShell 7.6.8**, but from that release on PowerShell no longer tells you when a new version is out. Starting with **Nebula.Core 1.3.1**, Nebula does it for you.

{/* truncate */}

I described the crash, and how I got out of it, in [this article on my blog](https://gioxx.org/2026/10/20/powershell-totalwidth-5-must-be-a-non-negative-value/) (in Italian). Here is the short version, plus what changes in Nebula.Core.

## What happened

When a new PowerShell release is available, PowerShell 7 used to print a short notice at start-up, a few days after the release. The notice pads its lines so they line up. When one line is longer than the first one (because of a translation, or a console window that is too narrow), the padding becomes negative, .NET throws, and the exception is not handled: the whole `pwsh` process ends instead of skipping the notice.

That is why it looked random. Installing the newest PowerShell did not help right away, because the notice, and so the crash, only shows up some days after a new release is published.

The upstream reports are [PowerShell/PowerShell#28131](https://github.com/PowerShell/PowerShell/issues/28131) (zh-Hans) and [#28235](https://github.com/PowerShell/PowerShell/issues/28235) (narrow console). The fix, [PR #28242](https://github.com/PowerShell/PowerShell/pull/28242), removes the update notice altogether. It shipped in **PowerShell 7.6.8** on October 22, 2026.

## How to get out of it

Update PowerShell to 7.6.8 or later:

```powershell
winget upgrade --id Microsoft.PowerShell --exact
```

If PowerShell 7 crashes before you can type anything, turn the update check off for that one session, from Windows PowerShell:

```powershell
$env:POWERSHELL_UPDATECHECK = 'Off'
pwsh.exe -NoProfile
```

From Command Prompt, use `set POWERSHELL_UPDATECHECK=Off` and then `pwsh.exe -NoProfile`. Once PowerShell 7 starts, update it as shown above.

On 7.6.8 and later the variable is no longer needed. If you set it permanently for your user, remove it:

```powershell
[Environment]::SetEnvironmentVariable('POWERSHELL_UPDATECHECK', $null, 'User')
```

## What Nebula.Core 1.3.1 changes

With the notice gone, nothing tells you any more that a new PowerShell release exists. Nebula.Core already checks for updates of the `Nebula.*` modules, `ExchangeOnlineManagement` and `Microsoft.Graph` when you run `Connect-Nebula`; from 1.3.1 the same check also covers PowerShell itself:

```text
Update available for PowerShell: 7.6.8 -> 7.6.9
```

- It runs only on **PowerShell 7 and later**. On Windows PowerShell 5.1 it is skipped.
- The latest stable version comes from [SWUpdates-Alert](https://github.com/gioxx/SWUpdates-Alert), a small project of mine that already tracks new releases of several tools and now tracks PowerShell too. Preview builds are never reported as outdated.
- It follows the same rules as the module check: it runs on `Connect-Nebula` when `CheckUpdatesOnConnect` is on, at most once every `CheckUpdatesIntervalHours`, and `Get-NebulaModuleUpdates` always runs it right away.
- If the latest version cannot be read (no network, GitHub unreachable), Nebula prints a warning and goes on with the rest.
- It only tells you. Nebula never updates PowerShell for you.

To turn it off, add `CheckPowerShellUpdates = $false` to your `settings.psd1` and run `Sync-NebulaConfig`. The details are in the [Connect-Nebula](/Nebula/Core/next/usage/connect-nebula) and [configuration](/Nebula/Core/next/usage/configuration) pages of the upcoming version.
