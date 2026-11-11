---
slug: powershell-7-7
title: "PowerShell 7.7 is out: what's new, what breaks, what got fixed"
date: 2026-11-11T16:00:00+01:00
authors: [gioxx]
tags: [powershell, nebula]
---

**PowerShell 7.7.0** was released on November 10, 2026, together with **7.6.10**. It runs on .NET 11 and brings a few new cmdlets and parameters, a handful of breaking changes you should check before updating, and a long list of fixes. The same day, PowerShell 7.4 reached the end of its support.

{/* truncate */}

## Which version to install

PowerShell 7.7 is a **Stable** release, not an LTS one: Microsoft supports a Stable release until about six months after the next LTS comes out. The LTS release is still **PowerShell 7.6**, built on .NET 10 and supported until November 14, 2028. 7.6.10, released together with 7.7, only contains fixes.

- Want the new features? Install 7.7.
- Running scripts on servers or in automations that must stay unchanged for a long time? Stay on 7.6 and keep it updated.
- Still on **PowerShell 7.4**? Its support ended on November 10, 2026, and 7.4.22 is the last release. Move to 7.6 or 7.7.

To update with winget:

```powershell
winget upgrade --id Microsoft.PowerShell --exact
```

PowerShell no longer tells you at start-up that a new release is available: the update notice was removed in 7.6.8 and in 7.7 as well. I explained why in [this post](/blog/powershell-update-notice-removed).

## Breaking changes

Read these before you update scripts that run unattended.

- **`New-Guid` creates version 7 UUIDs.** They are time-sortable instead of fully random; the format does not change. If you need a random GUID (for example as a secret or a token), use `[guid]::NewGuid()`.
- **`-NoTypeInformation` is obsolete** on `Export-Csv` and `ConvertTo-Csv`. It does nothing (PowerShell 7 has not written type information by default for years), but now every use prints a warning:

  ```text
  WARNING: Parameter 'NoTypeInformation' is obsolete. This parameter is obsolete and has no effect. The default behavior is to not include type information. Use -IncludeTypeInformation to include type information.
  ```

  Scripts that must also run on Windows PowerShell 5.1 still need it there, so expect to see this warning until they handle the two versions separately.
- **`Test-Json` no longer downloads external schemas** referenced by `$ref` unless you add `-FetchExternalReference`.
- **Switches set explicitly to `$false` now really mean `$false`** in many cmdlets: `Where-Object`, the `*-Csv` cmdlets, `Get-Random`, `Get-SecureRandom`, `Get-TimeZone`, `Get-Uptime`, `New-Guid`, `New-PSSession`, `Split-Path` and `Test-Connection`. Before, some of them acted as if the switch was present. If you build parameters with values like `-Switch:$condition`, check the results.
- `-Property` of `Format-Table`, `Format-List` and `Format-Custom` no longer accepts `$null` or an empty value.
- Arguments that must not be null or empty now throw `System.ArgumentException` instead of `PSArgumentNullException`. This matters only if you catch that exception by type.
- `Export-Csv` no longer accepts `-Append` and `-NoHeader` together.

## What's new

Everything below was tested on the 7.7.0 release.

- **`New-TemporaryDirectory`**, the twin of `New-TemporaryFile`: it creates a unique folder in the temp path and returns a `DirectoryInfo`. It also works in Constrained Language Mode, where `[System.IO.Path]` is not available.
- **`Join-Path -Extension`** changes the extension of the resulting path:

  ```powershell
  Join-Path -Path C:\Reports -ChildPath summary.txt -Extension .csv
  # C:\Reports\summary.csv
  ```

- **`-ExcludeProperty` on `Format-Table`, `Format-List`, `Format-Wide` and `Format-Custom`**, so you no longer need a `Select-Object` just to hide a column:

  ```powershell
  [pscustomobject]@{ Name = 'Test'; Age = 30; City = 'Milan' } | Format-Table -ExcludeProperty Age
  ```

  It works on the properties of the object, not on the columns of a formatting view: on objects with a default view, such as the output of `Get-Process`, it shows every other property instead of the usual columns.

- **`$PSStyle.AutoSizeDefaultFormatting`**: set it to `$true` and the default table and wide output behave as if you had added `-AutoSize`. Handy in narrow terminals.
- **`$PSApplicationOutputEncoding`** sets the encoding PowerShell uses to read the output of external programs, without changing `[Console]::OutputEncoding` for the whole process. When it is `$null` (the default), nothing changes.
- **`Get-AuthenticodeSignature`** returns the certificate's `SubjectAlternativeName` too.
- **SHA-1 catalog files** created or checked with `New-FileCatalog` and `Test-FileCatalog` now produce a warning suggesting `-CatalogVersion 2`.
- **Tab completion** for `$PSBoundParameters.Keys` and for positional parameters (fixing a regression).
- `WildcardPattern` gets a `ToRegex()` method, for those who build patterns in code.
- On Windows, telemetry follows the **Diagnostics & feedback** setting of the system.

### Updated modules

- **PSReadLine** 2.4.5
- **Microsoft.PowerShell.PSResourceGet** 1.3.1

### Experimental features

They are off by default; turn them on with `Enable-ExperimentalFeature` and restart PowerShell.

- `PSLoadAssemblyFromNativeCode`: load assemblies from native code.
- `PSSerializeJSONLongEnumAsNumber`: `ConvertTo-Json` writes large enum values as numbers.
- `PSProfileDSCResource`: a DSC v3 resource to manage PowerShell profiles.

## Notable fixes

- `Get-ChildItem -Name -Recurse` honors `-Recurse` again.
- `Resolve-Path -Relative` returns the right path for names that start with a dot.
- `Get-Command` no longer returns duplicates when it suggests similar names.
- `Test-Json` no longer reports false errors with `oneOf` or `anyOf` in the schema.
- `Invoke-RestMethod` can send read-only files in multipart form data; `Invoke-WebRequest` picks the output file name better, and handles the `Authorization` header more safely on redirects.
- `pwsh -File` runs scripts that contain an advanced function correctly again.
- The progress bar no longer breaks with double-width characters (Chinese, Japanese, Korean and some emoji).
- `Clear-Host` works in a remote Windows session opened from Linux or macOS.
- A broken per-user `powershell.config.json` no longer stops PowerShell from starting.
- `Remove-Item` asks for confirmation using the real file system path instead of the PowerShell one.

Several fixes also harden security: more checks in Constrained Language Mode, in remoting (PSRP) and in the extraction of updatable help files.

The full list is in the [7.7.0 release notes](https://github.com/PowerShell/PowerShell/releases/tag/v7.7.0) and in Microsoft's [What's New in PowerShell 7.7](https://learn.microsoft.com/powershell/scripting/whats-new/what-s-new-in-powershell-77) page. The changes from the previews are in the [CHANGELOG](https://github.com/PowerShell/PowerShell/blob/master/CHANGELOG/preview.md).

## And Nebula?

Nebula modules work on both Windows PowerShell 5.1 and PowerShell 7, so some commands still use `-NoTypeInformation` when they export CSV files. On 7.7 they show the warning above: it is harmless, and the files they create do not change.
