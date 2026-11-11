---
title: 'IntuneWinAppUtil GUI configuration'
sidebar_label: 'Configuration'
description: 'IntuneWinAppUtil.exe download and cache, config.json, update check and keyboard shortcuts.'
sidebar_position: 4
---

## IntuneWinAppUtil.exe: download and cache
When packaging, the tool is taken from:
1. the **IntuneWinAppUtil Path** field, if it points to an existing file;
2. otherwise the cached copy in `%APPDATA%\IntuneWinAppUtilGUI\bin\IntuneWinAppUtil.exe`;
3. otherwise a fresh download, saved to the cache.

The download takes the current `master` branch of [microsoft/Microsoft-Win32-Content-Prep-Tool](https://github.com/microsoft/Microsoft-Win32-Content-Prep-Tool) as a ZIP archive over TLS 1.2, extracts `IntuneWinAppUtil.exe` and removes the temporary files. Use **Force download** to replace the cached copy with the current one, for example after Microsoft publishes a new release.

The FileVersion shown under the field tells you which release you have; the [version history table](https://github.com/gioxx/IntuneWinAppUtilGUI/blob/main/Tools/IntuneWinAppUtilVersions.md) maps FileVersions to upstream releases and is refreshed weekly by a GitHub Actions workflow.

## Configuration file
Settings are stored in `%APPDATA%\IntuneWinAppUtilGUI\config.json`. The file is written when the window closes, after each successful package and when you click **Clear recent**:

```json
{
  "ToolPath": "C:\\Users\\alice\\AppData\\Roaming\\IntuneWinAppUtilGUI\\bin\\IntuneWinAppUtil.exe",
  "UpdateCheckEnabled": true,
  "RecentOutputFolders": [
    "D:\\Packages\\Contoso",
    "D:\\Packages"
  ]
}
```

| Key | Meaning |
| --- | --- |
| `ToolPath` | Path loaded into the IntuneWinAppUtil Path field at startup, if the file still exists. |
| `UpdateCheckEnabled` | `true` (default) checks the PowerShell Gallery for a newer module version at startup. Set it to `false` to turn the check off, for example on machines without internet access. |
| `RecentOutputFolders` | The last 10 output folders used for a successful package, most recent first (1.1.4 and later). They fill the Output Folder drop-down. |

Other field values are not saved.

## Update check
At startup the GUI asks the PowerShell Gallery for the latest version of the module, in the background and with a 10-second timeout, so the window opens straight away. It uses `Find-Module` and falls back to the Gallery API if needed. When a newer version exists, a banner suggests running:

```powershell
Update-Module IntuneWinAppUtilGUI
```

If the Gallery cannot be reached, nothing is shown. Use `-ShowVersion` to see both versions and the error, if any.

## Keyboard shortcuts
| Key | Action |
| --- | --- |
| `Enter` | Run packaging. |
| `Esc` | Close the window, after confirmation. |
