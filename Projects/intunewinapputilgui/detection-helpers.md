---
title: 'IntuneWinAppUtil GUI detection helpers'
sidebar_label: 'Detection helpers'
description: 'Get-IntuneFileVersion and the ready-to-adapt Intune detection script.'
sidebar_position: 5
---

## Get-IntuneFileVersion
Command-line helper that returns the `FileVersion` of a file, the value used by Intune file-based detection rules (**File or folder** rule, **Detection method: String (version)**):

```powershell
Get-IntuneFileVersion -Path 'C:\Program Files\Contoso\Agent\ContosoAgent.exe'
# 4.2.0.118
```

- Returns only the FileVersion string. It works on any file that carries version information (EXE, DLL, ...); for files without it the result is empty.
- Throws if the path does not exist or is a folder.
- `-Path` is positional, so `Get-IntuneFileVersion .\ContosoAgent.exe` works too.

Read the version from the installed file on a reference machine, not from the installer, because the two often differ.

## Intune detection script
[`Scripts/Intune_CheckAppInstallation.ps1`](https://github.com/gioxx/IntuneWinAppUtilGUI/blob/main/Scripts/Intune_CheckAppInstallation.ps1) is a starting point for a **custom detection script** in a Win32 app. It looks for an executable under both `%ProgramFiles%` and `%ProgramFiles(x86)%` and, optionally, checks a minimum version.

1. Download the script and set `$searchPath` to the executable path relative to Program Files:
   ```powershell
   $searchPath = "Contoso\Agent\ContosoAgent.exe"
   ```
2. Near the end of the script, decide whether a minimum version is required:
   ```powershell
   $status = Get-AppStatus -MinimumVersion "4.2.0.0"   # installed and at least 4.2.0.0
   $status = Get-AppStatus                             # installed, any version
   ```
3. In the Intune app, under **Detection rules**, choose **Use a custom detection script**, upload the script and set **Run script as 32-bit process on 64-bit clients** to **No**.

How it behaves:
- It reads `FileVersion`, or `ProductVersion` when FileVersion is empty.
- Versions are normalised before comparing: non-numeric characters are dropped and only the first four parts are kept, so `R25.1.164.0.0` becomes `25.1.164.0`.
- Exit code `0` with a message on standard output when the app is found and meets the minimum version; exit code `1` when it is missing or older. Intune treats the app as installed only with exit code `0` **and** some output.
- The message (`App detected. Version: ...`, `App detected but version below minimum requirement`, `App NOT detected.`) is written to the Intune Management Extension log, which helps when troubleshooting.
