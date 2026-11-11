---
title: 'IntuneWinAppUtil GUI packaging'
sidebar_label: 'Packaging'
description: 'The window, each packaging step, scripts and other file types, PSADT and MSI auto-detection.'
sidebar_position: 3
---

## The window at a glance
The window has two sections, **Package source** and **Tool and output**, followed by the Run, Clear and Exit buttons. Fields marked with `*` are required.

| Field | Required | Notes |
| --- | :---: | --- |
| Source Folder (`-c`) | Yes | Root folder with everything that goes into the package. A path-length counter appears under the field. Typing or pasting a path starts the PSADT/MSI auto-detection. |
| Setup File (`-s`) | Yes | The file Intune will run: EXE, MSI or any other file type. Shown relative to the source folder when it lives inside it, otherwise as a full path. |
| Output Folder (`-o`) | Yes | Where the `.intunewin` file is written. Created automatically if missing. Has its own path-length counter. The drop-down lists the last 10 folders used for a successful package, most recent first; **Clear recent** empties it. |
| IntuneWinAppUtil Path | No | Path to `IntuneWinAppUtil.exe`. Leave it empty and the GUI uses its cached copy, or downloads the latest one. The detected tool version is shown under the field, with a link to the [version history](https://github.com/gioxx/IntuneWinAppUtilGUI/blob/main/Tools/IntuneWinAppUtilVersions.md). |
| Final filename | No | Name of the generated package. If empty, the package is named after the source folder. A trailing `.intunewin` is optional; invalid filename characters are removed. |

Buttons:
- **Run**: validates the fields and starts packaging (also with `Enter`).
- **Clear**: empties Source Folder, Setup File, Output Folder and Final filename; the tool path is kept.
- **Exit (ESC)**: closes the window. Pressing `Esc` asks for confirmation first, because the field values are not kept (only the tool path and the recent output folders are saved).
- **Force download**: downloads the latest `IntuneWinAppUtil.exe` again, replacing the cached copy (asks for confirmation).

## Packaging step by step
1. Pick the **Source Folder**. If it contains a PSAppDeployToolkit package or an MSI, the Setup File and Final filename are filled in for you (see [Auto-detection](#auto-detection-psappdeploytoolkit-and-msi)).
2. Check or choose the **Setup File**. If you browse to a file before setting the source folder, the GUI uses the file's folder as source folder. The same happens if you type or paste a full path in Setup File while Source Folder is empty: when you leave the field, the path is split into folder and file name.
3. Choose the **Output Folder**.
4. Optionally set a **Final filename** and a specific **IntuneWinAppUtil Path**.
5. Click **Run** or press `Enter`.

When you click Run, the GUI:
1. checks that the source folder exists and that the setup file exists, either as a full path or relative to the source folder;
2. creates the output folder if needed;
3. checks path lengths against the 260-character Windows limit: the source folder, the output folder and the longest file path inside the source. If any of them is too long, it lists them, shows the longest path, and asks whether to continue anyway;
4. resolves `IntuneWinAppUtil.exe` (field value, then cached copy, then a fresh download);
5. creates a new, empty staging folder under `%TEMP%`. If the temp drive has less free space than about three times the size of the source, the staging folder goes to the root of the output drive instead, outside any Dropbox or OneDrive folder;
6. runs `IntuneWinAppUtil.exe -c "<source>" -s "<setup>" -o "<staging folder>" -q` without a console window and captures its output. While it runs, a progress overlay shows the current step (compressing the source, encrypting, building the package) and an estimated percentage; the window cannot be closed until the run ends;
7. copies the package (by default `<setup file name>.intunewin`) to the output folder under a temporary name (`~iwa-<guid>.partial`) and renames it to the final filename, or to the source folder name, only when the copy is complete. When the staging folder is on the output drive, the package is moved with a rename instead of copied. If a file with that name already exists, `_1`, `_2` and so on are appended instead of overwriting it;
8. removes the staging folder and the working folder `IntuneWinAppUtil.exe` leaves in `%TEMP%`;
9. adds the output folder to the top of the recent folders list, plays the Windows success sound and shows a panel with the package name and folder: **Open folder** (or `Enter`) opens the output folder with the package selected, **Copy path** copies the full path of the package to the clipboard, **Close** (or `Esc`) returns to the form.

If the tool fails, the error message shows its exit code, the matching Windows error text and the last lines of its output. If the package cannot be copied to the output folder, it is kept in the staging folder and the message shows where.

## Packaging scripts and other file types
Since version 1.1.0 the Setup File can be any file. The browse dialog offers three filters: **Executable or MSI** (default), **Script files** (`*.ps1`, `*.bat`, `*.cmd`) and **All files**.

When the setup file is not an EXE or MSI (or has no extension), a note appears under the field: Intune does not run the file by itself, so the **install command** you set in the Intune app must start it. For example, for a PowerShell script:

```text
%SystemRoot%\Sysnative\WindowsPowerShell\v1.0\powershell.exe -ExecutionPolicy Bypass -NoProfile -File .\Install.ps1
```

`Sysnative` makes the Intune Management Extension (a 32-bit process) start the 64-bit PowerShell. Batch files can be started with `cmd.exe /c Install.cmd`.

:::note
`IntuneWinAppUtil.exe` packages the whole source folder anyway. The setup file only tells the tool which file to record as the setup file in the package metadata, which is also the name the `.intunewin` file gets before it is renamed.
:::

## Auto-detection (PSAppDeployToolkit and MSI)
When the Source Folder changes, the GUI scans it (including subfolders) and proposes values for Setup File and Final filename. The scan starts once you stop typing and runs in the background, so large or network folders do not freeze the window. If you edit Setup File or Final filename while a scan is running, the scan is discarded and your values are kept.

Rules:
- If Setup File already points to an existing file (full path or relative to the source folder), nothing is proposed.
- Setup File: the first `Invoke-AppDeployToolkit.exe` found (PSAppDeployToolkit 4.x). If there is none, the first `.msi` found, preferring files under a `Files` folder.
- Final filename, proposed only when the field is empty:
  - for PSADT, `AppName` and `AppVersion` are read from `Invoke-AppDeployToolkit.ps1` in the same folder (forms such as `AppName = '...'` inside the `$adtSession` hashtable are recognised);
  - if `AppName` is missing, `ProductName` and `ProductVersion` are read from the MSI;
  - the result is `AppName_AppVersion`, or only `AppName` when the version is missing. Spaces are removed and characters not allowed in file names are replaced with `-`.

Example: a PSADT package with `AppName = 'Contoso Agent'` and `AppVersion = '4.2.0'` produces the setup file `Invoke-AppDeployToolkit.exe` and the final filename `ContosoAgent_4.2.0`, so the package becomes `ContosoAgent_4.2.0.intunewin`.
